const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema(
    {
        customerName: {
            type: String,
            required: true,
            trim: true
        },

        configuration: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Configuration",
            required: true
        },

        totalPrice: {
            type: Number,
            required: true
        },

        components: [
            {
                componentId: mongoose.Schema.Types.ObjectId,

                componentName: String,

                category: mongoose.Schema.Types.ObjectId,

                price: Number
            }
        ]
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quotation", quotationSchema);