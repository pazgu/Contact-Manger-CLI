const fs = require('fs').promises;
const path = require('path');

const FILE_PATH = path.join(__dirname, '../contacts.json');

async function loadContactsFile() {
    console.log("Loading contacts from contacts.json...");
    try {
        const data = await fs.readFile(FILE_PATH, 'utf8');
        if (!data.trim()) return [];
        return JSON.parse(data);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("✗ File not found - creating new contact list");
            return []; 
        }
        if (error instanceof SyntaxError) {
            console.log("✗ Error: Contacts file is corrupted. Initializing empty list.");
            return [];
        }
        throw new Error(`Failed to read contacts file: ${error.message}`);
    }
}

async function saveContactsFile(contacts) {
    try {
        await fs.writeFile(FILE_PATH, JSON.stringify(contacts, null, 2), 'utf8');
        console.log("✓ Contacts saved to contacts.json");
    } catch (error) {
        throw new Error(`Failed to save contacts file: ${error.message}`);
    }
}

module.exports = {
    loadContactsFile,
    saveContactsFile
};