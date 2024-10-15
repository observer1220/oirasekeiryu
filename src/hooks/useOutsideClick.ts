import { useEffect, useRef } from "react";

function useOutsideClick(handler: any, listenCapturing = true) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    function handleClick(event: any) {
      // console.log("ref.current", ref.current);
      // console.log("event.target", event.target);

      if (ref.current && !ref.current.contains(event.target)) {
        // console.log("Click Outside");
        handler();
      }
    }

    // 事件名稱、事件處理器、捕獲或冒泡(預設為false冒泡，true為捕獲)
    document.addEventListener("click", handleClick, listenCapturing);
    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}

export { useOutsideClick };
