import React, { useEffect } from 'react'
import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'

import { isAuthenticated } from './services/auth'

const CriaPergunta = React.lazy(() => import('./components/cria-pergunta'))
const Perguntas = React.lazy(() => import('./components/perguntas'))
const CriaEvento = React.lazy(() => import('./components/cria-evento'))
const Eventos = React.lazy(() => import('./components/eventos'))
const DetalheEventos = React.lazy(() => import('./components/eventos/detalhes'))
const Dashboard = React.lazy(() => import('./components/dashboard'))
const Home = React.lazy(() => import('./components/home'))
const DetalhesPergunta = React.lazy(() =>
  import('./components/detalhes-pergunta')
)
const Login = React.lazy(() => import('./components/auth/login'))
const Cadastro = React.lazy(() => import('./components/auth/cadastro'))
const NotFound = React.lazy(() => import('./components/common/not-found'))
const Working = React.lazy(() => import('./components/common/working'))
const Usuarios = React.lazy(() => import('./components/usuarios'))
const Perfil = React.lazy(() => import('./components/perfil'))
const RecuperacaoSenha = React.lazy(() =>
  import('./components/auth/recuperacao-senha')
)
const ValidarRedirect = React.lazy(() =>
  import('./components/auth/validar-redirect')
)

const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

const PrivateRoutes = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}

const FormsRedirect = () => {
  return isAuthenticated() ? (
    <>
      <Navigate to="/dashboard" />
    </>
  ) : (
    <Outlet />
  )
}

export default function Routing() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/config" element={<Working />} />
        <Route path="/pergunta/:id" element={<DetalhesPergunta />} />
        <Route path="/evento/:idEvento" element={<DetalheEventos />} />
        <Route
          path="/validar/:codigoVerificador"
          element={<ValidarRedirect />}
        />
        <Route
          path="/recuperacao-senha/:codigoVerificador"
          element={<RecuperacaoSenha />}
        />

        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Perguntas />} />
          <Route path="perguntas" element={<Perguntas />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>

        <Route element={<FormsRedirect />}>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/cadastro" element={<Cadastro />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path="/criar-pergunta/" element={<CriaPergunta />} />
          <Route path="/criar-evento/" element={<CriaEvento />} />
          <Route path="/perfil/:idPerfil" element={<Perfil />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
