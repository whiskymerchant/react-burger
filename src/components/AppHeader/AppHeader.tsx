import styles from './AppHeader.module.css';
import {
	Logo,
	ListIcon,
	BurgerIcon,
	ProfileIcon
} from '@ya.praktikum/react-developer-burger-ui-components';
import cn from 'classnames';
import { FC } from 'react';
import { Link, useMatch } from 'react-router-dom';

const AppHeader = () => {
	const isHome = useMatch('/');
	const isFeed = useMatch('/feed');
	const isProfile = useMatch('/profile');

	return (
		<header className={cn(styles.header, 'p-4')}>
			<nav className={styles.constructors}>
				<Link to="/" className={styles.links}>
					<BurgerIcon type={isHome ? 'primary' : 'secondary'} />
					<span
						className={cn(
							`text text_type_main-default ml-2 ${
								isHome
									? `${styles.links_state_active}`
									: `${styles.links_state_inactive}`
							}`
						)}
					>
						Конструктор
					</span>
				</Link>
			</nav>
			<nav className={styles.feed}>
				<Link to="/feed" className={styles.links}>
					<ListIcon type={isFeed ? 'primary' : 'secondary'} />
					<span
						className={cn(
							`text text_type_main-default ml-2 ${
								isFeed
									? `${styles.links_state_active}`
									: `${styles.links_state_inactive}`
							}`
						)}
					>
						Лента заказов
					</span>
				</Link>
			</nav>
			<nav className={styles.account}>
				<Link to="/profile" className={styles.links}>
					<ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
					<span
						className={cn(
							`text text_type_main-default ml-2 ${
								isProfile
									? `${styles.links_state_active}`
									: `${styles.links_state_inactive}`
							}`
						)}
					>
						Личный кабинет
					</span>
				</Link>
			</nav>
			<nav className={styles.logo}>
				{' '}
				<Logo />{' '}
			</nav>
		</header>
	);
};

export default AppHeader;
