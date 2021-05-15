const UploadView = ({ fileName, state, progress, retryHandle }) => {
  return (
    <div>
      文件名：{fileName}，状态：{state}, 进度{progress}%，
      {state === "error" ? <span onClick={retryHandle}>重试</span> : null}
    </div>
  );
};

export default UploadView;
