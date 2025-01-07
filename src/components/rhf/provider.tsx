import { type ComponentProps } from "react";
import {
  FormProvider,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";
import { cn } from "@nextui-org/react";

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  fieldset?: ComponentProps<"fieldset">;
  onSubmit: VoidFunction;
} & ComponentProps<"form">;

export const RHFProvider = <T extends FieldValues>(props: Props<T>) => {
  const { children, methods, loading, disabled, onSubmit, fieldset, ...other } =
    props;
  return (
    <FormProvider {...methods}>
      <form
        onSubmit={onSubmit}
        {...other}
      >
        <fieldset
          disabled={loading || disabled}
          className={cn("flex flex-col gap-6", fieldset?.className)}
          {...fieldset}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
};
