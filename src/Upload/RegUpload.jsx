import useReg from "./hook/useReg";
import useUpload from "./hook/useUpload";
import UploadView from "./view/UploadView";

const RegUpload = ({ item: { file, canUpload }, reg }) => {
  const [fileName, state, progress, start] = useUpload(file, canUpload);
  useReg(reg, { state, start });
  return (
    <UploadView
      fileName={fileName}
      state={state}
      progress={progress}
      retryHandle={start}
    />
  );
};

export default RegUpload;
