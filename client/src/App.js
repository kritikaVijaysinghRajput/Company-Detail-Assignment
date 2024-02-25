// App.js
import React, { useState, useEffect } from "react";
import CompanyList from "./CompanyList";
import { getCompanies } from "./services/companyService";

const App = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };

    fetchCompanies();
  }, []);

  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <CompanyList companies={companies} />
    </div>
  );
};

export default App;
