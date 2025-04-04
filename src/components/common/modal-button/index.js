import React, { Fragment } from 'react'
import Button from 'components/common/button'
import ButtonConfirm from 'components/common/button-confirm'
import Modal from 'components/common/modal'
import PropTypes from 'prop-types'

const botao = {
  normal: Button,
  confirm: ButtonConfirm,
}

export const [NORMAL, CONFIRM] = Object.keys(botao)

class ModalButton extends React.Component {
  state = {
    modalOpen: false,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.fechaModalExterno !== this.props.fechaModalExterno) {
      this.fechaModal()
    }
  }

  abreModal = () => {
    const abrir = () => this.setState({ modalOpen: true })
    if (this.props.onOpen) {
      this.props.onOpen()
    }
    abrir()
  }

  fechaModal = () => {
    this.setState(
      { modalOpen: false },
      this.props.onCancel && this.props.onCancel
    )
  }

  render() {
    const {
      tipoBotao = NORMAL,
      label = null,
      title,
      size,
      modalTitle,
      disabled,
      type = null,
      icon = null,
      ghost = false,
      block = false,
      idConteudo,
      conteudos,
      tooltipEnabled,
      sm = false,
    } = this.props

    const Elemento = botao[tipoBotao]

    return (
      <Fragment>
        <Elemento
          sm={sm}
          onClick={this.abreModal}
          onOk={this.abreModal}
          label={label}
          title={title}
          disabled={disabled}
          ghost={ghost}
          block={block}
          icon={icon}
          type={type}
          tooltipEnabled={tooltipEnabled}
        />
        <Modal
          size={size}
          visible={this.state.modalOpen}
          title={modalTitle}
          onCancel={this.fechaModal}
          idConteudo={idConteudo}
          conteudos={conteudos}
        >
          {this.props.children}
        </Modal>
      </Fragment>
    )
  }
}

ModalButton.propTypes = {
  tipoBotao: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  modalTitle: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  ghost: PropTypes.bool,
  block: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func,
  idConteudo: PropTypes.number,
  conteudos: PropTypes.arrayOf(PropTypes.node),
}

export default ModalButton
