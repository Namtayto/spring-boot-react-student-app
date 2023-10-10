import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const StudentPoint = ({ studentPoint }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left">
        <tbody>
          <tr
            className="border-b border-red-400"
            onClick={toggleBox}
            style={{ cursor: "pointer" }}
          >
            <th scope="row" className="px-6 py-4 whitespace-nowrap bg-black">
              <KeyboardArrowRightIcon className="text-red-600" />
              <span className="p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                {studentPoint.semester} - {studentPoint.year}
              </span>
            </th>

            {isBoxOpen && (
              <div class="relative overflow-x-auto">
                <table class="w-full">
                  <thead class="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Mã HP
                      </th>
                      <th
                        scope="col"
                        class="border-r px-10 py-4 dark:border-neutral-500 text-center"
                      >
                        Tên học phần
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Tín chỉ
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Điểm QT
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Điểm GK
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Điểm TH
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Điểm CK
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Điểm HP
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Ghi chú
                      </th>
                    </tr>
                    {isBoxOpen &&
                      studentPoint.subjects.map((subject, index) => (
                        <tr key={index}>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center ">
                            {subject.subjectId}
                          </td>
                          <td className="border-r px-10 py-4 dark:border-neutral-500 text-center">
                            {subject.subjectName}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.credits}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.point1}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.point2}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.point3}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.point4}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.pointAverage}
                          </td>
                          <td className="border-r px-6 py-4 dark:border-neutral-500 text-center">
                            {subject.note}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-10 py-4 dark:border-neutral-500 text-center"
                      >
                        Trung bình học kỳ
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {studentPoint.semesterAverage}
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      ></th>
                    </tr>
                  </thead>
                </table>
              </div>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentPoint;
