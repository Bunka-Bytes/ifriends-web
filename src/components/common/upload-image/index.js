import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { Col } from "react-bootstrap";
import { Upload, message, Modal } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import ImgCrop from "antd-img-crop";

const UploadImage = (props) => {
  const { Dragger } = Upload;
  const { t } = useTranslation();


  const [stateUpload, setStateUpload] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [],
  });

  const { previewVisible, previewImage, previewTitle, fileList } = stateUpload;

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () =>
    setStateUpload({ ...stateUpload, previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateUpload({
      ...stateUpload,
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  const handleChange = (info) => {
    const { file } = info;

    if (info.file.status === "done") {
      message.success(`${info.file.name} ${t('log-message-file-sent')}`);
      props.alteraCampoTipo(file.response.data.url, "imagem");
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} ${t('log-message-file-sent-error')}`);
    }

    const isLt2M = file.size / 1024 / 1024 < 1;
    if (isLt2M) {
      setStateUpload({ ...stateUpload, fileList: info.fileList });
    }
  };

  const uploadImage = () => {
    const key = process.env.REACT_APP_API_IMGBB_KEY;
    return process.env.REACT_APP_API_IMGBB_URL + `1/upload?key=${key}`;
  };

  return (
		<>
			<ImgCrop
				rotate
				modalTitle={'Editar Foto'}
				modalCancel={'Cancelar'}
				modalOk={'Confirmar'}
				beforeCrop={file => {
					const isLt2M = file.size / 1024 / 1024 < 1;
					if (!isLt2M) {
						message.error(t('criar-pergunta-img-error'));
					}
					return isLt2M;
				}}
			>
				<Dragger
					action={file => {
						return uploadImage(file);
					}}
					listType="picture-card"
					fileList={fileList}
					onPreview={handlePreview}
					onChange={handleChange}
					maxCount={1}
					style={{ marginBottom: '1rem' }}
					name="image"
				>
					{fileList.length >= 1 ? (
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
							<p className="ant-upload-hint">{t('criar-pergunta-img-hint')}</p>
						</div>
					)}
				</Dragger>
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
	);
};

export default UploadImage;
