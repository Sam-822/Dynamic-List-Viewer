import React, { useEffect, useState } from "react";
import Hero from "./components/Hero";
import Table from "./components/Table";

function App() {
  return (
    <main className="dark:bg-slate-700 dark:text-white">
      <Hero />
      <Table />
    </main>
  );
}

export default App;
