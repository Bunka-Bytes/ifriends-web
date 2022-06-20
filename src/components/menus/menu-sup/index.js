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
import { Space, Avatar, Badge, Layout } from "antd";
import Select from "../../common/select";

// ------ ICONS -----
import { IoIosNotifications } from "react-icons/io";
import { AiOutlineUser } from "react-icons/ai";

//Redux
import { connect } from "react-redux";
import { selecionarBusca } from "../../../redux/modules/filtro";
import i18n from "../../../i18n";
import LocaleContext from "../../../LocaleContext";

// Destructuring
const { Header } = Layout;

const MenuSup = (props) => {
  const { selecionarBusca } = props;
  const navigate = useNavigate();
  const [campos, setCampos] = useState({});
  const { locale } = useContext(LocaleContext);

  const changeLocale = (l) => {
    console.log(l);
    if (locale !== l) {
      i18n.changeLanguage(l);
    }
  };

  const optionsLanguage = [
    { value: "pt", label: "Português" },
    { value: "en", label: "Inglês" },
  ];

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    });
  };
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
              placeholder="Pesquisar por perguntas e interesses"
              value={campos.titulo == null ? undefined : campos.titulo}
              name="titulo"
              onChange={alteraCampoTipo}
              allowClear
              onSearch={(e, f) => {
                navigate(`/`);
                selecionarBusca({ pesquisa: e });
              }}
              enterButton
              size="large"
            />
          </>

          <Space align="center">
            <Select
              name="language"
              value={campos.language}
              options={optionsLanguage}
              onChange={(value) => changeLocale(value)}
              bordered={false}
            />
            {/* <Badge dot>
              <Avatar
                icon={<IoIosNotifications />}
                className="icons"
              />
            </Badge> */}
            <Avatar icon={<AiOutlineUser />} className="icons" />
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
