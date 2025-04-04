import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
// ------- COMPONENTS -----
// Antd and Bootstrap
import Stack from 'react-bootstrap/Stack';
import Image from 'react-bootstrap/Image';
import { Card, Typography, Col, Row, Space, Button } from 'antd';

import './index.css';

// ------ ICONS -----
import { MdOutlineQuestionAnswer } from 'react-icons/md';
import { useTranslation } from 'react-i18next';

const Banner = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Card className="card-container">
      <Row
        justify="space-between"
        align="middle"
        style={{ textAlign: 'center' }}
      >
        <Col xs={12} sm={5} lg={6}>
          <Image
            className="banner-img"
            width={180}
            fluid
            src="/imgs/banner/Curtida.png"
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={12}>
          <Stack>
            <Typography>
              <Typography.Title level={2}>
                {t('home-banner-title')}
              </Typography.Title>
              <Typography.Paragraph>
                {t('home-banner-descricao')}
              </Typography.Paragraph>
              <Space>
                <Button
                  icon={
                    <MdOutlineQuestionAnswer
                      style={{ marginRight: '0.25rem' }}
                    />
                  }
                  onClick={() => navigate('/dashboard')}
                  className="layout-background"
                >
                  {t('btn-comecar')}
                </Button>
              </Space>
            </Typography>
          </Stack>
        </Col>
        <Col xs={12} sm={5} lg={6}>
          <Image
            className="banner-img"
            width={125}
            fluid
            src="/imgs/banner/Duvida.png"
          />
        </Col>
      </Row>
    </Card>
  )
};

export default Banner;
