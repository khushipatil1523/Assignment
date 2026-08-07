const Component = require("../models/Component");

// Create Component
// Create Component
const createComponent = async (req, res) => {
    try {

        console.log("Incoming Body:", req.body);

        const { name, category } = req.body;

        // Prevent duplicate component in same category
        const existingComponent = await Component.findOne({
            name,
            category,
        });

        if (existingComponent) {
            return res.status(400).json({
                success: false,
                message: "Component already exists in this category",
            });
        }

        const component = await Component.create(req.body);

        console.log("Saved Component:", component);

        res.status(201).json({
            success: true,
            message: "Component Created Successfully",
            data: component,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

// Get All Components
const getAllComponents = async (req, res) => {
    try {

        const components = await Component.find().populate(
            "category",
            "name"
);

        console.log("Components Found:", components);

        res.status(200).json({
            success: true,
            data: components
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Component By ID
const getComponentById = async (req, res) => {
    try {

        const component = await Component.findById(req.params.id)
            .populate("category");

        if (!component) {
            return res.status(404).json({
                success: false,
                message: "Component Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: component
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Update Component
const updateComponent = async (req, res) => {
    try {

        const component = await Component.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!component) {
            return res.status(404).json({
                success: false,
                message: "Component Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Component Updated Successfully",
            data: component
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Delete Component
const deleteComponent = async (req, res) => {
    try {

        const component = await Component.findByIdAndDelete(req.params.id);

        if (!component) {
            return res.status(404).json({
                success: false,
                message: "Component Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Component Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createComponent,
    getAllComponents,
    getComponentById,
    updateComponent,
    deleteComponent
};