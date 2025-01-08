import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Upload, Loader } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";

const categories = ["trucks", "boat", "airplane", "van"];
const baseRates = {
    trucks: 2,
    boat: 3,
    airplane: 5,
    van: 1.5,
};

const CreateProductForm = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        description: "",
        category: "",
        distance: "",
        cityFrom: "",
        cityTo: "",
        pallets: "",
        image: "",
        price: "0.00", // Initialize price as a string
    });

    const { createProduct, loading } = useProductStore();

    // Calculate price dynamically whenever inputs change
    useEffect(() => {
        const { distance, pallets, category } = newProduct;
        if (distance && pallets && category) {
            const rate = baseRates[category] || 1;
            const calculatedPrice = distance * pallets * rate;
            setNewProduct((prev) => ({
                ...prev,
                price: calculatedPrice.toFixed(2), // Ensure price is stored as a string
            }));
        }
    }, [newProduct.distance, newProduct.pallets, newProduct.category]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(newProduct);
            setNewProduct({
                name: "",
                description: "",
                category: "",
                distance: "",
                cityFrom: "",
                cityTo: "",
                pallets: "",
                image: "",
                price: "0.00", // Reset price to string
            });
        } catch {
            console.log("Error creating a product");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setNewProduct({ ...newProduct, image: reader.result });
            };

            reader.readAsDataURL(file); // base64
        }
    };

    return (
        <motion.div
            className="bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-2xl font-semibold mb-6 text-emerald-300">Create New Product</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        rows="3"
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-300">
                        Distance (km)
                    </label>
                    <input
                        type="number"
                        id="distance"
                        name="distance"
                        value={newProduct.distance}
                        onChange={(e) => setNewProduct({ ...newProduct, distance: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cityFrom" className="block text-sm font-medium text-gray-300">
                        City From
                    </label>
                    <input
                        type="text"
                        id="cityFrom"
                        name="cityFrom"
                        value={newProduct.cityFrom}
                        onChange={(e) => setNewProduct({ ...newProduct, cityFrom: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="cityTo" className="block text-sm font-medium text-gray-300">
                        City To
                    </label>
                    <input
                        type="text"
                        id="cityTo"
                        name="cityTo"
                        value={newProduct.cityTo}
                        onChange={(e) => setNewProduct({ ...newProduct, cityTo: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="pallets" className="block text-sm font-medium text-gray-300">
                        Number of Pallets
                    </label>
                    <input
                        type="number"
                        id="pallets"
                        name="pallets"
                        value={newProduct.pallets}
                        onChange={(e) => setNewProduct({ ...newProduct, pallets: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-300">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-300">
                        Calculated Price
                    </label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        value={newProduct.price} // Already stored as a string
                        readOnly
                        className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none"
                    />
                </div>

                <div className="mt-1 flex items-center">
                    <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
                    <label
                        htmlFor="image"
                        className="cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                    >
                        <Upload className="h-5 w-5 inline-block mr-2" />
                        Upload Image
                    </label>
                    {newProduct.image && <span className="ml-3 text-sm text-gray-400">Image uploaded</span>}
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader className="mr-2 h-5 w-5 animate-spin" aria-hidden="true" />
                            Loading...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Create Product
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
};

export default CreateProductForm;
