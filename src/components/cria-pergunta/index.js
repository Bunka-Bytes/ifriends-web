import React, { useEffect, useState, Fragment } from "react";
import { useTranslation } from 'react-i18next';
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
import { getCategoriasPergunta } from '../../services/categorias-pergunta';
import Select from "../common/select";
import CardCadastro from "../common/card-cadastro";

import axios from "axios";

const CriaPergunta = (props) => {
  const { Title, Paragraph } = Typography;
  const { TextArea } = Input;
  const { Dragger } = Upload;

  const navigate = useNavigate();
  const { t } = useTranslation();

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
  const [listData, setListData] = useState([]);
  

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
      message.success(`${info.file.name} ${t('log-message-file-sent')}`);
      alteraCampoTipo(file.response.data.url, "image");
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} ${t('log-message-file-sent-error')}`);
    }

    const isLt2M = file.size / 1024 / 1024 < 1;
    if (isLt2M) {
      setStateUpload({ ...stateUpload, fileList: info.fileList });
    }
  };

  const salvar = (pergunta) => {
    //   criar dados para categorias
    postPergunta(pergunta)
			.then(request => {
				message.success(t('log-message-question-sent'));
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
    navigate('/');
  };

  // const optionsCategoria = [{ value: 1, label: "Matemática" }];
   useEffect(() => {
			getCategoriasPergunta()
				.then(request => {
					let lista = request.data.map(categoria => {
						return {
							value: categoria.id,
							label: categoria.nome
						};
					});
					setListData(lista);
				})
				.catch(error => {
					console.log(error);
					return message.error(
						error.response.data +
							' - ' +
							error.code +
							' ' +
							error.response.status
					);
				});
		}, []);

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
					{t('criar-pergunta-title')}
				</Title>
				<Row between="xs" top="xs" className="g-4">
					<Col xs={12} sm={12} xl={8}>
						<Row between="xs" top="xs">
							<Space direction="vertical" size="middle">
								<Col xs={12} sm={12}>
									{CardCadastro({
										icone: <GoPencil />,
										titulo: t('criar-pergunta-label-title'),
										descricao: t('criar-pergunta-label-title-descp'),
										children: (
											<Input
												placeholder={t('criar-pergunta-placeholder-write')}
												bordered={false}
												allowClear={true}
												showCount
												maxLength={50}
												name={'titulo'}
												onChange={e =>
													alteraCampoTipo(e.target.value, e.target.name)
												}
												value={campos.titulo}
											/>
										)
									})}
								</Col>

								<Col xs={12} sm={12}>
									<CardCadastro
										icone={<ImNewspaper />}
										titulo={t('criar-pergunta-label-problem')}
										descricao={t('criar-pergunta-label-problem-descp')}
										children={
											
											<TextArea
												placeholder={t('criar-pergunta-placeholder-write')}
												bordered={false}
												allowClear={true}
												showCount
												maxLength={25000}
												name={'texto'}
												autoSize={{ minRows: 5, maxRows: 25 }}
												value={campos.texto}
												onChange={e =>
													alteraCampoTipo(e.target.value, e.target.name)
												}
											/>
										}
									/>
								</Col>
								<Col xs={12} sm={12}>
									<ImgCrop
										rotate
										modalTitle={t('criar-pergunta-img-edit')}
										modalCancel={t('criar-pergunta-img-cancel')}
										modalOk={t('criar-pergunta-img-confirm')}
										beforeCrop={file => {
											const isLt2M = file.size / 1024 / 1024 < 1;
											if (!isLt2M) {
												message.error(t('criar-pergunta-img-error'));
											}
											return isLt2M;
										}}
									>
										<Dragger
											action={file => {
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
											style={{ marginBottom: '1rem' }}
											name="image"
										>
											{fileList.length >= 1 ? (
												<div style={{ padding: '0.25rem' }}>
													<p className="ant-upload-text">
														{t('criar-pergunta-img-warn-limit')}
													</p>
													<p className="ant-upload-hint">
														{t('criar-pergunta-img-warn-substitution')}
													</p>
												</div>
											) : (
												<div style={{ padding: '0.25rem' }}>
													<p className="ant-upload-drag-icon">
														<InboxOutlined />
													</p>
													<p className="ant-upload-text">
														{t('criar-pergunta-img-placeholder')}
													</p>
													<p className="ant-upload-hint">
														{t('criar-pergunta-img-hint')}
													</p>
												</div>
											)}
										</Dragger>
									</ImgCrop>
								</Col>
								<Col xs={12} sm={12}>
									{CardCadastro({
										icone: <FiChevronDown />,
										titulo: t('criar-pergunta-label-category'),
										descricao: t('criar-pergunta-label-category-descp'),
										children: (
											<Select
												showSearch
												placeholder={t('criar-pergunta-label-category-select')}
												optionFilterProp="children"
												name={'categoria'}
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
												style={{ width: '100%' }}
												options={listData}
											/>
										)
									})}
								</Col>
								<Col xs={12} sm={12}>
									{CardCadastro({
										icone: <FiTag />,
										titulo: t('criar-pergunta-label-tag'),
										descricao: t('criar-pergunta-label-tag-descp'),
										children: (
											<TagGroup
												tags={campos.tags}
												alteraCampoTipo={alteraCampoTipo}
											/>
										)
									})}
								</Col>

								<Col xs={12} sm={12} className="d-flex justify-content-between">
									<Button type="primary" danger onClick={() => navigate('/')}>
										{t('criar-pergunta-cancel')}
									</Button>
									<Button type="primary" onClick={() => salvar(campos)}>
										{t('criar-pergunta-confirm')}
									</Button>
								</Col>
							</Space>
						</Row>
					</Col>
					<Col xs={12} sm={12} xl={4}>
						<Typography>
							<Paragraph>
								<pre style={{ padding: '1.25rem', margin: '0' }}>
									<Title level={4} className="text-center">
										<ImCheckboxChecked /> &nbsp;{t('good-question-title')}
									</Title>
									<Divider />
									<Title level={5}>{t('good-question-1')}</Title>
									<Paragraph>
										<ul>
											<li>{t('good-question-1-descp')}</li>
											<li>{t('good-question-1-descp-2')}</li>
											<li>{t('good-question-1-descp-3')}</li>
										</ul>
									</Paragraph>
									<Title level={5}>{t('good-question-2')}</Title>
									<Paragraph>
										<ul>
											<li>{t('good-question-2-descp')}</li>
											<li>{t('good-question-2-descp-2')}</li>
											<li>{t('good-question-2-descp-3')}</li>
										</ul>
									</Paragraph>
									<Title level={5}>{t('good-question-3')}</Title>
									<Paragraph>
										<ul>
											<li>{t('good-question-3-descp')}</li>
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
						style={{ width: '90%', borderRadius: '0.25rem' }}
						src={previewImage}
					/>
				</Col>
			</Modal>
		</Fragment>
	);
};

export default CriaPergunta;
