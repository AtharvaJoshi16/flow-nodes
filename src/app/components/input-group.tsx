import { Input } from "@/components/ui/input";
import { useState } from "react";
import { FieldProps } from "./nodes/schema";

export const InputGroup = ({ field, onChange }) => {
  const [values, setValues] = useState<FieldProps>(field);
  const handleBlur = (e, fieldName: string) => {
    const copy = { ...values };
    console.log(e.target.value, copy[fieldName]);
    copy[fieldName] = e.target.value;
    setValues(copy);
    onChange?.(copy);
  };

  const handleValueChange = (e, fieldName: string) => {
    const copy = { ...values };
    console.log(e.target.value, copy[fieldName]);
    copy[fieldName] = e.target.value;
    setValues(copy);
  };

  return (
    <div className="flex gap-[4px] p-1">
      <Input
        value={values?.label}
        onChange={(e) => handleValueChange(e, "label")}
        onBlur={(e) => handleBlur(e, "label")}
        id={`${field?.label}-${field?.id}`}
        key={`${field?.label}-${field?.id}`}
        placeholder="Field name"
      />
      <Input
        value={values?.type}
        onChange={(e) => handleValueChange(e, "type")}
        onBlur={(e) => handleBlur(e, "type")}
        id={`${field?.type}-${field?.id}`}
        key={`${field?.type}-${field?.id}`}
        placeholder="Field Value"
      />
    </div>
  );
};
