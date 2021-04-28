class UploadMock {
  constructor(
    file,
    successCallback,
    errorCallback,
    progressCallback,
    errorIndex
  ) {
    console.log(errorIndex);
    this.progress = 1;
    this.index = 0;
    this.file = file;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.progressCallback = progressCallback;
    this.errorIndex = errorIndex || 200;
  }

  start = () => {
    if (this.progress >= 100) {
      return;
    }
    this.timer = setInterval(() => {
      if (this.index === this.errorIndex) {
        clearInterval(this.timer);
        this.errorCallback("文件上传错误");
      }
      if (this.progress < 100) {
        this.progress++;
        this.index++;
        this.progressCallback(this.progress);
      } else {
        clearInterval(this.timer);
        this.successCallback(this.file);
      }
    }, 50);
  };
}

export default UploadMock;
