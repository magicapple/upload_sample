import { useCallback, useEffect, useState } from "react";
import Upload from "./Upload";
import "./styles.css";

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

export default function App() {
  const [list, setList] = useState([]);
  const [uploadCount, setUploadCount] = useState(0);
  const [successCount, setSuccessCount] = useState(0);

  const calc = useCallback((count, state) => {
    setUploadCount((uploadCount) => uploadCount + count);
    if (state === "success") {
      setSuccessCount((successCount) => successCount + 1);
    }
  }, []);

  const creatSuccessFileHandle = useCallback(() => {
    const file = createFile(true);

    setList((list) => [...list, { id: createId(), file, canUpload: false }]);
    if (uploadCount <= 0) {
      freshList();
    }
  }, [uploadCount]);

  const creatFailFileHandle = useCallback(() => {
    const file = createFile(false);

    setList((list) => [...list, { id: createId(), file, canUpload: false }]);
    if (uploadCount <= 0) {
      freshList();
    }
  }, [uploadCount]);

  useEffect(() => {
    if (uploadCount <= 0) {
      freshList();
    }
  }, [uploadCount]);

  const freshList = useCallback((id, state) => {
    // 这个地方需要对list进行统一处理，感觉也有点别扭，其实设置列表状态和扫描列表状态应该拆开比较好
    setList((list) => {
      let isSetUploading = false;
      const newList = list.map((item) => {
        if (item.canUpload === false && isSetUploading === false) {
          isSetUploading = true;
          return {
            id: item.id,
            file: item.file,
            canUpload: true
          };
        } else {
          return item;
        }
      });
      return newList;
    });
  }, []);

  return (
    <div className="App">
      <div>
        <button onClick={creatSuccessFileHandle}>创建一个成功的文件上传</button>

        <button onClick={creatFailFileHandle}>创建一个失败的文件上传</button>
      </div>
      <div style={{ margin: 20 }}>
        {list.map((item) => (
          <Upload item={item} key={item.id} calc={calc} />
        ))}
      </div>
      {list.length > 0 && list.length === successCount ? (
        <div>全部上传完成</div>
      ) : null}
    </div>
  );
}
