import { setAccessToken } from "@app/utils/localstorage";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const LoginAdmin = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useNavigate();

  const handleLogin = () => {
    setAccessToken("token");
    navigate("/");
  };

  return <Button onClick={handleLogin}>Login Admin</Button>;
};

export default LoginAdmin;
