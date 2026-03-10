// ── Template Registry ─────────────────────────────────────────────────
import { TemplateConfig, TemplateCategory } from './types';
import { suratLamaran } from './surat-lamaran';
import { suratKeteranganDomisili } from './surat-keterangan-domisili';
import { suratResign } from './surat-resign';
import { suratKuasa } from './surat-kuasa';
import { suratPengantarRT } from './surat-pengantar-rt';

const templates: TemplateConfig[] = [
    suratLamaran,
    suratKeteranganDomisili,
    suratResign,
    suratKuasa,
    suratPengantarRT,
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
