const Quotation = require("../models/Quotation");

const pricingService = require("./pricing");

const createQuotation = async (customerName, configurationId) => {

    const pricing =
        await pricingService.calculateConfigurationPrice(configurationId);

    const quotation = await Quotation.create({

        customerName,

        configuration: configurationId,

        totalPrice: pricing.totalPrice,

        components: pricing.breakdown

    });

    return quotation;

};

module.exports = {
    createQuotation
};