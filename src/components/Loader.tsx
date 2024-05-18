import { CircularProgress, Backdrop } from "@mui/material";

export const Loader = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: any;
}) => {
  return (
    <Backdrop
      open={open}
      onClick={handleClose}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        zIndex: 10000,
      }}
    >
      <CircularProgress size={72} color="info" />
    </Backdrop>
  );
};
