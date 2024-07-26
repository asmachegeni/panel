export interface ILogin {
  email: string;
  password: string;
}

export const validate = (values: ILogin) => {
  const errors: Partial<Record<keyof ILogin, string>> = {};

  if (!values.password) {
    errors.password = "Password is required";
  } else if (!/^[0-9A-Z a-z \@ \# \$ \% ]{6,100}$/.test(values.password)) {
    errors.password =
      "رمزعبور باید بیشتر از 6 کاراکتر باشد و شامل عدد و حروف فارسی نباشد";
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
