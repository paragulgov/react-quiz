import React from 'react'
import classes from './Loader.module.css'

const Loader = props => {
   console.log('ok3')
   return (
      <div className={ classes.center }>
         <div className={ classes.Loader }>
            <div />
            <div />
            <div />
            <div />
         </div>
      </div>
   )
}

export default Loader
