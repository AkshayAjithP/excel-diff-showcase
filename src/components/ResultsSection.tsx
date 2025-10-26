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
  totalRecords: number;
  unchanged: number;
  changed: number;
  newRecord: number;
  multipleMatches: number;
}

interface ResultsSectionProps {
  results: ComparisonResult;
  onDownload: () => void;
  isDownloading?: boolean;
}

export const ResultsSection = ({ results, onDownload, isDownloading }: ResultsSectionProps) => {
  const summaryData = [
    { label: "Total Records", value: results.totalRecords },
    { label: "Unchanged", value: results.unchanged },
    { label: "To be updated in cloud (Changed)", value: results.changed },
    { label: "To be updated in cloud (New Record)", value: results.newRecord },
    { label: "Deep dive review and update (Multiple Matches)", value: results.multipleMatches },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <CardTitle>Comparison Complete</CardTitle>
          </div>
          <CardDescription>
            File comparison has been successfully processed
          </CardDescription>
        </CardHeader>
        <CardContent>
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

          <div className="mt-6 flex justify-center">
            <Button
              onClick={onDownload}
              disabled={isDownloading}
              size="lg"
              className="min-w-[200px]"
            >
              <Download className="w-4 h-4 mr-2" />
              {isDownloading ? "Downloading..." : "Download Report"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
