import React, { Component } from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz } from '../../store/actions/quiz'

class Quiz extends Component {

   componentDidMount() {
      this.props.fetchQuizById(this.props.match.params.id)
   }

   componentWillUnmount() {
      this.props.retryQuiz()
   }

   render() {
      return (
         <div className={ classes.Quiz }>
            <div className={ classes.QuizWrapper }>
               <h1>Ответьте на все вопросы</h1>

               {
                  this.props.loader || !this.props.quiz
                     ? <Loader />
                     : this.props.isFinished
                     ? <FinishedQuiz
                        results={ this.props.results }
                        quiz={ this.props.quiz }
                        onRetry={ this.props.retryQuiz }
                     />
                     : <ActiveQuiz
                        answers={ this.props.quiz[this.props.activeQuestion].answers }
                        question={ this.props.quiz[this.props.activeQuestion].question }
                        onAnswerClickHandler={ this.props.quizAnswerClick }
                        quizLength={ this.props.quiz.length }
                        answerNumber={ this.props.activeQuestion + 1 }
                        answerColorState={ this.props.answerColorState }
                     />
               }

            </div>
         </div>
      )
   }
}

function mapStateToProps(state) {
   return {
      isFinished: state.quiz.isFinished,
      activeQuestion: state.quiz.activeQuestion,
      answerColorState: state.quiz.answerColorState, // { [id]: 'success' or 'error' }
      results: state.quiz.results, // { [id]: 'success' or 'error' }
      quiz: state.quiz.quiz,
      loading: state.quiz.loading
   }
}

function mapDispatchToProps(dispatch) {
   return {
      fetchQuizById: id => dispatch(fetchQuizById(id)),
      quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
      retryQuiz: () => dispatch(retryQuiz())
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
