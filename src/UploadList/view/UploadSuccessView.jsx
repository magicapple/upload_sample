const UploadSuccessView = (allSuccess) => {
  return <>{allSuccess > 0 ? <div>全部上传完成</div> : null}</>;
};

export default UploadSuccessView;
