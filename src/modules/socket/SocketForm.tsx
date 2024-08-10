import { CircularProgress, Grid, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PersonService from "./socket.service";
import { Bounce, toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { ISocket, validate } from "./socket.types";
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
export const SocketForm = ({
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
  const [initial, setInitial] = useState<ISocket>({
    socket_number: "",
    class_of_service: "",
    ring_time: "",
  });
  const { values, errors, handleChange } = useForm<ISocket>(initial, validate);
  useEffect(() => {
    console.log(id, isEditMode);
    if (id !== -1 && isEditMode) {
      PersonService.get(id).then((res: any) => {
        setInitial({
          socket_number: res.data.socket_number,
          class_of_service: res.data.class_of_service,
          ring_time: res.data.ring_time,
        });
        setOldData({
          socket_number: res.data.socket_number,
          class_of_service: res.data.class_of_service,
          ring_time: res.data.ring_time,
        });
      });
    } else {
      setInitial({ socket_number: "", class_of_service: "", ring_time: "" });
    }
  }, [id, isEditMode]);
  const AddPeople = () => {
    setIspending(true);
    PersonService.add({
      socket_number: values.socket_number,
      class_of_service: values.class_of_service,
      ring_time: values.ring_time,
    })
      .then((res) => {
        if (res.status === 201) {
          setOpen(false);
          toast.success("سوکت جدید با موفقیت اضافه شد", {
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
        toast.error("خطا در ایجاد سوکت ", {
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
    if (oldData.socket_number !== values.socket_number) {
      data.socket_number = values.socket_number;
    }
    if (oldData.class_of_service !== values.class_of_service) {
      data.name = values.class_of_service;
    }
    if (oldData.ring_time !== values.ring_time) {
      data.ring_time = values.ring_time;
    }

    setIspending(true);
    PersonService.update(data, 200)
      .then((res) => {
        if (res.status === 200) {
          toast.success("سوکت  با موفقیت  آپدیت شد", {
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
              label="Socket Number"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.socket_number}
              name="socket_number"
              required
              onChange={handleChange}
              helperText={errors.socket_number}
              error={!!errors.socket_number}
              focused={!!values.socket_number}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Class of Servic"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.class_of_service}
              required
              name="class_of_service"
              onChange={handleChange}
              error={!!errors.class_of_service}
              helperText={errors.class_of_service}
              focused={!!values.class_of_service}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Ring Time"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.ring_time}
              required
              name="ring_time"
              onChange={handleChange}
              helperText={errors.ring_time}
              error={!!errors.ring_time}
              focused={!!values.ring_time}
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
                !(
                  values.socket_number &&
                  values.class_of_service &&
                  values.ring_time
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
