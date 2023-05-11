import {
	EmailInput,
	Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import cn from 'classnames';
import styles from './ForgotPassword.module.css';
import { Link } from 'react-router-dom';
import { IPasswordReset, passwordReset } from '../../utils/api';

const ForgotPassword = () => {
	const [email, setEmail] = React.useState<string>('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const onSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		passwordReset({ email, onSuccess: () => alert('password sent') });
	};

	return (
		<form
			className={cn(styles.container, 'text text_type_main-default mb-6')}
			onSubmit={onSubmit}
		>
			<h2>Восстановление пароля</h2>
			<EmailInput
				extraClass="mb-6"
				value={email}
				onChange={onChange}
				name={'email'}
				placeholder="Укажите e-mail"
				isIcon={false}
			/>

			<Button extraClass="mb-20" htmlType="submit" type="primary" size="large">
				Восстановить
			</Button>
			<div className={cn(styles.bottom_div)}>
				<p className="text text_type_main-small">Вспомнили пароль?</p>
				<Link to="/login">
					<p className="text text_type_main-small">Войти</p>
				</Link>
			</div>
		</form>
	);
};

export default ForgotPassword;
