import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import { Col } from 'react-bootstrap'
import { Upload, message, Modal } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import ImgCrop from 'antd-img-crop'
import { MdOutlineCameraswitch } from 'react-icons/md'
import { TbCameraPlus } from 'react-icons/tb'

const UploadImage = (props) => {
  const { Dragger } = Upload
  const { t } = useTranslation()
  const {
    maxFiles = 1,
    renderWithDragger = true,
    alteraCampoTipo,
    listType = 'picture-card',
  } = props
  const fileListProps = props.fileList

  const [stateUpload, setStateUpload] = useState({
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: fileListProps || [],
  })

  const [fileListUrl, setFileListUrl] = useState([])

  const { previewVisible, previewImage, previewTitle, fileList } = stateUpload

  useEffect(() => {
    setStateUpload({ ...stateUpload, fileList })
  }, [fileListProps])

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const handleCancel = () =>
    setStateUpload({ ...stateUpload, previewVisible: false })

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setStateUpload({
      ...stateUpload,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }

  const handleChange = (info) => {
    const { file } = info
    console.log('info', info)
    const isLt2M = file.size / 1024 / 1024 < 1
    console.log(info.fileList)
    console.log(stateUpload.fileList)
    if (isLt2M || info.fileList < stateUpload.fileList) {
      if (info.fileList >= stateUpload.fileList) {
        info.fileList.pop()
        info.fileList.push(file)
      }
      console.log(file)
      setStateUpload({ ...stateUpload, fileList: info.fileList })
    }

    if (info.file.status === 'done') {
      message.success(`${info.file.name} ${t('log-message-file-sent')}`)
      alteraCampoTipo(
        maxFiles > 1
          ? info.fileList.map((file) => ({
              link: file.response.data.url,
            }))
          : file.response.data.url,
        maxFiles > 1 ? 'imagens' : 'imagem'
      )
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} ${t('log-message-file-sent-error')}`)
    }
  }

  const uploadImage = () => {
    const key = process.env.REACT_APP_API_IMGBB_KEY
    return process.env.REACT_APP_API_IMGBB_URL + `1/upload?key=${key}`
  }

  const propsUpload = {
    action: (file) => uploadImage(file),
    listType,
    fileList: fileList,
    onPreview: handlePreview,
    onChange: handleChange,
    maxCount: maxFiles,
    style: { marginBottom: '1rem' },
    name: 'image',
    onRemove: (a, b, c) => console.log('a', a, 'b', b, 'c', c),
  }

  return (
    <>
      <ImgCrop
        rotate
        modalTitle={'Editar Foto'}
        modalCancel={'Cancelar'}
        modalOk={'Confirmar'}
        beforeCrop={(file) => {
          const isLt2M = file.size / 1024 / 1024 < 1
          if (!isLt2M) {
            message.error(t('criar-pergunta-img-error'))
          }
          return isLt2M
        }}
      >
        {renderWithDragger ? (
          <Dragger {...propsUpload}>
            {fileList.length >= maxFiles ? (
              <div style={{ padding: '0.25rem' }}>
                <p className="ant-upload-text">
                  {t('criar-pergunta-img-warn-limit')}
                </p>
                <p className="ant-upload-hint">
                  {t('criar-pergunta-img-warn-substitution')}
                </p>
              </div>
            ) : (
              <div style={{ padding: '0.25rem' }}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  {t('criar-pergunta-img-placeholder')}
                </p>
                <p className="ant-upload-hint">
                  {t('criar-pergunta-img-hint')}
                </p>
              </div>
            )}
          </Dragger>
        ) : (
          <Upload {...propsUpload}>
            {fileList.length < maxFiles ? (
              <TbCameraPlus size={48} color="gray" />
            ) : (
              <MdOutlineCameraswitch size={48} color="gray" />
            )}
          </Upload>
        )}
      </ImgCrop>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <Col className="d-flex align-items-center flex-column">
          <img
            alt="example"
            style={{ width: '90%', borderRadius: '0.25rem' }}
            src={previewImage}
          />
        </Col>
      </Modal>
    </>
  )
}

export default UploadImage
