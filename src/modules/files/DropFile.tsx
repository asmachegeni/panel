import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { LinearProgress } from "@mui/material";
import styled from "styled-components";
import Axios from "../../baseUrl";
import CloseIcon from "@mui/icons-material/Close";
import { Bounce, toast } from "react-toastify";
const getColor = (props: {
  isDragAccept: any;
  isDragReject: any;
  isFocused: any;
}) => {
  if (props.isDragAccept) {
    return "#00e676";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }
  if (props.isFocused) {
    return "#2196f3";
  }
  return "#0c0f3a";
};
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${(props) => getColor(props as any)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  width: 750px;
`;
const controller = new AbortController();
export const DropFile = ({ refresh }: { refresh: any }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();

  const [progress, setProgress] = useState(0);
  const [isUpload, setIsupload] = useState(false);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setIsupload(true);
      Axios.post(
        "excel",
        { file: acceptedFiles[0] },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress(progressEvent) {
            setProgress(Number(progressEvent.progress) * 100);
          },
          signal: controller.signal,
        }
      )
        .then((res) => {
          setIsupload(false);
          if (res.status === 201) {
            toast.success("فایل با موفقیت بارگذاری شد", {
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
        .catch((res) => {
          setIsupload(false);
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
    }
  }, [acceptedFiles.length]);

  return (
    <div>
      {isUpload ? (
        <div style={{ width: "750px", height: "60px", marginTop: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <LinearProgress
              color="info"
              style={{ width: "calc(100% - 50px)", height: "16px" }}
              variant="determinate"
              value={progress}
            />
            <span>{`${progress}%`}</span>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                controller.abort();
                setIsupload(false);
              }}
            >
              <CloseIcon />
            </div>
          </div>
        </div>
      ) : (
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p style={{ color: "#0c0f3a" }}>فایل را انتخاب یا رها کنید</p>
        </Container>
      )}
    </div>
  );
};
