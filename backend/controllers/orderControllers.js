const orderModel = require('../models/ordermodel');
const productModel = require('../models/productmodel');

exports.createOrder = async (req, res) => {
  try {
    const { cartItems, user } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Update product stock
    for (const item of cartItems) {
      const productId = item.product._id || item.product;
      const product = await productModel.findById(productId);
      if (!product) continue;

      product.stock = Math.max(0, product.stock - item.qty);
      await product.save();
    }

    // Map cartItems for order creation
    const mappedItems = cartItems.map(item => ({
      product: item.product._id || item.product,
      name: item.name,
      price: item.price,
      image: item.image,
      qty: item.qty
    }));

    const amount = mappedItems.reduce((acc, item) => acc + item.price * item.qty, 0);

    // Create order
    const order = await orderModel.create({
      cartItems: mappedItems,
      user,
      amount,
      status: 'pending'
    });

    res.status(201).json({ success: true, order });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
