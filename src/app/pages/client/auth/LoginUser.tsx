import { setAccessToken } from "@app/utils/localstorage";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useNavigate();

  const handleLogin = () => {
    setAccessToken("token");
    navigate("/");
  };

  return <Button onClick={handleLogin}>Login User</Button>;
};

export default LoginUser;
