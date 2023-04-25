import React from 'react';
import styles from "./NotFound.module.css";
import cn from "classnames";


const NotFound = () => {
  return (
    <div className={cn(styles.main)}>

      Cant find the specified page.
      
    </div>
  );
}

export default NotFound;