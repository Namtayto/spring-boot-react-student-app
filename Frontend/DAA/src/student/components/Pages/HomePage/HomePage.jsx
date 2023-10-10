import React from "react";

import { notice } from "../../../../Data/notice";
import NoticeTable from "../../Notice/NoticeTable";

const HomePage = () => {
  return (
    <div className="bg-black -mt-40">
      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10 mt-40">
        <NoticeTable data={notice} />
      </div>
    </div>
  );
};

export default HomePage;
