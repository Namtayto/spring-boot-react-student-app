import React, { useEffect, useState } from "react";
import StudentList from "./StudentList";

const TeacherPage = () => {
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
              List of student
            </th>
          </tr>
        </thead>
        <StudentList></StudentList>
      </div>
    </div>
  );
};

export default TeacherPage;
