import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function useDetectOnline() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.navigator.onLine !== undefined
    ) {
      const onlineHandler = () => {
        toast.success("Your are online");
      };
      const offlineHandler = () => {
        toast.success("Your are offline");
      };

      window.addEventListener("online", onlineHandler);
      window.addEventListener("offline", offlineHandler);

      setOnline(window.navigator.onLine);

      return () => {
        window.removeEventListener("online", onlineHandler);
        window.removeEventListener("offline", offlineHandler);
      };
    }
  }, [window]);

  return online;
}

export default useDetectOnline;
