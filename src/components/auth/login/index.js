import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import { loginPostUsuario } from '../../../services/usuario';
import { salvarToken } from '../../../services/auth';
// comentario
const Login = () => {
    const navigate = useNavigate();

    const enviarDados = values => {
        console.log(values);
        
        loginPostUsuario(values).then(request => {
            salvarToken(request.data.token);
            message.success((`Você logou como ${request.data.nome} `));
            navigate('/criar-pergunta');
		});

        
	};

	return (
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{
				remember: true
			}}
			onFinish={enviarDados}
		>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: 'Please input your Email!'
					}
				]}
			>
				<Input
					prefix={<UserOutlined className="site-form-item-icon" />}
					placeholder="Email"
					type="email"
				/>
			</Form.Item>
			<Form.Item
				name="senha"
				rules={[
					{
						required: true,
						message: 'Please input your Password!'
					}
				]}
			>
				<Input
					prefix={<LockOutlined className="site-form-item-icon" />}
					type="password"
					placeholder="Password"
				/>
			</Form.Item>
			<Form.Item>

				<Link className="login-form-forgot" to="/cadastro">
					Forgot password
				</Link>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit" className="login-form-button">
					Log in
				</Button>
			</Form.Item>
		</Form>
	);
};

export default Login;
