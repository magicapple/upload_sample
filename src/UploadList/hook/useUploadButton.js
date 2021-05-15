import { useCallback, useState } from "react";
let index = 0;

const createId = () => {
  return index++;
};

const createFile = (isSuccess) => {
  return {
    name: `file_${index}.txt`,
    size: 1000000,
    isSuccess
  };
};

const useUploadButton = (canUpload) => {
  const [list, setList] = useState([]);

  const creatSuccessFileHandle = useCallback(() => {
    const file = createFile(true);
    setList((list) => [...list, { id: createId(), file, canUpload }]);
  }, [canUpload]);

  const creatFailFileHandle = useCallback(() => {
    const file = createFile(false);
    setList((list) => [...list, { id: createId(), file, canUpload }]);
  }, [canUpload]);

  return { list, creatSuccessFileHandle, creatFailFileHandle };
};

export default useUploadButton;
