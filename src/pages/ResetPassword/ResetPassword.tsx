import styles from './ResetPassword.module.css';
import React from 'react';
import {
	Button,
	PasswordInput,
	Input
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { sendCode } from '../../utils/api';

const ResetPassword = () => {
	const [value, setValue] = React.useState<any>('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	return (
		<>
			<div className={cn(styles.container)}>
				<div className={cn(styles.header, 'text text_type_main-default mb-6')}>
					<h2>Восстановление пароля</h2>
				</div>
				<PasswordInput
					onChange={(e) => setValue({ ...value, password: e.target.value })}
					name={'password'}
					placeholder="Введите новый пароль"
					icon="HideIcon"
					extraClass="mb-6"
					value={value.password}
				/>
				<Input
					onChange={(e) => setValue({ ...value, token: e.target.value })}
					extraClass="mb-6"
					name={'code'}
					placeholder="Введите код из письма"
					value={value.token}
				></Input>
				<Button
					extraClass="mb-20"
					htmlType="button"
					type="primary"
					size="large"
					onClick={() => sendCode(value)}
				>
					Сохранить
				</Button>
				<div className={cn(styles.bottom_div)}>
					<p className="text text_type_main-small">Вспомнили пароль?</p>
					<Link to="/login">
						<p className="text text_type_main-small">Войти</p>
					</Link>
				</div>
			</div>
		</>
	);
};

export default ResetPassword;
