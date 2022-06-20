import React from "react";
import { Menu, Layout } from "antd";
import { FiSettings, FiHelpCircle } from "react-icons/fi";
import {
  IoHome,
  IoCalendarClearOutline,
  IoPricetagsOutline,
} from "react-icons/io5";
import { Link } from "react-router-dom";

function getItem(key, icon, label, children) {
  return {
    key,
    icon,
    label,
    children,
  };
}

const MenuSide = () => {
  const items = [
    getItem(
      "1",
      <Link to="/">
        <IoHome className="icon-menu" />
      </Link>,
      "Perguntas"
    ),
    getItem(
      "2",
      <Link to="/eventos">
        <IoCalendarClearOutline className="icon-menu" />
      </Link>,
      "Eventos"
    ),
    getItem(
      "3",
      <Link to="/categorias">
        <IoPricetagsOutline className="icon-menu" />
      </Link>,
      "Categorias"
    ),
    getItem(
      "4",
      <Link to="/ajuda">
        <FiHelpCircle className="icon-menu" />
      </Link>,
      "Ajuda"
    ),
    getItem(
      "5",
      <Link to="/config">
        <FiSettings className="icon-menu" />
      </Link>,
      "Configurações"
    ),
  ];

  return (
    <Layout.Sider
      collapsible
      defaultCollapsed
      className="layout-background layout-sider"
    >
      <Menu
        className="layout-background layout-menu"
        mode="vertical"
        items={items}
      />
    </Layout.Sider>
  );
};
export default MenuSide;
