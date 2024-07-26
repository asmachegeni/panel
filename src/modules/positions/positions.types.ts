export interface IPositions {
  title: string;
  caller_id: string | number;
}
export const validate = (values: IPositions) => {
  const errors: Partial<Record<keyof IPositions, string>> = {};
  if (isNaN(Number(values.caller_id))) {
    errors.caller_id = "caller_id  باید عدد باشد ";
  }

  return errors;
};
