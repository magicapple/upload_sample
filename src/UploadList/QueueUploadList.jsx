import useUploadButton from "./hook/useUploadButton";
import useUploaderReg from "./hook/useUploaderReg";
import UploadButtonView from "./view/UploadButtonView";
import UploadListView from "./view/UploadListView";
import UploadSuccessView from "./view/UploadSuccessView";
import RegUpload from "../Upload/RegUpload";
import "./styles.css";

const QueueUploadList = () => {
  const { list, ...buttonHadlers } = useUploadButton(false);
  const { reg, allSuccess } = useUploaderReg(list);

  return (
    <div class="App">
      <UploadButtonView {...buttonHadlers} />
      <UploadListView list={list} Comp={RegUpload} reg={reg} />
      <UploadSuccessView allSuccess={allSuccess} />
    </div>
  );
};

export default QueueUploadList;
