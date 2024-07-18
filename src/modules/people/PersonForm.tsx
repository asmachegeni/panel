import { CircularProgress, Grid, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PersonService from "./person.service";
import { Bounce, toast } from "react-toastify";
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
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [callerId, setCallerId] = useState("");
  const [isPending, setIspending] = useState(false);
  const [oldData, setOldData] = useState<any>({});
  useEffect(() => {
    if (id !== -1 && isEditMode) {
      PersonService.get(id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res: any) => {
        setEmail(res.data.email);
        setLastName(res.data.lastname);
        setName(res.data.name);
        setCallerId(res.data.caller_id);
        setOldData({
          name: res.data.name,
          lastname: res.data.lastname,
          email: res.data.email,
          callerId: res.data.caller_id,
        });
      });
    } else {
      setName("");
      setEmail("");
      setCallerId("");
      setLastName("");
    }
  }, [id]);
  const AddPeople = () => {
    setIspending(true);
    PersonService.add(
      {
        name: name,
        lastname: lastName,
        email: email,
        caller_id: callerId,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        if (res.status === 201) {
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
        setIspending(false);
        refresh();
      })
      .catch(() => {
        setIspending(false);
      });
  };
  const EditPeople = () => {
    let data: any = {};
    if (oldData.email !== email) {
      data.email = email;
    }
    if (oldData.name !== name) {
      data.name = name;
    }
    if (oldData.lastname !== lastName) {
      data.lastname = lastName;
    }
    if (oldData.callerId !== callerId) {
      data.caller_id = callerId;
    }
    setIspending(true);
    PersonService.update(data, id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
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
        refresh();
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
          <Grid item>
            <TextField
              label="نام"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={name}
              required
              onChange={(e: { target: { value: any } }) =>
                setName(e.target.value)
              }
              helperText={""}
              focused={!!name}
            />
          </Grid>
          <Grid item>
            <TextField
              label="نام خانوادگی"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={lastName}
              required
              onChange={(e: { target: { value: any } }) =>
                setLastName(e.target.value)
              }
              helperText={""}
              focused={!!lastName}
            />
          </Grid>
          <Grid item>
            <TextField
              label="ایمیل"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={email}
              required
              onChange={(e: { target: { value: any } }) =>
                setEmail(e.target.value)
              }
              helperText={""}
              focused={!!email}
            />
          </Grid>
          <Grid item>
            <TextField
              label="caller_ID"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={callerId}
              required
              onChange={(e: { target: { value: any } }) =>
                setCallerId(e.target.value)
              }
              helperText={""}
              focused={!!callerId}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="info"
              sx={{ width: "300px", borderRadius: "8px" }}
              disabled={!(email && name && lastName && callerId)}
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
