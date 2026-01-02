// API CONFIGURATION - REAL WORKING APIS
const APIConfig = {
    // === IMAGE GENERATION APIS ===
    STABILITY_AI: {
        apiKey: 'sk-YOUR-STABILITY-KEY', // Dapatkan di platform.stability.ai
        endpoint: 'https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image',
        engine: 'stable-diffusion-v1-6',
        freeTier: false,
        creditsPerImage: 1
    },

    HUGGING_FACE: {
        apiKey: 'hf_YOUR_HUGGINGFACE_TOKEN',
        endpoint: 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1',
        freeTier: true,
        rateLimit: '100 requests/day'
    },

    OPENAI_DALLE: {
        apiKey: 'sk-proj-YOUR_OPENAI_KEY',
        endpoint: 'https://api.openai.com/v1/images/generations',
        model: 'dall-e-3',
        freeTier: false,
        costPerImage: '$0.040'
    },

    // === VIDEO GENERATION APIS ===
    RUNWAYML: {
        apiKey: 'rw_YOUR_RUNWAY_KEY',
        endpoint: 'https://api.runwayml.com/v1/video/generate',
        model: 'gen-2',
        freeTier: false,
        costPerSecond: '$0.05'
    },

    PIKA_LABS: {
        apiKey: 'pk_YOUR_PIKA_KEY',
        endpoint: 'https://api.pika.art/v1/generate',
        freeTier: true,
        credits: '100 credits free'
    },

    // === TEXT GENERATION APIS ===
    OPENAI_GPT: {
        apiKey: 'sk-proj-YOUR_OPENAI_KEY',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        models: {
            'gpt-4': 'gpt-4',
            'gpt-3.5-turbo': 'gpt-3.5-turbo',
            'gpt-4-turbo': 'gpt-4-turbo-preview'
        },
        freeTier: false,
        costPer1kTokens: '$0.01-$0.03'
    },

    ANTHROPIC: {
        apiKey: 'sk-ant-YOUR_ANTHROPIC_KEY',
        endpoint: 'https://api.anthropic.com/v1/messages',
        model: 'claude-3-opus-20240229',
        freeTier: false,
        costPer1kTokens: '$0.015'
    },

    GOOGLE_GEMINI: {
        apiKey: 'AIzaSyYOUR_GOOGLE_API_KEY',
        endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
        model: 'gemini-pro',
        freeTier: true,
        freeLimit: '60 requests/minute'
    },

    // === AUDIO GENERATION APIS ===
    ELEVENLABS: {
        apiKey: 'YOUR_ELEVENLABS_KEY',
        endpoint: 'https://api.elevenlabs.io/v1/text-to-speech',
        voiceId: '21m00Tcm4TlvDq8ikWAM', // Default voice
        freeTier: true,
        freeChars: '10000/month'
    },

    GOOGLE_TTS: {
        apiKey: 'AIzaSyYOUR_GOOGLE_TTS_KEY',
        endpoint: 'https://texttospeech.googleapis.com/v1/text:synthesize',
        freeTier: true,
        freeLimit: '1 million chars/month'
    },

    // === UTILITY ===
    BACKEND_PROXY: 'http://localhost:3000/api/proxy', // Local backend untuk hide API keys
    FALLBACK_MODE: true // Jika API gagal, gunakan mock data
};

// API Key Management System
class APIKeyManager {
    constructor() {
        this.keys = this.loadKeys();
    }

    loadKeys() {
        // Load dari localStorage atau environment
        return {
            stability: localStorage.getItem('api_stability') || APIConfig.STABILITY_AI.apiKey,
            openai: localStorage.getItem('api_openai') || APIConfig.OPENAI_GPT.apiKey,
            elevenlabs: localStorage.getItem('api_elevenlabs') || APIConfig.ELEVENLABS.apiKey,
            google: localStorage.getItem('api_google') || APIConfig.GOOGLE_GEMINI.apiKey
        };
    }

    saveKey(service, key) {
        this.keys[service] = key;
        localStorage.setItem(`api_${service}`, key);
    }

    getKey(service) {
        return this.keys[service] || '';
    }

    validateKey(key, service) {
        // Validasi sederhana
        const patterns = {
            openai: /^sk-proj-[a-zA-Z0-9]{48}$/,
            stability: /^sk-[a-zA-Z0-9]{48}$/,
            elevenlabs: /^[a-zA-Z0-9]{28}$/
        };
        
        return patterns[service] ? patterns[service].test(key) : key.length > 20;
    }
}

// Export untuk penggunaan global
window.APIConfig = APIConfig;
window.APIKeyManager = new APIKeyManager();
