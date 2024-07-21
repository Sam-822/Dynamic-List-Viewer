import React, { useEffect, useState } from "react";

const Table = () => {
  const [entries, setEntries] = useState(20);
  const [totalEntries, setTotalEntries] = useState(0);
  const [noPages, setNoPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [flag, setFlag] = useState("hrno");

  const handleChange = (e) => {
    setEntries(parseInt(e.target.value));
    setNoPages(Math.ceil(totalEntries / parseInt(e.target.value)));
    setCurrentPage(1); // Reset to the first page when entries per page changes
  };

  const getData = async () => {
    const data = await fetch("/data.json");
    const parsedData = await data.json();
    setUserData(parsedData.users);
    setTotalEntries(parsedData.count);
    setNoPages(Math.ceil(parsedData.count / entries));
  };

  const updateDisplayData = () => {
    const startIndex = (currentPage - 1) * entries;
    const endIndex = startIndex + entries;
    setDisplayData(userData.slice(startIndex, endIndex));
  };

  const sortByKey = (key) => {
    let sortedData;
    if (key === "name") {
      sortedData = [...displayData].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    } else if (key === "id") {
      sortedData = [...displayData].sort((a, b) => a.id - b.id);
    } else if (key === "hrno") {
      sortedData = [...displayData].sort((a, b) => a.hrno - b.hrno);
    } else if (key === "city") {
      sortedData = [...displayData].sort((a, b) =>
        a.city.localeCompare(b.city)
      );
    } else if (key === "state") {
      sortedData = [...displayData].sort((a, b) =>
        a.state.localeCompare(b.state)
      );
    } else if (key === "date") {
      sortedData = [...displayData].sort((a, b) => a.dateJoined - b.dateJoined);
    }
    setDisplayData(sortedData);
    setFlag(key);
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    updateDisplayData();
  }, [userData, currentPage, entries]);

  return (
    <div style={{minHeight:'90vh'}}>
      <div
        className="flex h-8 justify-end mb-3 me-5"
        style={{ width: "webkit-fill-available" }}
      >
        <p className="m-0 px-5 flex items-center">
          No. of entries to be shown per page:
        </p>
        <input
          type="number"
          min={5}
					max={totalEntries}
          className="outline-none active:outline-none h-full w-16 px-1 py-auto text-black rounded"
          placeholder="No. of entries"
          value={entries}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <section id="table">
        <div className="flex items-center justify-evenly flex-wrap flex-col pb-8">
          <table className="border border-1 border-black">
            <thead>
              <tr className="py-1 ">
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("hrno");
                  }}
                >
                  HRNO{" "}
                  <span
                    className={`${
                      flag !== "hrno" ? "hidden" : ""
                    } absolute text-sm `}
                    style={{ right: "0.5em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("id");
                  }}
                >
                  ID{" "}
                  <span
                    className={`${
                      flag !== "id" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("name");
                  }}
                >
                  Name{" "}
                  <span
                    className={`${
                      flag !== "name" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("city");
                  }}
                >
                  City{" "}
                  <span
                    className={`${
                      flag !== "city" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("state");
                  }}
                >
                  State{" "}
                  <span
                    className={`${
                      flag !== "state" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative"
                  onClick={() => {
                    sortByKey("date");
                  }}
                >
                  Date Joined{" "}
                  <span
                    className={`${
                      flag !== "date" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    &#x25BC;
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((ele) => {
                const formattedDate = formatDate(ele.dateJoined);
                return (
                  <tr
                    key={ele.id}
                    className="py-1 odd:bg-slate-600 even:bg-slate-500"
                  >
                    <td className="border-x border-black text-center w-32">
                      {ele.hrno}
                    </td>
                    <td className="border-x border-black text-center w-32">
                      {ele.id}
                    </td>
                    <td className="border-x border-black text-center w-48">
                      {ele.name}
                    </td>
                    <td className="border-x border-black text-center w-44">
                      {ele.city}
                    </td>
                    <td className="border-x border-black text-center w-48">
                      {ele.state}
                    </td>
                    <td className="border-x border-black text-center w-44">
                      {formattedDate}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          {Array.from({ length: noPages }, (_, i) => (
            <button
              key={i}
              className={`px-3 py-1 mx-1 border rounded-full mb-8 ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Table;
