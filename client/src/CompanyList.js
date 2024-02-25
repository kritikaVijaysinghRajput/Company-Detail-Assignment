import React, { useState, useEffect } from "react";
import {
  getCompanies,
  createCompany,
  updateCompany,
  deleteCompany,
} from "./services/companyService";

const CompanyList = ({ companies }) => {
  const [formData, setFormData] = useState({ cityName: "", companyName: "" });
  const [enteredData, setEnteredData] = useState([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  useEffect(() => {
    setEnteredData(companies);
  }, [companies]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (selectedCompanyId) {
    } else {
      const newCompany = await createCompany({
        name: formData.companyName,
        location: formData.cityName,
      });
      setEnteredData((prevData) => [...prevData, newCompany]);
    }

    setFormData({ cityName: "", companyName: "" });
    setSelectedCompanyId(null);
  };

  const handleUpdate = (companyId) => {
    const selectedCompany = enteredData.find(
      (company) => company._id === companyId
    );
    setFormData({
      cityName: selectedCompany.location,
      companyName: selectedCompany.name,
    });
    setSelectedCompanyId(companyId);
  };

  const handleDelete = async (companyId) => {
    await deleteCompany(companyId);
    setEnteredData(enteredData.filter((company) => company._id !== companyId));
  };

  return (
    <div className="flex flex-col items-center w-screen justify-center h-screen">
      <div className="max-w-md w-full border p-5 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Company List</h1>
        <form onSubmit={handleFormSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-sm font-medium">
              Company Name
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md shadow-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cityName" className="block text-sm font-medium">
              City Name
            </label>
            <input
              type="text"
              id="cityName"
              name="cityName"
              value={formData.cityName}
              onChange={(e) =>
                setFormData({ ...formData, cityName: e.target.value })
              }
              className="mt-1 p-2 w-full border rounded-md shadow-md"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            {selectedCompanyId ? "Update" : "Insert"}
          </button>
        </form>

        <h2 className="text-lg font-bold mb-2 text-center">Company Data</h2>
        <div className="grid grid-cols-1 gap-4">
          {enteredData?.map((data) => (
            <div
              key={data?._id}
              className="bg-white p-4 rounded-md shadow-md border border-gray-400 w-full"
            >
              <h3 className="text-lg font-bold mb-2">{data?.name || "N/A"}</h3>
              <p className="text-gray-500">{data?.location || "N/A"}</p>
              <div className="flex mt-2">
                <button
                  className="mr-2 bg-yellow-500 text-white px-2 py-1  rounded-md hover:bg-yellow-600"
                  onClick={() => handleUpdate(data._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                  onClick={() => handleDelete(data._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
