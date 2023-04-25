import { FC } from 'react';
import styles from './RoundIcon.module.css';

interface IRoundIcon {
	img: string;
	count?: number;
}

export const RoundIcon: FC<IRoundIcon> = ({ img, count = -1 }) => {
	return (
		<div className={styles.container}>
			<img
				className={`${count !== -1 ? styles.blured : ''}`}
				height={50}
				width={100}
				src={img}
			/>
			{count !== -1 && (
				<p className={`${styles.count} text text_type_digits-default`}>
					+{count}
				</p>
			)}
		</div>
	);
};
