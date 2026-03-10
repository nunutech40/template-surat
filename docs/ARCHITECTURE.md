# 📝 Surat App — Architecture & Design Documentation

> **Last updated:** 2026-03-10  
> **Status:** Pre-build (PRD/TRD Complete, Ready to Fork)  
> **Product:** Generator Surat & Dokumen Profesional Indonesia  
> **Refs:** [PRD.md](PRD.md) · [TRD.md](TRD.md) · [TEMPLATES.md](TEMPLATES.md) · [RESEARCH.md](RESEARCH.md)

---

## 1. Kenapa Produk Ini Ada

### Market Research Summary

Dari riset keyword demand (lihat [RESEARCH.md](RESEARCH.md)):

- **Pain point:** 800K+ orang/bulan search "contoh surat" di Google → copy-paste teks statis → edit manual di Word → berantakan
- **Gap:** 6/7 app di Play Store hanya untuk surat lamaran kerja. TIDAK ADA app general-purpose surat generator Indonesia
- **Opportunity:** Web app + SEO landing pages bisa capture long-tail keywords di 6 kategori
- **Buildability:** Pattern identik dengan Klinik (form → preview → print). Fork, refactor, launch

### Alasan Pilih Generator Surat

| Kriteria | Generator Surat | Nota Digital | Kontrak Freelancer |
|---|---|---|---|
| Keyword volume | ⭐⭐⭐⭐⭐ (800K+) | ⭐⭐⭐ (50K+) | ⭐⭐⭐ (30K+) |
| Competition | ⭐⭐⭐⭐ (no app) | ⭐⭐⭐ (some) | ⭐⭐⭐ (some) |
| Build effort | ⭐⭐⭐⭐⭐ (fork Klinik) | ⭐⭐⭐⭐⭐ (fork Klinik) | ⭐⭐⭐⭐ |
| Revenue potential | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Score** | **24/25 🥇** | **21/25** | **19/25** |

---

## 2. Posisi di Monorepo SAINS

```
SAINS/
├── api/          ← Go backend — SHARED (tidak dimodifikasi)
├── atomic/       ← 3D Periodic Table App (product #1)
├── klinik/       ← Invoice Generator (product #2)
├── surat/        ← ⭐ Surat Generator (product #3, ini)
├── landing/
│   ├── student-kimia-v1/   ← Atomic landing pages
│   ├── klinik-v1/          ← Klinik landing page
│   └── surat-v1/           ← Surat landing page (TODO)
└── ...
```

Surat adalah **product ketiga** di platform SAINS. Menggunakan seluruh infrastruktur backend yang sama tanpa modifikasi apapun di API.

---

## 3. Architecture Overview

### 3.1 System Diagram

```
┌─────────────────────────────────────────────────────┐
│                    Browser                           │
│                                                     │
│  ┌───────────────────────────────────────────┐      │
│  │              Surat App (SPA)              │      │
│  │                                           │      │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  │      │
│  │  │  Auth    │  │ Template │  │ Letter │  │      │
│  │  │  Gate    │  │   Form   │  │Preview │  │      │
│  │  └────┬─────┘  └────┬─────┘  └───┬────┘  │      │
│  │       │              │            │       │      │
│  │       │         ┌────▼────────────▼───┐   │      │
│  │       │         │  Template Engine    │   │      │
│  │       │         │  (JSON → Form →    │   │      │
│  │       │         │   HTML → Print)    │   │      │
│  │       │         └────────┬───────────┘   │      │
│  │       │                  │               │      │
│  │  ┌────▼──────────────────▼───────────┐   │      │
│  │  │         localStorage              │   │      │
│  │  │  surat_letters | surat_letterhead │   │      │
│  │  └──────────────────────────────────┘   │      │
│  └──────────────┬────────────────────────┘  │
│                 │ API calls (auth, plans,    │
│                 │ checkout, access-check)    │
└─────────────────┼───────────────────────────┘
                  │
         ┌────────▼────────┐
         │   SAINS API     │  ← Zero changes
         │   (Go + Gin)    │
         │                 │
         │  product='surat'│
         └────────┬────────┘
                  │
         ┌────────▼────────┐
         │  PostgreSQL     │
         └─────────────────┘
```

### 3.2 Tech Stack

| Layer | Tech | Notes |
|---|---|---|
| Frontend | TypeScript + Vite | Fork dari Klinik |
| Styling | Vanilla CSS | Light theme, print-optimized |
| Router | Hash-based SPA | `#/`, `#/template/:id`, `#/history` |
| Auth | SAINS API | Shared, product='surat' |
| Payment | Midtrans via SAINS API | Shared |
| Storage | localStorage | Letters + letterhead profile |
| Template Engine | JSON config → dynamic form → HTML | Custom |
| Output | Print / PDF / Word (.docx) | PDF=MVP, Word=premium |

### 3.3 Data Flow

```
User buka surat.sains-atomic.web.id
        │
        ▼
main.ts → initAuth()
        │
        ├── Not logged in → AuthGate (Login/Register)
        │       └── POST /api/auth/login atau /register
        │               └── Success → bootApp()
        │
        └── Logged in → bootApp()
                │
                ▼
        checkAccess() → GET /api/access-check?product=surat
                │
                ├── No access → PricingPage
                │       └── GET /api/plans?product=surat
                │               └── POST /api/checkout → Midtrans
                │
                └── Has access (or admin) → Dashboard
                        │
                        ├── Template Grid (browse + search)
                        │       │
                        │       └── Select template
                        │               │
                        │               ▼
                        │       TemplateForm (dynamic from config)
                        │               │
                        │               ├── LetterheadEditor (opsional)
                        │               │
                        │               ▼
                        │       LetterPreview (real-time)
                        │               │
                        │               ├── [Print] → window.print()
                        │               ├── [PDF]  → Save as PDF
                        │               └── [Simpan] → localStorage
                        │
                        └── Riwayat Surat (list, buka, edit, hapus)
```

---

## 4. File Structure

```
surat/
├── index.html              ← Entry HTML + SEO meta
├── package.json            ← Vite + TypeScript
├── tsconfig.json           ← TypeScript config
│
├── src/
│   ├── main.ts             ← Boot flow (auth → access → dashboard)
│   │
│   ├── core/
│   │   ├── auth.ts         ← Auth service
│   │   │                     Token: 'surat_access_token'
│   │   │                     User: 'surat_user'
│   │   ├── config.ts       ← product: 'surat', apiBase
│   │   ├── router.ts       ← Hash-based SPA router
│   │   └── storage.ts      ← Letter + letterhead localStorage CRUD
│   │
│   ├── templates/
│   │   ├── types.ts        ← FieldDefinition, TemplateConfig interfaces
│   │   ├── registry.ts     ← getAllTemplates(), getTemplate(id)
│   │   ├── surat-lamaran.ts
│   │   ├── surat-keterangan-domisili.ts
│   │   ├── surat-resign.ts
│   │   ├── surat-kuasa.ts
│   │   └── surat-pengantar-rt.ts
│   │
│   ├── components/
│   │   ├── AuthGate.ts     ← Login + Register
│   │   ├── PricingPage.ts  ← Plans + checkout
│   │   ├── Dashboard.ts    ← Template grid + search + riwayat
│   │   ├── TemplateForm.ts ← Dynamic form generator
│   │   ├── LetterPreview.ts← Live preview + print/PDF
│   │   ├── LetterheadEditor.ts ← Kop surat editor
│   │   ├── FeedbackButton.ts
│   │   └── Nav.ts
│   │
│   └── styles/
│       └── global.css      ← Design tokens + all styles + @media print
│
└── docs/
    ├── PRD.md
    ├── TRD.md
    ├── ARCHITECTURE.md     ← File ini
    ├── TEMPLATES.md
    └── RESEARCH.md
```

---

## 5. Template Engine (Core Innovation)

### 5.1 Konsep

Setiap template surat = 1 TypeScript file yang export `TemplateConfig`:

```typescript
// src/templates/surat-lamaran.ts
import { TemplateConfig } from './types';

export const suratLamaran: TemplateConfig = {
    id: 'surat-lamaran',
    name: 'Surat Lamaran Kerja',
    category: 'lamaran',
    icon: '📝',
    description: 'Surat lamaran kerja formal untuk melamar posisi',
    needsLetterhead: false,
    fields: [
        { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true },
        // ... more fields
    ],
    renderLayout(data, letterhead) {
        return `
            <div class="letter-page">
                <div class="letter-header">
                    <p class="letter-place-date">${data.kota}, ${data.tanggal}</p>
                    <p>Kepada Yth.</p>
                    <p><strong>HRD ${data.perusahaan}</strong></p>
                    <p>${data.alamatPerusahaan}</p>
                </div>
                <div class="letter-body">
                    <p>Dengan hormat,</p>
                    <p>Saya yang bertanda tangan di bawah ini:</p>
                    <!-- ... structured letter content ... -->
                </div>
                <div class="letter-signature">
                    <p>Hormat saya,</p>
                    <br><br>
                    <p><strong>${data.nama}</strong></p>
                </div>
            </div>
        `;
    }
};
```

### 5.2 Registry

```typescript
// src/templates/registry.ts
import { TemplateConfig } from './types';
import { suratLamaran } from './surat-lamaran';
import { suratKeteranganDomisili } from './surat-keterangan-domisili';
// ... imports

const templates: TemplateConfig[] = [
    suratLamaran,
    suratKeteranganDomisili,
    // ...
];

export function getAllTemplates(): TemplateConfig[] { return templates; }
export function getTemplate(id: string): TemplateConfig | undefined {
    return templates.find(t => t.id === id);
}
export function getCategories(): string[] {
    return [...new Set(templates.map(t => t.category))];
}
```

### 5.3 Menambah Template Baru

1. Buat `src/templates/surat-[nama].ts`
2. Define `fields[]` dan `renderLayout()`
3. Import di `registry.ts`
4. Selesai — form dan preview otomatis muncul

**Effort: ~30 menit per template.**

---

## 6. Perbedaan dari Klinik

### Apa yang TIDAK berubah (copy/fork)

| Module | Notes |
|--------|-------|
| `core/auth.ts` | Ganti storage key prefix saja |
| `core/router.ts` | Copy as-is |
| `components/AuthGate.ts` | Branding saja |
| `components/PricingPage.ts` | Product auto-fetch by config |
| `components/FeedbackButton.ts` | Copy as-is |
| `components/Nav.ts` | Branding saja |
| Boot flow di `main.ts` | Same pattern |

### Apa yang BARU di Surat

| Module | Klinik Equivalent | Delta |
|--------|-------------------|-------|
| `templates/types.ts` | - | NEW: template config interfaces |
| `templates/registry.ts` | - | NEW: template registry |
| `templates/surat-*.ts` | - | NEW: 5 template definitions |
| `components/Dashboard.ts` | Invoice table + stats | REWRITE: template grid + search + riwayat |
| `components/TemplateForm.ts` | InvoiceForm.ts | REWRITE: dynamic form from config |
| `components/LetterPreview.ts` | InvoicePreview.ts | REWRITE: letter layout + kop surat |
| `components/LetterheadEditor.ts` | - | NEW: kop surat editor |
| `core/storage.ts` | Invoice storage | REWRITE: letter + letterhead storage |
| `styles/global.css` | Dark theme | REWRITE: light theme, print styles |

---

## 7. MVP Decisions

### Decision 1: Data di localStorage

Sama seperti Klinik. Validasi demand dulu sebelum invest backend.

### Decision 2: Freemium (bukan full paywall)

Berbeda dari Klinik (full paywall). Surat pakai **freemium** karena:
- Target market lebih luas (bukan hanya profesional)
- Free tier = acquisition funnel → convert ke premium
- 3 surat gratis/bulan cukup untuk taste, kurang untuk power user

### Decision 3: Light Theme (bukan dark)

Klinik pakai dark theme (profesional dokter). Surat pakai **light theme** karena:
- Surat resmi = dokumen formal = light background
- Print preview harus match printed output (white paper)
- Target user lebih general (bukan hanya profesional)

### Decision 4: Template-based Architecture

Bukan hardcode per template, tapi **JSON config → dynamic form**. Alasan:
- Skalabilitas: tambah template = tambah 1 file, bukan rewrite component
- Konsistensi: semua template pakai form engine yang sama
- Maintainability: fix form engine = fix semua template sekaligus

---

## 8. Deployment

### Deploy Prerequisites

Sama pattern dengan Klinik. Lihat detail di [TRD.md Section 9](TRD.md#9-deployment-architecture).

### CORS Configuration

```bash
# Di VPS .env, tambah:
CORS_ORIGINS=https://sains-atomic.web.id,https://app.sains-atomic.web.id,https://surat.sains-atomic.web.id

# Restart API
sudo systemctl restart sains-api
```

---

## 9. Risks & Edge Cases

| Risk | Status | Mitigation |
|---|---|---|
| Data hilang (localStorage) | Known, by design | Inform user + plan cloud sync v2 |
| Template tidak sesuai format resmi | Medium | Research format standar, disclaimer |
| Free tier diakali (clear storage) | Low | Counter di localStorage, acceptable MVP trade-off |
| CORS saat dev | Fixed pattern | localhost:5173 whitelist |
| SEO butuh waktu | Expected | Long-tail keyword strategy, content marketing |

---

## 📋 Changelog

| Versi | Tanggal | Perubahan |
|---|---|---|
| v1 | 2026-03-10 | Initial architecture — template engine, fork delta, MVP decisions |
