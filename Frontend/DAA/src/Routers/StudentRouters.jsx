import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../student/components/Pages/HomePage/HomePage";

import Navigation from "../student/components/Navigation/Navigation";
import Footer from "../student/components/Footer/Footer";

import StudentTable from "../student/components/StudentInformation/StudentTable";
import Tuition from "../student/components/Tuition/Tuition";
import PaymentSuccess from "../student/components/Payment/PaymentSuccess";

const StudentRouters = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>
      <Routes>
        <Route path="/login" element={<HomePage />}></Route>
        <Route path="/register" element={<HomePage />}></Route>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/account/point" element={<StudentTable />}></Route>
        <Route path="/account/tuition" element={<Tuition />}></Route>
        <Route path="/payment/:tuitionId" element={<Tuition />}></Route>
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default StudentRouters;
