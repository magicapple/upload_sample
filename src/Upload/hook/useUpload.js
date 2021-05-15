import { useEffect, useMemo, useState, useCallback } from "react";
import UploadMock from "../../UploadMock";

const useUpload = (file, canUpload) => {
  const [progress, setProgress] = useState(0);
  const [state, setState] = useState("ready");
  const upload = useMemo(() => {
    const successCallback = () => {
      setState("success");
    };
    const errorCallback = () => {
      setState("error");
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
  }, [file]);

  const start = useCallback(() => {
    upload.start();
    setState("uploading");
  }, [upload]);

  useEffect(() => {
    if (canUpload) {
      start();
    }
  }, [canUpload, start]);

  return [file.name, state, progress, start];
};

export default useUpload;
