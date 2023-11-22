import { Grid } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <footer class="mt-40 flex flex-col items-center bg-black text-center text-white">
      <div className="text-lg font-bold">
        Student project developed using Spring Boot and React.js.
      </div>
      <div class="container px-6 pt-6">
        <div class="mb-6">
          <p>
            An actual version of frontend build deployed to Vercel and backend
            deployed to Render: https://studywithnam.vercel.app
          </p>
        </div>
        <div class="mb-6">
          <p>
            Teacher default account: Username: teacher@gmail.com ; Password:
            teacher
          </p>
        </div>
        <div>
          <p className="text-red-800">
            Note: If any request is not sent for a few minutes the server will
            automatically suspend. It will start again after 5 minutes since the
            first request.
          </p>
        </div>

        <div className="mt-10">
          <form action="">
            <div class="gird-cols-1 grid items-center justify-center gap-4 md:grid-cols-3">
              <div class="md:mb-6 md:ml-auto">
                <p class="">
                  <strong>Sign up for newsletter</strong>
                </p>
              </div>

              <div class="relative md:mb-6" data-te-input-wrapper-init>
                <input
                  type="text"
                  class="peer block min-h-[auto] w-full rounded border border-white bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                />
                <label
                  for="exampleFormControlInput1"
                  class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-neutral-200 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                >
                  Email address
                </label>
              </div>

              <div class="mb-6 md:mr-auto">
                <button
                  type="submit"
                  class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="mb-6 flex justify-center items-center">
        <div class="text-white">Source code:</div>
        <a
          href="https://github.com/Namtayto/spring-boot-react-student-app"
          type="button"
          class="ml-4 m-1 h-9 w-9 rounded-full border-2 border-white uppercase leading-normal text-white transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class=" mx-auto h-full w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
      </div>

      {/* <div class="w-full p-4 text-center">
        © 2023 Copyright:
        <a class="text-white" href="https://tw-elements.com/">
          TW elements
        </a>
      </div> */}
    </footer>
  );
};

export default Footer;
