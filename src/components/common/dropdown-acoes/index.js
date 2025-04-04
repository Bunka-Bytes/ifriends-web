import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap
import {
  Dropdown,
  Menu,
  message,
  Modal,
  Typography,
  Divider,
  Select,
  Button,
} from 'antd'
import { FiMoreVertical, FiTrash2, FiAlertCircle, FiFlag } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'

// Created

// ------ ICONS -----

// Services
import { deletePergunta } from 'services/pergunta'
import { deleteResposta } from 'services/resposta'
import { deleteEvento } from 'services/evento'
import {
  getMotivosReport,
  postReportPergunta,
  postReportResposta,
  postReportEvento,
} from 'services/denuncias'

// ------ FUNCTIONS ------
import { error } from 'utils/functions'

import { isAuthenticated } from 'services/auth'
import Item from 'antd/lib/descriptions/Item'
import Input from 'antd/lib/input/Input'
import TextArea from 'antd/lib/input/TextArea'
import { MEDIUM } from 'components/common/modal'
import ModalButton, { NORMAL } from 'components/common/modal-button'
import EditarResposta from 'components/detalhes-pergunta/resposta/editar-resposta'

const { confirm } = Modal
const { Paragraph } = Typography
const { Option } = Select

const DropdownAcoesUsuario = (props) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { targetAction, targetData } = props
  const [listData, setListData] = useState([])
  const [resposta, setResposta] = useState(targetData)
  const [editarResposta, setEditarResposta] = useState(null)

  const [campos, setCampos] = useState({})

  const alteraCampoTipo = (valor, campo) => {
    setCampos({
      ...campos,
      [campo]: valor,
    })
  }

  useEffect(() => {
    getMotivosReport()
      .then((request) => {
        const lista = request.data.map((motivos, id) => {
          return {
            id: motivos.id,
            value: motivos.id,
            label: motivos.motivo,
          }
        })
        setListData(lista)
      })
      .catch(error)
  }, [campos])

  const onClick = ({ key }) => {
    // Remover item
    if (key === '1') {
      return confirm({
        title: t('label-confirm'),
        icon: (
          <FiAlertCircle style={{ color: 'var(--red)', fontSize: '1.25rem' }} />
        ),
        content: t('label-confirm-content'),
        okText: t('label-confirm-delete'),
        okType: 'danger',
        cancelText: t('label-confirm-cancel'),
        okButtonProps: {
          type: 'primary',
        },

        onOk() {
          switch (targetAction) {
            case 'pergunta':
              deletePergunta(targetData.id)
                .then((response) => {
                  message.success(t('label-success-delete'))
                  navigate('/dashboard/perguntas')
                })
                .catch(error)
              break
            case 'evento':
              deleteEvento(targetData.id)
                .then((response) => {
                  message.success(t('label-success-delete'))
                  navigate('/dashboard/eventos')
                })
                .catch(error)
              break
            case 'resposta':
              deleteResposta(targetData.id)
                .then((response) => {
                  message.success(t('label-success-delete'))
                  navigate(`/pergunta/${targetData.idPergunta}`)
                })
                .catch(error)
              break

            default:
              break
          }
        },

        onCancel() {},
      })
    }
    if (key === '2') {
      switch (targetAction) {
        case 'pergunta':
          return confirm({
            title: t('perfil-label-editar'),
            width: '500px',
            icon: null,
            content: (
              <Typography>
                <Paragraph>
                  <strong>
                    Esta edição ainda está sendo construída e em breve será
                    disponibilizada para você.
                  </strong>
                </Paragraph>
                <Paragraph>
                  Se precisar urgentemente editar essas informações, por favor
                  remova a pergunta e crie outra corrindo-as. Se prefir, também
                  pode contatar o administrador em
                  <a href="malito:bunkabytes@gmail.com">
                    {' '}
                    bunkabytes@gmail.com
                  </a>
                </Paragraph>
              </Typography>
            ),
          })
        case 'resposta':
          if (resposta) {
            return confirm({
              title: t('perfil-label-editar'),
              width: '500px',
              icon: null,
              okButtonProps: { htmlType: 'submit' },
              content: (
                <EditarResposta resposta={resposta} setResposta={setResposta} />
              ),
              onOk() {
                editarResposta()
              },
            })
          }
          break
        case 'evento':
          return confirm({
            title: t('perfil-label-editar'),
            width: '500px',
            icon: null,
            okButtonProps: { htmlType: 'submit' },
            content: (
              <Typography>
                <Paragraph>
                  <strong>
                    Esta edição ainda está sendo construída e em breve será
                    disponibilizada para você.
                  </strong>
                </Paragraph>
                <Paragraph>
                  Se precisar urgentemente editar essas informações, por favor
                  remova o evento e crie outro corrindo-as. Se prefir, também
                  pode contatar o administrador em
                  <a href="malito:bunkabytes@gmail.com">bunkabytes@gmail.com</a>
                </Paragraph>
              </Typography>
            ),
          })
        default:
          break
      }
    }
    if (key === '3') {
      return confirm({
        title: t('label-report'),
        width: '500px',
        icon: null,
        content: (
          <Typography>
            <Paragraph>{t('label-confirm-content-report')}</Paragraph>
            <Divider />
            <label style={{ fontWeight: 800 }}>{t('label-reason') + ':'}</label>
            <Select
              placeholder={t('label-reason-select')}
              optionFilterProp="label"
              style={{ width: '100%' }}
              onChange={(valor, campo) => {
                campos.motivoId = valor
              }}
              allowClear={true}
            >
              {listData.map((motivo) => (
                <Option key={motivo.id}>{motivo.label}</Option>
              ))}
            </Select>
            <label style={{ marginTop: '10px', fontWeight: 800 }}>
              {t('label-description') + ':'}
            </label>
            <TextArea
              placeholder={t('criar-pergunta-placeholder-write')}
              value={campos.descricao}
              allowClear={true}
              name="descricao"
              showCount
              maxLength={500}
              onChange={(valor, campo) => {
                campos.descricao = valor
              }}
            />
          </Typography>
        ),
        okText: t('label-report'),
        okType: 'danger',
        cancelText: t('label-confirm-cancel'),
        okButtonProps: {
          type: 'primary',
        },

        onOk() {
          const report = {
            idMotivo: campos.motivoId,
            descricao: campos.descricao.currentTarget.value,
          }
          switch (targetAction) {
            case 'pergunta':
              postReportPergunta(targetData.id, report)
                .then((request) => {
                  message.success(request.data)
                })
                .catch(error)
              break
            case 'resposta':
              postReportResposta(targetData.id, report)
                .then((request) => {
                  message.success(request.data)
                })
                .catch(error)
              break
            case 'evento':
              postReportEvento(targetData.id, report)
                .then((request) => {
                  message.success(request.data)
                })
                .catch(error)
              break

            default:
              break
          }
        },

        onCancel() {},
      })
    }
    // console.log(`${key}`)
  }

  const menuAcoesUsuarioLogado = (
    <Menu
      align="start"
      onClick={onClick}
      items={[
        {
          key: '1',
          label: t('label-remove-view'),
          icon: <FiTrash2 />,
        },
        // {
        //   key: '2',
        //   label: t('label-edit'),
        //   icon: <AiOutlineEdit />,
        // },
      ]}
    />
  )

  const menuAcoesUsuario = (
    <Menu
      align="start"
      onClick={onClick}
      items={[
        {
          key: '3',
          label: t('label-report'),
          icon: <FiFlag />,
        },
      ]}
    />
  )

  return (
    <>
      {isAuthenticated() &&
      sessionStorage.getItem('@user-email') === targetData.autorEmail ? (
        <Dropdown
          overlay={menuAcoesUsuarioLogado}
          placement="bottomRight"
          arrow
        >
          <span
            onClick={(e) => e.preventDefault()}
            style={{ cursor: 'pointer' }}
          >
            <FiMoreVertical />
          </span>
        </Dropdown>
      ) : (
        isAuthenticated() && (
          <Dropdown overlay={menuAcoesUsuario} placement="bottomRight" arrow>
            <span
              onClick={(e) => e.preventDefault()}
              style={{ cursor: 'pointer' }}
            >
              <FiMoreVertical />
            </span>
          </Dropdown>
        )
      )}
    </>
  )
}

export default DropdownAcoesUsuario
