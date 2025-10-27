import { UseCaseConfig, UseCaseConfiguration } from "./UseCaseConfig";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface MultiUseCaseConfigurationProps {
  configs: UseCaseConfiguration[];
  onChange: (configs: UseCaseConfiguration[]) => void;
}

export const MultiUseCaseConfiguration = ({ configs, onChange }: MultiUseCaseConfigurationProps) => {
  const addUseCase = () => {
    const newConfig: UseCaseConfiguration = {
      id: `usecase-${Date.now()}`,
      useCaseName: "",
      newFile: null,
      oldFile: null,
      latestSheetName: "",
      oldSheetName: "",
      primaryKeys: "",
      columnsToSkip: "",
      filterColumn: "",
      columnRenames: [],
    };
    onChange([...configs, newConfig]);
  };

  const updateUseCase = (index: number, updatedConfig: UseCaseConfiguration) => {
    const newConfigs = [...configs];
    newConfigs[index] = updatedConfig;
    onChange(newConfigs);
  };

  const removeUseCase = (index: number) => {
    if (configs.length === 1) return; // Keep at least one
    const newConfigs = configs.filter((_, i) => i !== index);
    onChange(newConfigs);
  };

  return (
    <div className="space-y-6">
      {configs.map((config, index) => (
        <UseCaseConfig
          key={config.id}
          config={config}
          onChange={(updatedConfig) => updateUseCase(index, updatedConfig)}
          onRemove={() => removeUseCase(index)}
          index={index}
        />
      ))}
      
      <Button
        onClick={addUseCase}
        variant="outline"
        className="w-full h-12 text-base hover-scale transition-smooth border-2 border-dashed hover:border-primary hover:bg-primary/5"
        type="button"
      >
        <Plus className="w-5 h-5 mr-2" />
        Add Another Use Case
      </Button>
    </div>
  );
};
