import {
  Controller,
  useFormContext,
  type FieldName,
  type FieldValues,
} from "react-hook-form";
import { Input, type InputProps } from "@nextui-org/input";

type Props<T extends FieldValues> = {
  name: FieldName<T>;
} & InputProps;

export const RHFInput = <T extends FieldValues>(props: Props<T>) => {
  const { name, ...other } = props;
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          fullWidth
          variant="bordered"
          isInvalid={!!error}
          errorMessage={error?.message}
          {...other}
        />
      )}
    />
  );
};
