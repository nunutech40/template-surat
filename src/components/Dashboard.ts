// ── Dashboard — Template Catalog ──────────────────────────────────────
import { getAllTemplates, getCategories, getTemplatesByCategory } from '../templates/registry';
import { categoryLabels } from '../templates/types';
import { getAllLetters, deleteLetter } from '../core/storage';

// Color map per category
const catColor: Record<string, { bg: string; accent: string }> = {
  lamaran: { bg: '#eff6ff', accent: '#2563eb' },
  keterangan: { bg: '#f0fdf4', accent: '#16a34a' },
  resign: { bg: '#fef3c7', accent: '#d97706' },
  bisnis: { bg: '#faf5ff', accent: '#7c3aed' },
  pengantar: { bg: '#fff1f2', accent: '#e11d48' },
  izin: { bg: '#fef9c3', accent: '#ca8a04' },
  perjanjian: { bg: '#f0fdfa', accent: '#0d9488' },
  permohonan: { bg: '#fdf2f8', accent: '#db2777' },
  sosial: { bg: '#fef3c7', accent: '#ea580c' },
};

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '-';
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch { return '-'; }
}

export function renderDashboard(container: HTMLElement) {
  // Remove all old listeners: replace container's internals cleanly
  // by removing all children first, then setting new innerHTML
  while (container.firstChild) container.removeChild(container.firstChild);

  const allTemplates = getAllTemplates();
  const categories = getCategories();
  const letters = getAllLetters();

  container.innerHTML = `
    <div class="dash">
      <!-- Hero -->
      <div class="dash-hero">
        <div class="dash-hero-inner">
          <div class="dash-hero-text">
            <h1>📝 Buat Surat dalam 30 Detik</h1>
            <p>Pilih template, isi form, langsung print atau download PDF</p>
          </div>
          <div class="dash-stats">
            <div class="dash-stat">
              <span class="dash-stat-num">${allTemplates.length}</span>
              <span class="dash-stat-label">Template</span>
            </div>
            <div class="dash-stat">
              <span class="dash-stat-num">${letters.length}</span>
              <span class="dash-stat-label">Surat Dibuat</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Search + Filter Row -->
      <div class="dash-toolbar">
        <div class="dash-search-wrap">
          <svg class="dash-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" id="template-search" class="dash-search" placeholder="Cari template surat...">
        </div>
        <div class="cat-chips">
          <button class="cat-chip active" data-filter="all">Semua</button>
          ${categories.map(cat => `
            <button class="cat-chip" data-filter="${cat}">${categoryLabels[cat]}</button>
          `).join('')}
        </div>
      </div>

      <!-- ⭐ Featured — 5 Template Terpopuler -->
      <div class="featured-section">
        <div class="featured-header">
          <h2>⭐ 5 Template Terpopuler</h2>
          <p>Template paling sering digunakan</p>
        </div>
        <div class="featured-grid">
          ${allTemplates.slice(0, 5).map(t => {
    const c = catColor[t.category] || catColor.lamaran;
    return `
            <a href="#/template/${t.id}" class="featured-card" style="--card-accent:${c.accent};">
              <div class="featured-card-icon">${t.icon}</div>
              <h3>${t.name}</h3>
              <p>${t.description}</p>
              <div class="featured-card-cta">Buat Surat →</div>
            </a>`;
  }).join('')}
        </div>
      </div>

      <!-- All Templates -->
      <div class="all-tpl-section">
        <div class="all-tpl-header">
          <h2>📋 Semua Template</h2>
          <span class="all-tpl-count">${allTemplates.length} template tersedia</span>
        </div>
      </div>

      <!-- Template Grid -->
      <div class="tpl-grid" id="template-grid">
        ${allTemplates.map(t => {
    const c = catColor[t.category] || catColor.lamaran;
    return `
            <a href="#/template/${t.id}" class="tpl-card" data-name="${t.name.toLowerCase()} ${t.description.toLowerCase()}" data-cat="${t.category}">
              <div class="tpl-card-top" style="background:${c.bg};">
                <span class="tpl-card-icon">${t.icon}</span>
                <span class="tpl-card-badge" style="color:${c.accent};background:${c.accent}15;">${categoryLabels[t.category]}</span>
              </div>
              <div class="tpl-card-body">
                <h3>${t.name}</h3>
                <p>${t.description}</p>
                <div class="tpl-card-cta">
                  <span>Buat Surat</span>
                  <span class="tpl-arrow">→</span>
                </div>
              </div>
            </a>`;
  }).join('')}
      </div>

      <!-- History -->
      ${letters.length > 0 ? `
        <div class="hist-section">
          <div class="hist-header">
            <h2>📂 Riwayat Surat</h2>
            <span class="hist-count">${letters.length} surat</span>
          </div>
          <div class="hist-list">
            ${letters.map(l => `
              <div class="hist-row" data-letter-id="${l.id}">
                <div class="hist-left">
                  <div class="hist-icon">${allTemplates.find(t => t.id === l.templateId)?.icon || '📄'}</div>
                  <div class="hist-info">
                    <strong>${l.templateName}</strong>
                    <span>${formatDate(l.createdAt)}${l.data?.nama ? ` · ${l.data.nama}` : ''}</span>
                  </div>
                </div>
                <div class="hist-actions">
                  <a href="#/template/${l.templateId}?edit=${l.id}" class="hist-btn hist-open">📝 Edit</a>
                  <button class="hist-btn hist-del" onclick="event.stopImmediatePropagation(); window.__suratDelete('${l.id}')">🗑️</button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // ── Search ────────────────────────────────────────────────────────
  const searchInput = container.querySelector('#template-search') as HTMLInputElement;
  searchInput?.addEventListener('input', () => {
    const q = searchInput.value.toLowerCase();
    container.querySelectorAll('.tpl-card').forEach(c => {
      const name = c.getAttribute('data-name') || '';
      (c as HTMLElement).style.display = name.includes(q) ? '' : 'none';
    });
  });

  // ── Category Filter ───────────────────────────────────────────────
  container.querySelectorAll('.cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      container.querySelectorAll('.cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const filter = (chip as HTMLElement).dataset.filter;
      container.querySelectorAll('.tpl-card').forEach(card => {
        const cat = card.getAttribute('data-cat');
        (card as HTMLElement).style.display =
          filter === 'all' || cat === filter ? '' : 'none';
      });
    });
  });

  // ── Delete (global + lock + stopImmediatePropagation) ──────────────
  // Lock prevents re-entry; stopImmediatePropagation in onclick kills
  // stale listeners leftover from Vite HMR hot-reloads
  (window as any).__suratDelete = (id: string) => {
    if ((window as any).__deleteBusy) return;
    (window as any).__deleteBusy = true;
    try {
      if (confirm('Hapus surat ini?')) {
        deleteLetter(id);
        renderDashboard(container);
      }
    } finally {
      (window as any).__deleteBusy = false;
    }
  };
}
