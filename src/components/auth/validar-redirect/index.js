import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { message } from 'antd'
import { autenticaEmailUsuario } from '../../../services/usuario'
import { useTranslation } from 'react-i18next'

const ValidarRedirect = () => {
  const navigate = useNavigate()
  const { codigoVerificador } = useParams()
  const { t } = useTranslation()

  useEffect(() => {
    autenticaEmailUsuario(codigoVerificador)
      .then((_) => {
        message.success(t('sinup-email-validate'))
        navigate('/login')
      })
      .catch((error) => {
        console.log(error)
        message.error(
          error.response.data + ' - ' + error.code + ' ' + error.response.status
        )
        navigate('/login')
      })
  }, [])
}

export default ValidarRedirect
