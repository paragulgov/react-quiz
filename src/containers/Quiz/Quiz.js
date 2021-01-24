import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
   state = {
      isFinished: false,
      activeQuestion: 0,
      answerColorState: null, // { [id]: 'success' or 'error' }
      results: {}, // { [id]: 'success' or 'error' }
      quiz: [
         {
            id: 1,
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
            id: 2,
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
      if (this.state.answerColorState) {
         const key = Object.keys(this.state.answerColorState)[0]

         if (this.state.answerColorState[key] === 'success') {
            return
         }
      }

      const question = this.state.quiz[this.state.activeQuestion]
      const results = this.state.results

      if (question.rightAnswerId === answerId) {
         if (!results[question.id]) {
            results[question.id] = 'success'
         }

         this.setState({
            answerColorState: { [answerId]: 'success' },
            results
         })

         const timeout = window.setTimeout(() => {

            if (this.isFinished()) {
               this.setState({
                  isFinished: true
               })
            } else {
               this.setState({
                  activeQuestion: this.state.activeQuestion + 1,
                  answerColorState: null
               })
            }

            window.clearTimeout(timeout)
         }, 1000)

      } else {
         results[question.id] = 'error'
         this.setState({
            answerColorState: { [answerId]: 'error' },
            results
         })
      }
   }

   isFinished = () => {
      return this.state.activeQuestion + 1 === this.state.quiz.length
   }

   retryHandler = () => {
      this.setState({
         activeQuestion: 0,
         isFinished: false,
         answerColorState: null,
         results: {}
      })
   }

   render() {
      return (
         <div className={ classes.Quiz }>
            <div className={ classes.QuizWrapper }>
               <h1>Ответьте на все вопросы</h1>
               {
                  this.state.isFinished
                     ? <FinishedQuiz
                        results={ this.state.results }
                        quiz={ this.state.quiz }
                        onRetry={ this.retryHandler }
                     />
                     : <ActiveQuiz
                        answers={ this.state.quiz[this.state.activeQuestion].answers }
                        question={ this.state.quiz[this.state.activeQuestion].question }
                        onAnswerClickHandler={ this.onAnswerClickHandler }
                        quizLength={ this.state.quiz.length }
                        answerNumber={ this.state.activeQuestion + 1 }
                        answerColorState={ this.state.answerColorState }
                     />
               }
            </div>
         </div>
      )
   }
}

export default Quiz
