import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";

import StudentPoint from "./StudentPoint";
import StudentInfo from "./StudentInfo";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../State/Auth/Action";

const StudentTable = () => {
  const jwt = localStorage.getItem("accessToken");
  const { auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  useEffect(() => {
    if (jwt) {
      dispatch(getUser(jwt));
    }
  }, [jwt, auth.jwt, dispatch]);

  const items = auth.user?.studentPoints.map((item) => (
    <StudentPoint studentPoint={item} />
  ));
  return (
    <div>
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 bg-black">
        <thead class="flex justify-center">
          <tr>
            <th
              scope="col"
              class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text"
              style={{ fontSize: "30px" }}
            >
              ACADEMIC TRANSCRIPT
            </th>
          </tr>
        </thead>
        <div className="relative px-5 border">
          <StudentInfo userInfo={auth.user} />
        </div>

        {/* <div className="relative px-5 border">{items}</div> */}
        <div class="relative px-5">
          <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1">
            <div>{items}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
