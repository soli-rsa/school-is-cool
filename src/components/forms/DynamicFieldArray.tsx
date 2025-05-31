
import React from "react";
import { useFieldArray, Control, FieldPath, FieldValues } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";

interface DynamicFieldArrayProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  children: (field: any, index: number, remove: (index: number) => void) => React.ReactNode;
  addButtonText: string;
  emptyMessage: string;
  defaultValue?: any;
}

export function DynamicFieldArray<T extends FieldValues>({
  control,
  name,
  children,
  addButtonText,
  emptyMessage,
  defaultValue = {}
}: DynamicFieldArrayProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  const handleAdd = () => {
    append(defaultValue as any);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">
          {addButtonText.replace('Add ', '')}
        </h3>
        <Button onClick={handleAdd} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          {addButtonText}
        </Button>
      </div>

      {fields.length === 0 && (
        <p className="text-center text-muted-foreground py-4">
          {emptyMessage}
        </p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className="border rounded-md p-4 relative">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2"
            onClick={() => remove(index)}
          >
            <Trash className="h-4 w-4 text-destructive" />
            <span className="sr-only">Remove</span>
          </Button>
          {children(field, index, remove)}
        </div>
      ))}
    </div>
  );
}
