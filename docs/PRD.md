# PRD — Product Requirements Document
**Product:** Surat — Generator Surat & Dokumen Profesional Indonesia  
**Version:** 1.0  
**Date:** 2026-03-10  
**Author:** SAINS Labs

---

## 1. Ringkasan Produk

**Surat** adalah web app untuk membuat surat dan dokumen resmi Indonesia secara cepat dan profesional. User memilih template surat → isi form → preview real-time → download PDF / print.

### Positioning
- **Tagline:** "Buat Surat Profesional dalam 30 Detik"
- **Target URL:** `surat.sains-atomic.web.id`
- **Product #3** di platform SAINS (setelah Atomic & Klinik)

---

## 2. Latar Belakang & Masalah

### Pain Points yang Ditemukan

| Pain Point | Siapa | Frekuensi |
|-----------|-------|-----------|
| Copy-paste contoh surat dari Google, harus edit manual di Word | Semua | Sangat sering |
| Format surat berantakan, tidak profesional | UMKM, sekolah | Sering |
| Kop surat harus dibuat ulang setiap kali bikin surat | Instansi, kantor | Setiap kali |
| Tidak ada template yang Bahasa Indonesia native | Semua | Selalu |
| Surat sebelumnya hilang, harus bikin ulang dari awal | Semua | Sering |

### Market Validation

- **"contoh surat"** = ~800K+ search/bulan di Indonesia
- **Zero app competitor** untuk general-purpose surat generator
- **6/7 app di Play Store** hanya untuk surat lamaran kerja
- Detail riset: [RESEARCH.md](RESEARCH.md)

---

## 3. Target User

### Primary Segments

| Segment | Use Case Utama | Prioritas |
|---------|----------------|-----------|
| **Job seekers** | Surat lamaran kerja | 🔥 Highest volume |
| **RT/RW/Kelurahan** | Surat keterangan, pengantar | 🔥 High frequency |
| **Mahasiswa** | Surat pengantar magang, penelitian | 🔥 Seasonal high |
| **UMKM** | Surat penawaran, kontrak, kuasa | ⭐ Growing |
| **Karyawan/HR** | Surat resign, SP, paklaring | ⭐ Consistent |
| **Guru/Admin sekolah** | Surat keterangan, undangan | ⭐ Consistent |

### User Persona (Primary)

**Andi, 24 tahun, Fresh Graduate**
- Butuh bikin surat lamaran kerja yang rapi dan profesional
- Googling "contoh surat lamaran" → copy paste → edit di HP → berantakan
- Mau yang tinggal isi data → langsung jadi → download PDF

**Ibu Sari, 45 tahun, Staff Kelurahan**
- Setiap minggu bikin 10+ surat keterangan domisili, SKTM, dll
- Selama ini pakai Word template yang sering korup/hilang
- Mau yang bisa simpan kop surat → tinggal ganti nama warga → print

---

## 4. Fitur MVP (v1.0)

### 4.1 Core Features

| # | Fitur | Deskripsi | Prioritas |
|---|-------|-----------|-----------|
| F1 | **Template Picker** | Dashboard dengan grid kategori + search | MVP |
| F2 | **Dynamic Form** | Form yang di-generate dari template config | MVP |
| F3 | **Live Preview** | Preview surat real-time saat user isi form | MVP |
| F4 | **Print & PDF** | Print langsung / Save as PDF (browser built-in) | MVP |
| F5 | **Kop Surat Custom** | Upload logo, nama & alamat instansi | MVP |
| F6 | **Riwayat Surat** | Simpan surat yang sudah dibuat, bisa buka/edit ulang | MVP |
| F7 | **Auth & Paywall** | Login + subscription check (reuse SAINS API) | MVP |

### 4.2 Premium Features (Post-MVP)

| # | Fitur | Deskripsi | Timeline |
|---|-------|-----------|----------|
| P1 | **Word Export (.docx)** | Download surat sebagai file Word | Wave 2 |
| P2 | **Share via WhatsApp** | Kirim PDF surat via WA | Wave 2 |
| P3 | **Profil Instansi** | Simpan multiple kop surat | Wave 3 |
| P4 | **Template Favorit** | Pin template yang sering dipakai | Wave 3 |

### 4.3 Non-Features (Explicitly Out of Scope)

| Fitur | Kenapa Tidak |
|-------|-------------|
| E-signature digital (legally binding) | Butuh sertifikat digital, terlalu kompleks |
| Multi-user collaboration | Bukan use case utama, tambah complexity |
| AI auto-generate surat | Bisa ditambah nanti, bukan MVP |
| Cloud sync antar device | MVP pakai localStorage dulu |

---

## 5. User Flow

```
Landing Page → [Coba Gratis] / [Login]
    │
    ▼
Auth (Login/Register) ← reuse SAINS API
    │
    ▼
Access Check → subscription aktif?
    │
    ├── NO → Pricing Page (Rp 49K/bulan) → Checkout (Midtrans)
    │
    └── YES → Dashboard
                │
                ├── Pilih Template (grid + search)
                │       │
                │       ▼
                │   Form Input (dynamic fields dari template)
                │       │
                │       ├── Kop Surat (opsional, reusable)
                │       │
                │       ▼
                │   Preview Surat (real-time, print-ready)
                │       │
                │       ├── [Print] → window.print()
                │       ├── [PDF]  → browser Save as PDF
                │       └── [Simpan] → localStorage
                │
                └── Riwayat Surat (list + buka/edit/hapus)
```

---

## 6. Monetisasi

| Tier | Harga | Batasan |
|------|-------|---------|
| **Gratis** | Rp 0 | 3 surat/bulan, watermark kecil "dibuat di surat.sains-atomic.web.id" |
| **Premium Bulanan** | Rp 49.000/bulan | Unlimited surat, tanpa watermark, kop surat custom, Word export |
| **Premium Tahunan** | Rp 399.000/tahun | Sama dengan bulanan, hemat 32% |

### Revenue Projection (Conservative)

| Bulan | Users | Conversion 2% | MRR |
|-------|-------|---------------|-----|
| 1 | 500 free | 10 paid | Rp 490K |
| 3 | 2.000 free | 40 paid | Rp 1.96M |
| 6 | 5.000 free | 100 paid | Rp 4.9M |
| 12 | 10.000 free | 200 paid | Rp 9.8M |

---

## 7. Template MVP (5 Template)

| # | Template | Volume/bln | Target |
|---|----------|-----------|--------|
| 1 | Surat Lamaran Kerja | 200K+ | Job seeker |
| 2 | Surat Keterangan Domisili | 15K+ | Kelurahan |
| 3 | Surat Resign | 40K+ | Karyawan |
| 4 | Surat Kuasa | 20K+ | Umum |
| 5 | Surat Pengantar RT/RW | 15K+ | Warga |

Detail fields per template: [TEMPLATES.md](TEMPLATES.md)

---

## 8. Success Metrics

### KPIs

| Metric | Target (Bulan 1) | Target (Bulan 3) |
|--------|-------------------|-------------------|
| Unique visitors (landing) | 1.000 | 5.000 |
| Registered users | 200 | 1.000 |
| Surat dibuat | 500 | 3.000 |
| Paid subscribers | 10 | 40 |
| Churn rate | < 15% | < 10% |

### Tracking

- Google Analytics di landing page
- Internal: jumlah surat dibuat (localStorage counter, kirim ke API periodic)
- Subscription data dari admin panel (sudah ada)

---

## 9. Timeline

| Phase | Durasi | Deliverable |
|-------|--------|-------------|
| **Phase 1: Core App** | 2-3 hari | Fork Klinik, refactor ke template-based form, preview surat |
| **Phase 2: Templates** | 1 hari | 5 MVP templates (form + layout) |
| **Phase 3: Polish** | 1 hari | Dashboard grid, search, riwayat, watermark |
| **Phase 4: Deploy** | 0.5 hari | DNS, nginx, product di admin, landing page |
| **Total** | **~5 hari** | MVP live |

---

## 10. Risiko

| Risiko | Impact | Mitigation |
|--------|--------|------------|
| User tidak mau bayar | Tinggi | Validasi dengan free tier dulu, track conversion |
| localStorage hilang | Sedang | Inform user, plan cloud sync untuk v2 |
| Template tidak akurat | Sedang | Research format resmi, disclaimer "untuk referensi" |
| SEO butuh waktu | Rendah | Keyword volume besar, long-tail SEO strategy |
