import {
   FETCH_QUIZZES_SUCCESS,
   FETCH_QUIZZES_ERROR,
   FETCH_QUIZZES_START,
   QUIZ_NEXT_QUESTION,
   FETCH_QUIZ_SUCCESS,
   QUIZ_SET_STATE,
   FINISH_QUIZ,
   QUIZ_RETRY
} from '../actions/actionTypes'

const initialState = {
   quizzes: [],
   loader: false,
   error: null,
   isFinished: false,
   activeQuestion: 0,
   answerColorState: null, // { [id]: 'success' or 'error' }
   results: {}, // { [id]: 'success' or 'error' }
   quiz: null
}

export default function quizReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_QUIZZES_START:
         return {
            ...state,
            loader: true
         }
      case FETCH_QUIZZES_SUCCESS:
         return {
            ...state,
            loader: false,
            quizzes: action.quizzes
         }
      case FETCH_QUIZZES_ERROR:
         return {
            ...state,
            loader: false,
            error: action.error
         }
      case FETCH_QUIZ_SUCCESS:
         return {
            ...state,
            loader: false,
            quiz: action.quiz
         }
      case QUIZ_SET_STATE:
         return {
            ...state,
            answerColorState: action.answerColorState,
            results: action.results
         }
      case FINISH_QUIZ:
         return {
            ...state,
            isFinished: true
         }
      case QUIZ_NEXT_QUESTION:
         return {
            ...state,
            answerColorState: null,
            activeQuestion: action.number
         }
      case QUIZ_RETRY:
         return {
            ...state,
            activeQuestion: 0,
            isFinished: false,
            answerColorState: null,
            results: {}
         }
      default:
         return state
   }
}
