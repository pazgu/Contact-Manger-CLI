const { loadContactsFile, saveContactsFile } = require('../utils/fileUtils');

async function addContact(name, email, phone) {
    const contacts = await loadContactsFile();
    if (contacts.length > 0) {
        console.log(`✓ Loaded ${contacts.length} contacts`);
    }

    const emailExists = contacts.some(c => c.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        throw new Error("Contact with this email already exists");
    }

    contacts.push({ name, email, phone });
    await saveContactsFile(contacts);
    console.log(`✓ Contact added: ${name}`);
}


async function listContacts() {
    const contacts = await loadContactsFile();
    console.log(`✓ Loaded ${contacts.length} contacts\n`);
    
    if (contacts.length === 0) {
        console.log("No contacts found.");
        return;
    }

    console.log("---All Contacts---");
    contacts.forEach((c, index) => {
        console.log(`${index + 1}. ${c.name} - ${c.email} - ${c.phone}`);
    });
}

async function searchContacts(query) {
    const contacts = await loadContactsFile();
    console.log(`✓ Loaded ${contacts.length} contacts\n`);

    const lowerQuery = query.toLowerCase();
    const results = contacts.filter(c => 
        c.name.toLowerCase().includes(lowerQuery) || 
        c.email.toLowerCase().includes(lowerQuery)
    );

    console.log(`----Search Results for "${query}"----`);
    if (results.length === 0) {
        console.log(`No contacts found matching "${query}"`);
        return;
    }

    results.forEach((c, index) => {
        console.log(`${index + 1}. ${c.name} - ${c.email} - ${c.phone}`);
    });
}

async function deleteContact(email) {
    const contacts = await loadContactsFile();
    console.log(`✓ Loaded ${contacts.length} contacts`);

    const lowerEmail = email.toLowerCase();
    const contactIndex = contacts.findIndex(c => c.email.toLowerCase() === lowerEmail);

    if (contactIndex === -1) {
        throw new Error(`No contact found with email: ${email}`);
    }

    const deletedContact = contacts.splice(contactIndex, 1)[0];
    await saveContactsFile(contacts);
    console.log(`✓ Contact deleted: ${deletedContact.name}`);
}

module.exports = {
    addContact,
    listContacts,
    searchContacts,
    deleteContact
};