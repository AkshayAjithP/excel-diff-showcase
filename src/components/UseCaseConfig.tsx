import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ColumnRenaming } from "@/components/ColumnRenaming";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";

export interface ColumnRenamePair {
  id: string;
  oldName: string;
  newName: string;
}

export interface UseCaseConfiguration {
  id: string;
  useCaseName: string;
  latestSheetName: string;
  oldSheetName: string;
  primaryKeys: string;
  columnsToSkip: string;
  filterColumn: string;
  columnRenames: ColumnRenamePair[];
}

interface UseCaseConfigProps {
  config: UseCaseConfiguration;
  onUpdate: (config: UseCaseConfiguration) => void;
  onRemove: (id: string) => void;
  index: number;
}

export const UseCaseConfig = ({ config, onUpdate, onRemove, index }: UseCaseConfigProps) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  const updateField = (field: keyof UseCaseConfiguration, value: string | ColumnRenamePair[]) => {
    onUpdate({ ...config, [field]: value });
  };

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg">
      <div className="flex items-center justify-between p-4 bg-muted/30">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 p-0 hover:bg-transparent">
            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span className="font-semibold">
              Use Case #{index + 1}: {config.useCaseName || "Untitled"}
            </span>
          </Button>
        </CollapsibleTrigger>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(config.id)}
          aria-label="Remove use case"
        >
          <Trash2 className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>

      <CollapsibleContent className="p-4 space-y-4">
        <div className="space-y-2">
          <Label htmlFor={`useCaseName-${config.id}`}>Use Case Name *</Label>
          <Input
            id={`useCaseName-${config.id}`}
            placeholder="e.g., Q4_Sales_Comparison"
            value={config.useCaseName}
            onChange={(e) => updateField("useCaseName", e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            This name is used to generate the output files
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`latestSheetName-${config.id}`}>Latest File Sheet Name *</Label>
            <Input
              id={`latestSheetName-${config.id}`}
              placeholder="e.g., Sheet1, Data"
              value={config.latestSheetName}
              onChange={(e) => updateField("latestSheetName", e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`oldSheetName-${config.id}`}>Old File Sheet Name *</Label>
            <Input
              id={`oldSheetName-${config.id}`}
              placeholder="e.g., Sheet1, Data"
              value={config.oldSheetName}
              onChange={(e) => updateField("oldSheetName", e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`primaryKeys-${config.id}`}>Primary Key(s) *</Label>
          <Textarea
            id={`primaryKeys-${config.id}`}
            placeholder="Enter comma-separated key columns, e.g., ID, ProductCode"
            value={config.primaryKeys}
            onChange={(e) => updateField("primaryKeys", e.target.value)}
            className="w-full min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            The column(s) used to match rows between files (comma-separated)
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`columnsToSkip-${config.id}`}>Columns to Skip in Comparison</Label>
          <Textarea
            id={`columnsToSkip-${config.id}`}
            placeholder="Enter comma-separated column names to skip, e.g., LastModified, CreatedDate"
            value={config.columnsToSkip}
            onChange={(e) => updateField("columnsToSkip", e.target.value)}
            className="w-full min-h-[80px]"
          />
          <p className="text-xs text-muted-foreground">
            Optional: Columns that should be excluded from comparison
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`filterColumn-${config.id}`}>Filter Column</Label>
          <Input
            id={`filterColumn-${config.id}`}
            placeholder="e.g., Region, Status"
            value={config.filterColumn}
            onChange={(e) => updateField("filterColumn", e.target.value)}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            Optional: Column used to create additional filtered output sheets
          </p>
        </div>

        <ColumnRenaming
          pairs={config.columnRenames}
          onChange={(pairs) => updateField("columnRenames", pairs)}
        />
      </CollapsibleContent>
    </Collapsible>
  );
};
