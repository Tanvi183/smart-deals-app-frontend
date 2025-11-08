import { use } from "react";
import { AtuhContext } from "../contexts/AuthContext";

const useAuth = () => {
  const authInfo = use(AtuhContext);
  return authInfo;
};

export default useAuth;
