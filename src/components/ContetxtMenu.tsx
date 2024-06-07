import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider } from "@mui/material";
import PersonService from "../services/person.service";
import swal from "sweetalert";
import { Bounce, toast } from "react-toastify";
import { useContext } from "react";
import { HomeContext } from "../pages/Home";
export const ContextMenu = (props: any) => {
  const { setOpen, setMenu, setId, setIsEditMode, refresh } =
    useContext(HomeContext);
  const deleteNode = () => {
    swal({
      title: `آیا از حذف ${props.name || "نود مورد نظر"} مطمئن هستید؟`,
      icon: "warning",
      dangerMode: true,
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        PersonService.delete(props.id, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then((res: any) => {
          if (res.status === 204) {
            toast.success("با موفقیت حذف شد.", {
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
            setMenu(null);
            refresh();
          }
        });
      }
    });
  };
  const editNode = () => {
    setId(props.id);
    setIsEditMode(true);
    setOpen(true);
  };
  return (
    <Paper
      sx={{
        width: 150,
        maxWidth: "100%",
        position: "absolute",
        background: "#f2f2f2",
        top: props.top,
        right: props.right,
        zIndex: "10",
      }}
    >
      <MenuList>
        <MenuItem onClick={editNode}>
          <ListItemText>ویرایش</ListItemText>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
        <Divider />
        <MenuItem onClick={deleteNode}>
          <ListItemText>حذف</ListItemText>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </MenuList>
    </Paper>
  );
};
