const express = require("express");

const {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
} = require("../controllers/issue.controller");

const router = express.Router();

router.get("/", getIssues);
router.get("/:id", getIssue);
router.post("/", createIssue);
router.patch("/:id", updateIssue);
router.delete("/:id", deleteIssue);

module.exports = router;