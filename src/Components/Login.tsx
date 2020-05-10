import React from 'react';
import { history } from '../history';
import { Layout, Row, Col, Form, Input, Button, notification } from 'antd';

import { useDispatch } from "react-redux";
import { changeUser } from "../redux/actions/UserActions";

const Login = () => {
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		const { email, password } = values;

		const response = await fetch(process.env.REACT_APP_API_HOST + "/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: 'include',
			body: JSON.stringify({ email, password })
		});
		const data = await response.json();

		if (data.status === true) {
			notification["success"]({
				message: 'Login Successfully',
				description: data.message,
			});
			const { _id, firstName, lastName, email } = data.user;
			localStorage.setItem('user', JSON.stringify({ _id, firstName, lastName, email }));
			dispatch(changeUser(_id, firstName, lastName, email));
			history.push('/');
		} else {
			notification["error"]({
				message: 'Login Failed',
				description: data.message,
			});
		}
	};

	return (
		<Layout>
			<Layout.Content className="container">
				<Row>
					<Col span={8} offset={8}>
						<Form
							name="basic"
							onFinish={onFinish}
						>
							<Form.Item
								label="Email"
								name="email"
								rules={[{ required: true, message: 'Please input your email!' }]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Password"
								name="password"
								rules={[{ required: true, message: 'Please input your password!' }]}
							>
								<Input.Password />
							</Form.Item>

							<Form.Item>
								<Button type="primary" htmlType="submit">
									Login
        						</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Layout.Content>
		</Layout>
	);
};

export default Login;