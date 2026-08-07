const Configuration = require("../models/Configuration");

const calculateConfigurationPrice = async (configurationId) => {

    const configuration = await Configuration.findById(configurationId)
    .populate({
        path: "components",
        populate: {
            path: "category",
        },
    });

    if (!configuration) {
        throw new Error("Configuration Not Found");
    }

    let totalPrice = 0;

    const breakdown = [];

    configuration.components.forEach(component => {

        totalPrice += component.price;

        breakdown.push({
        componentId: component._id,
        componentName: component.name,
        category: component.category.name,
        price: component.price
});

    });

    return {
        configuration,
        totalPrice,
        breakdown
    };
};

module.exports = {
    calculateConfigurationPrice
};