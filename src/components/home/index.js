import React, { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
// ------- STYLES -----
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

// ------- COMPONENTS -----

// Antd and Bootstrap
import { Grid } from "react-flexbox-grid";
import { Typography, List, Empty, BackTop, message } from "antd";
import Button from "../common/button";
import CardPergunta from "./cardPergunta";

// Created
import Banner from "./banner";

// ------ ICONS -----
import { IoIosUndo } from "react-icons/io";

// Services
import { getPerguntas } from "../../services/pergunta";
import { connect } from "react-redux";
import { selecionarBusca } from "../../redux/modules/filtro";

// ------ FUNCTIONS ------
import { getBeetweenDateWithTextForApiDate } from '../../utils/functions';
import { useTranslation } from "react-i18next";

const Home = (props) => {
  const [listData, setListData] = useState([]);
  const navigate = useNavigate();
  const { Title } = Typography;
  const { filtro, selecionarBusca } = props;
  const { t } = useTranslation();

  useEffect(() => {
    return () => selecionarBusca({});
  }, []);

  useEffect(() => {
    getPerguntas(filtro)
			.then(request => {
				console.log('dados:', request.data);

				let lista = request.data.map(pergunta => {
					const { dataEmissao } = pergunta;

					return {
						key: pergunta.id,
						id: pergunta.id,
						titulo: pergunta.titulo,
						descricao: pergunta.texto,
						autor: pergunta.usuario.nome,
						imgPerfil: pergunta.usuario.imagem,
						data: getBeetweenDateWithTextForApiDate(dataEmissao),
						curtidas: pergunta.qtdCurtida,
						comentarios: pergunta.qtdResposta,
						visualizacoes: Math.ceil(Math.random() * 1000),
						nomeCategoria: pergunta.categoria.nome,
						tags: pergunta.tags
					};
				});
				setListData(lista);
			})
			.catch(error => {
				console.log(error);
				return message.error(
					error.response.data + ' - ' + error.code + ' ' + error.response.status
				);
			});
  }, [filtro]);

  return (
		<Fragment>
			<Banner />
			<Grid fluid style={{ marginTop: '2rem' }}>
				{listData.length > 0 ? (
					<Fragment>
						<BackTop />
						<Title level={3}>{t('home-perguntas-title')}</Title>

						<List
							itemLayout="vertical"
							size="large"
							pagination={{
								onChange: page => {
									console.log(page);
								},
								pageSize: 8
							}}
							dataSource={listData}
							renderItem={item => (
								<List.Item>
									<CardPergunta item={item} />
								</List.Item>
							)}
						/>
					</Fragment>
				) : (
					<Empty
						description={
							<Title level={5}>{t('home-perguntas-not-found')}</Title>
						}
					>
						<Button
							icon={<IoIosUndo color="white" />}
							type="primary"
							onClick={() => navigate('/criar-pergunta')}
							label={t('home-criar-pergunta')}
						/>
					</Empty>
				)}
			</Grid>
		</Fragment>
	);
};

const mapStateToProps = (state) => {
  const { filtro } = state.filtroReducer;
  return { filtro };
};

const mapDispatchToProps = {
  selecionarBusca,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
