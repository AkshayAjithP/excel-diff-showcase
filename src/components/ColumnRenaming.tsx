import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ColumnRenamePair {
  id: string;
  oldName: string;
  newName: string;
}

interface ColumnRenamingProps {
  pairs: ColumnRenamePair[];
  onChange: (pairs: ColumnRenamePair[]) => void;
}

export const ColumnRenaming = ({ pairs, onChange }: ColumnRenamingProps) => {
  const addPair = () => {
    const newPair: ColumnRenamePair = {
      id: crypto.randomUUID(),
      oldName: "",
      newName: "",
    };
    onChange([...pairs, newPair]);
  };

  const removePair = (id: string) => {
    onChange(pairs.filter(pair => pair.id !== id));
  };

  const updatePair = (id: string, field: "oldName" | "newName", value: string) => {
    onChange(
      pairs.map(pair =>
        pair.id === id ? { ...pair, [field]: value } : pair
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Column Renaming (Optional)</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addPair}
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Pair
        </Button>
      </div>
      
      {pairs.length === 0 ? (
        <p className="text-xs text-muted-foreground">
          No column renames configured. Click "Add Pair" to start.
        </p>
      ) : (
        <div className="space-y-3">
          {pairs.map((pair, index) => (
            <div key={pair.id} className="flex gap-2 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  placeholder="Old column name"
                  value={pair.oldName}
                  onChange={(e) => updatePair(pair.id, "oldName", e.target.value)}
                  className="w-full"
                />
                <Input
                  placeholder="New column name"
                  value={pair.newName}
                  onChange={(e) => updatePair(pair.id, "newName", e.target.value)}
                  className="w-full"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removePair(pair.id)}
                className="mt-1 flex-shrink-0"
                aria-label="Remove pair"
              >
                <Trash2 className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
