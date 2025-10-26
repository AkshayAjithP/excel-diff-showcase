import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { AlertBanner } from "@/components/AlertBanner";
import { ResultsSection } from "@/components/ResultsSection";
import { MultiUseCaseConfiguration } from "@/components/MultiUseCaseConfiguration";
import { UseCaseConfiguration } from "@/components/UseCaseConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FileSpreadsheet, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface ComparisonResult {
  useCaseId: string;
  useCaseName: string;
  totalRecords: number;
  unchanged: number;
  changed: number;
  newRecord: number;
  multipleMatches: number;
}

const Index = () => {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [oldFile, setOldFile] = useState<File | null>(null);
  const [useCaseConfigs, setUseCaseConfigs] = useState<UseCaseConfiguration[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleRunComparison = async () => {
    // Validation
    if (!newFile || !oldFile) {
      setError("Please upload both files before running comparison");
      return;
    }

    if (useCaseConfigs.length === 0) {
      setError("Please add at least one use case configuration");
      return;
    }

    // Validate each use case config
    for (const config of useCaseConfigs) {
      if (!config.useCaseName.trim()) {
        setError("Please enter a name for all use cases");
        return;
      }
      if (!config.latestSheetName.trim() || !config.oldSheetName.trim()) {
        setError("Please enter both latest and old file sheet names for all use cases");
        return;
      }
      if (!config.primaryKeys.trim()) {
        setError("Please enter at least one primary key for all use cases");
        return;
      }
    }

    setError(null);
    setIsProcessing(true);
    setResults([]);

    // Simulate API call for batch processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for each use case
      const mockResults: ComparisonResult[] = useCaseConfigs.map((config) => ({
        useCaseId: config.id,
        useCaseName: config.useCaseName,
        totalRecords: Math.floor(Math.random() * 2000) + 1000,
        unchanged: Math.floor(Math.random() * 1000) + 500,
        changed: Math.floor(Math.random() * 200) + 50,
        newRecord: Math.floor(Math.random() * 300) + 100,
        multipleMatches: Math.floor(Math.random() * 50) + 10,
      }));

      setResults(mockResults);
      toast.success(`Batch comparison completed! Processed ${useCaseConfigs.length} use case(s).`);
    } catch (err) {
      setError("An error occurred while processing the files. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadReport = async () => {
    setIsDownloading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Report downloaded successfully!");
    } catch (err) {
      setError("Failed to download report. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4 sm:px-6 lg:px-8">
      {error && (
        <AlertBanner 
          message={error} 
          onClose={() => setError(null)} 
          variant="error"
        />
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-3">
            <FileSpreadsheet className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              Excel File Comparison
            </h1>
          </div>
          <p className="text-muted-foreground">
            Compare two Excel files and identify changes between them
          </p>
        </div>

        {/* Input Files Card */}
        <Card>
          <CardHeader>
            <CardTitle>1. Input Files</CardTitle>
            <CardDescription>
              Upload the files you want to compare
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FileDropzone
              label="New/Latest File *"
              onFileSelect={setNewFile}
              selectedFile={newFile}
            />
            <FileDropzone
              label="Old File *"
              onFileSelect={setOldFile}
              selectedFile={oldFile}
            />
          </CardContent>
        </Card>

        {/* Multi-Use Case Configuration */}
        <MultiUseCaseConfiguration
          configs={useCaseConfigs}
          onConfigsChange={setUseCaseConfigs}
        />

        {/* Run Comparison Button */}
        <Card>
          <CardContent className="pt-6">
            <Button
              onClick={handleRunComparison}
              disabled={
                isProcessing || 
                !newFile || 
                !oldFile || 
                useCaseConfigs.length === 0
              }
              size="lg"
              className="w-full"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              {isProcessing ? "Processing..." : `Run Batch Comparison (${useCaseConfigs.length} use case${useCaseConfigs.length !== 1 ? 's' : ''})`}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results.length > 0 && (
          <ResultsSection
            results={results}
            onDownload={handleDownloadReport}
            isDownloading={isDownloading}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
