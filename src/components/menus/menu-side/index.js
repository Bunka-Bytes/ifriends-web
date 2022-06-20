import React from "react";
import { useTranslation } from 'react-i18next';

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
   const { t } = useTranslation();

  const items = [
		getItem(
			'1',
			<Link to="/">
				<IoHome className="icon-menu" />
			</Link>,
			t('menu-side-questions')
		),
		getItem(
			'2',
			<Link to="/eventos">
				<IoCalendarClearOutline className="icon-menu" />
			</Link>,
			t('footer-app-map-events')
		),
		getItem(
			'3',
			<Link to="/categorias">
				<IoPricetagsOutline className="icon-menu" />
			</Link>,
			t('footer-app-map-category')
		),
		getItem(
			'4',
			<Link to="/ajuda">
				<FiHelpCircle className="icon-menu" />
			</Link>,
			t('menu-side-ajuda')
		),
		getItem(
			'5',
			<Link to="/config">
				<FiSettings className="icon-menu" />
			</Link>,
			t('footer-app-map-config')
		)
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
