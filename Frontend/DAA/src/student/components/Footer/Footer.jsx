import { Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Grid
        className="bg-black text-white text-center"
        container
        sx={{ bgcolor: "black", color: "white", py: 3 }}
      >
        <Grid className="pt-20" item xs={12}>
          <div class="content">
            <p class="rtecenter">
              <span>
                <span>
                  <strong>PHÒNG ĐÀO TẠO ĐẠI HỌC</strong>
                </span>
              </span>
              <br />
              Trường abcxyz
              <br />
              địa chỉ abc
              <br />
              Điện thoại: <strong>(028) 372 51993, Ext: 113</strong>(Hệ từ xa
              qua mạng), <strong>112</strong>(Hệ chính quy).
              <br />
              Email:{" "}
              <strong>
                <a
                  href="mailto:phongdaotaodh@abc.edu.vn"
                  className="text-blue-500"
                >
                  phongdaotaodh@abc.edu.vn
                </a>
              </strong>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
