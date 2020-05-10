import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/UserActions";

const Logout = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		localStorage.removeItem('user');
		dispatch(logoutUser());
		notification["success"]({
			message: 'Logout Successfully',
			description: 'user is logged out successfully',
		});
	}, []);

	return null;
}

export default Logout;