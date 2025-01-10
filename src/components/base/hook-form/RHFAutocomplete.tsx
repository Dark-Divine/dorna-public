import React, { ReactNode } from "react";
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
  Select,
  SelectItem,
  SelectProps,
} from "@nextui-org/react";
import { useFormContext, Controller, ControllerProps } from "react-hook-form";
import {label} from "framer-motion/m";

type RHFSelectPropTypes = {
  name: string;
  children: ReactNode;
  label?: string;
} & Partial<ControllerProps> &
  Partial<AutocompleteProps>;

export default function RHFAutoComplete({
  name,
  children,
                                            label,
  ...other
}: RHFSelectPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <div className="flex w-full max-w-full flex-col gap-2">
            <Autocomplete
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
              {...other}
              label="Favorite Animal"
              placeholder="Search an animal"
              className="max-w-xs"
            >
              {children ? (
                children
              ) : (
                <AutocompleteItem
                  key="option1"
                  value="option1"
                ></AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        );
      }}
    />
  );
}
