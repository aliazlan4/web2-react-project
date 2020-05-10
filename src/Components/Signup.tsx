import React from 'react';
import { history } from '../history';
import { Layout, Row, Col, Form, Input, Button, notification } from 'antd';

import { useDispatch } from "react-redux";
import { changeUser } from "../redux/actions/UserActions";

const Signup = () => {
	const dispatch = useDispatch();

	const onFinish = async (values: any) => {
		const { email, password, firstName, lastName } = values;

		const response = await fetch(process.env.REACT_APP_API_HOST + "/api/register", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			credentials: 'include',
			body: JSON.stringify({ email, password, firstName, lastName })
		});
		const data = await response.json();

		if (data.status === true) {
			notification["success"]({
				message: 'Register Successfully',
				description: data.message,
			});
			const { _id, firstName, lastName, email } = data.user;
			localStorage.setItem('user', JSON.stringify({ _id, firstName, lastName, email }));
			dispatch(changeUser(_id, firstName, lastName, email));
			history.push('/');
		} else {
			notification["error"]({
				message: 'Register Failed',
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
								label="First Name"
								name="firstName"
								rules={[{ required: true, message: 'Please input your first name!' }]}
							>
								<Input />
							</Form.Item>

							<Form.Item
								label="Last Name"
								name="lastName"
								rules={[{ required: true, message: 'Please input your last name!' }]}
							>
								<Input />
							</Form.Item>

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
									Register
        						</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Layout.Content>
		</Layout>
	);
};

export default Signup;