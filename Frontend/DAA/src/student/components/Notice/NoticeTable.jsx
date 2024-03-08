import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";

import NoticeItem from "./NoticeItem";
import { useDispatch, useSelector } from "react-redux";
import { getNotice } from "../../../State/Notice/Action";

const NoticeTable = ({ data }) => {
  const dispatch = useDispatch();
  const { notice } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getNotice());
  }, [dispatch]);

  // const items = data.slice(0, 10).map((item) => <NoticeItem notice={item} />);
  const items = notice.notices.map((item) => <NoticeItem notice={item} />);
  return (
    <div>
      <tr>
        <th
          scope="col"
          class="px-6 py-3 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text bg-black"
          style={{ fontSize: "20px" }}
        >
          THÔNG BÁO CHUNG
        </th>
      </tr>
      {/* <div class="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-1"> */}

      <div class="bg-gradient-to-r from-pink-500 to-black p-1">
        <div>{items}</div>
      </div>
      {/* <div className="relative px-5 border-2 border-rose-500">{items}</div> */}
    </div>
  );
};

export default NoticeTable;
