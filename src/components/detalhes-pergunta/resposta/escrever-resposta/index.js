import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
	Comment,
	Avatar,
	Form,
	Button,
	List,
	Input,
	Row,
	Col,
	Space,
	Tooltip,
	Typography,
	message,
	Card,
	Dropdown,
	Menu
} from 'antd';
import moment from "moment";
import { AiOutlineCheckCircle, AiOutlineEdit } from 'react-icons/ai';
import { IoSend } from "react-icons/io5";
import { IoIosUndo } from "react-icons/io";
import { LikeOutlined, LikeFilled, UserOutlined } from '@ant-design/icons';
import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { RiQuestionAnswerLine } from 'react-icons/ri';

// ------ SERVICES -----
import { getRespostas, postResposta } from "../../../../services/resposta";
import { isAuthenticated } from '../../../../services/auth';
import { postCurtidaResposta } from '../../../../services/curtidas-resposta';


// ------ FUNCTIONS ------
import { getBeetweenDateWithTextForApiDate } from '../../../../utils/functions';

import CardCadastro from '../../../common/card-cadastro';
const { TextArea } = Input;

const CommentList = ({ comments }) => {
	const { t } = useTranslation();

	const menu = (id) => {
		return (
			<Menu
				align="start"
				items={[
					{
						key: '1',
						label: t('label-remove-view'),
						icon: <FiTrash2 />
					},

					{
						key: '2',
						label: t('label-edit'),
						icon: <AiOutlineEdit />
					}
				]}
			/>
		)
	};

	return (
		<List
			dataSource={comments}
			header={
				<Typography.Title level={5} style={{ marginLeft: '0.5rem' }}>
					{comments.length + ' '}
					{comments.length > 1 ? t('label-answers') : t('label-answer')}
				</Typography.Title>
			}
			itemLayout="horizontal"
			renderItem={props => {
				console.log(props.key);

				return (
					<Card style={{ marginBottom: '0.75rem' }}>
						{isAuthenticated() &&
							sessionStorage.getItem('@user-name') === props.author ? (
							<Row justify="end" align="middle">
								<Col>
									<Dropdown overlay={menu} placement="bottomRight" arrow>
										<a onClick={e => e.preventDefault()}>
											<FiMoreVertical />
										</a>
									</Dropdown>
								</Col>
							</Row>
						) : (
							<></>
						)}

						<Comment {...props} />
					</Card>
				)
			}}
		/>
	);
}



const Editor = ({ onChange, onSubmit, submitting, value }) => {
	const { t } = useTranslation();
	
	return (
		<>
			<CardCadastro
				titulo={t('label-your-answer')}
				descricao={t('label-your-answer-small')}
				children={
					<>
						<Form.Item>
							<TextArea
								placeholder={t('criar-pergunta-placeholder-write')}
								bordered={false}
								allowClear={true}
								showCount
								maxLength={25000}
								name={'texto'}
								autoSize={{ minRows: 5, maxRows: 25 }}
								onChange={onChange}
								value={value}
							/>
						</Form.Item>

						<Form.Item style={{ marginTop: '3rem' }}>
							<Row justify="end">
								<Button
									htmlType="submit"
									loading={submitting}
									onClick={onSubmit}
									icon={
										<IoIosUndo color="white" style={{ marginRight: '0.25rem' }} />
									}
									type="primary"
									style={{
										background: 'var(--green)',
										borderColor: 'var(--green-medium)'
									}}
								>
									{t('btn-responder')}
								</Button>
							</Row>
						</Form.Item>
					</>
				}
			/>
		</>
	)
}

const Comentario = (props) => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [value, setValue] = useState('');
	const { t } = useTranslation();
	
  	const { idPergunta } = props;
	
  useEffect(() => {
    getRespostas(idPergunta)
			.then(request => {
				console.log('dadosResposta', request.data);

				let comments = request.data.map(resposta => {
    				const { dataEmissao } = resposta;

					return {
						key: resposta.id,
						content: resposta.texto,
						author: resposta.usuario.nome,
						avatar: (
							<Avatar
								src={resposta.usuario.imagem || null}
								className="icons"
								icon={<UserOutlined size={30} /> || null}
								size={30}
							/>
						),
						datetime: getBeetweenDateWithTextForApiDate(dataEmissao)
					};
					
				});
				setComments(comments);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
  }, []);
	
	
	const handleSubmit = () => {
		if (isAuthenticated() && value) {
			setSubmitting(true);
			setTimeout(() => {
				setSubmitting(false);
				setValue('');
				let resposta = {
					texto: value,
					pergunta: idPergunta
				};
				postResposta(resposta)
					.then(request => {
						message.success(t('label-answers-thks'));
						console.log('dadosResposta', request.data);
    					const { dataEmissao } = request.data;

						setComments([
							...comments,
							{
								key: request.data.id,
								author: request.data.usuario.nome,
								avatar: (
									<Avatar
										src={request.data.usuario.imagem || null}
										className="icons"
										icon={<UserOutlined size={30} /> || null}
										size={30}
									/>
								),
								autorEmail: request.data.usuario.email,
								content: <span>{request.data.texto}</span>,
								datetime: getBeetweenDateWithTextForApiDate(dataEmissao)
							}
						]);
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
			}, 1000);
		}
		if (!value) return;
		if(!isAuthenticated()){message.info(t('label-authenticate'));} 
		
	};

	const handleChange = e => {
		setValue(e.target.value);
	};

	return (
		<>
			{comments.length > 0 && <CommentList comments={comments} id={idPergunta} />}
			<Comment
				content={
					<Editor
						onChange={handleChange}
						onSubmit={handleSubmit}
						submitting={submitting}
						value={value}
					/>
				}
			/>
			
		</>
	);
};

export default Comentario;
