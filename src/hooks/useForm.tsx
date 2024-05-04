import { useReducer } from "react";

const useForm = () => {
  const ChangeInputsHandler = (state: any, action: any) => {
    switch (action.type) {
      case "EMAIL": {
        return {
          ...state,
          email: {
            value: action.field,
            isValid: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
              action.field
            ),
          },
        };
      }
      case "NAME": {
        return {
          ...state,
          name: {
            value: action.field,
            isValid: true,
          },
        };
      }
      case "PASSWORD": {
        return {
          ...state,
          password: {
            value: action.field,
            isValid: /^[0-9A-Z a-z \@ \# \$ \% ]{6,100}$/.test(action.field),
          },
        };
      }
      default: {
        return state;
      }
    }
  };
  const [inputs, dispatch] = useReducer(ChangeInputsHandler, {
    name: { value: "", isValid: true },
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });
  return [inputs, dispatch];
};
export default useForm;
