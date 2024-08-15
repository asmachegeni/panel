export interface IPlace {
  name: string;
  caller_id: number | string;
  building: string;
  floor: string;
  room_number: string;
  description: string;
}
export const validate = (values: IPlace) => {
  const errors: Partial<Record<keyof IPlace, string>> = {};
  if (isNaN(Number(values.caller_id))) {
    errors.caller_id = "caller_id  باید عدد باشد ";
  }
  if (Number(values.caller_id) < 1000 || Number(values.caller_id) > 9999) {
    errors.caller_id = "The caller id field must be between 1000 and 9999.";
  }
  return errors;
};
