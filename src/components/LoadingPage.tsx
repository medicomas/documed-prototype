import { useContext, useEffect } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

function LoadingPage() {
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setLoading(true);

    return () => {
      setLoading(false);
    }
  }, [setLoading])

  return <></>;
}

export default LoadingPage;
