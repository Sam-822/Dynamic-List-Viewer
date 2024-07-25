import React from "react";
import Logo from "./Logo";

const Hero = () => {
  return (
    <section className="text-gray-600 body-font pt-16 min-h-svh">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Task #01
          </h1>
          <p className="mb-8 leading-relaxed dark:text-gray-100 max-w-3xl">
            The purpose of this task is to make a table containing user data
            like Name, ID, Address, HRNO and Date Joined using react and
            tailwind css, add a limiter for how many fields should be visible on
            each page and add pagination to navigate between different pages.
          </p>
          <div className="flex justify-center">
            <a
              href="https://github.com/Sam-822/Dynamic-List-Viewer"
              target="_blank"
              className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              View Source code <i className=" ml-2 bi bi-github"></i>
            </a>
            <a
              href="#table"
              className="ml-4 cursor-pointer inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg "
            >
              Scroll to table{" "}
              <i className=" ml-2 bi bi-arrow-down-circle-fill move-down"></i>
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Logo />
        </div>
      </div>
    </section>
  );
};

export default Hero;
