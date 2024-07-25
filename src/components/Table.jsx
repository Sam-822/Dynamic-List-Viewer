import React, { useEffect, useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Table = () => {
  const [entries, setEntries] = useState(20); // No of entries per page
  const [totalEntries, setTotalEntries] = useState(0); // No of entries present in the data
  const [noPages, setNoPages] = useState(1); // No of pages calculated based on total entries present divided by no of entries per page
  const [currentPage, setCurrentPage] = useState(1); // Manages the current page displayed
  const [userData, setUserData] = useState([]); // Keeps record of data present in data.json
  const [displayData, setDisplayData] = useState([]); // Keeps record of the data to be displayed on current page
  const [query, setQuery] = useState(""); // Query for the global search
  const [dropFlag, setDropFlag] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [selectedStates, setSelectedStates] = useState(new Set()); // Store selected states
  const [sortConfig, setSortConfig] = useState({
    key: "hrno",
    direction: "asc",
  }); // Sort configuration to handle the sort function
  const [dateRange, setDateRange] = useState([null, null]);
  const [dateDropdownFlag, setDateDropdownFlag] = useState(false);

  // Fetch data from data.json
  const fetchData = async () => {
    const response = await fetch("/data.json");
    const data = await response.json();
    setUserData(data.users);
    setTotalEntries(data.count);
    setNoPages(Math.ceil(data.count / entries)); // Updates the total number of pages
    getUniqueStates(data.users); // Extract unique states from the fetched data
  };

  // Get unique states from the data
  const getUniqueStates = (data) => {
    const states = data.map((item) => item.state); // Extract all states
    const uniqueStates = [...new Set(states)]; // Remove duplicates
    setStateList(uniqueStates);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropFlag((prev) => !prev);
  };

  // Handle clicks on checkboxes
  const handleCheckboxClick = (state) => {
    setSelectedStates((prev) => {
      const updatedStates = new Set(prev);
      if (updatedStates.has(state)) {
        updatedStates.delete(state);
      } else {
        updatedStates.add(state);
      }
      return updatedStates;
    });
  };

  //Function to handle changes in the "No of entry page" input field
  const handleNoEntryChange = (e) => {
    const newEntries = parseInt(e.target.value);
    setEntries(newEntries);
    setCurrentPage(1); // Jump back to the first page when number of entries per page is changed
  };

  // Function to handle changes in the search query input field
  const handleQueryChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
  };

  // Function to check if an object contains a string for the global search feature
  const containsString = (obj, searchString) => {
    const lowerCaseSearchString = searchString.toLowerCase();
    return Object.values(obj).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(lowerCaseSearchString)
    );
  };

  // Function to handle the global search
  const filterObjectsByString = (objList, searchString) => {
    return objList.filter((obj) => containsString(obj, searchString));
  };

  const filterObjectsByDateRange = (objList, start, end) => {
    return objList.filter((obj) => {
      const dateJoined = new Date(parseInt(obj.dateJoined));
      return (!start || dateJoined >= start) && (!end || dateJoined <= end);
    });
  };

  // Memo hook to update the data displayed on the current page
  const updateDisplayData = useMemo(() => {
    let filteredData = userData;
    if (query) {
      filteredData = filterObjectsByString(userData, query);
    }
    if (selectedStates.size > 0) {
      filteredData = filteredData.filter((item) =>
        selectedStates.has(item.state)
      );
    }
    if (dateRange[0] || dateRange[1]) {
      filteredData = filterObjectsByDateRange(
        filteredData,
        dateRange[0],
        dateRange[1]
      );
    }
    setNoPages(Math.ceil(filteredData.length / entries)); // Updates the total number of pages
    const startIndex = (currentPage - 1) * entries; // First index of current page
    const endIndex = startIndex + entries; // Last index of current page
    let sortedData = filteredData.slice();
    const { key, direction } = sortConfig;

    // Keys for sorting the list of objects
    const sorters = {
      name: (a, b) => a.name.localeCompare(b.name),
      id: (a, b) => a.id - b.id,
      hrno: (a, b) => a.hrno - b.hrno,
      city: (a, b) => a.city.localeCompare(b.city),
      state: (a, b) => a.state.localeCompare(b.state),
      date: (a, b) => a.dateJoined - b.dateJoined,
    };
    sortedData.sort((a, b) => {
      const comparison = sorters[key](a, b);
      return direction === "asc" ? comparison : -comparison;
    }); // Function to sort the data in ascending and descending order

    return sortedData.slice(startIndex, endIndex); // Entries on the current page
  }, [
    userData,
    currentPage,
    entries,
    sortConfig,
    query,
    selectedStates,
    dateRange,
  ]);

  // Toggles between ascending and descending order
  const handleSort = (key) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  // Formats data to DD/MM/YYYY format
  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Updates the current page
  const handlePageChange = (page) => setCurrentPage(page);

  // Fetches data from data.json, runs only on the first render
  useEffect(() => {
    fetchData();
  }, []);

  // Updates the display data, rerenders every time display data is updated
  useEffect(() => {
    setDisplayData(updateDisplayData);
  }, [updateDisplayData]);

  return (
    <div style={{ minHeight: "90vh" }}>
      <div
        className="flex h-8 justify-between mb-8 ms-5"
        style={{ width: "webkit-fill-available" }}
      >
        <div className="flex">
          <input
            type="text"
            className="outline-none active:outline-none h-full w-56 px-1 py-auto text-black rounded"
            placeholder="Search"
            value={query}
            onChange={handleQueryChange}
          />
        </div>
        <div className="flex">
          <p className="m-0 px-5 flex items-center">
            No. of entries to be shown per page:
          </p>
          <input
            type="number"
            min={5}
            max={totalEntries}
            className="outline-none active:outline-none h-full w-16 px-1 py-auto text-black rounded me-5"
            placeholder="No. of entries"
            value={entries}
            onChange={handleNoEntryChange}
          />
        </div>
      </div>
      <div className="date-range-picker"></div>
      <section id="table">
        <div className="flex items-center justify-evenly flex-wrap flex-col pb-8">
          <table className="border border-1 border-black">
            <thead>
              <tr className="py-1 w-32">
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-32"
                  onClick={() => handleSort("hrno")}
                >
                  HRNO
                  <span
                    className={`${
                      sortConfig.key !== "hrno" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-32"
                  onClick={() => handleSort("id")}
                >
                  ID
                  <span
                    className={`${
                      sortConfig.key !== "id" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-48"
                  onClick={() => handleSort("name")}
                >
                  NAME
                  <span
                    className={`${
                      sortConfig.key !== "name" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-44"
                  onClick={() => handleSort("city")}
                >
                  CITY
                  <span
                    className={`${
                      sortConfig.key !== "city" ? "hidden" : ""
                    } absolute text-sm`}
                    style={{ right: "1em", top: "0.19em" }}
                  >
                    {sortConfig.direction === "asc" ? "▲" : "▼"}
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-48"
                  onClick={() => toggleDropdown()}
                >
                  STATE
                  <span
                    className={`absolute top-7 -right-8 ${
                      dropFlag ? "" : "hidden"
                    } z-10`}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <ul className="bg-white text-black w-32 rounded px-1">
                      <li className="relative">
                        <span
                          className=" px-2 rounded absolute -right-1 top-0 cursor-pointer text-xs hover:bg-gray-300"
                          onClick={() => toggleDropdown()}
                        >
                          X
                        </span>
                      </li>
                      <li className="font-thin text-sm flex">
                        <input
                          type="checkbox"
                          name=""
                          id="select-all"
                          checked={stateList.length === selectedStates.size}
                          onChange={() => {
                            if (selectedStates.size === stateList.length) {
                              setSelectedStates(new Set());
                            } else {
                              setSelectedStates(new Set(stateList));
                            }
                          }}
                        />
                        Select All
                      </li>
                      {stateList.map((state) => (
                        <li
                          key={state}
                          className="font-thin text-sm flex"
                          onClick={() => setCurrentPage(1)}
                        >
                          <input
                            type="checkbox"
                            name=""
                            id={`state-${state}`}
                            checked={selectedStates.has(state)}
                            onChange={() => handleCheckboxClick(state)}
                          />
                          {state}
                        </li>
                      ))}
                    </ul>
                  </span>
                </th>
                <th
                  className="text-center border border-1 border-black cursor-pointer relative min-w-44"
                  onClick={() => setDateDropdownFlag(!dateDropdownFlag)}
                >
                  DATE JOINED
                  <div
                    className={`bg-white text-black absolute top-7 left-9 rounded p-3 w-72 flex items-start flex-col ${
                      dateDropdownFlag ? "" : "hidden"
                    } `}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <span
                      className="absolute right-0 top-0 bg-white z-10 hover:bg-gray-300 px-2 rounded"
                      onClick={() => setDateDropdownFlag(!dateDropdownFlag)}
                    >
                      X
                    </span>
                    <div>
                      <label className="mr-2 w-full">Start Date:</label>
                      <DatePicker
                        className="text-black w-36 outline-none"
                        selected={dateRange[0]}
                        onChange={(date) => setDateRange([date, dateRange[1]])}
                        selectsStart
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select start date"
                      />
                    </div>
                    <div>
                      <label className="mr-2">End Date:</label>
                      <DatePicker
                        className="text-black w-36 outline-none"
                        selected={dateRange[1]}
                        onChange={(date) => setDateRange([dateRange[0], date])}
                        selectsEnd
                        startDate={dateRange[0]}
                        endDate={dateRange[1]}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select end date"
                        minDate={dateRange[0]}
                      />
                    </div>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((ele) => (
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
                    {formatDate(ele.dateJoined)}
                  </td>
                </tr>
              ))}
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
