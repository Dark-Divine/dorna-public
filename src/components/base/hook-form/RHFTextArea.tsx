import { Textarea, TextAreaProps } from "@nextui-org/react";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";

type RHFTextFieldPropTypes = {
  name: string;
  label?: string;
} & Partial<ControllerProps> &
  Partial<TextAreaProps>;

export default function RHFTextArea({ name, ...other }: RHFTextFieldPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Textarea
            classNames={{
              input: "overflow-y-scroll",
              inputWrapper:
                "border-zinc-300 border-1 group-data-[focus=true]:border-zinc-500 overflow-scroll",
                innerWrapper:"overflow-scroll"
            }}
            radius="sm"
            className="max-w-xs overflow-scroll"
            {...field}
            errorMessage={error?.message}
            isInvalid={!!error?.message}
            {...other}
          />
        );
      }}
    />
  );
}
