import {
  Button,
  CssBaseline,
  CircularProgress,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import img from "./../assets/img/login.svg";
import useForm from "../hooks/useForm";
import AuthService from "../services/auth.service";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import AuthContext from "../contexts/authcontext/authContext";
const Register: React.FC = () => {
  const theme = useTheme();
  const [inputs, dispatch] = useForm();
  const [isPending, setIsPending] = useState<boolean>(false);
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  return (
    <>
      <CssBaseline />
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Grid
        container
        style={{
          width: "100%",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
        justifyContent={"center"}
        bgcolor={theme.palette.primary.main}
      >
        <Grid
          item
          style={{
            width: "50%",
            height: "100%",
            alignContent: "center",
            justifyContent: "center",
            padding: "32px",
            background: "white",
          }}
        >
          <Grid
            container
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
            gap={6}
          >
            <Grid item>
              <TextField
                label="نام"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={inputs.name.value}
                error={!inputs.name.isValid}
                required
                onChange={(e) =>
                  dispatch({ type: "NAME", field: e.target.value })
                }
                helperText={
                  !inputs.name.isValid ? " نام وارد شده معتبر نیست" : ""
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label="ایمیل"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={inputs.email.value}
                error={!inputs.email.isValid}
                required
                onChange={(e) =>
                  dispatch({ type: "EMAIL", field: e.target.value })
                }
                helperText={
                  !inputs.email.isValid ? "ایمیل وارد شده معتبر نیست" : ""
                }
              />
            </Grid>
            <Grid item>
              <TextField
                label="رمز عبور"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={inputs.password.value}
                error={!inputs.password.isValid}
                required
                onChange={(e) =>
                  dispatch({ type: "PASSWORD", field: e.target.value })
                }
                helperText={
                  !inputs.password.isValid
                    ? "رمزعبور باید بیشتر از 6 کاراکتر باشد و شامل عدد و حروف فارسی نباشد"
                    : ""
                }
                type="password"
              />
            </Grid>
            <Grid>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="info"
                sx={{ width: "300px", borderRadius: "8px" }}
                disabled={
                  !inputs.email.isValid ||
                  !inputs.password.isValid ||
                  !inputs.name.isValid
                }
                onClick={() => {
                  setIsPending(true);
                  AuthService.register({
                    name: inputs.name.value,
                    email: inputs.email.value,
                    password: inputs.password.value,
                  })
                    .then((res: any) => {
                      setIsPending(false);
                      if (res.status == "201") {
                        localStorage.setItem("token", res.data.accessToken);
                        authContext.setToken(res.data.accessToken);
                        toast.success("ثبت نام شما با موفقیت انجام شد!", {
                          position: "top-left",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                          transition: Bounce,
                        });
                        navigate("/");
                      }
                    })
                    .catch((err: any) => {
                      setIsPending(false);
                      toast.error(err.response.data.message, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                      });
                    });
                }}
              >
                {isPending ? (
                  <CircularProgress
                    size={28}
                    sx={{
                      color: "#ccc",
                    }}
                  />
                ) : (
                  "ثبت نام"
                )}
              </Button>
            </Grid>
            <Grid>
              <Typography>
                حساب کاربری دارید؟ <NavLink to={"/login"}> وارد شوید</NavLink>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          style={{
            width: "50%",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Grid
            container
            style={{
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            gap={6}
          >
            <Grid item alignSelf={"center"}>
              <Typography
                color={"white"}
                component={"h6"}
                fontWeight={"bold"}
                fontSize={"34px"}
              >
                سامانه تلفن یار دانشگاه بوعلی سینا
              </Typography>
            </Grid>
            <Grid item>
              <img src={img} width={"400px"} height={"300px"} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
export default Register;
