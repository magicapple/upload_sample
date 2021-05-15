import useUpload from "./hook/useUpload";
import UploadView from "./view/UploadView";

const IndependentUpload = ({ item: { file, canUpload } }) => {
  const [fileName, state, progress, start] = useUpload(file, canUpload);

  return (
    <UploadView
      fileName={fileName}
      state={state}
      progress={progress}
      retryHandle={start}
    />
  );
};

export default IndependentUpload;
