import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "react-flexbox-grid";
import { Col, Row } from "react-bootstrap";
import {
  Divider,
  Button,
  Typography,
  Space,
  Input,
  Upload,
  message,
  Modal,
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import { FiChevronDown, FiTag } from "react-icons/fi";
import { GoPencil } from "react-icons/go";
import { ImNewspaper, ImCheckboxChecked } from "react-icons/im";

import "bootstrap/dist/css/bootstrap.min.css";
import TagGroup from "../common/tag-group";

import { postPergunta } from "../../services/pergunta";
import Select from "../common/select";
import CardCadastro from "../common/card-cadastro";

import axios from "axios";

const CriaPergunta = (props) => {
  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;
  const { Dragger } = Upload;

  const navigate = useNavigate();

  const [stateUpload, setStateUpload] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const { previewVisible, previewImage, previewTitle, fileList } = stateUpload;

  const [campos, setCampos] = useState({
    tags: [],
  });

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () =>
    setStateUpload({ ...stateUpload, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateUpload({
      ...stateUpload,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = (info) => {
    const { file } = info;
    console.log(info);
    if (info.file.status === "done") {
      message.success(`${info.file.name} arquivo enviado com sucesso`);
      alteraCampoTipo(file.response.data.url, "image");
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} arquivo enviado com falha.`);
    }

    const isLt2M = file.size / 1024 / 1024 < 1;
    if (isLt2M) {
      setStateUpload({ ...stateUpload, fileList: info.fileList });
    }
  };

  const salvar = (pergunta) => {
    //   criar dados para categorias
    postPergunta(pergunta).then((request) => {
      message.success(`Pergunta - ${request.data.titulo} - salva com sucesso.`);
    });
  };

  const optionsCategoria = [{ value: 1, label: "Matemática" }];

  const uploadImage = (img) => {
    // let body = new FormData();
    // body.set("key", "bb2fd25e124822a816f0c74af334209d");

    // body.append("image", img);

    // axios({
    //   method: "post",
    //   url: "https://api.imgbb.com/1/upload",
    //   data: body,
    // });

    return `https://api.imgbb.com/1/upload?key=bb2fd25e124822a816f0c74af334209d`;
  };

  return (
    <Fragment>
      <Grid fluid>
        <Title level={3} title>
          Faça a sua pergunta
        </Title>
        <Row between="xs" top="xs" className="g-4">
          <Col xs={12} sm={12} xl={8}>
            <Row between="xs" top="xs">
              <Space direction="vertical" size="middle">
                <Col xs={12} sm={12}>
                  {CardCadastro({
                    icone: <GoPencil />,
                    titulo: "Título",
                    descricao:
                      "Informe um título sucinto que ajude a compreender melhor o problema.",
                    children: (
                      <Input
                        placeholder={"Escreva aqui"}
                        bordered={false}
                        allowClear={true}
                        showCount
                        maxLength={50}
                        name={"titulo"}
                        onChange={(e) =>
                          alteraCampoTipo(e.target.value, e.target.name)
                        }
                        value={campos.titulo}
                      />
                    ),
                  })}
                </Col>

                <Col xs={12} sm={12}>
                  <CardCadastro
                    icone={<ImNewspaper />}
                    titulo="Descrição do Problema"
                    descricao="Inclua todas as informações necessárias para alguém conseguir responder sua pergunta."
                    children={
                      <TextArea
                        placeholder={"Escreva aqui"}
                        bordered={false}
                        allowClear={true}
                        showCount
                        maxLength={25000}
                        name={"texto"}
                        autoSize={{ minRows: 5, maxRows: 25 }}
                        value={campos.texto}
                        onChange={(e) =>
                          alteraCampoTipo(e.target.value, e.target.name)
                        }
                      />
                    }
                  />
                </Col>
                <Col xs={12} sm={12}>
                  <ImgCrop
                    rotate
                    modalTitle={"Editar Foto"}
                    modalCancel={"Cancelar"}
                    modalOk={"Confirmar"}
                    beforeCrop={(file) => {
                      const isLt2M = file.size / 1024 / 1024 < 1;
                      if (!isLt2M) {
                        message.error("A imagem deve ser menor que 1MB");
                      }
                      return isLt2M;
                    }}
                  >
                    <Dragger
                      action={(file) => {
                        return uploadImage(file);
                      }}
                      // customRequest={(componentsData) => {
                      //   console.log(componentsData);
                      //   uploadImage(componentsData.file)
                      //     .then(componentsData.onSuccess("Ok"))
                      //     .catch(componentsData.onError("deu ruim"));
                      // }}
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                      maxCount={1}
                      style={{ marginBottom: "1rem" }}
                      name="image"
                    >
                      {fileList.length >= 1 ? (
                        <div style={{ padding: "0.25rem" }}>
                          <p className="ant-upload-text">
                            Limite de imagens alcançado!
                          </p>
                          <p className="ant-upload-hint">
                            Adicionar novas imagens substituirá a última.
                          </p>
                        </div>
                      ) : (
                        <div style={{ padding: "0.25rem" }}>
                          <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                          </p>
                          <p className="ant-upload-text">
                            Clique ou arraste a imagem para esta área para fazer
                            upload
                          </p>
                          <p className="ant-upload-hint">
                            Suporta apenas fotos com menos de 1mb
                          </p>
                        </div>
                      )}
                    </Dragger>
                  </ImgCrop>
                </Col>
                <Col xs={12} sm={12}>
                  {CardCadastro({
                    icone: <FiChevronDown />,
                    titulo: "Categorias",
                    descricao:
                      "Selecione a categoria que melhor representa a sua pergunta.",
                    children: (
                      <Select
                        showSearch
                        placeholder="Selecione uma categoria"
                        optionFilterProp="children"
                        name={"categoria"}
                        onChange={alteraCampoTipo}
                        value={campos.categoria}
                        // onSearch={onSearch}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                        bordered={false}
                        allowClear={true}
                        style={{ width: "100%" }}
                        options={optionsCategoria}
                      />
                    ),
                  })}
                </Col>
                <Col xs={12} sm={12}>
                  {CardCadastro({
                    icone: <FiTag />,
                    titulo: "Tags",
                    descricao:
                      "Adicione algumas tags para complementar a sua pergunta.",
                    children: (
                      <TagGroup
                        tags={campos.tags}
                        alteraCampoTipo={alteraCampoTipo}
                      />
                    ),
                  })}
                </Col>

                <Col xs={12} sm={12} className="d-flex justify-content-between">
                  <Button type="primary" danger onClick={() => navigate("/")}>
                    Cancelar
                  </Button>
                  <Button type="primary" onClick={() => salvar(campos)}>
                    Confirmar
                  </Button>
                </Col>
              </Space>
            </Row>
          </Col>
          <Col xs={12} sm={12} xl={4}>
            <Typography>
              <Paragraph>
                <pre style={{ padding: "1.25rem", margin: "0" }}>
                  <Title level={4} className="text-center">
                    <ImCheckboxChecked /> &nbsp;Como fazer uma boa pergunta?
                  </Title>
                  <Divider />
                  <Title level={5}>1. Resuma o seu problema</Title>
                  <Paragraph>
                    <ul>
                      <li>
                        Antes de fazer uma pergunta tenha em mente "qual é o
                        problema". Para isso é recomendado que primeiramente se
                        atente a reunir detalhes e informações que poderão ser
                        uteis.
                      </li>
                      <li>
                        Considere que uma pergunta não se caracteriza como boa
                        devido ao seu tamanho, mas sim devido às informações
                        fornecidas.
                      </li>
                      <li>
                        Opte por um título sucinto e detalhado, e recorra a
                        termos chaves, as tags podem ajudar nesse sentido.
                      </li>
                    </ul>
                  </Paragraph>
                  <Title level={5}>2. Descreva o seu problema</Title>
                  <Paragraph>
                    <ul>
                      <li>
                        Apresente seu problema com o máximo de detalhes, o que
                        você já tentou e conte-nos o que você conseguiu até
                        então.
                      </li>
                      <li>
                        Lembre-se que conseguirá melhores respostas quando você
                        fornecer e detalhar melhor o seus dados.
                      </li>
                      <li>
                        Quando for apropriado, faça uso de imagens para
                        exemplificar melhor o problema.
                      </li>
                    </ul>
                  </Paragraph>
                  <Title level={5}>3. Objetivo final</Title>
                  <Paragraph>
                    <ul>
                      <li>
                        O que é preciso para chegar a um resultado viável, tente
                        ser o mais claro possível em expressar qual é o seu
                        objetivo.
                      </li>
                    </ul>
                  </Paragraph>
                </pre>
              </Paragraph>
            </Typography>
          </Col>
        </Row>
      </Grid>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Col className="d-flex align-items-center flex-column">
          <img
            alt="example"
            style={{ width: "90%", borderRadius: "0.25rem" }}
            src={previewImage}
          />
        </Col>
      </Modal>
    </Fragment>
  );
};

export default CriaPergunta;
