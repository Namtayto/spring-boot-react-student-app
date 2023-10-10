import { noneJWT } from "../../config/apiconfig";
import {
  GET_NOTICE_FAILURE,
  GET_NOTICE_REQUEST,
  GET_NOTICE_SUCCESS,
} from "./ActionType";

export const getNotice = () => async (dispatch) => {
  dispatch({ type: GET_NOTICE_REQUEST });

  try {
    const { data } = await noneJWT.get(`/notice/all`);
    dispatch({ type: GET_NOTICE_SUCCESS, payload: data });
    console.log("Notice: ", data);
  } catch (error) {
    dispatch({ type: GET_NOTICE_FAILURE, payload: error.message });
  }
};
