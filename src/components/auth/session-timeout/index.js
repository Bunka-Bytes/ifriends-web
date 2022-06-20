import React, {
	useEffect,
} from 'react';
import moment from 'moment';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { isAuthenticated, removeTokenOnLogout } from '../../../services/auth';

const SessionTimeout = () => {
  	const navigate = useNavigate();
  	const { t } = useTranslation();

	 const logout = () => {
			removeTokenOnLogout();
			message.info(t('log-message-session-timeout'));
			navigate('/login');
		};

		useEffect(() => {
			if (isAuthenticated()) {
				setTimeout(() => {
					logout();
				}, sessionStorage.getItem('expiration') * 1000 - Date.now());
			}
		}, [isAuthenticated()]);
};

export default SessionTimeout;
