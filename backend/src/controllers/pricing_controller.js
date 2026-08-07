const pricingService = require("../services/pricing");

const calculatePrice = async (req, res) => {

    try {

        const result = await pricingService.calculateConfigurationPrice(
            req.params.id
        );

        res.status(200).json({
            success: true,
            configuration: result.configuration.name,
            totalPrice: result.totalPrice,
            breakdown: result.breakdown
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    calculatePrice
};