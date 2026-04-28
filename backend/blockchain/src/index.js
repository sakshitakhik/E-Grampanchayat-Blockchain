const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Blockchain = require('./blockchain');

const app = express();
const port = 5001; // Port for blockchain service

app.use(cors());
app.use(bodyParser.json());

const gramChain = new Blockchain();

// Get the full chain
app.get('/blocks', (req, res) => {
    res.json(gramChain.chain);
});

// Add a new record (e.g., Certificate issue or Complaint log)
app.post('/mine', (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Data is required' });
    }
    
    const newBlock = gramChain.addBlock(data);
    res.json({
        message: 'Block mined successfully',
        block: newBlock
    });
});

// Validate the chain
app.get('/validate', (req, res) => {
    const isValid = gramChain.isChainValid();
    res.json({
        isValid,
        status: isValid ? 'Secure' : 'Compromised'
    });
});

// Search for a specific record (e.g. by application ID)
app.get('/search/:query', (req, res) => {
    const query = req.params.query;
    const blocks = gramChain.chain.filter(block => 
        JSON.stringify(block.data).includes(query)
    );
    res.json(blocks);
});

app.listen(port, () => {
    console.log(`Blockchain Server running at http://localhost:${port}`);
});
