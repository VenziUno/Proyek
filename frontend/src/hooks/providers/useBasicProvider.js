import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useBasicProvider = () => {
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleShowNotification = () => {
    let timer = setTimeout(
      () =>
        setNotification({
          ...notification,
          show: false,
          type: "",
          message: "",
        }),
      4000
    );
    return () => clearTimeout(timer);
  };

  const [search, setSearch] = useState("");
  const [move, setMove] = useState(true);

  const router = useRouter();
  const { route } = router;
  useEffect(() => {
    setSearch("");
    setMove(true);
  }, [route]);

  return {
    loadingSpinner,
    setLoadingSpinner,
    notification,
    setNotification,
    handleShowNotification,
    search,
    setSearch,
    move,
    setMove,
    route,
  };
};