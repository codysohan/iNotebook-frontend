import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useTitle = (title) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = title;
  }, [navigate]);
};

export default useTitle;
