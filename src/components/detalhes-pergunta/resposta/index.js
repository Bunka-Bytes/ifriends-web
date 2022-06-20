import React, { createElement, useState, useEffect } from 'react';
// ------- STYLES -----
// ------- COMPONENTS -----
import { Comment, Tooltip, Avatar, Card, List, Space, Button } from 'antd';
import moment from 'moment';
// Created
import Comentario from './escrever-resposta'

// ------ ICONS -----
import {
	LikeOutlined,
	LikeFilled
} from '@ant-design/icons';
import { IoIosUndo } from 'react-icons/io';

const Resposta = props => {
	return (
		<>
			<Card className="card-box">
				<Comentario idPergunta={props.idPergunta} />
			</Card>
		</>
	);
};

export default Resposta;