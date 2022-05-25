import React from 'react';
import { Menu, Layout } from 'antd';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import {
	IoHome,
	IoCalendarClearOutline,
	IoPricetagsOutline,
	IoMenu
} from 'react-icons/io5';
import { Link } from 'react-router-dom';

function getItem(key, icon, label, children) {
	return {
		key,
		icon,
		label,
		children
	};
}



const MenuSide = props => {
	const items = [
		getItem(
			'1',
			<Link to="/">
				<IoHome style={{ fontSize: '1.5rem' }} />
			</Link>,
			'Perguntas'
		),
		getItem(
			'2',
			<Link to="/eventos">
				<IoCalendarClearOutline style={{ fontSize: '1.5rem' }} />
			</Link>,
			'Eventos'
		),
		getItem(
			'3',
			<Link to="/categorias">
				<IoPricetagsOutline style={{ fontSize: '1.5rem' }} />
			</Link>,
			'Categorias'
		),
		getItem(
			'4',
			<Link to="/ajuda">
				<FiHelpCircle style={{ fontSize: '1.5rem' }} />
			</Link>,
			'Ajuda'
		),
		getItem(
			'5',
			<Link to="/config">
				<FiSettings style={{ fontSize: '1.5rem' }} />
			</Link>,
			'Configurações'
		)
	];

	return (
		<Layout.Sider
			collapsible
			defaultCollapsed
			className="layout-background"
			style={{ width: '4rem !important' }}
		>
			<Menu
				className="layout-background layout-sider"
				mode="vertical"
				style={{
					display: 'grid',
					alignContent: 'space-around',
					alignItems: 'middle'
				}}
				items={items}
			/>
		</Layout.Sider>
	);
};
export default MenuSide;
