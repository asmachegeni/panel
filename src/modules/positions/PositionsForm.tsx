import { CircularProgress, Grid, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PositionsService from "./positions.service";
import { Bounce, toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { IPositions, validate } from "./positions.types";
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
export const PositionsForm = ({
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
  const [initial, setInitial] = useState<IPositions>({
    title: "",
    caller_id: "",
  });
  const { values, errors, handleChange } = useForm<IPositions>(
    initial,
    validate
  );
  useEffect(() => {
    if (id !== -1 && isEditMode) {
      PositionsService.get(id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res: any) => {
        setInitial({
          title: res.data.title,
          caller_id: res.data.caller_id,
        });
        setOldData({
          title: res.data.title,
          caller_id: res.data.caller_id,
        });
      });
    } else {
      setInitial({ title: "", caller_id: "" });
    }
  }, [id, isEditMode]);
  const AddPeople = () => {
    setIspending(true);
    PositionsService.add(
      {
        title: values.title,
        caller_id: values.caller_id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res: { status: number }) => {
        if (res.status === 201) {
          setOpen(false);
          toast.success("پست جدید با موفقیت اضافه شد", {
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
  const EditPeople = () => {
    let data: any = {};
    if (oldData.title !== values.title) {
      data.title = values.title;
    }
    if (oldData.caller_id !== values.caller_id) {
      data.caller_id = values.caller_id;
    }
    setIspending(true);
    PositionsService.update(data, 200, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          toast.success("پست  با موفقیت  آپدیت شد", {
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
              label="عنوان"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.title}
              name="title"
              required
              onChange={handleChange}
              helperText={errors.title}
              error={!!errors.title}
              focused={!!values.title}
            />
          </Grid>
          <Grid item>
            <TextField
              label="caller_ID"
              variant="outlined"
              sx={{ width: "300px", borderRadius: "8px" }}
              value={values.caller_id}
              name="caller_id"
              required
              onChange={handleChange}
              helperText={errors.caller_id}
              error={!!errors.caller_id}
              focused={!!values.caller_id}
            />
          </Grid>
          <Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="info"
              sx={{ width: "300px", borderRadius: "8px" }}
              disabled={!(values.title && values.caller_id)}
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
