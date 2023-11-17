import {
  ADD_USER,
  DELETE_USER,
  FAIL_REQUEST,
  GET_STUDENT_POINT,
  GET_USER_LIST,
  MAKE_REQUEST,
  UPDATE_USER,
} from "./ActionType";

const initialstate = {
  loading: true,
  userlist: [],
  userobj: {},
  errmessage: "",
  pointData: null,
};

export const studentReducer = (state = initialstate, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errmessage: action.payload,
      };
    case GET_USER_LIST:
      return {
        loading: false,
        errmessage: "",
        userlist: action.payload,
        userobj: {},
      };
    case DELETE_USER:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER:
      return {
        ...state,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
      };
    case GET_STUDENT_POINT:
      return {
        ...state,
        pointData: action.payload,
      };
    default:
      return state;
  }
};
