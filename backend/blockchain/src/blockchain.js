const Block = require('./block');
const fs = require('fs');
const path = require('path');

class Blockchain {
    constructor() {
        this.chainPath = path.join(__dirname, '../data/chain.json');
        this.difficulty = 2;
        this.loadChain();
    }

    loadChain() {
        if (fs.existsSync(this.chainPath)) {
            const data = fs.readFileSync(this.chainPath, 'utf8');
            const savedChain = JSON.parse(data);
            // Re-instantiate blocks to ensure they have methods
            this.chain = savedChain.map(b => {
                const block = new Block(b.index, b.timestamp, b.data, b.previousHash);
                block.hash = b.hash;
                block.nonce = b.nonce;
                return block;
            });
        } else {
            this.chain = [this.createGenesisBlock()];
            this.saveChain();
        }
    }

    saveChain() {
        const dir = path.dirname(this.chainPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(this.chainPath, JSON.stringify(this.chain, null, 2));
    }

    createGenesisBlock() {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newData) {
        const newBlock = new Block(
            this.chain.length,
            new Date().toISOString(),
            newData,
            this.getLatestBlock().hash
        );
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
        this.saveChain();
        return newBlock;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            // Check if hash is still valid
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            // Check if it points to the correct previous block
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

module.exports = Blockchain;
