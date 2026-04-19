const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory store for quotes (replace with DB in production)
const quotes = [];

// POST /api/quote - Submit a quote request
app.post('/api/quote', (req, res) => {
  const { name, phone, service, message } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ success: false, error: 'Name and phone are required.' });
  }

  const quote = {
    id: Date.now(),
    name,
    phone,
    service: service || 'Not specified',
    message: message || '',
    createdAt: new Date().toISOString(),
  };

  quotes.push(quote);
  console.log('New quote request:', quote);

  return res.status(201).json({
    success: true,
    message: 'Quote request received! We will contact you within 24 hours.',
    data: quote,
  });
});

// GET /api/quotes - Get all quote requests (admin)
app.get('/api/quotes', (req, res) => {
  return res.json({ success: true, data: quotes });
});

// GET /api/services - Return services list
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 1,
      title: 'Interior Painting',
      description: 'Transform your indoor spaces with smooth, even coats and premium finishes. We handle living rooms, bedrooms, kitchens, and more.',
      icon: '🏠',
    },
    {
      id: 2,
      title: 'Exterior Painting',
      description: 'Weather-resistant, long-lasting exterior coatings that protect and beautify your home\'s façade year-round.',
      icon: '🏗️',
    },
    {
      id: 3,
      title: 'Apartment Painting',
      description: 'Complete apartment painting services with minimal disruption. Perfect for new tenants, landlords, and renovations.',
      icon: '🏢',
    },
    {
      id: 4,
      title: 'Wall Texture Design',
      description: 'Add character to your walls with custom textures — sponge, stucco, Venetian plaster, and more design options.',
      icon: '🎨',
    },
    {
      id: 5,
      title: 'Waterproof Painting',
      description: 'Protect bathrooms, terraces, and exterior walls from moisture damage with our waterproofing solutions.',
      icon: '💧',
    },
  ];
  return res.json({ success: true, data: services });
});

// GET /api/reviews - Return reviews
app.get('/api/reviews', (req, res) => {
  const reviews = [
    {
      id: 1,
      name: 'Kritika Parihasr',
      location: 'Whitefield, Bangalore',
      rating: 5,
      review: 'They did a fantastic job painting our home! They were punctual, professional, and very detail-oriented. The prep work was thorough, and they left the place spotless every day. Highly recommend!',
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'LB Nagar, Bangalore',
      rating: 5,
      review: 'Excellent work on our exterior painting. They used high-quality materials and the finish looks brand new. Very happy with the results.',
    },
    {
      id: 3,
      name: 'Mohammed Irfan',
      location: 'Kothapet, Bangalore',
      rating: 5,
      review: 'Great texture work on our living room walls. The design turned out exactly as we wanted. Fair pricing and clean work. Will hire again!',
    },
    {
      id: 4,
      name: 'Sunita Reddy',
      location: 'Nagole, Bangalore',
      rating: 5,
      review: 'Very satisfied with the waterproofing service. No more seepage issues. The team was courteous and left the site spotless.',
    },
  ];
  return res.json({ success: true, data: reviews });
});

app.listen(PORT, () => {
  console.log(`PS House Painters backend running on http://localhost:${PORT}`);
});
