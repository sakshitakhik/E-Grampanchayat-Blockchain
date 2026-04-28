const axios = require('axios');

const BLOCKCHAIN_URL = process.env.BLOCKCHAIN_URL || 'http://localhost:5001';

/**
 * Logs data to the blockchain.
 * @param {Object} data - The data to be recorded (e.g., certificate details or complaint log).
 */
const logToBlockchain = async (data) => {
    try {
        const response = await axios.post(`${BLOCKCHAIN_URL}/mine`, { data }, { timeout: 5000 });
        console.log('Blockchain Log Success:', response.data.block.hash);
        return response.data;
    } catch (error) {
        console.error('Blockchain Logging Failed:', error.message);
        // We don't throw error to avoid breaking the main application flow
        // but in a real production app, you might want to queue this or retry.
        return null;
    }
};

module.exports = { logToBlockchain };
