import React from "react";

const StudentInfo = ({ userInfo }) => {
  return (
    <div>
      <table
        cellpadding="0"
        cellspacing="0"
        border="0"
        bordercolor="#FFFFFF"
        width="100%"
      >
        <tr>
          <td className="text-white">Họ và tên:</td>
          <td>
            <strong className="text-white">
              {userInfo?.firstName} {userInfo?.lastName}
            </strong>
          </td>
          <td className="text-white">Ngày sinh:</td>
          <td>
            <strong>{userInfo?.birth}</strong>
          </td>
          <td className="text-white">Giới tính:</td>
          <td className="text-white">
            <strong>{userInfo?.sex}</strong>
          </td>
        </tr>
        <tr>
          <td className="text-white">Mã SV:</td>
          <td>
            <strong className="text-white">{userInfo?.studentId}</strong>
          </td>
          <td className="text-white">Lớp sinh hoạt:</td>
          <td className="text-white">
            <strong>{userInfo?.class}</strong>
          </td>
          <td className="text-white">Khoa:</td>
          <td className="text-white">
            <strong>{userInfo?.department}</strong>
          </td>
        </tr>
        <tr>
          <td className="text-white">Bậc đào tạo:</td>
          <td>
            <strong className="text-white">{userInfo?.educationLevel}</strong>
          </td>
          <td className="text-white">Hệ đào tạo:</td>
          <td colspan="3">
            <strong className="text-white">{userInfo?.educationProgram}</strong>
          </td>
        </tr>
      </table>
      <table
        cellpadding="2"
        cellspacing="0"
        border="1"
        bordercolor="#000000"
        width="100%"
      ></table>
    </div>
  );
};

export default StudentInfo;
