import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
   state = {
      activeQuestion: 0,
      quiz: [
         {
            question: 'Россия - это',
            rightAnswerId: 3,
            answers: [
               { text: 'Город', id: 1 },
               { text: 'Континент', id: 2 },
               { text: 'Страна', id: 3 },
               { text: 'Месяц', id: 4 }
            ]
         },
         {
            question: 'Самый старый город в России',
            rightAnswerId: 4,
            answers: [
               { text: 'Дербент', id: 1 },
               { text: 'Великий Новгород', id: 2 },
               { text: 'Москва', id: 3 },
               { text: 'Керчь', id: 4 }
            ]
         }
      ]
   }

   onAnswerClickHandler = (answerId) => {
      console.log(answerId)

      this.setState({
         activeQuestion: this.state.activeQuestion + 1
      })
   }

   render() {
      return (
         <div className={ classes.Quiz }>
            <div className={ classes.QuizWrapper }>
               <h1>Ответьте на все вопросы</h1>
               <ActiveQuiz
                  answers={ this.state.quiz[this.state.activeQuestion].answers }
                  question={ this.state.quiz[this.state.activeQuestion].question }
                  onAnswerClickHandler={ this.onAnswerClickHandler }
                  quizLength={ this.state.quiz.length }
                  answerNumber={ this.state.activeQuestion + 1 }
               />
            </div>
         </div>
      )
   }
}

export default Quiz
