import { useEffect, useMemo, useState } from "react";
import UploadMock from "./UploadMock";

const Upload = ({ item: { id, file, canUpload }, calc }) => {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState("ready");

  const upload = useMemo(() => {
    const successCallback = () => {
      setState("success");
      calc(-1, "success");
    };

    const errorCallback = () => {
      setState("error");
      calc(-1);
    };

    const progressCallback = (progress) => {
      setProgress(progress);
    };
    return new UploadMock(
      file,
      successCallback,
      errorCallback,
      progressCallback,
      file.isSuccess ? 200 : 30
    );
  }, []);

  useEffect(() => {
    if (canUpload) {
      upload.start();
      setState("uploading");
      calc(1);
    }
  }, [canUpload]);

  const retryHandle = () => {
    upload.start();
    setState("uploading");
    calc(1);
  };
  return (
    <div>
      文件名：{file.name}，状态：{state}, 进度{progress}%，
      {state === "error" ? <span onClick={retryHandle}>重试</span> : null}
    </div>
  );
};

export default Upload;
