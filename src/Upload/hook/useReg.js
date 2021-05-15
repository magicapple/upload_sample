import {
  useEffect,
  useMemo,
  useState,
  useImperativeHandle,
  useRef,
  useCallback
} from "react";

const useReg = (reg, exposes) => {
  const ref = useRef(null);

  useEffect(() => {
    reg(ref);
  }, [reg]);

  useImperativeHandle(
    ref,
    () => ({
      ...exposes
    }),
    [exposes]
  );
};

export default useReg;
