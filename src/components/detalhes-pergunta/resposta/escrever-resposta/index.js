import React, { Fragment, createElement } from 'react';
import { Comment, Avatar, Form, Button, List, Input, Row, Col, Space, Tooltip } from 'antd';
import moment from 'moment';
import { AiOutlineUser } from 'react-icons/ai';
import { IoSend } from 'react-icons/io5';
import { IoIosUndo } from 'react-icons/io';
import { LikeOutlined, LikeFilled } from '@ant-design/icons';


const { TextArea } = Input;

let likes = 0;
let action = null;

const data = [
	{
		author: 'Han Solo',
		avatar: 'https://joeschmoe.io/api/v1/random',
		content: (
			<p>
				We supply a series of design principles, practical patterns and high
				quality design resources (Sketch and Axure), to help people create their
				product prototypes beautifully and efficiently.
			</p>
		),
		datetime: (
			<Tooltip
				title={moment().subtract(2, 'days').format('YYYY-MM-DD HH:mm:ss')}
			>
				<span>{moment().subtract(2, 'days').fromNow()}</span>
			</Tooltip>
		),
		actions: [
			<Tooltip key="comment-basic-like" title="Like">
				<Row>
					<Space>
						<span
							onClick={(likes, action) => {
                                alert("Clicou");
                                likes = 1;
								action = 'liked';
							}}
							className="d-flex align-items-center"
						>
							{createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
							<span className="comment-action">{likes}</span>
						</span>
					</Space>
				</Row>
			</Tooltip>
		]
	}
];

const CommentList = ({ comments }) => (
   
	<List
		dataSource={comments}
		header={`${comments.length} ${comments.length > 1 ? 'respostas' : 'resposta'}`}
		itemLayout="horizontal"
		renderItem={props => <Comment {...props} />}
	/>
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
	<Fragment>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType="submit"
				loading={submitting}
				onClick={onSubmit}
				type="primary"
				style={{
					background: 'var(--green)',
					borderColor: 'var(--green-medium)'
				}}
			>
				<Space>
					<IoSend />
					Comentar
				</Space>
			</Button>
		</Form.Item>
	</Fragment>
);

class Comentario extends React.Component {
	state = {
		comments: [...data],
		submitting: false,
		value: '',
		likes: 0,
		action: null
	};

	like = () => {
		this.setState({
			likes: 1,
			action: 'liked'
		});
	};

	handleSubmit = () => {
		if (!this.state.value) {
			return;
		}

		this.setState({
			submitting: true
		});

		setTimeout(() => {
			this.setState({
				submitting: false,
				value: '',
				comments: [
					...this.state.comments,
					{
						author: 'Fulano',
						avatar: (
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
						),
						content: <p>{this.state.value}</p>,
						actions: [
						<Tooltip key="comment-basic-like" title="Like">
								<Row>
									<span
										onClick={this.like}
										className="d-flex align-items-center"
									>
										{createElement(
											this.state.action === 'liked' ? LikeFilled : LikeOutlined
										)}
										<span className="comment-action">{this.state.likes}</span>
									</span>
								</Row>
						</Tooltip>
						],
						datetime: moment().fromNow(),

					}
				]
			});
		}, 1000);
	};

	handleChange = e => {
		this.setState({
			value: e.target.value
		});
	};

	render() {
		const { comments, submitting, value } = this.state;

		return (
			<>
				{comments.length > 0 && <CommentList comments={comments} />}

				<Comment
					avatar={
						<Avatar
							breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
							icon={<AiOutlineUser />}
							className="icons"
						/>
					}
					content={
						<Editor
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</>
		);
	}
}

export default Comentario;
