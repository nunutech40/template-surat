// ── Template Engine Type Definitions ──────────────────────────────────
import { Letterhead } from '../core/storage';

export type FieldType = 'text' | 'textarea' | 'date' | 'dropdown' | 'email' | 'checkbox-group';

export interface FieldDefinition {
    id: string;
    label: string;
    type: FieldType;
    required: boolean;
    placeholder?: string;
    options?: string[];          // for dropdown & checkbox-group
    defaultValue?: string;
    halfWidth?: boolean;         // render side-by-side with next field
}

export interface TemplateConfig {
    id: string;                  // e.g. "surat-lamaran"
    name: string;                // e.g. "Surat Lamaran Kerja"
    category: TemplateCategory;
    icon: string;                // emoji
    description: string;
    fields: FieldDefinition[];
    needsLetterhead: boolean;
    renderLayout: (data: Record<string, string>, letterhead?: Letterhead) => string;
}

export type TemplateCategory =
    | 'lamaran'
    | 'keterangan'
    | 'pengantar'
    | 'bisnis'
    | 'resign'
    | 'sosial'
    | 'izin'
    | 'perjanjian'
    | 'permohonan';

export const categoryLabels: Record<TemplateCategory, string> = {
    lamaran: '📝 Surat Lamaran',
    keterangan: '📜 Surat Keterangan',
    pengantar: '📨 Surat Pengantar',
    bisnis: '📋 Surat Bisnis & Perjanjian',
    resign: '💼 Surat Resign & HR',
    sosial: '🎉 Surat Sosial',
    izin: '🏷️ Surat Izin',
    perjanjian: '📑 Surat Perjanjian',
    permohonan: '📩 Surat Permohonan',
};

