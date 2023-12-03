import React, { useState } from "react";

const EmailRegister = () => {
  const [registerEmail, setRegisterEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5454/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registerEmail }),
      });

      if (response.ok) {
        const data = await response.text();
        setResponseMessage(data);
        console.log("Email sent successfully!");
      } else {
        const errorData = await response.text();
        setResponseMessage(`Error: ${errorData}`);
        console.error("Failed to send email");
      }
    } catch (error) {
      setResponseMessage("Error sending email");
      console.error("Error sending email:", error);
    }
  };

  const handleEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit}>
        <div className="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
          <div className="md:mb-6 md:ml-auto">
            <p className="">
              <strong>Sign up for newsletter</strong>
            </p>
          </div>

          <div className="relative md:mb-6" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border border-white bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              id="exampleFormControlInput1"
              placeholder="Email address"
              value={registerEmail}
              onChange={handleEmailChange}
            />
            <label
              htmlFor="exampleFormControlInput1"
              className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-neutral-200 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
            >
              Email address
            </label>
          </div>

          <div className="mb-6 md:mr-auto">
            <button
              type="submit"
              className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
      {responseMessage && (
        <div className="mt-4 text-blue-600">{responseMessage}</div>
      )}
    </div>
  );
};

export default EmailRegister;
