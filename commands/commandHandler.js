const contactService = require('../services/contactService');
const { validateContactData } = require('../utils/validation');

function showHelp() {
    console.log(`Usage: node contacts.js [command] [arguments]

Commands:
  add "name" "email" "phone"  - Add a new contact
  list                        - List all contacts
  search "query"              - Search contacts by name or email
  delete "email"              - Delete contact by email
  help                        - Show this help message

Examples:
  node contacts.js add "John Doe" "john@example.com" "555-123-4567"
  node contacts.js search "john"
  node contacts.js delete "john@example.com"`);
}

async function handleCommand(args) {
    const command = args[0];

    if (!command || command === 'help') {
        showHelp();
        return;
    }

    switch (command) {
        case 'add': {
            const [_, name, email, phone] = args;
            if (!name || !email || !phone) {
                console.error("✗ Error: Missing arguments for add command");
                console.error('Usage: node contacts.js add "name" "email" "phone"');
                process.exit(1);
            }
           
            validateContactData(name, email, phone);
            await contactService.addContact(name, email, phone);
            break;
        }

        case 'list': {
            await contactService.listContacts();
            break;
        }

        case 'search': {
            const query = args[1];
            if (!query) {
                console.error("✗ Error: Missing search query");
                console.error('Usage: node contacts.js search "query"');
                process.exit(1);
            }
            await contactService.searchContacts(query);
            break;
        }

        case 'delete': {
            const email = args[1];
            if (!email) {
                console.error("✗ Error: Missing email for delete command");
                console.error('Usage: node contacts.js delete "email"');
                process.exit(1);
            }
            await contactService.deleteContact(email);
            break;
        }

        default:
            console.error(`✗ Error: Unknown command '${command}'`);
            console.error("Usage: node contacts.js [add|list|search|delete|help] [arguments]");
            process.exit(1);
    }
}

module.exports = {
    handleCommand
};