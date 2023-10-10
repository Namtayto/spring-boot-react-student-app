import {
  GET_NOTICE_FAILURE,
  GET_NOTICE_REQUEST,
  GET_NOTICE_SUCCESS,
} from "./ActionType";

const initialState = {
  notice: null,
  loading: false,
  error: null,
  notices: [],
};

export const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICE_REQUEST:
      return { ...state, loading: true, error: null };
    case GET_NOTICE_SUCCESS:
      return {
        ...state,
        notices: action.payload,
        loading: false,
      };
    case GET_NOTICE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
