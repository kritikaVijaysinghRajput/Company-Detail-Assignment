const express = require("express");
const companyHandler = require("../handlers/companyHandler");
const Company = require("../models/companyModel");
const router = express.Router();
router.post("/createCompany", async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating company" });
  }
});
router.get("/", companyHandler.getCompanies);
router.post("/", async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating company" });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const companyId = req.params.id;
    const updatedCompanyData = req.body;

    const existingCompany = await Company.findById(companyId);
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    Object.assign(existingCompany, updatedCompanyData);
    const updatedCompany = await existingCompany.save();

    res.json(updatedCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating company" });
  }
});
router.delete("/:id", companyHandler.deleteCompany); // Delete

module.exports = router;
