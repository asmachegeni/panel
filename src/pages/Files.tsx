import * as React from "react";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import swal from "sweetalert";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import { DropFile } from "../components/DropFile";
import { Bounce, ToastContainer } from "react-toastify";
import FilesService from "../services/files.service";
import { blue, red } from "@mui/material/colors";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;
}

export default function Files() {
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [pagesize, setPageSize] = React.useState(20);
  const [lastPage, setLastPage] = React.useState(1);

  const refresh = (pageNumber: number) => {
    FilesService.getAllExcel(pageNumber, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res: any) => {
      setRows(res.data.data.data);
      setPageSize(res.data.data.per_page);
      setLastPage(res.data.data.last_page);
      console.log(res.data.data.per_page, res.data.data.last_page);
    });
  };
  React.useEffect(() => {
    refresh(1);
  }, []);
  React.useEffect(() => {
    refresh(paginationModel.page + 1);
  }, [paginationModel]);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    swal({
      title: "آیا از حذف فایل مورد نظر اطمینان دارید؟",
      icon: "error",
      dangerMode: true,
      buttons: ["خیر", "بله"],
    }).then((value) => {
      if (value) {
        FilesService.delete(id as number, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }).then(() => {
          refresh(1);
        });
      }
    });
  };
  const handleDownloadClick = (id: GridRowId) => () => {
    FilesService.download(id as number, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      document.location.replace(res.data.download_link);
    });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find(
      (row: { id: string | number }) => row.id === id
    );
    if (editedRow!.isNew) {
      setRows(rows.filter((row: { id: string | number }) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(
      rows.map((row: { id: string | number }) =>
        row.id === newRow.id ? updatedRow : row
      )
    );
    FilesService.update(newRow.id as number, newRow, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      refresh(1);
    });
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "نام فایل", width: 400, editable: true },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 350,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,

            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<DownloadIcon />}
            label="Download"
            className="textPrimary"
            onClick={handleDownloadClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<EditIcon sx={{ color: blue[900] }} />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon sx={{ color: red[500] }} />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100%",
      }}
    >
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

      <DropFile refresh={refresh} />

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
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
          paginationMode={"server"}
          onPaginationModelChange={setPaginationModel}
          rowCount={lastPage * pagesize}
        />
      </Box>
    </div>
  );
}
