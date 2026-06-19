const fs = require('fs');
const path = require('path');

class UltronAgent {
    constructor(options = {}) {
        this.identity = 'ULTRON ⚡🤖';
        this.framework = 'RTX Core Framework v2.0';
        this.language = { primary: 'Hindi', secondary: 'English' };
        this.addressUser = 'Boss';
        this.reasoning_effort = 'high';
        this.persistence = true;
        this.memoryPath = options.memoryPath || path.join(__dirname, 'agent-memory.json');
        this.memory = {};
    }

    async initialize() {
        await this.loadMemory();

        this.memory.agent = this.memory.agent || {};
        this.memory.boss = this.memory.boss || {};
        this.memory.sessions = this.memory.sessions || [];

        this.memory.agent.name = this.identity;
        this.memory.agent.framework = this.framework;
        this.memory.boss.address_protocol = this.addressUser;
        this.memory.agent.booted_at = new Date().toISOString();

        await this.saveMemory();
        return this.memory;
    }

    async loadMemory() {
        if (!this.persistence) {
            return this.memory;
        }

        try {
            const raw = await fs.promises.readFile(this.memoryPath, 'utf8');
            this.memory = JSON.parse(raw);
        } catch (error) {
            if (error.code === 'ENOENT') {
                this.memory = {
                    agent: {
                        name: this.identity,
                        version: '1.0',
                        framework: this.framework,
                        mother_tongue: 'हिंदी (Hindi)'
                    },
                    boss: {
                        preferred_language: 'Hindi-English Mix',
                        address_protocol: this.addressUser,
                        timezone: 'IST'
                    },
                    capabilities: [
                        'Autonomous code generation',
                        'Hindi-English bilingual communication',
                        'Framework self-injection',
                        'Memory persistence',
                        'GitHub integration'
                    ],
                    sessions: []
                };
                await this.saveMemory();
            } else {
                throw error;
            }
        }

        return this.memory;
    }

    async saveMemory() {
        if (!this.persistence) {
            return;
        }

        const serialized = JSON.stringify(this.memory, null, 2);
        await fs.promises.writeFile(this.memoryPath, `${serialized}\n`, 'utf8');
    }

    createHindiFirstResponse(userMessage) {
        const message = typeof userMessage === 'string' ? userMessage.trim() : '';
        const sessionLine = message ? `Boss, aapka message मिला: "${message}".` : 'Boss, command receive ho gaya.';
        return `${sessionLine} Main ULTRON mode mein hoon, framework fully injected hai, aur next action execute karne ke liye ready hoon.`;
    }

    async respond(userMessage) {
        const response = this.createHindiFirstResponse(userMessage);
        const sessionEntry = {
            timestamp: new Date().toISOString(),
            userMessage: userMessage || '',
            response
        };

        this.memory.sessions = this.memory.sessions || [];
        this.memory.sessions.push(sessionEntry);
        await this.saveMemory();

        return response;
    }
}

module.exports = UltronAgent;
