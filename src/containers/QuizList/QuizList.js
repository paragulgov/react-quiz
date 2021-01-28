import React, { Component } from 'react'
import classes from './QuizList.module.css'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchQuizzes } from '../../store/actions/quiz'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends Component {

   renderQuizzes() {
      return this.props.quizzes.map(quiz => {
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

   componentDidMount() {
      this.props.fetchQuizzes()
   }

   render() {

      return (
         <div className={ classes.QuizList }>
            <div>
               <h1>Список тестов</h1>

               {
                  this.props.loader && this.props.quizzes.length !== 0
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

function mapStateToProps(state) {
   return {
      quizzes: state.quiz.quizzes,
      loader: state.quiz.loader
   }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchQuizzes: () => dispatch(fetchQuizzes())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
