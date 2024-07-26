import { useEffect, useState } from "react";

type ValidationFunction<T> = (values: T) => Partial<Record<keyof T, string>>;

const useForm = <T>(initialValues: T, validate: ValidationFunction<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit =
    (callback: (values: T) => void) =>
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validationErrors = validate(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
        callback(values);
      }
    };

  return { values, errors, handleChange, handleSubmit };
};

export default useForm;
