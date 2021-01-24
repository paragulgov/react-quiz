import React from 'react'
import classes from './AnswersList.module.css'
import AnswersItem from './AnswersItem/AnswersItem'

const AnswersList = props => (
   <ul className={ classes.AnswersList }>
      { props.answers.map((answer, index) => {
         return (
            <AnswersItem
               key={ index }
               answer={ answer }
               onAnswerClickHandler={ props.onAnswerClickHandler }
               answerColorState={ props.answerColorState ? props.answerColorState[answer.id] : null }
            />
         )
      }) }
   </ul>
)

export default AnswersList
