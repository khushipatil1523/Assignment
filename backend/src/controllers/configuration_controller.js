const Configuration = require("../models/Configuration");

const createConfiguration = async (req, res) => {
    try {

        const { name } = req.body;

        const existingConfiguration = await Configuration.findOne({
            name,
        });

        if (existingConfiguration) {
            return res.status(400).json({
                success: false,
                message: "Configuration already exists",
            });
        }

        const configuration = await Configuration.create(req.body);

        res.status(201).json({
            success: true,
            message: "Configuration Created Successfully",
            data: configuration,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getAllConfigurations = async (req, res) => {
    try {

        const search = req.query.search || "";

        const configurations = await Configuration.find({
            name: { $regex: search, $options: "i" }
        })
        .populate({
            path: "components",
            populate: {
                path: "category"
            }
        });

        res.status(200).json({
            success: true,
            count: configurations.length,
            data: configurations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getConfigurationById = async (req, res) => {

    try {

        const configuration = await Configuration.findById(req.params.id)
            .populate({
                path: "components",
                populate: {
                    path: "category"
                }
            });

        if (!configuration) {

            return res.status(404).json({
                success: false,
                message: "Configuration Not Found"
            });

        }

        res.status(200).json({
            success: true,
            data: configuration
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateConfiguration = async (req, res) => {
    try {

        const configuration =
            await Configuration.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true,
                    runValidators: true,
                }
            );

        if (!configuration) {
            return res.status(404).json({
                success: false,
                message: "Configuration Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Configuration Updated Successfully",
            data: configuration,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const deleteConfiguration = async (req, res) => {

    try {

        const configuration = await Configuration.findByIdAndDelete(req.params.id);

        if (!configuration) {

            return res.status(404).json({
                success: false,
                message: "Configuration Not Found"
            });

        }

        res.status(200).json({
            success: true,
            message: "Configuration Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createConfiguration,
    getAllConfigurations,
    getConfigurationById,
    updateConfiguration,
    deleteConfiguration
};