
import React from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea';
  className?: string;
  required?: boolean;
}

export function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = 'text',
  className,
  required = false
}: FormFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className={cn("space-y-2", className)}>
          <Label htmlFor={name} className={error ? "text-destructive" : ""}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </Label>
          {type === 'textarea' ? (
            <Textarea
              {...field}
              id={name}
              placeholder={placeholder}
              className={error ? "border-destructive" : ""}
              rows={4}
            />
          ) : (
            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              className={error ? "border-destructive" : ""}
            />
          )}
          {error && (
            <p className="text-sm font-medium text-destructive">
              {error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
