const express = require("express");
const {
  addEmployee,
  getEmployees,
  getRecentEmployees,
  importEmployees,
  updateEmployee,
} = require("../controllers/employee.controller");

const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");

const router = express.Router();

router.post("/", auth, addEmployee);
router.post("/import", auth, upload.single("file"), importEmployees);
router.get("/", auth, getEmployees);
router.get("/recent", auth, getRecentEmployees);
router.put("/:id", auth, updateEmployee);

module.exports = router;