import { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import FilesService from "../services/files.service";
import { Button } from "@mui/material";

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
  console.log(acceptedFiles[0]);
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );
  return (
    <div className="container">
      {acceptedFiles.length ? (
        <>
          <button
            onClick={() => {
              console.log(acceptedFiles[0]);
              FilesService.post(
                { file: acceptedFiles[0] },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                  },
                }
              ).then((res) => {
                if (res.status === 201) {
                  refresh(1);
                }
              });
            }}
          >
            آپلود فایل
          </button>
          <button>کنسل</button>
        </>
      ) : (
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p>فایل را انتخاب یا رها کنید</p>
        </div>
      )}
    </div>
  );
};
