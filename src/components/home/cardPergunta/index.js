import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// Antd and Bootstrap
import { Col, Row } from "react-flexbox-grid";
import { Tooltip, Skeleton, Card, Avatar, Typography, Divider } from "antd";
import Button from "../../common/button";

// ------ ICONS -----
import { FaRegThumbsUp, FaRegComment, FaRegEye } from "react-icons/fa";
import { IoIosUndo } from "react-icons/io";
import { GoMegaphone } from "react-icons/go";
import { UserOutlined } from "@ant-design/icons";

// ------ COMMONS ------
import ListTags from "../../common/list-tags";

// Destructuring
const { Meta } = Card;
const { Paragraph } = Typography;

const CardPergunta = (props) => {
  const navigate = useNavigate();
  const { item, loading = false } = props;

  return (
    <Skeleton loading={loading} avatar active>
      <Paragraph>
        <Card
          className="card-box"
          onClick={() => navigate(`/pergunta/${item.key}`)}
          hoverable
        >
          <Paragraph strong>
            <Fragment>
              <Row style={{ marginBottom: "0.75rem" }}>
                <Col xs={12} sm={12}>
                  <ListTags tags={item.tags} />
                </Col>
              </Row>
              <Row middle="xs" style={{ marginBottom: "0.75rem" }}>
                <Col xs={2} sm={2} md={1}>
                  <Avatar
                    src={item.imgPerfil || null}
                    icon={<UserOutlined />}
                    size="large"
                  />
                </Col>
                <Col xs={8} sm={8} md={10}>
                  <Col xs={12} sm={12}>
                    {item.titulo}
                    <Row start="xs" middle="xs">
                      <Col xs={12} sm={12}>
                        <small>Por: {item.autor}</small>
                        <Meta description={<small>{item.data}</small>} />
                      </Col>
                    </Row>
                  </Col>
                </Col>
                <Col xs={2} sm={2} md={1}>
                  <GoMegaphone color={"var(--red-medium)"} />
                </Col>
              </Row>
            </Fragment>
          </Paragraph>
          <Divider />
          {item.descricao}
          <Meta
            description={
              <Fragment>
                <br />
                <Row className="align-items-center justify-content-between gy-3">
                  <Col xs={4} sm={4} md={2} xl={1}>
                    <Tooltip title={"Curtidas"}>
                      <FaRegThumbsUp /> {item.curtidas}{" "}
                    </Tooltip>
                  </Col>
                  <Col xs={4} sm={4} md={2} xl={1}>
                    <Tooltip title={"Comentários"}>
                      <FaRegComment /> {item.comentarios}
                    </Tooltip>
                  </Col>
                  <Col xs={4} sm={4} md={2} xl={1}>
                    <Tooltip title={"Visualizações"}>
                      <FaRegEye /> {item.visualizacoes}{" "}
                    </Tooltip>
                  </Col>
                  <Col xs={12} sm={12} md={6} xl={9}>
                    <Row>
                      <Col className="d-flex justify-content-center">
                        <Button
                          type="primary"
                          icon={<IoIosUndo color="white" />}
                          className="button-right"
                          onClick={() => {
                            navigate(`/pergunta/${item.id}`);
                          }}
                          style={{
                            background: "var(--green)",
                            borderColor: "var(--green-medium)",
                          }}
                          label="&nbsp;&nbsp; Responder"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Fragment>
            }
          />
        </Card>
      </Paragraph>
    </Skeleton>
  );
};

export default CardPergunta;
