import React, { useEffect, useState, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid'
import { Col, Row } from 'react-bootstrap'
import {
	Card,
	Divider,
	Button,
	Typography,
	Space, Input, Upload, message, Modal, Select
} from 'antd'
import { InboxOutlined, PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { FiChevronDown, FiTag } from 'react-icons/fi'
import { GoPencil } from 'react-icons/go'
import { ImNewspaper, ImCheckboxChecked } from 'react-icons/im'

import 'antd/dist/antd.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import TagGroup from '../common/tag-group';

import { postPergunta } from '../../services/perguntas';
import CardCadastro from '../common/card-cadastro';

const CriaPergunta = props => {
	const { Title, Paragraph, Text, Link } = Typography;
	const { TextArea } = Input;
	const { Dragger } = Upload;
	const { Option } = Select;

	const [stateUpload, setStateUpload] = useState({
		previewVisible: false,
		previewImage: '',
		previewTitle: '',
		fileList: []
	})

	const [campos, setCampos] = useState({
		tags: []
	})

	const alteraCampoTipo = (valor, campo) => {
		console.log(campo, valor)
		setCampos({
			...campos, [campo]: valor
		})
	}

	const getBase64 = file => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = error => reject(error);
		});
	}

	const handleCancel = () => setStateUpload({ ...stateUpload, previewVisible: false });

	const handlePreview = async file => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj);
		}

		setStateUpload({
			...stateUpload,
			previewImage: file.url || file.preview,
			previewVisible: true,
			previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
		});
	};

	const handleChange = (info) => {
		const { file } = info

		if (info.file.status === 'done') {
			message.success(`${info.file.name} arquivo enviado com sucesso`);
		} else if (info.file.status === 'error') {
			message.error(`${info.file.name} arquivo enviado com falha.`);
		}

		const isLt2M = file.size / 1024 / 1024 < 1;
		// console.log(isLt2M)
		if (isLt2M) {
			setStateUpload({ ...stateUpload, fileList: info.fileList })
		}
	};

	// const draggerUpload = {
	//   name: 'file',
	//   multiple: true,
	//   listType: "picture-card",
	//   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	//   onChange(info) {
	//     const { status } = info.file;
	//     if (status !== 'uploading') {
	//       console.log(info.file, info.fileList);
	//     }
	//     if (status === 'done') {
	//       message.success(`${info.file.name} file uploaded successfully.`);
	//     } else if (status === 'error') {
	//       message.error(`${info.file.name} file upload failed.`);
	//     }
	//   },
	//   onDrop(e) {
	//     console.log('Dropped files', e.dataTransfer.files);
	//   },
	// };


	// ----------------------

	// const onChange = ({ fileList: newFileList }) => {
	//   setStateUpload({ ...stateUpload, newFileList });
	// };

	// const onPreview = async file => {
	//   let src = file.url;
	//   if (!src) {
	//     src = await new Promise(resolve => {
	//       const reader = new FileReader();
	//       reader.readAsDataURL(file.originFileObj);
	//       reader.onload = () => resolve(reader.result);
	//     });
	//   }
	//   const image = new Image();
	//   image.src = src;
	//   const imgWindow = window.open(src);
	//   imgWindow.document.write(image.outerHTML);
	// };

	const { previewVisible, previewImage, previewTitle, fileList } = stateUpload;

	const navigate = useNavigate();

	const uploadButton = (
		<div>
			<PlusOutlined />
			<div style={{ marginTop: 8 }}>Upload</div>
		</div>
	);

	const salvar = pergunta => {
		let perguntaEntity = { ...pergunta, usuario: 2, categoria: 1 }
		postPergunta(perguntaEntity)
			.then((request) => {
				// atualizaData(request.data)
				// callback && callback();
				message.success((`Pergunta - ${request.data.titulo} - salva com sucesso.`))
			})
	}

	return (
		<Fragment>
			<Grid fluid style={{ width: '80%' }}>
				<Title level={3} title>
					Faça a sua pergunta
				</Title>
				<Row between="xs" top="xs">
					<Col xs={12} sm={12} xl={8}>
						<Row between="xs" top="xs">
							<Space direction="vertical" size="middle">
								<Col xs={12} sm={12}>
									{CardCadastro({
										icone: <GoPencil />,
										titulo: 'Título',
										descricao: 'Informe um título sucinto que ajude a compreender melhor o problema.',
										children:
											<Input
												placeholder={'Escreva aqui'}
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
									})}
								</Col>

								<Col xs={12} sm={12}>
									<CardCadastro
										icone={<ImNewspaper />}
										titulo='Descrição do Problema'
										descricao='Inclua todas as informações necessárias para alguém conseguir responder sua pergunta.'
										children={
											<TextArea
												placeholder={'Escreva aqui'}
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
											/>}
									/>
								</Col>
								<Col xs={12} sm={12}>
									<ImgCrop
										rotate
										modalTitle={'Editar Foto'}
										modalCancel={'Cancelar'}
										modalOk={'Confirmar'}
										beforeCrop={file => {
											// console.log('bbb', file)
											const isLt2M = file.size / 1024 / 1024 < 1;
											if (!isLt2M) {
												message.error('A imagem deve ser menor que 1MB');
											}
											return isLt2M;
										}}
									>
										<Dragger
											action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											listType="picture-card"
											fileList={fileList}
											onPreview={handlePreview}
											onChange={handleChange}
											// disabled={fileList.length >= 1}
											// beforeUpload={file => {
											//   console.log('DASASPO', file)
											//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
											//   if (!isJpgOrPng) {
											//     message.error('You can only upload JPG/PNG file!');
											//   }
											//   const isLt2M = file.size / 1024 / 1024 < 0.00001;
											//   if (!isLt2M) {
											//     message.error('Image must smaller than 2MB!');
											//   }
											//   return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
											// }}
											// progress={({
											//   strokeColor: {
											//     '0%': '#108ee9',
											//     '100%': '#87d068',
											//   },
											//   strokeWidth: 3,
											//   format: percent => `${parseFloat(percent.toFixed(2))}%`,
											// })}
											maxCount={1}
											style={{ marginBottom: '1rem' }}
										>
											{fileList.length >= 1 ? (
												<div style={{ padding: '0.25rem' }}>
													<p className="ant-upload-text">
														Limite de imagens alcançado!
													</p>
													<p className="ant-upload-hint">
														Adicionar novas imagens substituirá a última.
													</p>
												</div>
											) : (
												<div style={{ padding: '0.25rem' }}>
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
										titulo: 'Categorias',
										descricao: 'Selecione a categoria que melhor representa a sua pergunta.',
										children:
											<Select
												showSearch
												placeholder="Selecione uma categoria"
												optionFilterProp="children"
												name={'id_categoria'}
												onChange={alteraCampoTipo}
												value={campos.id_categoria}
												// onSearch={onSearch}
												filterOption={(input, option) =>
													option.children
														.toLowerCase()
														.indexOf(input.toLowerCase()) >= 0
												}
												bordered={false}
												allowClear={true}
												style={{ width: '100%' }}
											>
												<Option value="Ahaa">AHAN</Option>
												<Option value="UHUMM">Uhumm</Option>
												<Option value="é">é</Option>
											</Select>
									})}
								</Col>
								<Col xs={12} sm={12}>
									{CardCadastro({
										icone: <FiTag />,
										titulo: 'Tags',
										descricao: 'Adicione algumas tags para complementar a sua pergunta.',
										children:
											<TagGroup
												tags={campos.tags}
												alteraCampoTipo={alteraCampoTipo}
											/>
									})}
								</Col>

								<Col xs={12} sm={12} className="d-flex justify-content-between">
									<Button
										type="primary"
										danger
										onClick={() => navigate('/')}
									>
										Cancelar
									</Button>
									<Button type="primary" onClick={() => salvar(campos)}>
										Confirmar
									</Button>
									{console.log(campos)}
								</Col>
							</Space>
						</Row>
					</Col>
					<Col xs={12} sm={12} xl={4}>
						<Typography>
							<Paragraph>
								<pre style={{ padding: '1.25rem' }}>
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
						style={{ width: '90%', borderRadius: '0.25rem' }}
						src={previewImage}
					/>
				</Col>
			</Modal>
		</Fragment>
	);
}

export default CriaPergunta;