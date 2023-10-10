import React, { useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useDispatch } from "react-redux";
import { createPayment } from "../../../State/Payment/Action";

const TuitionItem = ({ tuition }) => {
  const [isBoxOpen, setIsBoxOpen] = useState(false);

  const toggleBox = () => {
    setIsBoxOpen(!isBoxOpen);
  };

  const dispatch = useDispatch();
  const handleCheckout = () => {
    dispatch(createPayment(tuition.id));
  };
  //update
  // const { tuitionId } = useParams();
  // const [paymentId, setPaymentId] = useState();
  // useEffect(() => {
  //   const urlParam = new URLSearchParams(window.location.search);

  //   setPaymentId(urlParam.get("razorpay_payment_id"));
  // }, []);
  // useEffect(() => {
  //   const data = { tuitionId, paymentId };
  //   dispatch(updatePayment(data));
  // }, [tuitionId, paymentId, dispatch]);
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
                {tuition.semester} - {tuition.year}
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
                        Số TC học phí đăng ký
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {tuition.totalCredits}
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Học phí
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {tuition.totalPay}
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Số tiền đã đóng
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {tuition.amountPaid}
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Trạng thái thanh toán
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {tuition.paymentStatus}
                      </th>
                    </tr>
                    <tr>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        Thời gian đóng
                      </th>
                      <th
                        scope="col"
                        class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                      >
                        {tuition.payAt}
                      </th>
                    </tr>

                    {tuition.paymentStatus === "Đã thanh toán" ? null : ( // Nếu paymentStatus là "Đã thanh toán", nút sẽ biến mất
                      // Nếu paymentStatus không phải "Đã thanh toán", hiển thị nút "Thanh toán"
                      <tr>
                        <th scope="col"></th>
                        <th
                          scope="col"
                          class="border-r px-6 py-4 dark:border-neutral-500 text-center"
                        >
                          <button
                            type="button"
                            class="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-pink-500 hover:to-orange-500 text-white font-semibold px-6 py-3 rounded-md"
                            onClick={handleCheckout}
                          >
                            Thanh toán
                          </button>
                        </th>
                      </tr>
                    )}
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

export default TuitionItem;
