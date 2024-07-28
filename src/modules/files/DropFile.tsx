import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import FilesService from "./files.service";
import { Box, Button, LinearProgress } from "@mui/material";
import styled from "styled-components";
import Axios from "../../baseUrl";
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
  return "#eeeeee";
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
          </div>
        </div>
      ) : (
        <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
          <input {...getInputProps()} />
          <p>فایل را انتخاب یا رها کنید</p>
        </Container>
      )}
    </div>
  );
};
