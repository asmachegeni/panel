import { CircularProgress, Grid, Modal, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import PositionsService from "./place.service";
import { Bounce, toast } from "react-toastify";
import useForm from "../../hooks/useForm";
import { IPlace, validate } from "./place.types";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
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
  const [initial, setInitial] = useState<IPlace>({
    name: "",
    caller_id: "",
    building: "",
    floor: "",
    room_number: "",
    description: "",
  });
  const { values, errors, handleChange } = useForm<IPlace>(initial, validate);
  useEffect(() => {
    if (id !== -1 && isEditMode) {
      PositionsService.get(id).then((res: any) => {
        setInitial({
          name: res.data.name,
          caller_id: res.data.caller_id,
          building: res.data.building,
          floor: res.data.floor,
          room_number: res.data.room_number,
          description: res.data.description,
        });
        setOldData({
          name: res.data.name,
          caller_id: res.data.caller_id,
          building: res.data.building,
          floor: res.data.floor,
          room_number: res.data.room_number,
          description: res.data.description,
        });
      });
    } else {
      setInitial({
        name: "",
        caller_id: "",
        building: "",
        floor: "",
        room_number: "",
        description: "",
      });
    }
  }, [id, isEditMode]);
  const AddPeople = () => {
    setIspending(true);
    PositionsService.add({
      name: values.name,
      caller_id: values.caller_id,
      building: values.building,
      floor: values.floor,
      room_number: values.room_number,
      description: values.description,
    })
      .then((res: { status: number }) => {
        if (res.status === 201) {
          setOpen(false);
          toast.success("مکان جدید با موفقیت اضافه شد", {
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
        toast.error("خطا در ایجاد مکان ", {
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
    if (oldData.title !== values.name) {
      data.title = values.name;
    }
    if (oldData.title !== values.building) {
      data.title = values.building;
    }
    if (oldData.title !== values.floor) {
      data.title = values.floor;
    }
    if (oldData.caller_id !== values.caller_id) {
      data.caller_id = values.caller_id;
    }
    if (oldData.title !== values.room_number) {
      data.title = values.room_number;
    }
    if (oldData.title !== values.description) {
      data.title = values.description;
    }
    setIspending(true);
    PositionsService.update(data, 200)
      .then((res) => {
        if (res.status === 200) {
          toast.success("مکان  با موفقیت  آپدیت شد", {
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
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            borderRadius: "8px",
          }}
          gap={4}
        >
          <Grid item alignSelf={"self-start"}>
            <Button onClick={() => setOpen(false)}>
              <CloseIcon color="error" />
            </Button>
          </Grid>
          <Grid
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
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
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
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
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
              <TextField
                label="Building"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={values.building}
                name="building"
                required
                onChange={handleChange}
                helperText={errors.building}
                error={!!errors.building}
                focused={!!values.building}
              />
            </Grid>
          </Grid>
          <Grid
            sx={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
            }}
          >
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
              <TextField
                label="Floor"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={values.floor}
                name="floor"
                required
                onChange={handleChange}
                helperText={errors.floor}
                error={!!errors.floor}
                focused={!!values.floor}
              />
            </Grid>
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
              <TextField
                label="Room Number"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={values.room_number}
                name="room_number"
                required
                onChange={handleChange}
                helperText={errors.room_number}
                error={!!errors.room_number}
                focused={!!values.room_number}
              />
            </Grid>
            <Grid
              item
              sx={{
                paddingBottom: "16px",
              }}
            >
              <TextField
                label="Description"
                variant="outlined"
                sx={{ width: "300px", borderRadius: "8px" }}
                value={values.description}
                name="description"
                required
                onChange={handleChange}
                helperText={errors.description}
                error={!!errors.description}
                focused={!!values.description}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              size="large"
              color="info"
              sx={{ width: "300px", borderRadius: "8px" }}
              disabled={
                !(
                  values.name &&
                  values.caller_id &&
                  values.building &&
                  values.floor &&
                  values.room_number &&
                  values.description
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
