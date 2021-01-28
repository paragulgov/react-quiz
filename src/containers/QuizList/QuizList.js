import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { NavLink } from 'react-router-dom'
import axios from '../../axios/axios-quizzes'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends Component {

   state = {
      quizzes: [],
      loader: true
   }

   renderQuizzes() {
      return this.state.quizzes.map(quiz => {
         return (
            <li
               key={ quiz.id }
            >
               <NavLink to={ 'quiz/' + quiz.id }>
                  { quiz.name }
               </NavLink>
            </li>
         )
      })
   }

   async componentDidMount() {
      try {
         const response = await axios.get('quizzes.json')

         const quizzes = []

         Object.keys(response.data).forEach((key, index) => {
            quizzes.push({
               id: key,
               name: `Тест №${ index + 1 }`
            })
         })

         this.setState({
            quizzes,
            loader: false
         })
      } catch (error) {
         console.log(error)
      }
   }

   render() {
      return (
         <div className={ classes.QuizList }>
            <div>
               <h1>Список тестов</h1>

               {
                  this.state.loader
                     ? <Loader />
                     : <ul>
                        { this.renderQuizzes() }
                     </ul>
               }

            </div>
         </div>
      )
   }
}

export default QuizList
