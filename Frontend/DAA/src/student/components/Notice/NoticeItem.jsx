import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const NoticeItem = ({ notice }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <tbody>
          <tr
            // className="bg-black border-b dark:bg-gray-800 dark:border-gray-700"
            onClick={toggleBox}
            style={{ cursor: "pointer" }}
          >
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-black"
            >
              <KeyboardArrowRightIcon className="text-red-600" />
              <span className="p-4 text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">
                {notice.title}
              </span>
              <span className="text-center font-bold from-purple-600 via-pink-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent opacity-80 ml-10">
                {notice.createdAt}
              </span>
            </th>
          </tr>
          {isBoxOpen && (
            <div className="text-white">
              {notice.description}
              {notice.imageURL !== null && (
                <div className="h-[10rem] w-[20rem]">
                  <img
                    className="h-full w-full object-cover "
                    src={notice.imageURL}
                    alt=""
                  />
                </div>
              )}
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NoticeItem;
