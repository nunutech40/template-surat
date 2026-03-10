# TRD — Technical Requirements Document
**Product:** Surat — Generator Surat & Dokumen Profesional Indonesia  
**Version:** 1.0  
**Date:** 2026-03-10  
**Ref:** `PRD.md` v1.0 · `../../klinik/docs/ARCHITECTURE.md` v2 · `../../api/docs/TRD.md` v1.2

---

## 1. Arsitektur Sistem

```
┌──────────────────────────────────────────────────────────────┐
│                          Clients                             │
│                                                              │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────────┐  │
│  │ Surat App    │   │ Landing Page │   │ Admin Panel    │  │
│  │ (Vite SPA)   │   │ (Static)     │   │ (/admin/*)     │  │
│  └──────┬───────┘   └──────┬───────┘   └──────┬─────────┘  │
│         │                   │                   │            │
│         └───────────────────┼───────────────────┘            │
│                             │                                │
│                    ┌────────▼────────┐                       │
│                    │   SAINS API     │  ← NO CHANGES NEEDED  │
│                    │   (Go + Gin)    │                       │
│                    └────────┬────────┘                       │
│                             │                                │
│                    ┌────────▼────────┐                       │
│                    │  PostgreSQL     │                       │
│                    └─────────────────┘                       │
│                                                              │
│  External:  Midtrans (payment) · DomainNesia SMTP (email)   │
└──────────────────────────────────────────────────────────────┘
```

### Key Design Decision: Zero Backend Changes

Surat app **tidak memerlukan perubahan apapun di SAINS API**. Seluruh infrastruktur backend (auth, payment, subscription, feedback) sudah support multi-product by design. Yang diperlukan hanya:

1. Tambah product `surat` di admin panel (`/admin/products`)
2. Tambah pricing plans di admin panel (`/admin/pricing`)
3. Update CORS origins di `.env` VPS

---

## 2. Tech Stack

| Layer | Tech | Version | Alasan |
|-------|------|---------|--------|
| Frontend | TypeScript + Vite | TS ~5.9, Vite ^7.3 | Sama dengan Klinik — zero learning curve |
| Styling | Vanilla CSS | - | Kontrol penuh, dark/light theme |
| Router | Hash-based SPA | Custom | Copy dari Klinik/Atomic |
| Auth | SAINS API `/api/auth/*` | - | Reuse 100%, zero cost |
| Payment | Midtrans via SAINS API | - | Sudah ada, berjalan |
| Data Storage | localStorage | - | MVP — riwayat surat + profil instansi |
| Template Engine | JSON config → dynamic form | - | Custom, lihat Section 5 |
| Print/PDF | `window.print()` + CSS `@media print` | - | Browser built-in |
| Word Export | `docx` npm package | ^9.x | Premium feature (post-MVP) |
| Build | Vite | ^7.3 | Fast build, TypeScript compiler |

---

## 3. File Structure

```
surat/
├── index.html                 ← Entry HTML + SEO meta + JSON-LD
├── package.json               ← Vite + TypeScript
├── tsconfig.json              ← TypeScript config (strict mode)
│
├── src/
│   ├── main.ts                ← Boot flow: auth → access → dashboard
│   │
│   ├── core/
│   │   ├── auth.ts            ← Auth service (fork dari Klinik)
│   │   │                        Token: 'surat_access_token'
│   │   │                        User: 'surat_user'
│   │   ├── config.ts          ← API base URL + product name ('surat')
│   │   ├── router.ts          ← Hash-based SPA router (copy Klinik)
│   │   └── storage.ts         ← Letter storage + letterhead profile
│   │                            Letters: 'surat_letters'
│   │                            Letterhead: 'surat_letterhead'
│   │
│   ├── templates/
│   │   ├── registry.ts        ← Template registry (semua template di-import sini)
│   │   ├── types.ts           ← TemplateConfig, FieldDefinition interfaces
│   │   ├── surat-lamaran.ts   ← Template: Surat Lamaran Kerja
│   │   ├── surat-keterangan-domisili.ts
│   │   ├── surat-resign.ts
│   │   ├── surat-kuasa.ts
│   │   └── surat-pengantar-rt.ts
│   │
│   ├── components/
│   │   ├── AuthGate.ts        ← Login + Register (fork Klinik)
│   │   ├── PricingPage.ts     ← Fetch plans, checkout (fork Klinik)
│   │   ├── Dashboard.ts       ← Template grid + search + riwayat
│   │   ├── TemplateForm.ts    ← Dynamic form (generated from template config)
│   │   ├── LetterPreview.ts   ← Live preview + print + PDF
│   │   ├── LetterheadEditor.ts← Kop surat: logo + nama + alamat instansi
│   │   ├── FeedbackButton.ts  ← Feedback widget (fork Klinik)
│   │   └── Nav.ts             ← Sticky nav + user badge + logout
│   │
│   └── styles/
│       └── global.css         ← Design tokens + all styles + print styles
│
├── docs/
│   ├── PRD.md                 ← Product requirements
│   ├── TRD.md                 ← File ini
│   ├── ARCHITECTURE.md        ← Architecture deep-dive
│   ├── TEMPLATES.md           ← Template catalog + field specs
│   └── RESEARCH.md            ← Keyword & competitor research
│
└── dist/                      ← Build output (gitignored)
```

---

## 4. Integrasi API SAINS

**Zero backend changes.** API SAINS multi-product by design.

### Endpoints yang Dipakai

| Endpoint | Method | Usage |
|----------|--------|-------|
| `/api/auth/register` | POST | Register user baru |
| `/api/auth/login` | POST | Login user |
| `/api/auth/me` | GET | Validate token + get user |
| `/api/auth/logout` | POST | Logout |
| `/api/plans?product=surat` | GET | Fetch pricing plans |
| `/api/checkout` | POST | Buat transaksi Midtrans |
| `/api/access-check?product=surat` | GET | Cek subscription aktif |
| `/api/midtrans/webhook` | POST | Aktivasi subscription (existing) |
| `/api/feedback` | POST | Submit user feedback |

### Setup di Admin Panel (One-time)

```
1. /admin/products → Tambah: Name="Surat", Slug="surat"
2. /admin/pricing → Tambah plans:
   - Product: surat | Segment: global | Duration: monthly | Price: 49000
   - Product: surat | Segment: global | Duration: yearly  | Price: 399000
3. VPS .env → CORS_ORIGINS tambah "https://surat.sains-atomic.web.id"
4. Restart API: sudo systemctl restart sains-api
```

---

## 5. Template Engine Architecture

### Core Concept

Template = **JSON config** yang mendefinisikan:
1. **Fields** — apa yang user isi (form)
2. **Layout** — bagaimana surat ditampilkan (HTML template)

```typescript
// src/templates/types.ts

interface FieldDefinition {
    id: string;              // unique field identifier
    label: string;           // label di form
    type: 'text' | 'textarea' | 'date' | 'dropdown' | 'email' | 'checkbox-group';
    required: boolean;
    placeholder?: string;
    options?: string[];      // untuk dropdown & checkbox-group
    defaultValue?: string;
}

interface TemplateConfig {
    id: string;              // e.g. "surat-lamaran"
    name: string;            // e.g. "Surat Lamaran Kerja"
    category: string;        // e.g. "lamaran"
    icon: string;            // emoji
    description: string;
    fields: FieldDefinition[];
    needsLetterhead: boolean;  // apakah perlu kop surat
    renderLayout: (data: Record<string, string>, letterhead?: Letterhead) => string;
}
```

### Data Flow

```
                                   ┌─────────────────┐
Template Config (JSON)  ───────►   │ TemplateForm.ts  │  ← generates form from fields[]
                                   └────────┬────────┘
                                            │ user fills form
                                            ▼
                                   ┌─────────────────┐
Form Data (Record<string,string>)  │ LetterPreview.ts │  ← calls renderLayout(data)
                                   └────────┬────────┘
                                            │
                                   ┌────────▼────────┐
                                   │  HTML output     │  ← print-ready, styled
                                   │  (kop surat +    │
                                   │   body surat)    │
                                   └────────┬────────┘
                                            │
                              ┌─────────────┼──────────────┐
                              ▼             ▼              ▼
                          [Print]        [PDF]         [Simpan]
                     window.print()   Save as PDF   localStorage
```

### Menambah Template Baru

Untuk menambah template baru, cukup:

1. Buat file `src/templates/surat-[nama].ts`
2. Export `TemplateConfig` object
3. Import + register di `src/templates/registry.ts`

**Effort per template: ~30 menit** (define fields + tulis HTML layout).

---

## 6. Data Storage (localStorage)

### Storage Keys

| Key | Type | Content |
|-----|------|---------|
| `surat_access_token` | string | JWT token |
| `surat_user` | JSON | User object `{ id, email, role }` |
| `surat_letters` | JSON array | Array of saved letters |
| `surat_letterhead` | JSON | Default letterhead profile |

### Letter Object

```typescript
interface SavedLetter {
    id: string;           // crypto.randomUUID()
    templateId: string;   // e.g. "surat-lamaran"
    templateName: string; // e.g. "Surat Lamaran Kerja"
    data: Record<string, string>;  // form field values
    letterhead?: Letterhead;
    createdAt: string;    // ISO date
    updatedAt: string;    // ISO date
}
```

### Letterhead Object

```typescript
interface Letterhead {
    logo?: string;        // base64 data URL
    institutionName: string;
    address: string;
    phone?: string;
    email?: string;
}
```

### MVP Limitation

Data disimpan di localStorage (sama seperti Klinik):
- ❌ Hilang kalau clear browser
- ❌ Tidak sync antar device
- ✅ Works offline
- ✅ Zero backend changes

**Future:** Tambah endpoint `/api/letters` untuk cloud sync.

---

## 7. Freemium Logic

### Free Tier Enforcement

```typescript
// Di TemplateForm.ts, sebelum generate preview:

const MAX_FREE_LETTERS = 3;
const COUNTER_KEY = 'surat_monthly_count';
const MONTH_KEY = 'surat_current_month';

function canCreateLetter(hasSubscription: boolean): boolean {
    if (hasSubscription) return true;
    
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"
    const savedMonth = localStorage.getItem(MONTH_KEY);
    
    if (savedMonth !== currentMonth) {
        // Reset counter for new month
        localStorage.setItem(MONTH_KEY, currentMonth);
        localStorage.setItem(COUNTER_KEY, '0');
        return true;
    }
    
    const count = parseInt(localStorage.getItem(COUNTER_KEY) || '0');
    return count < MAX_FREE_LETTERS;
}
```

### Watermark (Free Tier)

Pada surat yang di-generate oleh user gratis, tambahkan watermark kecil di footer:

```html
<div class="watermark">
    Dibuat di surat.sains-atomic.web.id
</div>
```

Style: `font-size: 8px; color: #ccc; text-align: center;` — visible tapi tidak mengganggu.

Premium users: watermark dihilangkan.

---

## 8. Print & PDF Architecture

### CSS @media print

```css
@media print {
    /* Hide everything except the letter */
    body > *:not(.letter-container) { display: none !important; }
    .letter-container { 
        margin: 0; padding: 20mm;
        box-shadow: none; border: none;
    }
    .no-print { display: none !important; }
    
    /* A4 page setup */
    @page {
        size: A4;
        margin: 0;
    }
}
```

### Print Flow (sama dengan Klinik)

```
User klik [Print] atau [PDF]
    → LetterPreview injects letter HTML ke page
    → Trigger window.print()
    → Browser print dialog muncul
    → User pilih printer (print) atau "Save as PDF" (PDF)
```

---

## 9. Deployment Architecture

### Prerequisites

| Step | Action |
|------|--------|
| DNS | Cloudflare: A record `surat` → `103.181.143.73` |
| Nginx | Server block untuk `surat.sains-atomic.web.id` |
| VPS Folder | `sains-surat-app` di `/home/nunuadmin/` |
| CORS | Tambah `https://surat.sains-atomic.web.id` ke `.env` |
| API Restart | `sudo systemctl restart sains-api` |
| Admin Panel | Product "Surat" + pricing plans |

### Deploy Steps

```bash
# 1. Build
cd surat && npm run build

# 2. Upload
scp -r dist/* nunuadmin@103.181.143.73:/home/nunuadmin/sains-surat-app/

# 3. Verify
curl -s -o /dev/null -w "Surat: %{http_code}\n" https://surat.sains-atomic.web.id/
```

---

## 10. Perbedaan dari Klinik (Fork Delta)

### File yang di-Fork Tanpa Perubahan

| File | Notes |
|------|-------|
| `core/auth.ts` | Ganti storage keys saja (`klinik_` → `surat_`) |
| `core/router.ts` | Copy as-is |
| `components/AuthGate.ts` | Copy as-is (ganti branding) |
| `components/PricingPage.ts` | Copy as-is (product auto-fetch) |
| `components/FeedbackButton.ts` | Copy as-is |
| `components/Nav.ts` | Copy as-is (ganti branding) |

### File yang Diubah Signifikan

| File | Klinik → Surat |
|------|----------------|
| `core/config.ts` | `product: 'klinik'` → `product: 'surat'` |
| `core/storage.ts` | Invoice types → Letter/Letterhead types |
| `components/Dashboard.ts` | Invoice table → Template grid + riwayat surat |
| `components/InvoiceForm.ts` | → `TemplateForm.ts` (dynamic form from config) |
| `components/InvoicePreview.ts` | → `LetterPreview.ts` (letter layout + print) |
| `styles/global.css` | Redesign: light theme, surat-appropriate |

### File Baru

| File | Purpose |
|------|---------|
| `src/templates/types.ts` | Template config interfaces |
| `src/templates/registry.ts` | Template registry |
| `src/templates/surat-*.ts` | 5 template configs (MVP) |
| `src/components/LetterheadEditor.ts` | Kop surat editor |

---

## 11. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-03-10 | Initial TRD — MVP architecture, template engine, fork delta from Klinik |
