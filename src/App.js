import { useCallback, useRef, useState } from "react";
import Download from "./Download";
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

const hasUpload = (list) => {
  return list.filter((item) => item.state === "uploading").length > 0;
};

export default function App() {
  const [list, setList] = useState([]);

  const creatSuccessFileHandle = useCallback(() => {
    const file = createFile(true);

    setList((list) => [...list, { id: createId(), file, state: "waiting" }]);
    freshList();
  }, []);

  const creatFailFileHandle = useCallback(() => {
    const file = createFile(false);

    setList((list) => [...list, { id: createId(), file, state: "waiting" }]);
    freshList();
  }, []);

  const freshList = useCallback((id, state) => {
    // 这个地方需要对list进行统一处理，感觉也有点别扭，其实设置列表状态和扫描列表状态应该拆开比较好
    setList((list) => {
      let newList = list.map((item) => {
        if (item.id === id) {
          return {
            id,
            state: state,
            file: item.file
          };
        } else {
          return item;
        }
      });
      if (!hasUpload(newList)) {
        let isSetUploading = false;
        newList = newList.map((item) => {
          if (item.state === "waiting" && isSetUploading === false) {
            isSetUploading = true;
            return {
              id: item.id,
              file: item.file,
              state: "ready"
            };
          } else {
            return item;
          }
        });
      }
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
          <Download item={item} key={item.id} freshList={freshList} />
        ))}
      </div>
      {list.length > 0 &&
      list.filter((item) => item.state === "success").length === list.length ? (
        <div>全部上传完成</div>
      ) : null}
    </div>
  );
}
