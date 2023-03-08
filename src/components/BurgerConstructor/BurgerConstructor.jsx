import styles from './BurgerConstructor.module.css';
import { } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';


const BurgerConstructor = () => {
  return (
    <section className={cn(styles.section)}>
      <p className={cn('text text_type_main-large mt-10 mb-5')}>Блок с конструктором</p>
    </section>
    )
}

export default BurgerConstructor;