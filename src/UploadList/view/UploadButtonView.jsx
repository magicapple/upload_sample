const UploadButtonView = ({ creatSuccessFileHandle, creatFailFileHandle }) => {
  return (
    <div>
      <button onClick={creatSuccessFileHandle}>创建一个成功的文件上传</button>
      <button onClick={creatFailFileHandle}>创建一个失败的文件上传</button>
    </div>
  );
};

export default UploadButtonView;
