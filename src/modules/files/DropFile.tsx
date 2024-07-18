import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilesService from "./files.service";
import { Box, Button, LinearProgress } from "@mui/material";
import Axios from "../../baseUrl";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#ccc",
  borderStyle: "dashed",
  backgroundColor: "#fff",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  width: "750px",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};
export const DropFile = ({ refresh }: { refresh: any }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone();
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
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
            setProgress(progressEvent.progress as number);
          },
        }
      ).then((res) => {
        if (res.status === 201) {
          setIsupload(false);
          //toast
          refresh(1);
        }
      });
    }
  }, [acceptedFiles.length]);

  return (
    <>
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
          </div>
        </div>
      ) : (
        <div className="container">
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <p>فایل را انتخاب یا رها کنید</p>
          </div>
        </div>
      )}
    </>
  );
};
