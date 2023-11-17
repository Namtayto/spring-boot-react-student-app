import axios from "axios";
import { toast } from "react-toastify";

import {
  ADD_USER,
  DELETE_USER,
  FAIL_REQUEST,
  GET_STUDENT_POINT,
  GET_USER_LIST,
  MAKE_REQUEST,
  UPDATE_USER,
} from "./ActionType";

export const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};
export const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};
export const geUserList = (data) => {
  return {
    type: GET_USER_LIST,
    payload: data,
  };
};
export const getStudentPoint = (data) => {
  return {
    type: GET_STUDENT_POINT,
    payload: data,
  };
};
export const deleteUser = () => {
  return {
    type: DELETE_USER,
  };
};
export const addUser = () => {
  return {
    type: ADD_USER,
  };
};
export const updateUser = () => {
  return {
    type: UPDATE_USER,
  };
};

export const FetchUserList = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    setTimeout(() => {
      axios
        .get("http://localhost:5454/student/getStudentList")
        .then((res) => {
          const userlist = res.data;
          console.log(userlist);
          dispatch(geUserList(userlist));
        })
        .catch((err) => {
          dispatch(failRequest(err.message));
        });
    }, 50);
  };
};

export const Removeuser = (code) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .delete("http://localhost:5454/student/delete/" + code)
      .then((res) => {
        dispatch(deleteUser());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};

export const FunctionAddUser = (data) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .post("http://localhost:5454/auth/signup/student", data)
      .then((res) => {
        dispatch(addUser());
        dispatch(FetchUserList());
        toast.success("User Added successfully.");
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};
export const FunctionAddPoint = (data, id, semester) => {
  return (dispatch) => {
    dispatch(makeRequest());
    //setTimeout(() => {
    axios
      .post(
        "http://localhost:5454/student/subject/" + id + "/" + semester,
        data
      )
      .then((res) => {
        // dispatch(addUser());
        dispatch(FetchUserList());
        toast.success("Point Added successfully.");
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // }, 2000);
  };
};

// export const FunctionUpdateUser = (data, code) => {
//   return (dispatch) => {
//     dispatch(makeRequest());
//     //setTimeout(() => {
//     axios
//       .put("http://localhost:8000/user/" + code, data)
//       .then((res) => {
//         dispatch(updateUser());
//         toast.success("User Updated successfully.");
//       })
//       .catch((err) => {
//         dispatch(failRequest(err.message));
//       });
//     // }, 2000);
//   };
// };
