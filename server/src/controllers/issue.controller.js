const Issue = require("../models/issue.model");

const getIssues = async (req, res, next) => {
    try {
        const issues = await Issue.find().sort({ createdAt: -1 });

        res.status(200).json(issues);
    } catch (error) {
        next(error);
    }
};

const getIssue = async (req, res, next) => {
    try {
        const issue = await Issue.findById(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
};

const createIssue = async (req, res, next) => {
    try {
        const issue = await Issue.create({
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
        });

        res.status(201).json(issue);
    } catch (error) {
        next(error);
    }
};

const updateIssue = async (req, res, next) => {
    try {
        const issue = await Issue.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        res.status(200).json(issue);
    } catch (error) {
        next(error);
    }
};

const deleteIssue = async (req, res, next) => {
    try {
        const issue = await Issue.findByIdAndDelete(req.params.id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue not found",
            });
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getIssues,
    getIssue,
    createIssue,
    updateIssue,
    deleteIssue,
};