import React, { useContext, useState, useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

// ------- STYLES -----
import '../../../styles/menu.css'

// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Stack from 'react-bootstrap/Stack'
import { Space, Avatar, Menu, Layout, Dropdown, Row, Col } from 'antd'
import Select from '../../common/select'

// ------ ICONS -----
import { BsPlusSquareDotted } from 'react-icons/bs'
import { IoLanguageOutline } from 'react-icons/io5'
import { CgMenuGridR } from 'react-icons/cg'
import { AiOutlineUser, AiOutlineCaretDown } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'

// ------ CREATED -----
import { isAuthenticated, removeTokenOnLogout } from '../../../services/auth'
import Button from '../../common/button'
import { pathsMenu } from 'utils/constants'

// Redux
import i18n from '../../../i18n'
import LocaleContext from '../../../LocaleContext'
import { useTranslation } from 'react-i18next'
// import moment from 'moment/min/moment-with-locales'

// Destructuring
const { Header } = Layout

const MenuSup = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [campos, setCampos] = useState({})
  const [current, setCurrent] = useState('')
  const { locale } = useContext(LocaleContext)
  const { t } = useTranslation()
  const urlPath = location.pathname

  useEffect(() => {
    if (urlPath === pathsMenu.perguntas) {
      setCurrent(pathsMenu.perguntas)
    } else if (urlPath === pathsMenu.eventos) {
      setCurrent(pathsMenu.eventos)
    } else if (urlPath === pathsMenu.usuarios) {
      setCurrent(pathsMenu.usuarios)
    } else if (urlPath === pathsMenu.dashboard) {
      setCurrent(pathsMenu.dashboard)
    } else {
      setCurrent('/')
    }
  }, [urlPath])

  const alterarTabMenuSelecionada = (e) => {
    if (e.key === location.pathname) {
      setCurrent(e.key)
    }
    setCurrent(e.key)
  }

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  const logout = () => {
    removeTokenOnLogout()
    navigate('/login')
  }

  const userMenuActions = ({ key }) => {
    switch (key) {
      case '4':
        logout()
        break
      case 'pt':
        changeLocale(key)
        break
      case 'en':
        changeLocale(key)
        break
      default:
        console.log(`clicou no item ${key}`)
    }
  }

  const IconPattern = (props) => {
    return (
      <Avatar
        src={props.src}
        className="icons"
        icon={<props.icon size={props.size} />}
        size={props.boxSize}
      />
    )
  }

  const changeLocale = (l) => {
    console.log(l)
    if (locale !== l) {
      i18n.changeLanguage(l)
      if (l === 'pt') {
        alteraCampoTipo(' pt-BR', 'language')
      } else if (l === 'en') {
        alteraCampoTipo(' en-US', 'language')
      }
    }
  }

  const optionsLanguage = [
    { key: 'pt', value: 'pt', label: ' pt-BR' },
    { key: 'en', value: 'en', label: ' en-US' },
  ]

  // const menuCriar2 = [
  //   {
  //     key: '1',
  //     label: <Link to="/criar-pergunta">{t('label-pergunta')}</Link>,
  //   },
  //   {
  //     key: '2',
  //     label: <Link to="/criar-evento">{t('label-evento')}</Link>,
  //   },
  // ]

  const menuCriar = (
    <Menu
      onClick={userMenuActions}
      items={[
        {
          key: '1',
          label: <Link to="/criar-pergunta">{t('label-pergunta')}</Link>,
        },
        {
          key: '2',
          label: <Link to="/criar-evento">{t('label-evento')}</Link>,
        },
      ]}
    />
  )

  const menu = (
    <Menu
      onClick={userMenuActions}
      items={[
        {
          key: '1',
          label: (
            <Link to={`/perfil/${sessionStorage.getItem('@user-id')}`}>
              <Stack style={{ marginLeft: '0.5rem' }}>
                <strong> {sessionStorage.getItem('@user-name')}</strong>
                <small>{sessionStorage.getItem('@user-email')}</small>
              </Stack>
            </Link>
          ),
          icon: (
            <IconPattern
              src={sessionStorage.getItem('@user-image') || null}
              icon={AiOutlineUser}
              boxSize={30}
              size={30}
            />
          ),
        },
        {
          type: 'divider',
        },
        {
          key: '2',
          label: (
            <span>
              {t('menu-select-idiom-label')}:
              {localStorage.getItem('i18nextLng') === 'pt'
                ? ' pt-BR'
                : campos.language}
            </span>
          ),
          icon: <IoLanguageOutline size={25} />,
          children: optionsLanguage,
        },

        // {
        //   key: '3',
        //   label: <span>{t('btn-criar')}</span>,
        //   icon: <BsPlusSquareDotted boxSize={25} size={25} />,
        //   children: menuCriar,
        // },

        {
          type: 'divider',
        },
        {
          key: '4',
          label: <span>{t('btn-logout')}</span>,
          danger: true,
          icon: <BiLogOut size={25} />,
        },
      ]}
    />
  )

  const MenuTabs = () => {
    const optionsMenuActions = [
      {
        label: <Link to="/dashboard">{t('menu-tabs-label-inicio')}</Link>,
        key: '/',
      },
      {
        label: (
          <Link to="/dashboard/perguntas">
            {t('menu-tabs-label-perguntas')}
          </Link>
        ),
        key: '/dashboard/perguntas',
      },
      {
        label: (
          <Link to="/dashboard/eventos">{t('menu-tabs-label-eventos')}</Link>
        ),
        key: '/dashboard/eventos',
      },
      {
        label: (
          <Link to="/dashboard/usuarios">{t('menu-tabs-label-usuarios')}</Link>
        ),
        key: '/dashboard/usuarios',
      },
    ]
    return (
      <Menu
        onClick={alterarTabMenuSelecionada}
        selectedKeys={[current]}
        mode="horizontal"
        items={optionsMenuActions}
        overflowedIndicator={<CgMenuGridR size={25} />}
      />
    )
  }

  return (
    <Header className="menuSupBox">
      <Container>
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col xs={8} sm={4} md={2} lg={2} xl={2} className="logo">
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
          </Col>
          <Col xs={8} sm={6} md={10} lg={10} xl={8}>
            <MenuTabs />
          </Col>
          {isAuthenticated() ? (
            <Col xs={6} sm={2} md={2} lg={2} xl={12}>
              <Space align="center">
                <>
                  {/* <Dropdown overlay={menuCriar} placement="bottomRight" arrow>
                    <BsPlusSquareDotted
                      size={25}
                      style={{ marginRight: 5, cursor: 'pointer' }}
                    />
                  </Dropdown> */}
                  <Dropdown overlay={menu} placement="bottomRight" arrow>
                    <Space style={{ cursor: 'pointer' }}>
                      <IconPattern
                        icon={AiOutlineUser}
                        boxSize={35}
                        size={30}
                        src={sessionStorage.getItem('@user-image') || null}
                      />
                      <AiOutlineCaretDown />
                    </Space>
                  </Dropdown>
                </>
              </Space>
            </Col>
          ) : (
            <Col xs={12} sm={8} md={4} lg={4} xl={12}>
              <Space>
                <Select
                  name="language"
                  value={locale}
                  options={optionsLanguage}
                  onChange={(value) => changeLocale(value)}
                  bordered={false}
                  showSearch={false}
                />
                <Button
                  type="primary"
                  onClick={(e) => {
                    e.preventDefault()
                    navigate('/login')
                  }}
                >
                  {t('btn-login')}
                </Button>
                {/* <Button onClick={() => navigate('/cadastro')}>
                  {t('btn-signup')}
                </Button> */}
              </Space>
            </Col>
          )}
        </Row>
      </Container>
    </Header>
  )
}

export default MenuSup
