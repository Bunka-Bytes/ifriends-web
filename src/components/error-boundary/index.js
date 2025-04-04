import React from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Button, Result, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Paragraph, Text } = Typography

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super()
    this.state = { error: null, errorInfo: null }
  }

  componentDidCatch(error, info) {
    this.setState({ error, info })
  }

  render() {
    if (this.state.error) {
      return (
        <Result
          status="error"
          title="Erro na Aplicação"
          subTitle={`Infelizmente ocorreu um erro ${
            this.props.name ? `no ${this.props.name} ` : ''
          }enquanto utilizava o site :/`}
          extra={
            <Link to="/dashboard">
              <Button
                type="primary"
                onClick={() => this.setState({ error: null, info: null })}
              >
                Voltar para tela inicial
              </Button>
            </Link>
          }
          style={{ paddingTop: '7.5rem' }}
          className={'d-flex align-items-center flex-column'}
        >
          {(this.state.error || this.state.info.componentStack) && (
            <div
              style={{
                borderRadius: '0.75rem',
                padding: '2.5rem',
                backgroundColor: '#EEEEEE',
              }}
            >
              <Paragraph>
                <Text
                  strong
                  style={{
                    fontSize: 16,
                  }}
                >
                  The content you submitted has the following error:
                </Text>
              </Paragraph>
              {this.state.error && (
                <Paragraph>
                  <CloseCircleOutlined style={{ color: 'red' }} />{' '}
                  {this.state.error && this.state.error.toString()}
                </Paragraph>
              )}
              {this.state.info.componentStack && (
                <Paragraph>
                  <CloseCircleOutlined style={{ color: 'red' }} />{' '}
                  {this.state.info.componentStack}
                </Paragraph>
              )}
            </div>
          )}
        </Result>
      )
    }
    return this.props.children
  }
}
