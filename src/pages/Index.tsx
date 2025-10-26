import { useState } from "react";
import { FileDropzone } from "@/components/FileDropzone";
import { AlertBanner } from "@/components/AlertBanner";
import { ResultsSection } from "@/components/ResultsSection";
import { ColumnRenaming } from "@/components/ColumnRenaming";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { FileSpreadsheet, PlayCircle } from "lucide-react";
import { toast } from "sonner";

interface ComparisonResult {
  totalRecords: number;
  unchanged: number;
  changed: number;
  newRecord: number;
  multipleMatches: number;
}

interface ColumnRenamePair {
  id: string;
  oldName: string;
  newName: string;
}

const Index = () => {
  const [newFile, setNewFile] = useState<File | null>(null);
  const [oldFile, setOldFile] = useState<File | null>(null);
  const [useCaseName, setUseCaseName] = useState("");
  const [latestSheetName, setLatestSheetName] = useState("");
  const [oldSheetName, setOldSheetName] = useState("");
  const [primaryKeys, setPrimaryKeys] = useState("");
  const [columnsToSkip, setColumnsToSkip] = useState("");
  const [filterColumn, setFilterColumn] = useState("");
  const [columnRenames, setColumnRenames] = useState<ColumnRenamePair[]>([]);
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

    if (!useCaseName.trim()) {
      setError("Please enter a use case name");
      return;
    }

    if (!latestSheetName.trim() || !oldSheetName.trim()) {
      setError("Please enter both latest and old file sheet names");
      return;
    }

    if (!primaryKeys.trim()) {
      setError("Please enter at least one primary key");
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
        totalRecords: 1500,
        unchanged: 1245,
        changed: 87,
        newRecord: 145,
        multipleMatches: 23,
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
            <div className="space-y-2">
              <Label htmlFor="useCaseName">Use Case Name *</Label>
              <Input
                id="useCaseName"
                placeholder="e.g., Q4_Sales_Comparison"
                value={useCaseName}
                onChange={(e) => setUseCaseName(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                This name is used to generate the output files
              </p>
            </div>

            <Separator />

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

        {/* Configuration Settings Card */}
        <Card>
          <CardHeader>
            <CardTitle>2. Configuration Settings</CardTitle>
            <CardDescription>
              Specify comparison parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="latestSheetName">Latest File Sheet Name *</Label>
                <Input
                  id="latestSheetName"
                  placeholder="e.g., Sheet1, Data"
                  value={latestSheetName}
                  onChange={(e) => setLatestSheetName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="oldSheetName">Old File Sheet Name *</Label>
                <Input
                  id="oldSheetName"
                  placeholder="e.g., Sheet1, Data"
                  value={oldSheetName}
                  onChange={(e) => setOldSheetName(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="primaryKeys">Primary Key(s) *</Label>
              <Textarea
                id="primaryKeys"
                placeholder="Enter comma-separated key columns, e.g., ID, ProductCode"
                value={primaryKeys}
                onChange={(e) => setPrimaryKeys(e.target.value)}
                className="w-full min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                The column(s) used to match rows between files (comma-separated)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="columnsToSkip">Columns to Skip in Comparison</Label>
              <Textarea
                id="columnsToSkip"
                placeholder="Enter comma-separated column names to skip, e.g., LastModified, CreatedDate"
                value={columnsToSkip}
                onChange={(e) => setColumnsToSkip(e.target.value)}
                className="w-full min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Columns that should be excluded from comparison
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="filterColumn">Filter Column</Label>
              <Input
                id="filterColumn"
                placeholder="e.g., Region, Status"
                value={filterColumn}
                onChange={(e) => setFilterColumn(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Optional: Column used to create additional filtered output sheets
              </p>
            </div>

            <ColumnRenaming
              pairs={columnRenames}
              onChange={setColumnRenames}
            />

            <Separator className="my-6" />

            <Button
              onClick={handleRunComparison}
              disabled={
                isProcessing || 
                !newFile || 
                !oldFile || 
                !useCaseName.trim() ||
                !latestSheetName.trim() ||
                !oldSheetName.trim() ||
                !primaryKeys.trim()
              }
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
