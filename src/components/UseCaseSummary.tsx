import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { UseCaseConfiguration } from "./UseCaseConfig";

interface UseCaseSummaryProps {
  configs: UseCaseConfiguration[];
}

export const UseCaseSummary = ({ configs }: UseCaseSummaryProps) => {
  const validConfigs = configs.filter(
    c => c.newFile && 
         c.oldFile && 
         c.useCaseName.trim() && 
         c.latestSheetName.trim() && 
         c.oldSheetName.trim() && 
         c.primaryKeys.trim()
  );

  return (
    <Card className="border-2 border-primary/20 bg-card shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <CheckCircle2 className="w-5 h-5 text-primary" />
          Summary: Ready to Execute
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total Use Cases Configured:</span>
          <Badge variant="secondary" className="text-base px-3 py-1">
            {validConfigs.length} of {configs.length}
          </Badge>
        </div>
        
        {validConfigs.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Ready Use Cases:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {validConfigs.map((config) => (
                <div
                  key={config.id}
                  className="flex items-center gap-2 p-2 bg-muted/50 rounded-md border border-border"
                >
                  <FileSpreadsheet className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {config.useCaseName}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {validConfigs.length === 0 && (
          <p className="text-sm text-muted-foreground italic text-center py-2">
            No use cases fully configured yet. Complete at least one use case to run comparisons.
          </p>
        )}
      </CardContent>
    </Card>
  );
};
