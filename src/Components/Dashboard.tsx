import React, { useState, useEffect } from 'react';
import { Layout, Upload, Row, Col, notification, Table, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const IPFS = require('ipfs-http-client');
const ipfs_client = new IPFS({ host: process.env.REACT_APP_IPFS_HOST, port: process.env.REACT_APP_IPFS_PORT, protocol: 'http' });

const Dashboard = () => {
	const [updateFiles, setUpdateFiles] = useState("");
	const [myFiles, setMyFiles] = useState([]);

	useEffect(() => {
		(async () => {
			const response = await fetch(process.env.REACT_APP_API_HOST + "/api/myfiles", {
				method: "GET",
				credentials: 'include'
			});
			const data = await response.json();

			if (data.status === true) {
				setMyFiles(data.files);
			} else {
				notification["error"]({
					message: 'Error',
					description: 'unable to fetch files',
				});
			}
		})();
	}, [updateFiles]);

	const uploadFile = async (data: any) => {
		notification["info"]({
			message: 'Uploading...',
			description: data.file.name + ' is being uploaded',
		});

		const ipfs_output = (await ipfs_client.add(data.file))[0];

		if (ipfs_output.hash) {
			const response: any = await fetch(process.env.REACT_APP_API_HOST + "/api/addFile", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: 'include',
				body: JSON.stringify({
					fileName: data.file.name,
					ipfsID: ipfs_output.hash,
					password_sharing: false,
					password: "asdf"
				})
			});
			const response_json: any = await response.json();

			if (response_json.status === true) {
				notification["success"]({
					message: 'Success',
					description: 'file uploaded successfully',
				});

				setUpdateFiles(data.file.name);

				return;
			}
		}

		notification["error"]({
			message: 'Error',
			description: 'unable to upload file',
		});
	};

	const dataTableColumns = [
		{
			title: 'File Name',
			dataIndex: 'fileName',
			key: 'fileName',
		},
		{
			title: '',
			key: 'action',
			render: (text: string, record: { ipfsID: string }) => (
				<Space size="middle">
					<a href={"https://ipfs.artbot.tv/ipfs/" + record.ipfsID} target="_blank">File Share Link</a>
				</Space>
			),
		}
	];

	return (
		<Layout>
			<Layout.Content className="container">
				<Row gutter={[16, 24]}>
					<Col span={8} offset={8}>
						<Upload.Dragger name="file" customRequest={uploadFile} multiple={false} showUploadList={false}>
							<p className="ant-upload-drag-icon">
								<UploadOutlined />
							</p>
							<p className="ant-upload-text">Click or drag file to this area to upload</p>
						</Upload.Dragger>
					</Col>
				</Row>
				<Row gutter={[16, 24]}>
					<Col span={16} offset={4}>
						<Table dataSource={myFiles} columns={dataTableColumns} />;
					</Col>
				</Row>
			</Layout.Content>
		</Layout>
	);
};

export default Dashboard;