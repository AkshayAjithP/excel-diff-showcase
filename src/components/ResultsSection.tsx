import { Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComparisonResult {
  useCaseId: string;
  useCaseName: string;
  totalRecords: number;
  unchanged: number;
  changed: number;
  newRecord: number;
  multipleMatches: number;
}

interface ResultsSectionProps {
  results: ComparisonResult[];
  onDownload: () => void;
  isDownloading?: boolean;
}

export const ResultsSection = ({ results, onDownload, isDownloading }: ResultsSectionProps) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <CardTitle>Batch Comparison Complete</CardTitle>
          </div>
          <CardDescription>
            All use cases have been successfully processed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {results.map((result, index) => {
            const summaryData = [
              { label: "Total Records", value: result.totalRecords },
              { label: "Unchanged", value: result.unchanged },
              { label: "To be updated in cloud (Changed)", value: result.changed },
              { label: "To be updated in cloud (New Record)", value: result.newRecord },
              { label: "Deep dive review and update (Multiple Matches)", value: result.multipleMatches },
            ];

            return (
              <div key={result.useCaseId}>
                {index > 0 && <div className="border-t pt-6" />}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    {result.useCaseName}
                  </h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Metric</TableHead>
                        <TableHead className="text-right font-semibold">Count</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {summaryData.map((item) => (
                        <TableRow key={item.label}>
                          <TableCell className="font-medium">{item.label}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {item.value.toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            );
          })}

          <div className="mt-6 flex justify-center pt-4 border-t">
            <Button
              onClick={onDownload}
              disabled={isDownloading}
              size="lg"
              className="min-w-[200px]"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download All Reports"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
