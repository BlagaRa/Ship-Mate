import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		image: {
			type: String,
			required: [true, "Image is required"],
		},
		category: {
			type: String,
			required: true,
		},
		distance: {
			type: Number, // Distanța în kilometri
			required: true,
		},
		cityFrom: {
			type: String, // Orașul de plecare
			required: true,
		},
		cityTo: {
			type: String, // Orașul de sosire
			required: true,
		},
		pallets: {
			type: Number, // Numărul de paleți
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
