import styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import cn from 'classnames';


const BurgerConstructor = ({constructorIngredients}) => {

  const buns = constructorIngredients.find(data => data.type === 'bun')
  const bunsLast = constructorIngredients.findLast(data => data.type === 'bun')
  const nobuns = constructorIngredients.filter(data => data.type !== 'bun')

  return (
    <section className={cn(styles.section, 'mt-25')}>
      <ConstructorElement  
        {...buns}
        type='top'
        thumbnail={buns?.image}
        key={buns?._id}
      />
      
      <div className={cn(styles.no_buns_ingredients, 'custom-scroll')}>
        {nobuns.map(data => <ConstructorElement thumbnail={data.image} key={data._id} {...data}/>)}
      </div>
      
      <ConstructorElement 
        {...bunsLast} 
        type='bottom'
        thumbnail={bunsLast?.image}
        key={bunsLast?._id}
      />
    </section>
    )
}

export default BurgerConstructor;