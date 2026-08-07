const Quotation = require("../models/Quotation");
const quotationService = require("../services/quotation");

// Create Quotation
const createQuotation = async (req, res) => {
    try {

        const { customerName, configurationId } = req.body;

        const quotation = await quotationService.createQuotation(
            customerName,
            configurationId
        );

        res.status(201).json({
            success: true,
            message: "Quotation Created Successfully",
            data: quotation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get All Quotations
const getAllQuotations = async (req, res) => {
    try {

        const quotations = await Quotation.find()
            .populate("configuration");

        res.status(200).json({
            success: true,
            data: quotations
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// Get Single Quotation
const getQuotationById = async (req, res) => {
    try {

        const quotation = await Quotation.findById(req.params.id)
            .populate("configuration");

        if (!quotation) {
            return res.status(404).json({
                success: false,
                message: "Quotation Not Found"
            });
        }

        res.status(200).json({
            success: true,
            data: quotation
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = {
    createQuotation,
    getAllQuotations,
    getQuotationById
};