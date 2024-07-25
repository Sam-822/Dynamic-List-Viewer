import React from "react";

const NavBar = () => {
  return (
    <header className="text-gray-600 body-font dark:bg-slate-900 dark:text-gray-100 fixed w-full z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-100 mb-4 md:mb-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            height="10mm"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              imageRendering: "optimizeQuality",
              fillRule: "evenodd",
              clipRule: "evenodd",
            }}
            viewBox="0 0 1931.65 2923.88"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns:xodm="http://www.corel.com/coreldraw/odm/2003"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
          >
            <g id="Layer_x0020_1">
              <metadata id="CorelCorpID_0Corel-Layer" />
              <path
                id="logo"
                className="fil0 str0"
                d="M865.71 1132.97l0 -200.25 200.24 0 0 200.25 772.36 0c0,0 -100.12,-0 -100.12,-100.12 0,-100.12 100.12,-100.12 100.12,-100.12l-772.36 -858.18 0 286.06c0,0 -0.01,100.12 -100.12,100.12 -100.12,0 -100.12,-86.93 -100.12,-86.93l0 -156.23 -772.37 715.15c0,0 100.12,-0 100.12,100.12 0,100.12 -100.12,100.12 -100.12,100.12l972.61 657.94 0 200.25 -200.24 0 0 -200.25 -772.37 0c0,0 100.12,0 100.12,100.12 0,100.12 -100.12,100.12 -100.12,100.12l772.37 858.18 0 -286.06c0,0 -0.01,-100.12 100.12,-100.12 100.12,0 100.12,100.12 100.12,100.12l0 143.03 772.36 -715.15c0,0 -100.12,0 -100.12,-100.12 0,-100.12 100.12,-100.12 100.12,-100.12l-972.6 -657.94z"
              />
            </g>
          </svg>
          <span className="ml-3 text-xl">Abdul Samad Ansari</span>
        </a>
      </div>
    </header>
  );
};

export default NavBar;
