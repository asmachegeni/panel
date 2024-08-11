export interface IPositions {
  title: string;
  caller_id: string | number;
}
export const validate = (values: IPositions) => {
  const errors: Partial<Record<keyof IPositions, string>> = {};
  if (isNaN(Number(values.caller_id))) {
    errors.caller_id = "caller_id  باید عدد باشد ";
  }
  if (Number(values.caller_id) < 1000 || Number(values.caller_id) > 99999) {
    errors.caller_id = "The caller id field must be between 1000 and 9999.";
  }

  return errors;
};
