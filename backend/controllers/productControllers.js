const productModel = require("../models/productmodel");

// Get all products by api
exports.getProducts = async (req, res, next) => {
  try {
    let products;

    if (req.query.keyword) {
      products = await productModel.find({
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      });

      // 🔴 if keyword not matched → return all products
      if (products.length === 0) {
        products = await productModel.find();
      }
    } else {
      products = await productModel.find();
    }

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get single product by api
exports.getSingleProduct = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id);

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
