// ── Surat App — Entry Point ───────────────────────────────────────────
import './styles/global.css';
import { initAuth, isLoggedIn, onAuthChange, checkAccess, getUser } from './core/auth';
import { renderAuthGate } from './components/AuthGate';
import { renderPricingPage } from './components/PricingPage';
import { renderDashboard } from './components/Dashboard';
import { renderTemplateForm } from './components/TemplateForm';
import { renderNav } from './components/Nav';
import { mountFeedbackButton } from './components/FeedbackButton';

const app = document.getElementById('app')!;
let hasSubscription = false;

// ── Loading ────────────────────────────────────────────────────────────
app.innerHTML = `
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;gap:12px;color:var(--text-3)">
    <div class="spinner"></div>
    <span style="font-size:14px">Memuat...</span>
  </div>
`;

// ── Boot ───────────────────────────────────────────────────────────────
initAuth().then(async (loggedIn) => {
    if (loggedIn) {
        await bootApp();
    } else {
        showAuthGate();
    }
});

function showAuthGate() {
    app.innerHTML = '';
    renderAuthGate(app, async () => { app.innerHTML = ''; await bootApp(); });
}

function showPricingPage() {
    app.innerHTML = '';
    renderPricingPage(app, async () => { app.innerHTML = ''; await bootApp(); });
}

// ── Full App with Routing ──────────────────────────────────────────────
async function bootApp() {
    const user = getUser();
    const isAdmin = user?.role === 'admin';

    // Freemium model: all logged-in users can access the dashboard.
    // hasSubscription only determines premium features (unlimited letters, export Word).
    if (isAdmin) {
        hasSubscription = true;
    } else {
        // Check if user has paid subscription (for premium features)
        hasSubscription = await checkAccess().catch(() => false);
    }

    // App shell
    app.innerHTML = `
    <div id="nav-container"></div>
    <div id="main-container"></div>
  `;

    const navContainer = document.getElementById('nav-container')!;
    const mainContainer = document.getElementById('main-container')!;

    renderNav(navContainer, () => window.location.reload());
    mountFeedbackButton();

    // Route handler
    function route() {
        const hash = window.location.hash || '#/';

        if (hash.startsWith('#/template/')) {
            const templateId = hash.replace('#/template/', '');
            renderTemplateForm(mainContainer, templateId, hasSubscription);
        } else {
            renderDashboard(mainContainer);
        }
    }

    route();
    window.addEventListener('hashchange', route);

    onAuthChange(() => {
        if (!isLoggedIn()) window.location.reload();
    });
}
