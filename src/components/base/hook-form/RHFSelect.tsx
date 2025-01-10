import React, { ReactNode } from "react";
import { Select, SelectItem, SelectProps } from "@nextui-org/react";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";

type RHFSelectPropTypes = {
    name: string;
    children: ReactNode;
    label?: string;
} & Partial<ControllerProps> &
    Partial<SelectProps>;

export default function RHFSelect({ name, children, ...other }: RHFSelectPropTypes) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => {
                return (
                    <div className="flex w-full max-w-full flex-col gap-2">
                        <Select
                            classNames={{
                                trigger: "bg-white border-1 border-[#EEEEEE] rounded-lg",
                            }}
                            {...field}
                            // defaultSelectedKeys={field.value || []}
                            errorMessage={error?.message}
                            isInvalid={!!error?.message}
                            {...other}
                        >
                            {children ? children : <SelectItem key="option1" value="option1"></SelectItem>}
                        </Select>
                    </div>
                );
            }}
        />
    );
}
