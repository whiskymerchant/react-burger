import styles from './ModalOverlay.module.css';

const ModalOverlay = ({ onClick }: { onClick: () => void }) => {
	return <div onClick={onClick} className={styles.overlay}></div>;
};

export default ModalOverlay;
