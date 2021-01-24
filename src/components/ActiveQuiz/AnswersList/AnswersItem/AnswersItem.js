import React from 'react'
import classes from './AnswersItem.module.css'

const AnswersItem = props => {
   const cls = [classes.AnswersItem]

   if (props.answerColorState) {
      cls.push(classes[props.answerColorState])
   }

   return (
      <li className={ cls.join(' ') }
          onClick={ () => {
             props.onAnswerClickHandler(props.answer.id)
          } }
      >
         { props.answer.text }
      </li>
   )
}

export default AnswersItem
