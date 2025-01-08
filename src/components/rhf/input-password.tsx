import {
  Controller,
  useFormContext,
  type FieldName,
  type FieldValues,
} from "react-hook-form";
import { Input, type InputProps } from "@nextui-org/input";

import { SolarIcon } from "@/config/icons";

type Props<T extends FieldValues> = {
  name: FieldName<T>;
  showPassword?: boolean;
  handleTogglePassword?: () => void;
} & InputProps;

export const RHFPassword = <T extends FieldValues>(props: Props<T>) => {
  const { name, showPassword, handleTogglePassword, ...other } = props;
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
          type={showPassword ? "text" : "password"}
          isInvalid={!!error}
          errorMessage={error?.message}
          endContent={
            <button
              type="button"
              aria-label="toggle password visibility"
              className="focus:outline-none"
              onClick={handleTogglePassword}
            >
              {showPassword ? <SolarIcon.EyeClosed /> : <SolarIcon.Eye />}
            </button>
          }
          {...other}
        />
      )}
    />
  );
};
