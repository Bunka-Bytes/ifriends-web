import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

// ------- STYLES -----
// ------- COMPONENTS -----

// Antd and Bootstrap
import { Typography, Divider, Modal } from 'antd'

// Created

// ------ ICONS -----

// Services

// ------ FUNCTIONS ------
const { Title, Paragraph } = Typography

const Termos = (props) => {
  const { t } = useTranslation()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <span onClick={showModal} style={{ cursor: 'pointer' }}>
        {t('terms-of-use-label')}
      </span>
      <Modal
        destroyOnClose={true}
        open={isModalOpen}
        width={800}
        centered
        onOk={handleOk}
        footer={null}
        onCancel={handleOk}
      >
        <Typography>
          <Title level={2}>{t('terms-label-title')}</Title>
          <Paragraph>{t('terms-label-intro-p1')}</Paragraph>
          <Paragraph>{t('terms-label-intro-p2')}</Paragraph>
          <Paragraph>{t('terms-label-intro-p3')}</Paragraph>
          <Divider />
          <Title level={3}>{t('terms-label-funcao-title')}</Title>
          <Paragraph>{t('terms-label-funcao-p1')}</Paragraph>
          <Paragraph>{t('terms-label-funcao-p2')}</Paragraph>
          <Paragraph>{t('terms-label-funcao-p3')}</Paragraph>
          <Paragraph>{t('terms-label-funcao-p4')}</Paragraph>
          <Paragraph>{t('terms-label-funcao-p5')}</Paragraph>
          <Paragraph>{t('terms-label-funcao-p6')}</Paragraph>
          <Divider />
          <Title level={3}>{t('terms-label-aceite-title')}</Title>
          <Paragraph>{t('terms-label-aceite-p1')}</Paragraph>
          <Paragraph>{t('terms-label-aceite-p2')}</Paragraph>
          <Paragraph>{t('terms-label-aceite-p3')}</Paragraph>
          <Paragraph>{t('terms-label-aceite-p4')}</Paragraph>
          <Divider />
          <Title level={3}>{t('terms-label-glossario-title')}</Title>
          <Paragraph>{t('terms-label-glossario-p1')}</Paragraph>
          <ul>
            <li>{t('terms-label-glossario-p2')}</li>
            <li>{t('terms-label-glossario-p3')}</li>
            <li>{t('terms-label-glossario-p4')}</li>
            <li>{t('terms-label-glossario-p5')}</li>
            <li>{t('terms-label-glossario-p6')}</li>
            <li>{t('terms-label-glossario-p7')}</li>
          </ul>
          <Divider />
          <Title level={3}>{t('terms-label-acesso-title')}</Title>
          <Paragraph>{t('terms-label-acesso-p1')}</Paragraph>
          <Paragraph>{t('terms-label-acesso-p2')}</Paragraph>
          <Paragraph>{t('terms-label-acesso-p3')}</Paragraph>
          <Paragraph>{t('terms-label-acesso-p4')}</Paragraph>
          <Paragraph>{t('terms-label-acesso-p5')}</Paragraph>
          <Divider />
          <Title level={3}>{t('terms-label-uso-title')}</Title>
          <Paragraph>{t('terms-label-uso-p1')}</Paragraph>
          <Paragraph>{t('terms-label-uso-p2')}</Paragraph>
          <Divider />
          <Title level={3}>{t('terms-label-obrigacoes-title')}</Title>
          <Paragraph>{t('terms-label-obrigacoes-p1')}</Paragraph>
          <ol>
            <li>{t('terms-label-obrigacoes-p2')}</li>
            <li>{t('terms-label-obrigacoes-p3')}</li>
            <li>{t('terms-label-obrigacoes-p4')}</li>
            <li>{t('terms-label-obrigacoes-p5')}</li>
            <li>{t('terms-label-obrigacoes-p6')}</li>
            <li>{t('terms-label-obrigacoes-p7')}</li>
          </ol>
          <Divider />
          <Title level={3}>{t('terms-label-gerais-title')}</Title>
          <Paragraph>{t('terms-label-gerais-p1')}</Paragraph>
          <Paragraph>{t('terms-label-gerais-p2')}</Paragraph>
        </Typography>
      </Modal>
    </>
  )
}

export default Termos
