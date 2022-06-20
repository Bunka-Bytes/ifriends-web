import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-flexbox-grid";

import Image from "react-bootstrap/Image";

import { Button, Result } from "antd";

const Working = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<Image width={360} fluid src="/imgs/work/working.svg" />}
      title="Em Breve"
      subTitle="Desculpe, esta página ainda está em desenvolvimento"
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Ir para a página inicial
        </Button>
      }
    />
  );
};

export default Working;
