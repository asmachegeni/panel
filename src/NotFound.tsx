import { Button } from "@mui/material";
import img404 from "./assets/img/404.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src={img404} width={"750px"} height={"550px"} />
      {/* <Button variant="contained" color="info" onClick={() => navigate("/")}>
        بازگشت به خانه
        <ArrowBackIcon />
      </Button> */}
    </div>
  );
}

export default NotFound;
