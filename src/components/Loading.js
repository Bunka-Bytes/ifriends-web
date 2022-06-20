import { Spin } from "antd";

function Loading() {
  return (
    <Spin size="large" style={{ position: "fixed", top: "50%", left: "50%" }} />
  );
}

export default Loading;
