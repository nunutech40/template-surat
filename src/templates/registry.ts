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

const templates: TemplateConfig[] = [
    // Wave 1 — MVP
    suratLamaran,
    suratKeteranganDomisili,
    suratResign,
    suratKuasa,
    suratPengantarRT,
    // Wave 2
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
