// ── Letter Storage & Types ────────────────────────────────────────────

export interface Letterhead {
    logo?: string;          // base64 data URL
    institutionName: string;
    address: string;
    phone?: string;
    email?: string;
}

export interface SavedLetter {
    id: string;
    templateId: string;
    templateName: string;
    data: Record<string, string>;
    letterhead?: Letterhead;
    createdAt: string;
    updatedAt: string;
}

const LETTERS_KEY = 'surat_letters';
const LETTERHEAD_KEY = 'surat_letterhead';
const COUNTER_KEY = 'surat_monthly_count';
const MONTH_KEY = 'surat_current_month';

// ── Letterhead Profile ────────────────────────────────────────────────

export function getLetterhead(): Letterhead | null {
    try {
        const raw = localStorage.getItem(LETTERHEAD_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
}

export function saveLetterhead(letterhead: Letterhead) {
    localStorage.setItem(LETTERHEAD_KEY, JSON.stringify(letterhead));
}

// ── Letter Storage ────────────────────────────────────────────────────

export function getAllLetters(): SavedLetter[] {
    try {
        const raw = localStorage.getItem(LETTERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

function saveAllLetters(letters: SavedLetter[]) {
    localStorage.setItem(LETTERS_KEY, JSON.stringify(letters));
}

export function saveLetter(letter: SavedLetter) {
    const all = getAllLetters();
    const idx = all.findIndex(l => l.id === letter.id);
    if (idx >= 0) {
        all[idx] = { ...letter, updatedAt: new Date().toISOString() };
    } else {
        all.unshift(letter);
    }
    saveAllLetters(all);
}

export function deleteLetter(id: string) {
    saveAllLetters(getAllLetters().filter(l => l.id !== id));
}

export function createNewLetter(
    templateId: string,
    templateName: string,
    data: Record<string, string>,
    letterhead?: Letterhead
): SavedLetter {
    const now = new Date().toISOString();
    return {
        id: crypto.randomUUID(),
        templateId,
        templateName,
        data,
        letterhead,
        createdAt: now,
        updatedAt: now,
    };
}

// ── Freemium Counter ──────────────────────────────────────────────────

export function getMonthlyCount(): number {
    const currentMonth = new Date().toISOString().slice(0, 7); // "2026-03"
    const savedMonth = localStorage.getItem(MONTH_KEY);

    if (savedMonth !== currentMonth) {
        // New month — reset counter
        localStorage.setItem(MONTH_KEY, currentMonth);
        localStorage.setItem(COUNTER_KEY, '0');
        return 0;
    }

    return parseInt(localStorage.getItem(COUNTER_KEY) || '0');
}

export function incrementMonthlyCount() {
    const count = getMonthlyCount();
    localStorage.setItem(COUNTER_KEY, String(count + 1));
}

export const MAX_FREE_LETTERS = 3;

export function canCreateLetter(hasSubscription: boolean): boolean {
    if (hasSubscription) return true;
    return getMonthlyCount() < MAX_FREE_LETTERS;
}
