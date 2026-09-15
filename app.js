/**
 * LegalEase AI - Application Controller & Intelligence Engine
 * 
 * High-performance, modular, and accessible legal document analysis platform.
 * Fully aligned with all 7 GenAI Legal Problem Statement Use Cases.
 * 
 * @module LegalEaseEngine
 */

/**
 * Global Application State Store with Event Subscription
 */
class LegalEaseStateStore {
    constructor() {
        this.state = {
            apiKey: localStorage.getItem('gemini_api_key') || '',
            currentDoc: null,
            activeTab: 'simplifier',
            activeFilter: 'all',
            chatHistory: [],
            checklistItems: []
        };
        this.listeners = [];
    }

    /**
     * Subscribe to state change events
     * @param {Function} listener 
     */
    subscribe(listener) {
        this.listeners.push(listener);
    }

    /**
     * Get current state property
     * @param {string} key 
     * @returns {*} Value of state property
     */
    get(key) {
        return this.state[key];
    }

    /**
     * Update state property and notify subscribers
     * @param {string} key 
     * @param {*} value 
     */
    set(key, value) {
        this.state[key] = value;
        this.listeners.forEach(fn => fn(key, value, this.state));
    }
}

const appStateStore = new LegalEaseStateStore();

/**
 * High-Performance Analysis Cache (LRU Hash Map)
 */
class LegalEaseAnalysisCache {
    constructor(limit = 20) {
        this.limit = limit;
        this.cache = new Map();
    }

    /**
     * Generate simple string hash for text caching
     * @param {string} str 
     * @returns {string} Hash string
     */
    hashText(str) {
        let hash = 0;
        if (!str || str.length === 0) return '0';
        for (let i = 0; i < Math.min(str.length, 1000); i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0;
        }
        return hash.toString(36);
    }

    /**
     * Get cached result
     * @param {string} text 
     * @returns {Object|null} Cached analysis object
     */
    get(text) {
        const key = this.hashText(text);
        if (this.cache.has(key)) {
            const val = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, val);
            return val;
        }
        return null;
    }

    /**
     * Set result in cache
     * @param {string} text 
     * @param {Object} value 
     */
    set(text, value) {
        const key = this.hashText(text);
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.limit) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        this.cache.set(key, value);
    }
}

const analysisCache = new LegalEaseAnalysisCache();

/** DOM Element Cache Store for Efficiency */
const domCache = {};

/**
 * Initialize application DOM cache and event listeners
 */
document.addEventListener('DOMContentLoaded', () => {
    cacheDomElements();
    initApiStatus();
    loadSelectedSample('employment');
    setupDragAndDrop();
    setupKeyboardNav();
});

/**
 * Perform single-pass DOM caching to optimize layout performance
 */
function cacheDomElements() {
    const ids = [
        'apiStatusPill', 'statusDot', 'apiStatusText', 'apiKeyInput', 'apiModal',
        'sampleSelect', 'fileInput', 'dropZone', 'documentViewer', 'docMetaCard',
        'docTextBody', 'riskGaugeCircle', 'riskScoreVal', 'riskSummaryTitle',
        'riskSummaryDesc', 'clauseListContainer', 'compDocATitle', 'compDocBSelect',
        'diffTableBody', 'chatHistory', 'chatInput', 'checklistContainer',
        'optionsContainer', 'consultationSheet', 'prepDate', 'prepDocTitle',
        'prepExecutiveSummary', 'prepRedFlagsList', 'prepQuestionsList', 'prepDeadlines'
    ];

    ids.forEach(id => {
        domCache[id] = document.getElementById(id);
    });
}

/**
 * Security: Strict HTML Escaper & XSS Prevention
 * @param {string} str - Raw input string
 * @returns {string} Sanitized string safe for HTML injection
 */
function sanitizeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Formats basic markdown to HTML with strict sanitization
 * @param {string} str 
 * @returns {string} Safe HTML string
 */
function formatMarkdown(str) {
    const clean = sanitizeHtml(str);
    return clean
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}

// API Key Modal and Status Management
function initApiStatus() {
    const statusDot = domCache.statusDot || document.getElementById('statusDot');
    const apiStatusText = domCache.apiStatusText || document.getElementById('apiStatusText');
    const apiKeyInput = domCache.apiKeyInput || document.getElementById('apiKeyInput');
    const key = appStateStore.get('apiKey');

    if (key) {
        if (statusDot) statusDot.className = 'status-dot';
        if (apiStatusText) apiStatusText.textContent = 'Gemini API Connected';
        if (apiKeyInput) apiKeyInput.value = key;
    } else {
        if (statusDot) statusDot.className = 'status-dot offline';
        if (apiStatusText) apiStatusText.textContent = 'Smart Offline Engine';
    }
}

function openApiModal() {
    const modal = domCache.apiModal || document.getElementById('apiModal');
    if (modal) modal.classList.add('active');
}

function closeApiModal() {
    const modal = domCache.apiModal || document.getElementById('apiModal');
    if (modal) modal.classList.remove('active');
}

function saveApiKey() {
    const input = domCache.apiKeyInput || document.getElementById('apiKeyInput');
    const val = input ? input.value.trim() : '';
    if (val) {
        appStateStore.set('apiKey', val);
        localStorage.setItem('gemini_api_key', val);
        showToast('Gemini API Key saved successfully!');
    } else {
        clearApiKey();
    }
    initApiStatus();
    closeApiModal();
}

function clearApiKey() {
    appStateStore.set('apiKey', '');
    localStorage.removeItem('gemini_api_key');
    if (domCache.apiKeyInput) domCache.apiKeyInput.value = '';
    initApiStatus();
    showToast('Switched to Smart Offline Engine');
}

/**
 * Display toast notification
 * @param {string} message 
 */
function showToast(message) {
    const toast = document.createElement('div');
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: #F59E0B;
        color: #000;
        padding: 0.75rem 1.25rem;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.4);
        z-index: 9999;
        transition: all 0.3s ease;
    `;
    toast.innerHTML = `<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ${sanitizeHtml(message)}`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Load predefined sample document
 * @param {string} sampleKey 
 */
function loadSelectedSample(sampleKey) {
    const sample = LEGAL_SAMPLES[sampleKey];
    if (!sample) return;
    
    appStateStore.set('currentDoc', sample);
    renderDocumentViewer();
    renderAnalysisData(sample);
    runContractComparison();
    renderOptionsNavigator(sample);
    generateChecklist(sample);
    updateConsultationPrep(sample);
}

function renderDocumentViewer() {
    const doc = appStateStore.get('currentDoc');
    if (!doc) return;

    const metaCard = domCache.docMetaCard || document.getElementById('docMetaCard');
    const textBody = domCache.docTextBody || document.getElementById('docTextBody');

    if (metaCard) {
        metaCard.innerHTML = `
            <div class="meta-title">${sanitizeHtml(doc.title)}</div>
            <div class="meta-sub">
                <span><i class="fa-folder-open" aria-hidden="true"></i> ${sanitizeHtml(doc.category || 'Legal Document')}</span>
                <span><i class="fa-users" aria-hidden="true"></i> ${sanitizeHtml(doc.parties || 'N/A')}</span>
            </div>
        `;
    }

    if (textBody) {
        textBody.textContent = doc.text;
    }
}

// Drag and drop setup with accessibility keyboard support
function setupDragAndDrop() {
    const dropZone = domCache.dropZone || document.getElementById('dropZone');
    if (!dropZone) return;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.style.borderColor = 'var(--gold-primary)', false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.style.borderColor = 'rgba(245, 158, 11, 0.4)', false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) handleFile(files[0]);
    });
}

function setupKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeApiModal();
    });
}

function triggerFileSelect() {
    const input = domCache.fileInput || document.getElementById('fileInput');
    if (input) input.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) handleFile(file);
}

/**
 * Clean raw binary text by removing non-printable binary characters
 * @param {string} text 
 * @returns {string} Sanitized plain text
 */
function sanitizeBinaryText(text) {
    if (!text) return '';
    return text.replace(/[\uFFFD\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '');
}

/**
 * Extract readable text from PDF ArrayBuffer using PDF.js
 * @param {ArrayBuffer} arrayBuffer 
 * @returns {Promise<string>} Extracted text string
 */
async function parsePdfArrayBuffer(arrayBuffer) {
    if (!window.pdfjsLib) {
        throw new Error('PDF.js engine unavailable. Please connect to the internet to load PDF reader dependencies.');
    }

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDoc = await loadingTask.promise;
    let textParts = [];

    for (let i = 1; i <= pdfDoc.numPages; i++) {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        
        let lastY = null;
        let pageLines = [];
        let currentLine = [];

        for (const item of textContent.items) {
            if (typeof item.str !== 'string') continue;
            const y = item.transform ? item.transform[5] : null;

            if (lastY !== null && y !== null && Math.abs(y - lastY) > 5) {
                if (currentLine.length > 0) {
                    pageLines.push(currentLine.join(' '));
                    currentLine = [];
                }
            }
            if (item.str.trim()) {
                currentLine.push(item.str);
            }
            lastY = y;
        }

        if (currentLine.length > 0) {
            pageLines.push(currentLine.join(' '));
        }

        const pageText = pageLines.join('\n');
        textParts.push(`--- PAGE ${i} ---\n` + (pageText || '[No readable text on this page]'));
    }

    return textParts.join('\n\n');
}

async function handleFile(file) {
    if (!file) return;

    showToast(`Parsing ${file.name}...`);
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

    try {
        let extractedText = '';

        if (isPdf) {
            const arrayBuffer = await file.arrayBuffer();
            extractedText = await parsePdfArrayBuffer(arrayBuffer);
            if (!extractedText || extractedText.trim().length === 0) {
                extractedText = `[PDF Document: ${file.name}]\nNo extractable text layers found. This PDF may contain scanned images.`;
            }
        } else {
            const rawText = await file.text();
            extractedText = sanitizeBinaryText(rawText);
        }

        // Check LRU Cache for high efficiency
        const cachedAnalysis = analysisCache.get(extractedText);
        let customDoc;

        if (cachedAnalysis) {
            customDoc = { ...cachedAnalysis, title: file.name };
        } else {
            const clauses = extractHeuristicClauses(extractedText);
            const highRiskCount = clauses.filter(c => c.riskLevel === 'high').length;
            const calculatedRisk = Math.min(95, Math.max(25, 45 + (highRiskCount * 15)));

            customDoc = {
                id: 'custom_' + Date.now(),
                title: file.name,
                category: isPdf ? 'Uploaded PDF Document' : 'Uploaded Legal Document',
                parties: 'User Uploaded Document',
                date: new Date().toLocaleDateString(),
                summary: `Custom document (${file.name}) processed. Extracted ${clauses.length} clauses for analysis.`,
                text: extractedText,
                clauses: clauses,
                riskScore: calculatedRisk,
                riskSummary: `AI Risk Assessment completed: ${highRiskCount} high-priority clauses flagged.`
            };
            analysisCache.set(extractedText, customDoc);
        }

        appStateStore.set('currentDoc', customDoc);
        renderDocumentViewer();
        renderAnalysisData(customDoc);
        runContractComparison();
        renderOptionsNavigator(customDoc);
        generateChecklist(customDoc);
        updateConsultationPrep(customDoc);
        showToast(`Loaded and analyzed ${file.name}`);
    } catch (err) {
        console.error('File parsing error:', err);
        showToast(`Error parsing file: ${err.message || 'Unknown error'}`);
    }
}

/**
 * Heuristic Clause Extractor for Uploaded Text
 * @param {string} text 
 * @returns {Array} List of extracted clause objects
 */
function extractHeuristicClauses(text) {
    const lines = text.split('\n');
    const clauses = [];
    let currentSection = 'General Terms';
    let buffer = [];

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (trimmed.match(/^(\d+\.|SECTION|ARTICLE|[A-Z\s]{4,})/i) && trimmed.length < 60) {
            if (buffer.length > 0) {
                const orig = buffer.join(' ').trim();
                if (orig.length > 30) {
                    clauses.push(buildClauseObject(currentSection, orig));
                }
            }
            currentSection = trimmed;
            buffer = [];
        } else if (trimmed) {
            buffer.push(trimmed);
        }
    });

    if (buffer.length > 0 && clauses.length < 4) {
        clauses.push(buildClauseObject(currentSection, buffer.join(' ')));
    }

    return clauses.length > 0 ? clauses : [
        {
            section: "Document Excerpt Analysis",
            original: text.slice(0, 300) + '...',
            plainEnglish: "Summary analysis of the uploaded agreement sections.",
            riskLevel: "caution",
            riskReason: "Review terms carefully with counsel.",
            category: "obligation",
            mitigationTip: "Ensure all key payment and liability terms are verified."
        }
    ];
}

function buildClauseObject(section, originalText) {
    let risk = 'low';
    let plain = originalText;
    let tip = 'Verify exact terms with legal counsel.';
    let cat = 'obligation';

    const lower = originalText.toLowerCase();
    if (lower.includes('non-compete') || lower.includes('terminate') || lower.includes('sole property') || lower.includes('penalty')) {
        risk = 'high';
        tip = 'Consider negotiating or striking out broad restrictions.';
        plain = 'Contains restrictive obligations or financial liabilities requiring careful review.';
        cat = 'restriction';
    } else if (lower.includes('confidential') || lower.includes('notice') || lower.includes('repair')) {
        risk = 'caution';
        tip = 'Request standard exceptions or notice timeline adjustments.';
        plain = 'Specifies standard procedural or confidentiality duties.';
        cat = 'obligation';
    } else if (lower.includes('inconsistent') || lower.includes('conflict') || lower.includes('prevail')) {
        risk = 'caution';
        tip = 'Clarify priority order of provisions to prevent disputes.';
        plain = 'Contains potential priority conflicts between clauses.';
        cat = 'inconsistency';
    } else {
        cat = 'risk';
    }

    return {
        section: section,
        original: originalText,
        plainEnglish: plain,
        riskLevel: risk,
        riskReason: `Identified keywords relating to ${section}.`,
        category: cat,
        mitigationTip: tip
    };
}

/**
 * Filter Clauses Radar (Use Case 3)
 * @param {string} filterType 
 * @param {HTMLElement} btnEl 
 */
function filterClauses(filterType, btnEl) {
    appStateStore.set('activeFilter', filterType);
    
    document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');

    const doc = appStateStore.get('currentDoc');
    if (doc) renderAnalysisData(doc);
}

/**
 * Tab Switching Handler with Accessible ARIA updates
 * @param {string} tabId 
 * @param {HTMLElement} btnEl 
 */
function switchTab(tabId, btnEl) {
    appStateStore.set('activeTab', tabId);

    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });
    
    document.querySelectorAll('.tab-view').forEach(v => {
        v.classList.remove('active');
    });

    if (btnEl) {
        btnEl.classList.add('active');
        btnEl.setAttribute('aria-selected', 'true');
    }
    
    const targetView = document.getElementById(`tab-${tabId}`);
    if (targetView) targetView.classList.add('active');
}

/**
 * High-Efficiency Batch Rendering for Risk Gauge & Clause Cards
 * @param {Object} doc 
 */
function renderAnalysisData(doc) {
    const score = doc.riskScore || 50;
    const scoreVal = domCache.riskScoreVal || document.getElementById('riskScoreVal');
    const gaugeCircle = domCache.riskGaugeCircle || document.getElementById('riskGaugeCircle');
    const summaryTitle = domCache.riskSummaryTitle || document.getElementById('riskSummaryTitle');
    const summaryDesc = domCache.riskSummaryDesc || document.getElementById('riskSummaryDesc');

    if (scoreVal) scoreVal.textContent = score;

    let color = 'var(--emerald-success)';
    let titleText = 'Low Risk Profile';

    if (score >= 70) {
        color = 'var(--rose-danger)';
        titleText = 'High Risk Profile Detected';
    } else if (score >= 40) {
        color = 'var(--amber-warning)';
        titleText = 'Moderate Caution Advisable';
    }

    if (scoreVal) scoreVal.style.color = color;
    if (gaugeCircle) gaugeCircle.style.background = `conic-gradient(${color} 0% ${score}%, rgba(255, 255, 255, 0.08) ${score}% 100%)`;
    if (summaryTitle) {
        summaryTitle.textContent = titleText;
        summaryTitle.style.color = color;
    }
    if (summaryDesc) summaryDesc.textContent = doc.riskSummary || 'Clause analysis completed.';

    // Render Clauses using DocumentFragment for Batch DOM Performance
    const clauseContainer = domCache.clauseListContainer || document.getElementById('clauseListContainer');
    if (!clauseContainer) return;

    clauseContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const activeFilter = appStateStore.get('activeFilter') || 'all';

    const filteredClauses = (doc.clauses || []).filter(clause => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'high') return clause.riskLevel === 'high';
        return (clause.category || '').toLowerCase() === activeFilter;
    });

    if (filteredClauses.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.style.cssText = 'padding: 1.5rem; text-align: center; color: var(--text-dim);';
        emptyMsg.textContent = `No clauses found matching filter: "${activeFilter.toUpperCase()}".`;
        fragment.appendChild(emptyMsg);
    } else {
        filteredClauses.forEach(clause => {
            const card = document.createElement('div');
            card.className = 'clause-card';
            const catClass = (clause.category || 'obligation').toLowerCase();
            
            card.innerHTML = `
                <div class="clause-card-header">
                    <div>
                        <span class="clause-section-name">${sanitizeHtml(clause.section)}</span>
                        <span class="category-badge ${catClass}">${sanitizeHtml(clause.category || 'Clause')}</span>
                    </div>
                    <span class="risk-badge ${clause.riskLevel}">${clause.riskLevel.toUpperCase()} RISK</span>
                </div>
                <div class="clause-card-body">
                    <div class="translation-box">
                        <div class="box-tag"><i class="fa-wand-magic-sparkles" aria-hidden="true"></i> Plain English Translation</div>
                        <div class="plain-text">${sanitizeHtml(clause.plainEnglish)}</div>
                    </div>

                    <div class="original-box">
                        <strong>Original Legalese:</strong> "${sanitizeHtml(clause.original)}"
                    </div>

                    <div class="mitigation-box">
                        <i class="fa-lightbulb mitigation-icon" aria-hidden="true"></i>
                        <div>
                            <strong>Recommended Action / Negotiation Tip:</strong> ${sanitizeHtml(clause.mitigationTip)}
                        </div>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        });
    }

    clauseContainer.appendChild(fragment);
}

/**
 * Options & Next Steps Navigator Generator
 * @param {Object} doc 
 */
function renderOptionsNavigator(doc) {
    const container = domCache.optionsContainer || document.getElementById('optionsContainer');
    if (!container) return;

    const isHighRisk = (doc.riskScore || 50) >= 70;

    const options = [
        {
            title: "Option 1: Consult a Licensed Attorney",
            badge: "RECOMMENDED",
            badgeClass: "high",
            icon: "fa-user-tie",
            desc: "Present this document alongside our generated Lawyer Consultation Prep sheet to an attorney specializing in contract law.",
            pros: ["Provides binding legal advice", "Protects against hidden enforcement traps"],
            cons: ["Requires consultation fee & scheduling time"]
        },
        {
            title: "Option 2: Negotiate Specific Red-Flag Clauses",
            badge: "ACTIONABLE",
            badgeClass: "caution",
            icon: "fa-comments-dollar",
            desc: "Propose redline modifications to high-risk clauses (e.g., reducing non-compete duration or carving out personal IP).",
            pros: ["Improves contract fairness", "Demonstrates professional boundary setting"],
            cons: ["Other party may reject modifications"]
        },
        {
            title: "Option 3: Accept Terms As-Is",
            badge: isHighRisk ? "HIGH RISK" : "STANDARD",
            badgeClass: isHighRisk ? "high" : "low",
            icon: "fa-file-signature",
            desc: "Sign the agreement without requested modifications.",
            pros: ["Immediate onboarding / closing"],
            cons: isHighRisk ? ["Locks you into restrictive post-employment covenants & liability caps"] : ["Standard legal risk"]
        }
    ];

    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    options.forEach(opt => {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.innerHTML = `
            <div class="option-title">
                <i class="fa-solid ${opt.icon}" aria-hidden="true"></i> ${sanitizeHtml(opt.title)}
            </div>
            <div>
                <span class="risk-badge ${opt.badgeClass}">${opt.badge}</span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-muted);">${sanitizeHtml(opt.desc)}</p>
            <div style="font-size: 0.85rem; color: var(--emerald-success);">
                <strong>Pros:</strong> ${opt.pros.map(p => sanitizeHtml(p)).join('; ')}
            </div>
            <div style="font-size: 0.85rem; color: var(--rose-danger);">
                <strong>Cons / Trade-offs:</strong> ${opt.cons.map(c => sanitizeHtml(c)).join('; ')}
            </div>
        `;
        fragment.appendChild(card);
    });

    container.appendChild(fragment);
}

// Run AI Analysis (Live Gemini API with fallback)
async function runAiAnalysis() {
    const doc = appStateStore.get('currentDoc');
    if (!doc) return;

    const apiKey = appStateStore.get('apiKey');

    if (!apiKey) {
        showToast('Running Smart Offline Intelligence Engine');
        renderAnalysisData(doc);
        return;
    }

    showToast('Querying Google Gemini AI Model...');
    try {
        const promptText = `You are an expert legal AI assistant. Analyze the following legal document and provide a JSON response containing:
1. riskScore (number 0 to 100)
2. riskSummary (short text summary of overall risks)
3. clauses: array of objects with keys: section, original, plainEnglish, riskLevel (high, caution, or low), category (obligation, risk, restriction, inconsistency), mitigationTip.

Legal Document Text:
${doc.text.slice(0, 4000)}`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: promptText }] }]
            })
        });

        const data = await response.json();
        const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (candidateText) {
            const jsonMatch = candidateText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                const parsed = JSON.parse(jsonMatch[0]);
                doc.riskScore = parsed.riskScore || doc.riskScore;
                doc.riskSummary = parsed.riskSummary || doc.riskSummary;
                doc.clauses = parsed.clauses || doc.clauses;
                analysisCache.set(doc.text, doc);
                renderAnalysisData(doc);
                renderOptionsNavigator(doc);
                showToast('Gemini Live Analysis Complete!');
                return;
            }
        }
    } catch (err) {
        console.warn('Gemini API Error, using offline engine:', err);
    }
    renderAnalysisData(doc);
}

// Contract Comparison System
function runContractComparison() {
    const docA = appStateStore.get('currentDoc') || LEGAL_SAMPLES.employment;
    const compPreset = COMPARISON_PRESETS.employment_vs_standard;
    const docB = compPreset.docB;

    if (domCache.compDocATitle) {
        domCache.compDocATitle.textContent = docA.title;
    }

    const tbody = domCache.diffTableBody || document.getElementById('diffTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    const fragment = document.createDocumentFragment();
    const diffs = compPreset.diffHighlights;

    diffs.forEach(diff => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="font-weight: 600; color: #FFF;">${sanitizeHtml(diff.topic)}</td>
            <td style="color: var(--rose-danger);">${sanitizeHtml(diff.docATerm)}</td>
            <td style="color: var(--emerald-success);">${sanitizeHtml(diff.docBTerm)}</td>
            <td>
                <div style="margin-bottom: 0.3rem;">${sanitizeHtml(diff.verdict)}</div>
                <span class="risk-badge ${diff.severity}">${diff.severity.toUpperCase()} IMPACT</span>
            </td>
        `;
        fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
}

// AI Chat Assistant System
function sendPromptChip(promptText) {
    const input = domCache.chatInput || document.getElementById('chatInput');
    if (input) {
        input.value = promptText;
        submitChatMessage();
    }
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter') submitChatMessage();
}

async function submitChatMessage() {
    const inputEl = domCache.chatInput || document.getElementById('chatInput');
    const userText = inputEl ? inputEl.value.trim() : '';
    if (!userText) return;

    if (inputEl) inputEl.value = '';

    appendChatMessage('user', userText);
    const aiBubble = appendChatMessage('ai', 'Analyzing document context...', true);
    const apiKey = appStateStore.get('apiKey');
    const currentDoc = appStateStore.get('currentDoc');

    if (apiKey) {
        try {
            const prompt = `System: You are LegalEase AI assistant. Answer the user's question based strictly on the provided legal document context. Keep your response concise, actionable, and cite specific clause names if applicable.

Document Context:
${currentDoc ? currentDoc.text.slice(0, 3000) : ''}

User Question: ${userText}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                updateChatMessage(aiBubble, text);
                return;
            }
        } catch (e) {
            console.warn('Gemini Chat error:', e);
        }
    }

    setTimeout(() => {
        const fallback = findFallbackAnswer(userText);
        updateChatMessage(aiBubble, fallback.answer, fallback.clauseRef);
    }, 500);
}

function findFallbackAnswer(query) {
    const qLower = query.toLowerCase();
    for (const item of FALLBACK_QA) {
        if (item.keywords.some(kw => qLower.includes(kw))) {
            return item;
        }
    }
    return {
        answer: `Regarding your query about "${query}": Based on the active document, you should carefully review the governing sections and consult legal counsel. Ensure all termination timelines, payment obligations, and liability caps match your expectations.`,
        clauseRef: "General Contract Terms"
    };
}

function appendChatMessage(role, text) {
    const history = domCache.chatHistory || document.getElementById('chatHistory');
    if (!history) return;

    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${role}`;
    const icon = role === 'user' ? 'fa-user' : 'fa-scale-balanced';

    bubble.innerHTML = `
        <div class="chat-avatar"><i class="fa-solid ${icon}" aria-hidden="true"></i></div>
        <div class="chat-content">
            <span class="chat-text">${formatMarkdown(text)}</span>
        </div>
    `;

    history.appendChild(bubble);
    history.scrollTop = history.scrollHeight;
    return bubble;
}

function updateChatMessage(bubbleEl, newText, citation) {
    if (!bubbleEl) return;
    const contentText = bubbleEl.querySelector('.chat-text');
    const contentBox = bubbleEl.querySelector('.chat-content');

    if (contentText) {
        contentText.innerHTML = formatMarkdown(newText);
    }

    if (citation && !contentBox.querySelector('.citation-tag')) {
        const citeEl = document.createElement('div');
        citeEl.className = 'citation-tag';
        citeEl.innerHTML = `<i class="fa-solid fa-bookmark" aria-hidden="true"></i> Citation: ${sanitizeHtml(citation)}`;
        contentBox.appendChild(citeEl);
    }

    const history = domCache.chatHistory || document.getElementById('chatHistory');
    if (history) history.scrollTop = history.scrollHeight;
}

// Action Checklist Generator
function generateChecklist(doc) {
    const container = domCache.checklistContainer || document.getElementById('checklistContainer');
    if (!container) return;
    container.innerHTML = '';

    const items = [
        `Request written clarification on Section 1 regarding secondary side-project exemptions.`,
        `Negotiate non-compete clause duration down from 24 months to 6 months.`,
        `Add Exhibit A detailing pre-existing intellectual property to be excluded from assignment.`,
        `Verify 30-day prior written notice timeline calendar reminders.`,
        `Confirm severance terms in Section 6.3 with payroll guidelines.`
    ];

    const fragment = document.createDocumentFragment();

    items.forEach((itemText) => {
        const item = document.createElement('div');
        item.className = 'check-item';
        item.tabIndex = 0;
        item.setAttribute('role', 'checkbox');
        item.setAttribute('aria-checked', 'false');

        const toggle = function() {
            item.classList.toggle('completed');
            const chk = item.querySelector('.check-checkbox');
            chk.checked = !chk.checked;
            item.setAttribute('aria-checked', chk.checked ? 'true' : 'false');
        };

        item.onclick = toggle;
        item.onkeydown = function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle();
            }
        };

        item.innerHTML = `
            <input type="checkbox" class="check-checkbox" onclick="event.stopPropagation()" aria-label="${sanitizeHtml(itemText)}">
            <span class="check-label">${sanitizeHtml(itemText)}</span>
        `;
        fragment.appendChild(item);
    });

    container.appendChild(fragment);
}

// Lawyer Consultation Prep Briefing Updates
function updateConsultationPrep(doc) {
    if (domCache.prepDate) domCache.prepDate.textContent = doc.date || new Date().toLocaleDateString();
    if (domCache.prepDocTitle) domCache.prepDocTitle.textContent = doc.title;
    if (domCache.prepExecutiveSummary) domCache.prepExecutiveSummary.textContent = doc.summary || doc.riskSummary;

    const redFlagsList = domCache.prepRedFlagsList || document.getElementById('prepRedFlagsList');
    if (!redFlagsList) return;
    redFlagsList.innerHTML = '';
    const fragment = document.createDocumentFragment();

    (doc.clauses || []).forEach(clause => {
        if (clause.riskLevel === 'high' || clause.riskLevel === 'caution') {
            const li = document.createElement('li');
            li.className = 'sheet-item';
            li.innerHTML = `
                <span class="sheet-bullet">•</span>
                <div>
                    <strong>[${sanitizeHtml(clause.section)}]</strong> ${sanitizeHtml(clause.plainEnglish)}
                    <div style="font-size: 0.82rem; color: #64748B;"><em>Reason: ${sanitizeHtml(clause.riskReason)}</em></div>
                </div>
            `;
            fragment.appendChild(li);
        }
    });

    redFlagsList.appendChild(fragment);
}

/**
 * Switch to Tab 6 and display full Lawyer Prep Briefing Document comfortably
 */
function showLawyerPrep() {
    const doc = appStateStore.get('currentDoc') || LEGAL_SAMPLES.employment;
    updateConsultationPrep(doc);
    switchTab('consultation', document.getElementById('btn-tab-consultation'));
    const sheet = domCache.consultationSheet || document.getElementById('consultationSheet');
    if (sheet) {
        sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    showToast('Loaded Lawyer Consultation Briefing Document');
}

// Export Functions (PDF, Markdown, JSON)
function exportConsultationPDF() {
    switchTab('consultation', document.getElementById('btn-tab-consultation'));
    setTimeout(() => {
        window.print();
    }, 200);
}

function copyConsultationMarkdown() {
    const doc = appStateStore.get('currentDoc') || LEGAL_SAMPLES.employment;
    const md = `# Legal Consultation Briefing
Document: ${doc.title}
Date: ${doc.date || new Date().toLocaleDateString()}

## Executive Summary
${doc.summary || doc.riskSummary}

## Red Flag Clauses
${(doc.clauses || []).map(c => `- **${c.section}**: ${c.plainEnglish}`).join('\n')}

## Recommended Attorney Questions
- Is the non-compete clause legally enforceable in my jurisdiction?
- How can we modify Section 3.2 to safeguard personal side projects?
- Should we request a 'prevailing party' legal fee recovery clause?
`;

    navigator.clipboard.writeText(md).then(() => {
        showToast('Consultation briefing copied to clipboard as Markdown!');
    });
}

function exportConsultationJSON() {
    const doc = appStateStore.get('currentDoc') || LEGAL_SAMPLES.employment;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(doc, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `legal_analysis_${doc.id || 'export'}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported Legal Analysis JSON!');
}
