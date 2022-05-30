import React from 'react';
import { Link } from 'react-router-dom';
// ------- STYLES -----
import '../../../styles/menu.css';

// ------- COMPONENTS -----
// Antd and Bootstrap
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';
import { Input, Space, Avatar, Badge, Layout } from 'antd';

// ------ ICONS -----
import { IoIosNotifications } from 'react-icons/io';
import { AiOutlineUser } from 'react-icons/ai';

// Destructuring
const { Header } = Layout;
const { Search } = Input;

const MenuSup = props => {
    return (
			<Header className="menuSupBox">
				<Container>
					<Stack direction="horizontal" gap={3}>
						<Link to="/">
							<Navbar.Brand>
								<img
									src="/logo.png"
									width="85"
									height="60"
									className="d-inline-block align-top"
									alt="IFriends logo"
								/>
							</Navbar.Brand>
						</Link>

						<>
							<Search
								placeholder="Pesquisar por perguntas e interesses"
								onSearch={() => {}}
								enterButton
								size="large"
							/>
						</>

						<Space align="center">
							<Badge dot>
								<Avatar
									breakpoints={[
										'xxxl',
										'xxl',
										'xl',
										'lg',
										'md',
										'sm',
										'xs',
										'xxs'
									]}
									icon={<IoIosNotifications />}
									className="icons"
								/>
							</Badge>
							<Avatar
								breakpoints={[
									'xxxl',
									'xxl',
									'xl',
									'lg',
									'md',
									'sm',
									'xs',
									'xxs'
								]}
								icon={<AiOutlineUser />}
								className="icons"
							/>
						</Space>
					</Stack>
				</Container>
			</Header>
		);
};

export default MenuSup;