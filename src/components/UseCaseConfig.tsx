import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ColumnRenaming } from "./ColumnRenaming";
import { FileDropzone } from "./FileDropzone";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface ColumnRenamePair {
  id: string;
  oldName: string;
  newName: string;
}

export interface UseCaseConfiguration {
  id: string;
  useCaseName: string;
  newFile: File | null;
  oldFile: File | null;
  latestSheetName: string;
  oldSheetName: string;
  primaryKeys: string;
  columnsToSkip: string;
  filterColumn: string;
  columnRenames: ColumnRenamePair[];
}

interface UseCaseConfigProps {
  config: UseCaseConfiguration;
  onChange: (config: UseCaseConfiguration) => void;
  onRemove: () => void;
  index: number;
}

export const UseCaseConfig = ({ config, onChange, onRemove, index }: UseCaseConfigProps) => {
  return (
    <Accordion type="single" collapsible defaultValue={`item-${config.id}`}>
      <AccordionItem value={`item-${config.id}`}>
        <AccordionTrigger className="text-left">
          <div className="flex items-center justify-between w-full pr-4">
            <span className="font-semibold">
              Use Case {index + 1}: {config.useCaseName || "Unnamed"}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4 pt-4">
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4 mr-1" />
                Remove
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor={`useCaseName-${config.id}`}>Use Case Name *</Label>
              <Input
                id={`useCaseName-${config.id}`}
                placeholder="e.g., Q4_Sales_Comparison"
                value={config.useCaseName}
                onChange={(e) => onChange({ ...config, useCaseName: e.target.value })}
                className="w-full"
              />
            </div>

            <Separator className="my-4" />

            <FileDropzone
              label="New/Latest File *"
              onFileSelect={(file) => onChange({ ...config, newFile: file })}
              selectedFile={config.newFile}
            />
            <FileDropzone
              label="Old File *"
              onFileSelect={(file) => onChange({ ...config, oldFile: file })}
              selectedFile={config.oldFile}
            />

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor={`latestSheetName-${config.id}`}>Latest File Sheet Name *</Label>
                  <Input
                    id={`latestSheetName-${config.id}`}
                    placeholder="e.g., Sheet1, Data"
                    value={config.latestSheetName}
                    onChange={(e) => onChange({ ...config, latestSheetName: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`oldSheetName-${config.id}`}>Old File Sheet Name *</Label>
                  <Input
                    id={`oldSheetName-${config.id}`}
                    placeholder="e.g., Sheet1, Data"
                    value={config.oldSheetName}
                    onChange={(e) => onChange({ ...config, oldSheetName: e.target.value })}
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
                  onChange={(e) => onChange({ ...config, primaryKeys: e.target.value })}
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
                  onChange={(e) => onChange({ ...config, columnsToSkip: e.target.value })}
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
                  onChange={(e) => onChange({ ...config, filterColumn: e.target.value })}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Column used to create additional filtered output sheets
                </p>
              </div>

              <ColumnRenaming
                pairs={config.columnRenames}
                onChange={(pairs) => onChange({ ...config, columnRenames: pairs })}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
