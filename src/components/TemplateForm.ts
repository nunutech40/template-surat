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
              <button id="btn-word" class="btn btn-ghost" ${!canCreate ? 'disabled' : ''} style="border-color:#2563eb;color:#2563eb;">📝 Word</button>
              <button id="btn-print" class="btn btn-primary" ${!canCreate ? 'disabled' : ''}>🖨️ Print / PDF</button>
            </div>
            <div class="print-info no-print" style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:#f0f9ff;border:1px solid #bae6fd;border-radius:8px;margin-top:8px;">
              <span style="font-size:13px;">📄</span>
              <span style="font-size:12px;color:#0369a1;"><strong>Ukuran Kertas: A4</strong> (210 × 297 mm) · Pastikan &quot;Headers and footers&quot; tidak dicentang saat print</span>
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

    // Download Word
    container.querySelector('#btn-word')?.addEventListener('click', () => {
      if (!canCreate) return;
      updatePreview();

      const paper = container.querySelector('#preview-paper');
      if (!paper) return;

      // Build Word-compatible HTML document with Word XML processing instructions
      const wordHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page { size: 210mm 297mm; margin: 20mm; }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.6;
    color: #000;
  }
  table { border-collapse: collapse; width: 100%; }
  td, th { padding: 4px 8px; vertical-align: top; }
  .letter-kop { text-align: center; margin-bottom: 12px; }
  .kop-line { border: none; border-top: 3px solid #000; margin: 8px 0 16px 0; }
  .kop-text h2 { margin: 0; font-size: 16pt; }
  .kop-text p { margin: 2px 0; font-size: 10pt; }
  .kop-logo { height: 60px; margin-bottom: 4px; }
  .letter-data-table td { vertical-align: top; padding: 1px 4px; border: none; }
  .watermark { display: none; }
</style>
</head>
<body>
${paper.innerHTML}
</body>
</html>`;

      // BOM (Byte Order Mark) + HTML → Word can read UTF-8 correctly
      const blob = new Blob(['\ufeff', wordHtml], {
        type: 'application/msword;charset=utf-8'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${t.name.replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.doc`;
      // Must append to DOM for Safari/WebKit to respect download attribute
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // Delay revoke to let download start
      setTimeout(() => URL.revokeObjectURL(url), 1000);

      // Auto-save after download
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
