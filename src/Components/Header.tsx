import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { IRootReducer } from "../redux/IRootReducer";
import { IUserState } from "../redux/states/IUserState";

const Header = () => {
	const user: IUserState | undefined = useSelector<IRootReducer, IUserState | undefined>(state => state.userReducer);
	
	return (
		<Layout.Header>
			{ user?.email ?
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
					<Menu.Item key="dashboard">
						<Link to="/">Dashboard</Link>
					</Menu.Item>
					<Menu.Item key="logout">
						<Link to="/logout">Logout</Link>
					</Menu.Item>
				</Menu>
				:
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['dashboard']}>
					<Menu.Item key="dashboard">
						<Link to="/login">Login</Link>
					</Menu.Item>
					<Menu.Item key="signup">
						<Link to="/signup">Signup</Link>
					</Menu.Item>
				</Menu>
			}
		</Layout.Header>
	);
}

export default Header;