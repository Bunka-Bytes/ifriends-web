import React, { Fragment } from 'react'
import { Dropdown, Menu } from 'antd'
import styles from './styles.scss'
import Button from '../button'

const MenuDropdown = (props) => {
  const {
    itemsDropdown,
    label,
    type,
    disabled,
    icon = 'fas-angle-down',
  } = props

  const getItensMenu = () => {
    return itemsDropdown
      ? itemsDropdown.map((item, index) => {
          return {
            key: index,
            label: <div className={styles.overlayItemStyle}>{item}</div>,
          }
        })
      : []
  }

  const menuBotoes = (
    <Menu className={styles.overlayStyle} items={getItensMenu()} />
  )

  return (
    <Dropdown overlay={menuBotoes} type={type} disabled={disabled}>
      <Button type={type} icon={icon} label={label} />
    </Dropdown>
  )
}

export default MenuDropdown
