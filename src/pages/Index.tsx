import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { AlertBanner } from "@/components/AlertBanner";
import { ResultsSection } from "@/components/ResultsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FileSpreadsheet, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface ComparisonResult {
  totalRows: number;
  addedRows: number;
  modifiedRows: number;
  deletedRows: number;
  unchangedRows: number;
}

const Index = () => {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [oldFile, setOldFile] = useState<File | null>(null);
  const [keyColumn, setKeyColumn] = useState("");
  const [sheetName, setSheetName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleRunComparison = async () => {
    // Validation
    if (!newFile || !oldFile) {
      setError("Please upload both files before running comparison");
      return;
    }

    if (!keyColumn.trim()) {
      setError("Please enter a key column name");
      return;
    }

    setError(null);
    setIsProcessing(true);
    setResults(null);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock results
      const mockResults: ComparisonResult = {
        totalRows: 1500,
        addedRows: 145,
        modifiedRows: 87,
        deletedRows: 23,
        unchangedRows: 1245,
      };

      setResults(mockResults);
      toast.success("Comparison completed successfully!");
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
              label="New/Latest File"
              onFileSelect={setNewFile}
              selectedFile={newFile}
            />
            <FileDropzone
              label="Old File"
              onFileSelect={setOldFile}
              selectedFile={oldFile}
            />
          </CardContent>
        </Card>

        {/* Configuration Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>2. Configuration Settings</CardTitle>
            <CardDescription>
              Specify comparison parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="keyColumn">Key Column Name *</Label>
              <Input
                id="keyColumn"
                placeholder="e.g., ID, ProductCode, Email"
                value={keyColumn}
                onChange={(e) => setKeyColumn(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                The column used to match rows between files
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sheetName">Sheet Name (Optional)</Label>
              <Input
                id="sheetName"
                placeholder="e.g., Sheet1, Data"
                value={sheetName}
                onChange={(e) => setSheetName(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Leave empty to use the first sheet
              </p>
            </div>

            <Separator className="my-6" />

            <Button
              onClick={handleRunComparison}
              disabled={isProcessing || !newFile || !oldFile || !keyColumn.trim()}
              size="lg"
              className="w-full"
            >
              <PlayCircle className="w-5 h-5 mr-2" />
              {isProcessing ? "Processing..." : "Run Comparison"}
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
