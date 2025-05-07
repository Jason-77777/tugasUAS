const express = require("express");
const { createSIM, getALLSIM, getSIMById, updateSIMById, deleteSIMById } = require("../controllers/dataSIMController");

const router = express.Router();

router.post("/", createSIM);
router.get("/", getALLSIM);
router.get("/:id", getSIMById);
router.put("/:id", updateSIMById);
router.delete("/:id", deleteSIMById);

module.exports = router;