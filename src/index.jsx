import { StrictMode } from "react";
import ReactDOM from "react-dom";
import QueueUploadList from "./UploadList/QueueUploadList";
import AutoUploadList from "./UploadList/AutoUploadList";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <span>队列上传</span>
    <QueueUploadList />
    <span>并发上传</span>
    <AutoUploadList />
  </StrictMode>,
  rootElement
);
