const express = require('express');
const cors = require('cors'); // ✅ Import CORS middleware
const app = express();
const port = 3001;

const merchant_model = require('./merchantModel');

// ✅ Use CORS middleware with allowed origins
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

// ✅ Define routes
app.get('/', (req, res) => {
  merchant_model.getMerchants()
    .then(response => res.status(200).json(response)) // ✅ Use JSON response
    .catch(error => res.status(500).send(error));
});

app.post('/merchants', (req, res) => {
  merchant_model.createMerchant(req.body)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send(error));
});

app.delete('/merchants/:id', (req, res) => {
  merchant_model.deleteMerchant(req.params.id)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send(error));
});

app.put('/merchants/:id', (req, res) => {
  merchant_model.updateMerchant(req.params.id, req.body)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).send(error));
});

// ✅ Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
