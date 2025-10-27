import { useState } from "react";
import { AlertBanner } from "@/components/AlertBanner";
import { ResultsSection } from "@/components/ResultsSection";
import { MultiUseCaseConfiguration } from "@/components/MultiUseCaseConfiguration";
import { UseCaseConfiguration } from "@/components/UseCaseConfig";
import { UseCaseSummary } from "@/components/UseCaseSummary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSpreadsheet, PlayCircle, Layers } from "lucide-react";
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

  const hasValidConfigs = useCaseConfigs.some(c => 
    c.newFile && 
    c.oldFile && 
    c.useCaseName.trim() && 
    c.latestSheetName.trim() && 
    c.oldSheetName.trim() && 
    c.primaryKeys.trim()
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-12 px-4 sm:px-6 lg:px-8">
      {error && (
        <div className="max-w-5xl mx-auto mb-6">
          <AlertBanner 
            message={error} 
            onClose={() => setError(null)} 
            variant="error"
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 pb-4">
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <div className="p-3 bg-primary/10 rounded-2xl">
              <FileSpreadsheet className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Excel File Comparison
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Configure and execute multiple file comparisons simultaneously with intelligent batch processing
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <Layers className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Batch Processing Enabled</span>
          </div>
        </div>

        {/* Multi-Use Case Configuration Card */}
        <Card className="shadow-lg border-2">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl">Use Case Configuration</CardTitle>
            <CardDescription className="text-base">
              Add multiple use cases, each with its own files and settings. Follow the step-by-step process for each comparison.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <MultiUseCaseConfiguration
              configs={useCaseConfigs}
              onChange={setUseCaseConfigs}
            />

            {/* Summary Section */}
            {useCaseConfigs.length > 0 && (
              <div className="pt-4">
                <UseCaseSummary configs={useCaseConfigs} />
              </div>
            )}

            {/* Run Button */}
            <div className="pt-4">
              <Button
                onClick={handleRunComparison}
                disabled={
                  isProcessing || 
                  !hasValidConfigs
                }
                size="lg"
                className="w-full h-14 text-lg font-semibold shadow-md hover:shadow-lg transition-smooth"
              >
                <PlayCircle className="w-6 h-6 mr-2" />
                {isProcessing 
                  ? "Processing Comparisons..." 
                  : `Run All Comparisons (${useCaseConfigs.filter(c => 
                      c.newFile && c.oldFile && c.useCaseName.trim() && 
                      c.latestSheetName.trim() && c.oldSheetName.trim() && c.primaryKeys.trim()
                    ).length} Ready)`
                }
              </Button>
              {!hasValidConfigs && useCaseConfigs.length > 0 && (
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Complete at least one use case configuration to run comparisons
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {results && (
          <div className="animate-fade-in">
            <ResultsSection
              results={results}
              onDownload={handleDownloadReport}
              isDownloading={isDownloading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
