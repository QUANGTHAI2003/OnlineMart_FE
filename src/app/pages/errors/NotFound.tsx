import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => (
  <Result
    style={{
      height: "100vh",
    }}
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to="/">Back Home</Link>
      </Button>
    }
  />
);

export default NotFound;
