const { handleCommand } = require('./commands/commandHandler');

async function main() {
    const args = process.argv.slice(2);
    
    try {
        await handleCommand(args);
    } catch (error) {
        console.error(`✗ Error: ${error.message}`);
        process.exit(1);
    }
}

main();