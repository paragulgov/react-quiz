import { FETCH_QUIZZES_ERROR, FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS } from '../actions/actionTypes'

const initialState = {
   quizzes: [],
   loader: false,
   error: null
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
      default:
         return state
   }
}
