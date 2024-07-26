export interface IPerson {
  email: string;
  name: string;
  lastname: string;
  callerId: string | number;
}
export const validate = (values: IPerson) => {
  const errors: Partial<Record<keyof IPerson, string>> = {};

  if (!values.name) {
    errors.name = "نام باید وارد شود";
  } else if (values.name.length > 200) {
    errors.name = "نام نباید بیشتر از 200 کاراکتر باشد";
  }

  if (!values.lastname) {
    errors.lastname = "نام خانوادگی باید وارد شود";
  } else if (values.lastname.length > 200) {
    errors.lastname = "نام خانوادگی نباید بیشتر از 200 کاراکتر باشد";
  }
 if (isNaN(Number(values.callerId))) {
    errors.callerId = "caller_id  باید عدد باشد ";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (
    !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
  ) {
    errors.email = "ایمیل وارد شده معتبر نیست";
  }

  return errors;
};
