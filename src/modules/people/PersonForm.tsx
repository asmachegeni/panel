import { CircularProgress, Grid, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PersonService from "./person.service";
import { Bounce, toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { IPerson, validate } from "./person.types";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
export const PersonForm = ({
  open,
  setOpen,
  refresh,
  id,
  isEditMode,
}: {
  open: boolean;
  setOpen: React.Dispatch<any>;
  refresh: Function;
  id: number;
  isEditMode: boolean;
}) => {
  const [isPending, setIspending] = useState(false);
  const [oldData, setOldData] = useState<any>({});
  const [initial, setInitial] = useState<IPerson>({
    email: "",
    name: "",
    lastname: "",
    callerId: "",
  });
  const { values, errors, handleChange } = useForm<IPerson>(initial, validate);
  useEffect(() => {

    if (id !== -1 && isEditMode) {
      PersonService.get(id).then((res: any) => {
        setInitial({
          name: res.data.name,
          lastname: res.data.lastname,
          email: res.data.email,
          callerId: res.data.caller_id,
        });
        setOldData({
          name: res.data.name,
          lastname: res.data.lastname,
          email: res.data.email,
          callerId: res.data.caller_id,
        });
      });
    } else {
      setInitial({ email: "", name: "", lastname: "", callerId: "" });
    }
  }, [id, isEditMode]);
  const AddPeople = () => {
    setIspending(true);
    PersonService.add({
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      caller_id: values.callerId,
    })
      .then((res) => {
        if (res.status === 201) {
          setIspending(false);
          setOpen(false);
          toast.success("فرد جدید با موفقیت اضافه شد", {
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
        }
        setOpen(false);
        refresh(1);
      })
      .catch((res) => {
        setIspending(false);
        toast.error(res.response.data.message, {
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
      });
  };
  const EditPeople = () => {
    let data: any = {};
    if (oldData.email !== values.email) {
      data.email = values.email;
    }
    if (oldData.name !== values.name) {
      data.name = values.name;
    }
    if (oldData.lastname !== values.lastname) {
      data.lastname = values.lastname;
    }
    if (oldData.callerId !== values.callerId) {
      data.caller_id = values.callerId;
    }
    setIspending(true);
    PersonService.update(data, 200)
      .then((res) => {
        if (res.status === 200) {
          toast.success("فرد  با موفقیت  آپدیت شد", {
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
        }
        setOpen(false);
        setIspending(false);
        refresh(1);
      })
      .catch(() => {
        setIspending(false);
      });
  };
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Grid
          container
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "8px",
          }}
          gap={4}
        >
          <Grid item alignSelf={"self-start"}>
            <Button onClick={() => setOpen(false)}>
              <CloseIcon color="error" />
            </Button>
          </Grid>
          <Grid item>
            <TextField
              label="نام"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.name}
              name="name"
              required
              onChange={handleChange}
              helperText={errors.name}
              error={!!errors.name}
              focused={!!values.name}
            />
          </Grid>
          <Grid item>
            <TextField
              label="نام خانوادگی"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.lastname}
              required
              name="lastname"
              onChange={handleChange}
              error={!!errors.lastname}
              helperText={errors.lastname}
              focused={!!values.lastname}
            />
          </Grid>
          <Grid item>
            <TextField
              label="ایمیل"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.email}
              required
              name="email"
              onChange={handleChange}
              helperText={errors.email}
              error={!!errors.email}
              focused={!!values.email}
            />
          </Grid>
          <Grid item>
            <TextField
              label="caller_ID"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.callerId}
              name="callerId"
              required
              onChange={handleChange}
              helperText={errors.callerId}
              error={!!errors.callerId}
              focused={!!values.callerId}
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
                !!(
                  errors.email ||
                  errors.name ||
                  errors.lastname ||
                  errors.callerId
                )
              }
              onClick={() => {
                isEditMode ? EditPeople() : AddPeople();
              }}
            >
              {isPending ? (
                <CircularProgress
                  size={28}
                  sx={{
                    color: "#ccc",
                  }}
                />
              ) : isEditMode ? (
                "ثبت تغییرات"
              ) : (
                "اضافه کردن"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
