import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// ------- STYLES -----
import "../../../styles/menu.css";

// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Stack from "react-bootstrap/Stack";
import Search from "../../common/search";
import { Space, Avatar, Menu, Layout, Dropdown, Row, Col } from "antd";
import Select from "../../common/select";

// ------ ICONS -----
import { IoIosNotifications } from 'react-icons/io';
import { IoLanguageOutline } from 'react-icons/io5';
import {
	AiOutlineUser,
	AiOutlineCaretUp,
	AiOutlineCaretDown
} from 'react-icons/ai';
import { BiLogOut } from 'react-icons/bi';

// ------ CREATED -----
import { isAuthenticated, removeTokenOnLogout } from '../../../services/auth';
import Button from "../../common/button";

//Redux
import { connect } from "react-redux";
import { selecionarBusca } from "../../../redux/modules/filtro";
import i18n from "../../../i18n";
import LocaleContext from "../../../LocaleContext";
import { useTranslation } from 'react-i18next';

// Destructuring
const { Header } = Layout;

const MenuSup = (props) => {
  const { selecionarBusca } = props;
  const navigate = useNavigate();
  const [campos, setCampos] = useState({});
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor
    });
  };
  
  
  const logout = () => {
		removeTokenOnLogout();
		navigate('/login');
  };


  const onClick = ({ key }) => {
		switch (key) {
			case '3':
				logout();
			break;
			case 'pt':
				changeLocale(key);
				break;
			case 'en':
			changeLocale(key);
			break;
				default:
				console.log(`clicou no item ${key}`);
		}
	};
  
  const IconPattern = props => {
		return (
			<Avatar
				src={props.src}
				className="icons"
				icon={<props.icon size={props.size} />}
				size={props.boxSize}
			/>
		);
	};

  

  const changeLocale = (l) => {
    console.log(l);
    if (locale !== l) {
      i18n.changeLanguage(l);
      if (l === 'pt') {
        alteraCampoTipo('Português', 'language');
      }else if(l === 'en') {
        alteraCampoTipo('English', 'language');
      }
    }
  };

  const optionsLanguage = [
		{ key: 'pt', value: 'pt', label: 'Português' },
		{ key: 'en', value: 'en', label: 'English' }
	];

  

  const menu = (
		<Menu
			align="start"
			onClick={onClick}
			items={[
				{
					key: '1',
					label: (
						<Stack style={{ marginLeft: '0.5rem' }}>
							<strong> {sessionStorage.getItem('@user-email')}</strong>
							<small>{sessionStorage.getItem('@user-name')}</small>
						</Stack>
					),
					icon: (
						<IconPattern
							src={sessionStorage.getItem('@user-image') || null}
							icon={AiOutlineUser}
							boxSize={30}
							size={30}
						/>
					)
				},
				{
					type: 'divider'
				},
				{
					key: '2',
					label: (
						<span>
							{t('menu-select-idiom-label')}:
							{localStorage.getItem('i18nextLng') === 'pt'
								? 'Português'
								: campos.language}
						</span>
					),
					icon: <IoLanguageOutline boxSize={25} size={25} />,
					children: optionsLanguage
				},

				{
					type: 'divider'
				},
				{
					key: '3',
					label: <span>{t('btn-logout')}</span>,
					danger: true,
					icon: <BiLogOut boxSize={25} size={25} />
				}
			]}
		/>
	);
  
  
  return (
		<Header className="menuSupBox">
			<Container>
				<Stack direction="horizontal" gap={5}>
					<Link to="/">
						<Navbar.Brand>
							<img
								src="/logo.png"
								width="85"
								height="60"
								className="d-inline-block align-top"
								alt="IFriends logo"
							/>
						</Navbar.Brand>
					</Link>

					<>
						<Search
							placeholder={t('menu-search-placeholder')}
							value={campos.titulo == null ? undefined : campos.titulo}
							name="titulo"
							onChange={alteraCampoTipo}
							allowClear
							onSearch={(e, f) => {
								navigate(`/`);
								selecionarBusca({ titulo: e });
							}}
							enterButton
							size="large"
						/>
					</>

					<Space align="center">
						{isAuthenticated() ? (
							<>
								<IconPattern icon={IoIosNotifications} boxSize={35} size={30} />
								<Dropdown overlay={menu} placement="bottomRight" arrow>
									<a onClick={e => e.preventDefault()}>
										<Space>
											<IconPattern
												icon={AiOutlineUser}
												boxSize={35}
												size={30}
												src={sessionStorage.getItem('@user-image') || null}
											/>
											<AiOutlineCaretDown />
										</Space>
									</a>
								</Dropdown>
							</>
						) : (
							<>
								<Select
									name="language"
									value={
										localStorage.getItem('i18nextLng') === 'pt'
											? ' Português'
											: campos.language
									}
									options={optionsLanguage}
									onChange={value => changeLocale(value)}
									bordered={false}
								/>
								<Button type="primary" onClick={() => navigate('/login')}>
									{t('btn-login')}
								</Button>
								<Button onClick={() => navigate('/cadastro')}>
									{t('btn-signup')}
								</Button>
							</>
						)}
					</Space>
				</Stack>
			</Container>
		</Header>
	);
};

const mapDispatchToProps = {
  selecionarBusca,
};

export default connect(null, mapDispatchToProps)(MenuSup);
