import { useCallback, useEffect, useState, useRef } from "react";

const useUploaderReg = (list) => {
  const uploaders = useRef([]);
  const [allSuccess, setAllSuccess] = useState(false);

  const reg = useCallback((ref) => {
    uploaders.current.push(ref);
  }, []);

  const getUploaderState = useCallback(() => {
    let uploadCount = 0;
    let successCount = 0;
    for (const uploader of uploaders.current) {
      if (uploader.current.state === "uploading") {
        uploadCount++;
      }
      if (uploader.current.state === "success") {
        successCount++;
      }
    }
    return [uploadCount, successCount];
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const [uploadCount, successCount] = getUploaderState();
      if (uploadCount === 0) {
        for (const uploader of uploaders.current) {
          if (uploader.current.state === "ready") {
            uploader.current.start();
            break;
          }
        }
      }
      const currentAllSuccess = list.length > 0 && successCount === list.length;
      if (currentAllSuccess !== allSuccess) {
        setAllSuccess(currentAllSuccess);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, [getUploaderState, list, allSuccess]);

  return { reg, allSuccess };
};

export default useUploaderReg;
