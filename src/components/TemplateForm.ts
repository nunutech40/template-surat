// ── TemplateForm — Dynamic Form + Live Preview + Print ────────────────
import { getTemplate } from '../templates/registry';
import { TemplateConfig } from '../templates/types';
import {
    SavedLetter, Letterhead,
    saveLetter, createNewLetter, getAllLetters,
    getLetterhead, saveLetterhead,
    canCreateLetter, incrementMonthlyCount, getMonthlyCount, MAX_FREE_LETTERS
} from '../core/storage';

export function renderTemplateForm(container: HTMLElement, templateId: string, hasSubscription: boolean) {
    const maybeTpl = getTemplate(templateId);
    if (!maybeTpl) {
        container.innerHTML = `
      <div class="form-page">
        <div class="form-empty">
          <h2>Template tidak ditemukan</h2>
          <a href="#/" class="btn btn-primary" style="max-width:200px;margin-top:16px">← Kembali</a>
        </div>
      </div>`;
        return;
    }
    const tpl: TemplateConfig = maybeTpl;

    // Check edit mode
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const editId = params.get('edit');
    let editLetter: SavedLetter | undefined;
    if (editId) {
        editLetter = getAllLetters().find(l => l.id === editId);
    }

    // Form data state
    const formData: Record<string, string> = editLetter?.data || {};
    let letterhead: Letterhead | null = editLetter?.letterhead || getLetterhead();
    const showLetterhead = tpl.needsLetterhead;

    // Set defaults
    tpl.fields.forEach(f => {
        if (!formData[f.id] && f.defaultValue) formData[f.id] = f.defaultValue;
    });

    function render() {
        const freeCount = getMonthlyCount();
        const canCreate = canCreateLetter(hasSubscription);

        container.innerHTML = `
      <div class="form-page">
        <!-- Back -->
        <a href="#/" class="form-back">← Kembali ke template</a>

        <div class="form-layout">
          <!-- Left: Form -->
          <div class="form-panel">
            <div class="form-header">
              <span class="form-header-icon">${tpl.icon}</span>
              <div>
                <h2>${tpl.name}</h2>
                <p>${tpl.description}</p>
              </div>
            </div>

            ${!hasSubscription ? `
              <div class="free-counter ${!canCreate ? 'free-counter-limit' : ''}">
                ${canCreate
                    ? `📝 ${freeCount} dari ${MAX_FREE_LETTERS} surat gratis bulan ini`
                    : `⚠️ Limit tercapai! <a href="#/" onclick="location.reload()">Upgrade ke Premium</a> untuk unlimited`
                }
              </div>
            ` : ''}

            ${showLetterhead ? renderLetterheadForm(letterhead) : ''}

            <form id="surat-form" class="surat-form">
              ${tpl.fields.map(f => renderField(f, formData[f.id] || '')).join('')}
            </form>

            <div class="form-actions-bar">
              <button id="btn-save" class="btn btn-ghost" ${!canCreate ? 'disabled' : ''}>💾 Simpan</button>
              <button id="btn-print" class="btn btn-primary" ${!canCreate ? 'disabled' : ''}>🖨️ Print / PDF</button>
            </div>
          </div>

          <!-- Right: Preview -->
          <div class="preview-panel">
            <div class="preview-label">Preview Surat</div>
            <div class="preview-paper" id="preview-paper">
              ${tpl.renderLayout(formData, letterhead || undefined)}
              ${!hasSubscription ? '<div class="watermark">Dibuat di surat.sains-atomic.web.id</div>' : ''}
            </div>
          </div>
        </div>
      </div>
    `;

        wireEvents(tpl, canCreate);
    }

    function renderField(f: { id: string; label: string; type: string; required: boolean; placeholder?: string; options?: string[]; }, value: string): string {
        const req = f.required ? ' required' : '';
        const ph = f.placeholder || '';

        if (f.type === 'textarea') {
            return `
        <div class="field">
          <label for="f-${f.id}">${f.label}${f.required ? ' *' : ''}</label>
          <textarea id="f-${f.id}" class="f-input" data-field="${f.id}" placeholder="${ph}" rows="3"${req}>${value}</textarea>
        </div>`;
        }
        if (f.type === 'dropdown' && f.options) {
            return `
        <div class="field">
          <label for="f-${f.id}">${f.label}${f.required ? ' *' : ''}</label>
          <select id="f-${f.id}" class="f-input" data-field="${f.id}"${req}>
            <option value="">— Pilih —</option>
            ${f.options.map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o}</option>`).join('')}
          </select>
        </div>`;
        }
        return `
      <div class="field">
        <label for="f-${f.id}">${f.label}${f.required ? ' *' : ''}</label>
        <input id="f-${f.id}" class="f-input" data-field="${f.id}" type="${f.type}" value="${value}" placeholder="${ph}"${req}>
      </div>`;
    }

    function renderLetterheadForm(lh: Letterhead | null): string {
        return `
      <details class="lh-section" ${lh?.institutionName ? 'open' : ''}>
        <summary class="lh-toggle">🏛️ Kop Surat (opsional)</summary>
        <div class="lh-form">
          <div class="field">
            <label>Nama Instansi</label>
            <input class="f-input" id="lh-name" value="${lh?.institutionName || ''}" placeholder="Kelurahan Sukamaju">
          </div>
          <div class="field">
            <label>Alamat</label>
            <input class="f-input" id="lh-address" value="${lh?.address || ''}" placeholder="Jl. Merdeka No. 1">
          </div>
          <div class="field-row">
            <div class="field">
              <label>Telp</label>
              <input class="f-input" id="lh-phone" value="${lh?.phone || ''}" placeholder="021-xxxx">
            </div>
            <div class="field">
              <label>Email</label>
              <input class="f-input" id="lh-email" value="${lh?.email || ''}" placeholder="info@instansi.go.id">
            </div>
          </div>
        </div>
      </details>`;
    }

    function collectLetterhead(): Letterhead | null {
        if (!showLetterhead) return null;
        const name = (container.querySelector('#lh-name') as HTMLInputElement)?.value.trim();
        const address = (container.querySelector('#lh-address') as HTMLInputElement)?.value.trim();
        if (!name) return null;
        const lh: Letterhead = {
            institutionName: name,
            address: address,
            phone: (container.querySelector('#lh-phone') as HTMLInputElement)?.value.trim() || undefined,
            email: (container.querySelector('#lh-email') as HTMLInputElement)?.value.trim() || undefined,
        };
        saveLetterhead(lh);
        return lh;
    }

    function updatePreview() {
        // Collect form data
        container.querySelectorAll('.f-input[data-field]').forEach(el => {
            const field = (el as HTMLElement).dataset.field!;
            formData[field] = (el as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
        });
        letterhead = collectLetterhead();

        // Re-render preview
        const paper = container.querySelector('#preview-paper');
        if (paper) {
            paper.innerHTML = tpl.renderLayout(formData, letterhead || undefined)
                + (!hasSubscription ? '<div class="watermark">Dibuat di surat.sains-atomic.web.id</div>' : '');
        }
    }

    function wireEvents(t: TemplateConfig, canCreate: boolean) {
        // Live preview on input
        container.querySelectorAll('.f-input').forEach(el => {
            el.addEventListener('input', updatePreview);
        });

        // Letterhead inputs
        container.querySelectorAll('#lh-name, #lh-address, #lh-phone, #lh-email').forEach(el => {
            el.addEventListener('input', updatePreview);
        });

        // Save
        container.querySelector('#btn-save')?.addEventListener('click', () => {
            if (!canCreate) return;
            letterhead = collectLetterhead();
            const letter = editLetter
                ? { ...editLetter, data: { ...formData }, letterhead: letterhead || undefined, updatedAt: new Date().toISOString() }
                : createNewLetter(t.id, t.name, { ...formData }, letterhead || undefined);
            saveLetter(letter);
            if (!editLetter) incrementMonthlyCount();
            alert('✅ Surat berhasil disimpan!');
            window.location.hash = '#/';
        });

        // Print
        container.querySelector('#btn-print')?.addEventListener('click', () => {
            if (!canCreate) return;
            updatePreview();

            const paper = container.querySelector('#preview-paper');
            if (!paper) return;

            // Create print-only container
            const printArea = document.createElement('div');
            printArea.id = 'print-area';
            printArea.innerHTML = paper.innerHTML;
            document.body.appendChild(printArea);

            window.print();

            // Cleanup after print
            setTimeout(() => printArea.remove(), 500);

            // Auto-save after print
            letterhead = collectLetterhead();
            const letter = editLetter
                ? { ...editLetter, data: { ...formData }, letterhead: letterhead || undefined, updatedAt: new Date().toISOString() }
                : createNewLetter(t.id, t.name, { ...formData }, letterhead || undefined);
            saveLetter(letter);
            if (!editLetter) incrementMonthlyCount();
        });
    }

    render();
}
