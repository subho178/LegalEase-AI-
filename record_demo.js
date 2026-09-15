/**
 * LegalEase AI - Automated Project Demo Video Recorder
 * Uses Puppeteer to capture a full walkthrough as sequential screenshots,
 * then assembles them into an animated demo using CSS sprite animation.
 * 
 * Run: node record_demo.js
 * Output: demo_screenshots/ folder with numbered PNG frames
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const DEMO_DIR = path.join(__dirname, 'demo_screenshots');
const VIEWPORT = { width: 1400, height: 800 };
const URL = 'http://localhost:8080/';

let frameCount = 0;

async function captureFrame(page, label) {
    frameCount++;
    const filename = path.join(DEMO_DIR, `frame_${String(frameCount).padStart(3, '0')}_${label}.png`);
    await page.screenshot({ path: filename, fullPage: false });
    console.log(`  📸 Frame ${frameCount}: ${label}`);
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    // Prepare output directory
    if (!fs.existsSync(DEMO_DIR)) fs.mkdirSync(DEMO_DIR, { recursive: true });

    console.log('\n🎬 LEGALEASE AI - PROJECT DEMO RECORDER');
    console.log('========================================\n');

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: VIEWPORT,
        args: ['--window-size=1400,850', '--no-sandbox']
    });

    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);

    // ─── SCENE 1: Landing Page & Risk Radar ───
    console.log('▶ Scene 1: Opening LegalEase AI...');
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await sleep(1500);
    await captureFrame(page, 'landing_simplifier_78_risk');

    // Scroll down to show clause cards
    await page.evaluate(() => window.scrollBy(0, 350));
    await sleep(800);
    await captureFrame(page, 'clause_cards_scrolled');

    await page.evaluate(() => window.scrollBy(0, 350));
    await sleep(800);
    await captureFrame(page, 'more_clause_cards');

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);

    // ─── SCENE 2: Switch to Lease Agreement (84 Risk) ───
    console.log('▶ Scene 2: Switching to Residential Lease Agreement...');
    await page.select('#sampleSelect', 'lease');
    await sleep(1500);
    await captureFrame(page, 'lease_agreement_84_risk');

    // Scroll to show lease clause cards
    await page.evaluate(() => window.scrollBy(0, 400));
    await sleep(800);
    await captureFrame(page, 'lease_clause_cards');

    // Scroll back up
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);

    // Switch back to Employment Agreement for comparison demo
    await page.select('#sampleSelect', 'employment');
    await sleep(1000);

    // ─── SCENE 3: Compare Contracts Tab ───
    console.log('▶ Scene 3: Contract Comparison...');
    await page.click('#btn-tab-compare');
    await sleep(1200);
    await captureFrame(page, 'compare_contracts_tab');

    // Scroll to show full comparison table
    await page.evaluate(() => window.scrollBy(0, 300));
    await sleep(800);
    await captureFrame(page, 'comparison_table_scrolled');

    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);

    // ─── SCENE 4: AI Assistant Q&A Chat ───
    console.log('▶ Scene 4: AI Assistant Q&A Chat...');
    await page.click('#btn-tab-chat');
    await sleep(1000);
    await captureFrame(page, 'chat_assistant_initial');

    // Click "Early termination terms?" chip
    const chips = await page.$$('.chip-btn');
    if (chips[0]) {
        await chips[0].click();
        await sleep(1200);
        await captureFrame(page, 'chat_early_termination_answer');
    }

    // Click "Non-compete rules?" chip
    if (chips[1]) {
        await chips[1].click();
        await sleep(1200);
        await captureFrame(page, 'chat_noncompete_citation');
    }

    // Type a custom question
    await page.type('#chatInput', 'Who owns personal inventions created on weekends?', { delay: 30 });
    await sleep(500);
    await captureFrame(page, 'chat_typing_custom_question');

    // Click Send
    const sendBtn = await page.$('.chat-input-bar .btn-primary');
    if (sendBtn) await sendBtn.click();
    await sleep(1500);
    await captureFrame(page, 'chat_custom_answer_ip');

    // ─── SCENE 5: Options Navigator ───
    console.log('▶ Scene 5: Options & Next Steps Navigator...');
    await page.click('#btn-tab-options');
    await sleep(1200);
    await captureFrame(page, 'options_navigator_cards');

    // ─── SCENE 6: Action Checklist ───
    console.log('▶ Scene 6: Action Checklist...');
    await page.click('#btn-tab-checklist');
    await sleep(800);
    await captureFrame(page, 'action_checklist_initial');

    // Click first two checklist items
    const checkItems = await page.$$('.check-item');
    if (checkItems[0]) {
        await checkItems[0].click();
        await sleep(400);
    }
    if (checkItems[1]) {
        await checkItems[1].click();
        await sleep(400);
    }
    await captureFrame(page, 'checklist_items_completed');

    // ─── SCENE 7: Lawyer Consultation Prep ───
    console.log('▶ Scene 7: Lawyer Consultation Prep Sheet...');
    await page.click('#btn-tab-consultation');
    await sleep(1200);
    await captureFrame(page, 'lawyer_prep_sheet');

    // Scroll to show more of the briefing
    await page.evaluate(() => window.scrollBy(0, 350));
    await sleep(800);
    await captureFrame(page, 'lawyer_prep_questions');

    // ─── SCENE 8: Switch Presets (NDA & SaaS) ───
    console.log('▶ Scene 8: Showcasing Multiple Document Presets...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.click('#btn-tab-simplifier');
    await sleep(500);

    await page.select('#sampleSelect', 'nda');
    await sleep(1200);
    await captureFrame(page, 'nda_28_risk_low');

    await page.select('#sampleSelect', 'saas');
    await sleep(1200);
    await captureFrame(page, 'saas_62_risk_moderate');

    await page.select('#sampleSelect', 'freelance');
    await sleep(1200);
    await captureFrame(page, 'freelance_15_risk_very_low');

    // ─── FINAL FRAME ───
    console.log('▶ Final Scene: Closing frame...');
    await page.select('#sampleSelect', 'employment');
    await sleep(1500);
    await captureFrame(page, 'final_employment_overview');

    console.log(`\n✅ DEMO RECORDING COMPLETE!`);
    console.log(`   Total Frames Captured: ${frameCount}`);
    console.log(`   Output Directory: ${DEMO_DIR}\n`);

    await browser.close();
}

main().catch(err => {
    console.error('Demo recording error:', err);
    process.exit(1);
});
