import React, { Fragment, useState, useEffect } from 'react';
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
	message
} from 'antd';
import moment from "moment";
import { AiOutlineUser } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { IoIosUndo } from "react-icons/io";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";

// ------ SERVICES -----
import { getRespostas, postResposta } from "../../../../services/resposta";

// ------ FUNCTIONS ------
import { dateDifferenceInDays } from "../../../../utils/functions";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
	<List
		dataSource={comments}
		header={`${comments.length} ${comments.length > 1 ? 'respostas' : 'resposta'}`}
		itemLayout="horizontal"
		renderItem={props => <Comment {...props} />}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
			>
				Responder
			</Button>
		</Form.Item>
	</>
);

const Comentario = (props) => {
	const [comments, setComments] = useState([]);
	const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [likes, setLikes] = useState(0);

  const { idPergunta } = props;
  
  const exibirdata = (resposta) => {
    const { dataEmissao } = resposta;
    const newDataEmissao = new Date(
      `${dataEmissao[0]}-${dataEmissao[1]}-${dataEmissao[2]}`
    );
    const dateToday = new Date();

    const differDatesInDays = dateDifferenceInDays(
      newDataEmissao,
      dateToday
    );

    return differDatesInDays;
  }

  useEffect(() => {
    getRespostas(idPergunta).then(request => {
      console.log("dadosResposta", request.data);
      
      let respostas = request.data.map((resposta) => {
      return {
				content: resposta.texto,
				author: resposta.usuario.nome,
				avatar: resposta.usuario.imagem,
				datetime: `há ${exibirdata(resposta)} dias`
			};
    });
      
      setComments(respostas);
    });
  }, []);
  
	const handleSubmit = () => {
		if (!value) return;
		setSubmitting(true);
		setTimeout(() => {
			setSubmitting(false);
      setValue('');
      let resposta = {
				texto: value,
				pergunta: idPergunta
      };
				postResposta(resposta).then(request => {
          message.success(`Obrigado pela resposta :)`);
          console.log('dadosResposta', request.data);
          
					setComments([
						...comments,
						{
							author: request.data.usuario.nome,
							avatar: request.data.usuario.imagem,
							content: <p>{request.data.texto}</p>,
							datetime: `há ${exibirdata(request.data)} dias`
						}
					]);
				});
		}, 1000);
	};

	const handleChange = e => {
		setValue(e.target.value);
	};

	return (
		<>
			{comments.length > 0 && <CommentList comments={comments} />}
			<Comment
				avatar={
					<Avatar
						src={null}
						icon={<AiOutlineUser />}
						size="large"
						className="icons"
						style={{ marginRight: '1rem' }}
					/>
				}
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
