const path = require('path');
const readline = require('readline');
const UltronAgent = require('./ultron-agent');

async function bootUltron() {
    const memoryPath = path.join(__dirname, 'agent-memory.json');
    const agent = new UltronAgent({ memoryPath });

    await agent.initialize();

    process.stdout.write('ULTRON ⚡🤖 initialized.\n');
    process.stdout.write('Framework: RTX Core Framework v2.0\n');
    process.stdout.write('Protocol: Hindi-first + Boss addressing\n\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Boss, command input karo: ', async (input) => {
        try {
            const response = await agent.respond(input);
            process.stdout.write(`${response}\n`);
        } catch (error) {
            process.stderr.write(`ULTRON init failed: ${error.message}\n`);
            process.exitCode = 1;
        } finally {
            rl.close();
        }
    });
}

if (require.main === module) {
    bootUltron().catch((error) => {
        process.stderr.write(`Startup failure: ${error.message}\n`);
        process.exit(1);
    });
}

module.exports = { bootUltron };
