import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { UseCaseConfig, UseCaseConfiguration } from "./UseCaseConfig";

interface MultiUseCaseConfigurationProps {
  configs: UseCaseConfiguration[];
  onConfigsChange: (configs: UseCaseConfiguration[]) => void;
}

export const MultiUseCaseConfiguration = ({
  configs,
  onConfigsChange,
}: MultiUseCaseConfigurationProps) => {
  const addNewUseCase = () => {
    const newConfig: UseCaseConfiguration = {
      id: crypto.randomUUID(),
      useCaseName: "",
      latestSheetName: "",
      oldSheetName: "",
      primaryKeys: "",
      columnsToSkip: "",
      filterColumn: "",
      columnRenames: [],
    };
    onConfigsChange([...configs, newConfig]);
  };

  const updateConfig = (updatedConfig: UseCaseConfiguration) => {
    onConfigsChange(
      configs.map((config) =>
        config.id === updatedConfig.id ? updatedConfig : config
      )
    );
  };

  const removeConfig = (id: string) => {
    onConfigsChange(configs.filter((config) => config.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>2. Multi-Use Case Configuration</CardTitle>
            <CardDescription>
              Configure multiple use cases for batch processing
            </CardDescription>
          </div>
          <Button onClick={addNewUseCase} size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Use Case
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {configs.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No use cases configured yet.</p>
            <p className="text-sm">Click "Add Use Case" to get started.</p>
          </div>
        ) : (
          configs.map((config, index) => (
            <UseCaseConfig
              key={config.id}
              config={config}
              onUpdate={updateConfig}
              onRemove={removeConfig}
              index={index}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
