// Dyron Mode v1 - AldiTools Clone Engine
class AldiToolsClone {
    constructor() {
        this.history = JSON.parse(localStorage.getItem('aldiToolsHistory')) || [];
        this.init();
    }

    init() {
        console.log('AldiTools Clone v1.0 - Dyron Engine Active');
        this.bindEvents();
        this.renderHistory();
        this.setupMockData();
    }

    bindEvents() {
        // Tool cards
        document.querySelectorAll('.btn-use').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tool = e.target.closest('.tool-card').dataset.tool;
                this.selectTool(tool);
            });
        });

        // Generate button
        document.getElementById('generate-btn').addEventListener('click', () => {
            this.generateContent();
        });

        // Clear history
        document.getElementById('clear-history').addEventListener('click', () => {
            this.clearHistory();
        });

        // Quick prompts
        document.getElementById('prompt').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.ctrlKey) {
                this.generateContent();
            }
        });
    }

    selectTool(tool) {
        const toolNames = {
            'image': 'Generasi Gambar AI',
            'video': 'Generasi Video',
            'audio': 'Ubah Suara AI',
            'text': 'Generasi Teks AI'
        };

        document.getElementById('prompt').value = `Saya ingin menggunakan ${toolNames[tool]}. `;
        document.getElementById('prompt').focus();
        
        // Update UI
        document.querySelectorAll('.tool-card').forEach(card => {
            card.style.border = '1px solid #3B82F6';
        });
        event.target.closest('.tool-card').style.border = '2px solid #10b981';
    }

    generateContent() {
        const prompt = document.getElementById('prompt').value;
        const style = document.getElementById('style').value;
        
        if (!prompt.trim()) {
            this.showResult('⚠️ Masukkan prompt terlebih dahulu.', 'error');
            return;
        }

        // Simulasi loading
        this.showResult('🔄 Sedang memproses... (Simulasi AI bekerja)', 'loading');

        // Simulasi delay AI processing
        setTimeout(() => {
            const result = this.mockAIGeneration(prompt, style);
            this.showResult(result.content, 'success', result.type);
            this.addToHistory(prompt, result);
        }, 2000);
    }

    mockAIGeneration(prompt, style) {
        const tools = ['image', 'video', 'audio', 'text'];
        const detectedTool = tools.find(tool => prompt.toLowerCase().includes(tool)) || 'text';
        
        const mockData = {
            'image': {
                type: 'image',
                content: `
                    <div class="mock-result">
                        <h4>🎨 Hasil Gambar AI (Style: ${style})</h4>
                        <div class="mock-image" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            Gambar AI Hasil: "${prompt.substring(0, 50)}..."
                        </div>
                        <p style="margin-top: 15px; color: #cbd5e1;">
                            <strong>Prompt:</strong> ${prompt}<br>
                            <strong>Style:</strong> ${style}<br>
                            <strong>Resolusi:</strong> 1024x1024<br>
                            <strong>Waktu:</strong> 2.3 detik (simulasi)
                        </p>
                        <button class="btn-use" style="margin-top: 15px;">💾 Download PNG</button>
                    </div>
                `
            },
            'video': {
                type: 'video',
                content: `
                    <div class="mock-result">
                        <h4>🎬 Hasil Video AI</h4>
                        <div class="mock-video" style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); height: 200px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.2rem;">
                            Video Pendek (5 detik) - AI Generated
                        </div>
                        <p style="margin-top: 15px; color: #cbd5e1;">
                            <strong>Status:</strong> Render selesai<br>
                            <strong>Durasi:</strong> 5 detik<br>
                            <strong>Format:</strong> MP4 H.264
                        </p>
                        <button class="btn-use" style="margin-top: 15px; background: #f5576c;">▶️ Putar Video</button>
                    </div>
                `
            },
            'audio': {
                type: 'audio',
                content: `
                    <div class="mock-result">
                        <h4>🔊 Hasil Suara AI</h4>
                        <div class="mock-audio" style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 20px; border-radius: 10px;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <div style="font-size: 2rem;">🎤</div>
                                <div>
                                    <p style="color: white; margin: 0;">Suara: ${style === 'realistic' ? 'Pria Dewasa' : 'Wanita Muda'}</p>
                                    <p style="color: #cbd5e1; margin: 5px 0 0 0;">${prompt.substring(0, 70)}...</p>
                                </div>
                            </div>
                            <div style="margin-top: 15px; background: rgba(255,255,255,0.2); height: 4px; border-radius: 2px;">
                                <div style="width: 70%; background: white; height: 100%; border-radius: 2px;"></div>
                            </div>
                        </div>
                        <button class="btn-use" style="margin-top: 15px; background: #4facfe;">⬇️ Download MP3</button>
                    </div>
                `
            },
            'text': {
                type: 'text',
                content: `
                    <div class="mock-result">
                        <h4>📝 Hasil Teks AI</h4>
                        <div style="background: rgba(255,255,255,0.05); padding: 20px; border-radius: 10px; border-left: 4px solid #10b981;">
                            <p style="color: #e2e8f0; line-height: 1.6;">
                                ${this.generateMockText(prompt)}<br><br>
                                <em>--- Teks dilanjutkan sesuai dengan prompt Anda ---</em>
                            </p>
                        </div>
                        <div style="margin-top: 15px; display: flex; gap: 10px;">
                            <button class="btn-use" style="flex: 1;">📋 Salin Teks</button>
                            <button class="btn-use" style="flex: 1; background: #6b7280;">🔄 Generate Lagi</button>
                        </div>
                    </div>
                `
            }
        };

        return mockData[detectedTool] || mockData.text;
    }

    generateMockText(prompt) {
        const paragraphs = [
            `Berdasarkan prompt "${prompt.substring(0, 30)}...", AI menghasilkan konten kreatif yang sesuai dengan permintaan.`,
            `Dalam simulasi ini, model bahasa besar menganalisis konteks dan menghasilkan teks yang koheren.`,
            `Untuk implementasi nyata, diperlukan integrasi dengan API AI seperti OpenAI GPT atau model serupa.`,
            `Versi gratis ini hanya demonstrasi frontend tanpa backend sebenarnya.`
        ];
        return paragraphs.join(' ');
    }

    showResult(content, type, resultType = 'text') {
        const resultDiv = document.getElementById('result');
        
        if (type === 'loading') {
            resultDiv.innerHTML = `
                <div style="text-align: center; padding: 40px;">
                    <div class="spinner" style="width: 50px; height: 50px; border: 5px solid rgba(59, 130, 246, 0.3); border-top: 5px solid #3B82F6; border-radius: 50%; margin: 0 auto 20px; animation: spin 1s linear infinite;"></div>
                    <p style="color: #93c5fd;">${content}</p>
                </div>
                <style>
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                </style>
            `;
        } else if (type === 'error') {
            resultDiv.innerHTML = `
                <div style="background: rgba(239, 68, 68, 0.1); border: 1px solid #ef4444; padding: 20px; border-radius: 10px; color: #fca5a5;">
                    <h4 style="margin: 0 0 10px 0;">⚠️ ${content}</h4>
                    <p>Coba masukkan prompt yang lebih deskriptif.</p>
                </div>
            `;
        } else {
            resultDiv.innerHTML = content;
        }

        // Scroll to result
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    addToHistory(prompt, result) {
        const historyItem = {
            id: Date.now(),
            timestamp: new Date().toLocaleString('id-ID'),
            prompt: prompt.substring(0, 100) + (prompt.length > 100 ? '...' : ''),
            type: result.type,
            content: result.content.substring(0, 200) + '...'
        };

        this.history.unshift(historyItem);
        if (this.history.length > 20) this.history = this.history.slice(0, 20);
        
        localStorage.setItem('aldiToolsHistory', JSON.stringify(this.history));
        this.renderHistory();
    }

    renderHistory() {
        const historyList = document.getElementById('history-list');
        
        if (this.history.length === 0) {
            historyList.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: #94a3b8;">
                    <i class="fas fa-history" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                    <h3>Riwayat Kosong</h3>
                    <p>Generate sesuatu untuk melihat riwayat di sini.</p>
                </div>
            `;
            return;
        }

        historyList.innerHTML = this.history.map(item => `
            <div class="history-item">
                <h4>${item.type === 'image' ? '🖼️' : item.type === 'video' ? '🎬' : item.type === 'audio' ? '🔊' : '📝'} ${item.prompt}</h4>
                <p style="color: #94a3b8; font-size: 0.9rem; margin: 10px 0;">${item.timestamp}</p>
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 5px; margin-top: 10px;">
                    ${item.content}
                </div>
                <button onclick="aldiToolsClone.regenerate(${item.id})" style="margin-top: 10px; padding: 8px 15px; background: rgba(59, 130, 246, 0.2); border: 1px solid #3B82F6; color: #93c5fd; border-radius: 5px; cursor: pointer;">🔄 Ulangi</button>
            </div>
        `).join('');
    }

    regenerate(id) {
        const item = this.history.find(h => h.id === id);
        if (item) {
            document.getElementById('prompt').value = item.prompt;
            this.generateContent();
        }
    }

    clearHistory() {
        if (confirm('Hapus semua riwayat generasi?')) {
            this.history = [];
            localStorage.removeItem('aldiToolsHistory');
            this.renderHistory();
            this.showResult('✅ Riwayat telah dihapus.', 'success');
        }
    }

    setupMockData() {
        // Add sample history if empty
        if (this.history.length === 0) {
            const samples = [
                {
                    id: 1,
                    timestamp: new Date(Date.now() - 3600000).toLocaleString('id-ID'),
                    prompt: 'Gambar kucing sedang bermain di taman, style anime',
                    type: 'image',
                    content: 'Hasil gambar anime kucing dengan taman warna-warni...'
                },
                {
                    id: 2,
                    timestamp: new Date(Date.now() - 7200000).toLocaleString('id-ID'),
                    prompt: 'Tulis puisi tentang teknologi dan manusia',
                    type: 'text',
                    content: 'Dalam dunia bit dan byte, manusia mencari arti...'
                }
            ];
            this.history.push(...samples);
            this.renderHistory();
        }
    }
}

// Initialize
const aldiToolsClone = new AldiToolsClone();

// Make available globally
window.aldiToolsClone = aldiToolsClone;

// Additional UI effects
document.addEventListener('DOMContentLoaded', () => {
    // Typewriter effect for subtitle
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30);
            }
        };
        setTimeout(typeWriter, 1000);
    }

    // Auto-save prompt
    const promptTextarea = document.getElementById('prompt');
    if (promptTextarea) {
        promptTextarea.addEventListener('input', () => {
            localStorage.setItem('aldiToolsLastPrompt', promptTextarea.value);
        });

        // Load saved prompt
        const savedPrompt = localStorage.getItem('aldiToolsLastPrompt');
        if (savedPrompt) {
            promptTextarea.value = savedPrompt;
        }
    }
});
