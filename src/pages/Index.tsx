import { useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { ResultsSection } from "@/components/ResultsSection";
import { MultiUseCaseConfiguration } from "@/components/MultiUseCaseConfiguration";
import { UseCaseConfiguration } from "@/components/UseCaseConfig";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface ComparisonResult {
  useCaseName: string;
  totalRecords: number;
  unchanged: number;
  changed: number;
  newRecord: number;
  multipleMatches: number;
}

const Index = () => {
  const [useCaseConfigs, setUseCaseConfigs] = useState<UseCaseConfiguration[]>([
    {
      id: `usecase-${Date.now()}`,
      useCaseName: "",
      newFile: null,
      oldFile: null,
      latestSheetName: "",
      oldSheetName: "",
      primaryKeys: "",
      columnsToSkip: "",
      filterColumn: "",
      columnRenames: [],
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ComparisonResult[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleRunComparison = async () => {
    // Validate all use case configurations
    for (const config of useCaseConfigs) {
      if (!config.newFile || !config.oldFile) {
        setError(`Please upload both files for use case: ${config.useCaseName || 'Unnamed'}`);
        return;
      }
      if (!config.useCaseName.trim()) {
        setError("Please enter a use case name for all configurations");
        return;
      }
      if (!config.latestSheetName.trim() || !config.oldSheetName.trim()) {
        setError("Please enter both latest and old file sheet names for all configurations");
        return;
      }
      if (!config.primaryKeys.trim()) {
        setError("Please enter at least one primary key for all configurations");
        return;
      }
    }

    setError(null);
    setIsProcessing(true);
    setResults(null);

    // Simulate API call for batch processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results for each use case
      const mockResults: ComparisonResult[] = useCaseConfigs.map(config => ({
        useCaseName: config.useCaseName,
        totalRecords: Math.floor(Math.random() * 2000) + 1000,
        unchanged: Math.floor(Math.random() * 1500) + 800,
        changed: Math.floor(Math.random() * 100) + 50,
        newRecord: Math.floor(Math.random() * 200) + 100,
        multipleMatches: Math.floor(Math.random() * 50) + 10,
      }));

      setResults(mockResults);
      toast.success(`Batch comparison completed! ${mockResults.length} use case(s) processed.`);
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
      toast.success("All reports downloaded successfully!");
    } catch (err) {
      setError("Failed to download reports. Please try again.");
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
              Excel File Comparison - Batch Processing
            </h1>
          </div>
          <p className="text-muted-foreground">
            Configure and execute multiple file comparisons simultaneously
          </p>
        </div>

        {/* Multi-Use Case Configuration Card */}
        <Card>
          <CardHeader>
            <CardTitle>Use Case Configuration</CardTitle>
            <CardDescription>
              Add multiple use cases, each with its own files and settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MultiUseCaseConfiguration
              configs={useCaseConfigs}
              onChange={setUseCaseConfigs}
            />

            <Button
              onClick={handleRunComparison}
              disabled={
                isProcessing || 
                useCaseConfigs.length === 0 ||
                useCaseConfigs.some(c => 
                  !c.newFile || 
                  !c.oldFile || 
                  !c.useCaseName.trim() || 
                  !c.latestSheetName.trim() || 
                  !c.oldSheetName.trim() || 
                  !c.primaryKeys.trim()
                )
              }
              size="lg"
              className="w-full mt-6"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              {isProcessing ? "Processing..." : `Run Comparison (${useCaseConfigs.length} Use Case${useCaseConfigs.length !== 1 ? 's' : ''})`}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
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
