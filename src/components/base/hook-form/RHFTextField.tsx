import { Input, InputProps } from "@nextui-org/react";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";

type RHFTextFieldPropTypes = {
    name: string;
    label?: string;
} & Partial<ControllerProps> &
    Partial<InputProps>;

export default function RHFInput({ name, ...other }: RHFTextFieldPropTypes) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <Input
                        defaultValue={field.value}
                        classNames={{
                            inputWrapper:
                                "bg-white border-1 border-[#EEEEEE] rounded-lg data-[hover=true]:bg-zinc-50 group-data-[focus=true]:bg-zinc-50",
                        }}
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
