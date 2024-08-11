import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridSlots,
} from "@mui/x-data-grid";
import { PersonForm } from "./PersonForm";
import PersonService from "./person.service";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { Loader } from "../../components/Loader";
import useTitle from "../../hooks/useTitle";
import { blue, red } from "@mui/material/colors";

interface EditToolbarProps {
  setOpen: React.Dispatch<any>;
  setIseditMode: React.Dispatch<any>;
}

function EditToolbar(props: EditToolbarProps) {
  const { setOpen, setIseditMode } = props;

  return (
    <GridToolbarContainer>
      <Button
        variant="contained"
        color="info"
        startIcon={<AddIcon />}
        onClick={() => {
          setOpen(true);
          setIseditMode(false);
        }}
      >
        اضافه کردن فرد جدید
      </Button>
    </GridToolbarContainer>
  );
}

export default function People() {
  const [rows, setRows] = React.useState([]);
  const [pagesize, setPageSize] = React.useState(20);
  const [lastPage, setLastPage] = React.useState(1);
  const [isEditMode, setIseditMode] = React.useState(false);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 15,
  });
  const [open, setOpen] = React.useState(false);
  const [isPending, setIsPending] = React.useState<boolean>(false);
  useTitle("افراد");
  const refresh = (pageNumber: number) => {
    setIsPending(true);
    PersonService.getAll(pageNumber).then((res) => {
      setIsPending(false);
      setRows(
        res.data.data.map((item: any) => ({
          id: item.node.id,
          ...item.node.properties,
        }))
      );

      setPageSize(res.data.per_page);
      setLastPage(res.data.last_page);
    });
  };
  const handleDelete = (id: number) =>
    swal({
      title: "آیا از حذف فرد اطمینان دارید؟",
      icon: "warning",
      dangerMode: true,
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        PersonService.delete(id)
          .then((res: any) => {
            if (res.status === 200) {
              toast.success("فرد  با موفقیت حذف شد", {
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
              refresh(1);
            }
          })
          .catch(() =>
            toast.error("خطا در حذف فرد", {
              position: "top-left",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            })
          );
      }
    });
  const columns: GridColDef[] = [
    { field: "id", headerName: "id", width: 180 },
    { field: "caller_id", headerName: "caller_id", width: 180 },
    {
      field: "name",
      headerName: "name",
      type: "string",
      width: 80,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "lastname",
      headerName: "lastname",
      width: 220,
    },
    {
      field: "email",
      headerName: "email",
      type: "string",
      width: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            sx={{ color: blue[900] }}
            className="textPrimary"
            onClick={() => {
              setOpen(true);
              setIseditMode(true);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDelete(id as number)}
            sx={{ color: red[500] }}
            color="inherit"
          />,
        ];
      },
    },
  ];
  React.useEffect(() => refresh(1), []);
  React.useEffect(() => {
    refresh(paginationModel.page + 1);
  }, [paginationModel]);
  return (
    <>
      <Loader open={isPending} handleClose={() => {}} />
      <PersonForm
        open={open}
        id={0}
        isEditMode={isEditMode}
        setOpen={setOpen}
        refresh={refresh}
      />
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

      <Box
        component="div"
        sx={{
          height: 500,
          "&.actions": {
            color: "text.secondary",
          },
          "&.textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={rows}
          columns={columns}
          pageSizeOptions={[pagesize]}
          editMode="row"
          slots={{
            toolbar: EditToolbar as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: { setOpen, setIseditMode },
          }}
          paginationMode={"server"}
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
          rowCount={lastPage * pagesize}
        />
      </Box>
    </>
  );
}
