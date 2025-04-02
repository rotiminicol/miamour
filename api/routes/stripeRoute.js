const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-payment-intent', async (req, res) => {
  const { amount, currency, metadata = {} } = req.body;

  // Validate input
  if (!amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid amount' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency || 'usd',
      payment_method_types: ['card'],
      metadata: {
        ...metadata,
        integration_check: 'accept_a_payment',
        userId: req.user?.id || 'guest' // If you have user auth
      }
    });

    res.json({ 
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });
  } catch (error) {
    console.error('Stripe error:', error);
    res.status(500).json({ 
      error: error.message,
      code: error.code || null,
      type: error.type || 'api_error'
    });
  }
});