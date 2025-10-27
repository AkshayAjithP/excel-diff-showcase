import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ColumnRenaming } from "./ColumnRenaming";
import { FileDropzone } from "./FileDropzone";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X, Upload, Settings, Filter, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

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
  const isComplete = !!(
    config.useCaseName.trim() &&
    config.newFile &&
    config.oldFile &&
    config.latestSheetName.trim() &&
    config.oldSheetName.trim() &&
    config.primaryKeys.trim()
  );

  return (
    <TooltipProvider>
      <Accordion type="single" collapsible defaultValue={`item-${config.id}`}>
        <AccordionItem 
          value={`item-${config.id}`} 
          className="border-2 border-border rounded-lg px-4 shadow-sm hover:shadow-md transition-smooth bg-card"
        >
          <AccordionTrigger className="text-left hover:no-underline">
            <div className="flex items-center gap-3 w-full pr-4">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-lg font-semibold text-foreground">
                  Use Case {index + 1}
                </span>
                {config.useCaseName && (
                  <>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-sm text-muted-foreground truncate max-w-xs">
                      {config.useCaseName}
                    </span>
                  </>
                )}
              </div>
              {isComplete && (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready
                </Badge>
              )}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6 pt-6">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRemove}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove Use Case
                </Button>
              </div>

              {/* Step 1: Basic Information */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    1
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Basic Information</h4>
                </div>
                
                <div className="space-y-2 pl-10">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`useCaseName-${config.id}`}>Use Case Name *</Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">A descriptive name for this comparison. Used to identify output files.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id={`useCaseName-${config.id}`}
                    placeholder="e.g., Q4_Sales_Comparison, Customer_Data_Update"
                    value={config.useCaseName}
                    onChange={(e) => onChange({ ...config, useCaseName: e.target.value })}
                    className="w-full"
                  />
                </div>
              </div>

              <Separator />

              {/* Step 2: Upload Files */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    2
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Upload Files</h4>
                  <Upload className="w-4 h-4 text-primary ml-auto" />
                </div>
                
                <div className="space-y-4 pl-10">
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
                </div>
              </div>

              <Separator />

              {/* Step 3: Configure Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                    3
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Configure Settings</h4>
                  <Settings className="w-4 h-4 text-primary ml-auto" />
                </div>
                
                <div className="space-y-4 pl-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`latestSheetName-${config.id}`}>Latest File Sheet Name *</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The name of the sheet/tab in your new file to compare.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <Input
                        id={`latestSheetName-${config.id}`}
                        placeholder="e.g., Sheet1, Data"
                        value={config.latestSheetName}
                        onChange={(e) => onChange({ ...config, latestSheetName: e.target.value })}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`oldSheetName-${config.id}`}>Old File Sheet Name *</Label>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="max-w-xs">The name of the sheet/tab in your old file to compare.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
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
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`primaryKeys-${config.id}`}>Primary Key(s) *</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Columns used to match rows between files. For multiple keys, separate with commas (e.g., ID, ProductCode).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea
                      id={`primaryKeys-${config.id}`}
                      placeholder="Enter comma-separated key columns, e.g., ID, ProductCode"
                      value={config.primaryKeys}
                      onChange={(e) => onChange({ ...config, primaryKeys: e.target.value })}
                      className="w-full min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Step 4: Advanced Options (Optional) */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-semibold">
                    4
                  </div>
                  <h4 className="text-base font-semibold text-foreground">Advanced Options</h4>
                  <Filter className="w-4 h-4 text-muted-foreground ml-auto" />
                  <Badge variant="outline" className="text-xs">Optional</Badge>
                </div>
                
                <div className="space-y-4 pl-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`columnsToSkip-${config.id}`}>Columns to Skip in Comparison</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Columns that should be excluded from comparison (e.g., timestamps, audit fields).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Textarea
                      id={`columnsToSkip-${config.id}`}
                      placeholder="Enter comma-separated column names, e.g., LastModified, CreatedDate"
                      value={config.columnsToSkip}
                      onChange={(e) => onChange({ ...config, columnsToSkip: e.target.value })}
                      className="w-full min-h-[80px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor={`filterColumn-${config.id}`}>Filter Column</Label>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-muted-foreground cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="max-w-xs">Column used to create additional filtered output sheets (e.g., by Region or Status).</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <Input
                      id={`filterColumn-${config.id}`}
                      placeholder="e.g., Region, Status"
                      value={config.filterColumn}
                      onChange={(e) => onChange({ ...config, filterColumn: e.target.value })}
                      className="w-full"
                    />
                  </div>

                  <ColumnRenaming
                    pairs={config.columnRenames}
                    onChange={(pairs) => onChange({ ...config, columnRenames: pairs })}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TooltipProvider>
  );
};
