import { useEffect, useMemo, useState } from "react";
import UploadMock from "./UploadMock";

const Download = ({ item: { id, file, state }, freshList }) => {
  const [progress, setProgress] = useState(0);

  const upload = useMemo(() => {
    const successCallback = () => {
      freshList(id, "success");
    };

    const errorCallback = () => {
      freshList(id, "error");
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
    if (state === "ready") {
      upload.start();
      freshList(id, "uploading");
    }
  }, [state]);

  const retryHandle = () => {
    upload.start();
    freshList(id, "uploading");
  };
  return (
    <div>
      文件名：{file.name}，状态：{state}, 进度{progress}%，
      {state === "error" ? <span onClick={retryHandle}>重试</span> : null}
    </div>
  );
};

export default Download;
