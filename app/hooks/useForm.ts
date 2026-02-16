import {
  useForm as useReactHookForm,
  UseFormProps,
  FieldValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useForm<T extends FieldValues>(
  schema: any,
  options?: Omit<UseFormProps<T>, "resolver">,
) {
  return useReactHookForm<T>({
    ...options,
    resolver: zodResolver(schema),
    mode: "onChange",
  });
}
