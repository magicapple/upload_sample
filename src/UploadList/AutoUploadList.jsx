import useUploadButton from "./hook/useUploadButton";
import UploadButtonView from "./view/UploadButtonView";
import UploadListView from "./view/UploadListView";
import IndependentUpload from "../Upload/IndependentUpload";
import "./styles.css";

const AutoUploadList = () => {
  const { list, ...buttonHadlers } = useUploadButton(true);

  return (
    <div class="App">
      <UploadButtonView {...buttonHadlers} />
      <UploadListView list={list} Comp={IndependentUpload} />
    </div>
  );
};

export default AutoUploadList;
