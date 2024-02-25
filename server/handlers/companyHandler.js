const Company = require("../models/companyModel");

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { cityName, companyName } = req.body;

  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      id,
      { cityName, companyName },
      { new: true }
    );
    res.json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    await Company.findByIdAndDelete(id);
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
