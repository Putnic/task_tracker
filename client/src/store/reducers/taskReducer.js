import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TASKS_LOADING,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  SET_SORTING
} from '../actions/types';

const initialState = {
  tasks: [],
  loading: false,
  filter: VisibilityFilters.SHOW_ALL,
  sorting: {
    name: 'date_creation',
    order: false
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        loading: false
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks]
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: [...state.tasks].map(task => 
          (task._id === action.payload._id) 
            ? action.payload 
            : task
        )
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task._id !== action.payload)
      };
    case TASKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case SET_VISIBILITY_FILTER:
      return {
        ...state,
        filter:action.payload
      };
    case SET_SORTING:
      return {
        ...state,
        sorting: action.payload
      };
    default:
      return state;
  }
}
