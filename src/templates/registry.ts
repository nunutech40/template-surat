// ── Template Registry ─────────────────────────────────────────────────
import { TemplateConfig, TemplateCategory } from './types';

// Wave 1 — MVP (5 templates)
import { suratLamaran } from './surat-lamaran';
import { suratKeteranganDomisili } from './surat-keterangan-domisili';
import { suratResign } from './surat-resign';
import { suratKuasa } from './surat-kuasa';
import { suratPengantarRT } from './surat-pengantar-rt';

// Wave 2 — (+10 templates)
import { suratSKTM } from './surat-sktm';
import { suratSKU } from './surat-sku';
import { suratKeteranganPenghasilan } from './surat-keterangan-penghasilan';
import { suratAktifKuliah } from './surat-aktif-kuliah';
import { suratKeteranganSehat } from './surat-keterangan-sehat';
import { suratPerjanjianSewa } from './surat-perjanjian-sewa';
import { suratIzinKerja } from './surat-izin-kerja';
import { suratIzinSekolah } from './surat-izin-sekolah';
import { suratPengantarProposal } from './surat-pengantar-proposal';
import { suratUndanganRapat } from './surat-undangan-rapat';

// Wave 3 — (+10 templates)
import { suratPerjanjianHutang } from './surat-perjanjian-hutang';
import { suratPerjanjianKerjasama } from './surat-perjanjian-kerjasama';
import { suratPernyataan } from './surat-pernyataan';
import { suratPermohonanMagang } from './surat-permohonan-magang';
import { suratPermohonanCuti } from './surat-permohonan-cuti';
import { suratKeteranganKerja } from './surat-keterangan-kerja';
import { suratRekomendasi } from './surat-rekomendasi';
import { suratTugas } from './surat-tugas';
import { suratUndanganAcara } from './surat-undangan-acara';
import { suratIzinOrangTua } from './surat-izin-orangtua';

// Wave 4 — (+10 templates)
import { suratPeringatan } from './surat-peringatan';
import { suratPermohonanBantuan } from './surat-permohonan-bantuan';
import { suratBelumMenikah } from './surat-belum-menikah';
import { suratKeteranganPindah } from './surat-keterangan-pindah';
import { suratKeteranganKematian } from './surat-keterangan-kematian';
import { suratUcapanTerimakasih } from './surat-ucapan-terimakasih';
import { suratKeteranganLahir } from './surat-keterangan-lahir';
import { suratBeritaAcara } from './surat-berita-acara';
import { suratIzinKegiatan } from './surat-izin-kegiatan';
import { suratDukaCita } from './surat-duka-cita';
import { suratPermohonanSponsor } from './surat-permohonan-sponsor';

const templates: TemplateConfig[] = [
    // Wave 1 — MVP (5)
    suratLamaran,
    suratKeteranganDomisili,
    suratResign,
    suratKuasa,
    suratPengantarRT,
    // Wave 2 (10)
    suratSKTM,
    suratSKU,
    suratKeteranganPenghasilan,
    suratAktifKuliah,
    suratKeteranganSehat,
    suratPerjanjianSewa,
    suratIzinKerja,
    suratIzinSekolah,
    suratPengantarProposal,
    suratUndanganRapat,
    // Wave 3 (10)
    suratPerjanjianHutang,
    suratPerjanjianKerjasama,
    suratPernyataan,
    suratPermohonanMagang,
    suratPermohonanCuti,
    suratKeteranganKerja,
    suratRekomendasi,
    suratTugas,
    suratUndanganAcara,
    suratIzinOrangTua,
    // Wave 4 (10)
    suratPeringatan,
    suratPermohonanBantuan,
    suratBelumMenikah,
    suratKeteranganPindah,
    suratKeteranganKematian,
    suratUcapanTerimakasih,
    suratKeteranganLahir,
    suratBeritaAcara,
    suratIzinKegiatan,
    suratDukaCita,
    suratPermohonanSponsor,
];

export function getAllTemplates(): TemplateConfig[] {
    return templates;
}

export function getTemplate(id: string): TemplateConfig | undefined {
    return templates.find(t => t.id === id);
}

export function getCategories(): TemplateCategory[] {
    return [...new Set(templates.map(t => t.category))];
}

export function getTemplatesByCategory(category: TemplateCategory): TemplateConfig[] {
    return templates.filter(t => t.category === category);
}
