import { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileDropzoneProps {
  label: string;
  onFileSelect: (file: File | null) => void;
  accept?: string;
  selectedFile?: File | null;
}

export const FileDropzone = ({ 
  label, 
  onFileSelect, 
  accept = ".xlsx,.xls,.csv",
  selectedFile 
}: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  }, [onFileSelect]);

  const handleRemove = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      
      {selectedFile ? (
        <div className="flex items-center gap-3 p-4 bg-muted rounded-lg border border-border">
          <FileSpreadsheet className="w-5 h-5 text-primary flex-shrink-0" />
          <span className="text-sm text-foreground truncate flex-1">{selectedFile.name}</span>
          <button
            onClick={handleRemove}
            className="p-1 hover:bg-background rounded transition-smooth"
            aria-label="Remove file"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative border-2 border-dashed rounded-lg p-8 transition-smooth cursor-pointer",
            "hover:border-primary hover:bg-muted/50",
            isDragging ? "border-primary bg-muted/50" : "border-border"
          )}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2 text-center">
            <Upload className="w-8 h-8 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Drop file here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supports: Excel (.xlsx, .xls) and CSV files
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
