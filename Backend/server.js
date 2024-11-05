// server.js
const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews',reviewRoutes);

const PORT = 5000;
app.use(cors()); // You can choose any port that is free
app.use(bodyParser.json());

// Initialize Razorpay with your credentials
const razorpayInstance = new Razorpay({
  key_id: 'rzp_test_eYNQfs9koLGuW9', // Replace with your Razorpay Key ID
  key_secret: 'B7q0qxbbECSXcgGNN5jgXYfV', // Replace with your Razorpay Key Secret
});

// Endpoint to create an order
app.post('/create-order', async (req, res) => {
  const options = {
    amount: req.body.amount, // Amount in paise (e.g., 50000 = ₹500)
    currency: 'INR',
    receipt: 'receipt#1',
  };

  try {
    const order = await razorpayInstance.orders.create(options);
    res.json(order); // Send the order details back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
