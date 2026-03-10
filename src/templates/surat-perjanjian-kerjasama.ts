// ── Template: Surat Perjanjian Kerjasama ──────────────────────────────
import { TemplateConfig } from './types';

export const suratPerjanjianKerjasama: TemplateConfig = {
    id: 'surat-perjanjian-kerjasama',
    name: 'Surat Perjanjian Kerjasama',
    category: 'perjanjian',
    icon: '🤝',
    description: 'Perjanjian kerjasama bisnis, freelance, atau event antar pihak',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'namaPihak1', label: 'Nama Pihak I', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'alamatPihak1', label: 'Alamat Pihak I', type: 'textarea', required: true },
        { id: 'wakilPihak1', label: 'Diwakili oleh (Pihak I)', type: 'text', required: true, placeholder: 'Budi Santoso (Direktur)' },
        { id: 'namaPihak2', label: 'Nama Pihak II', type: 'text', required: true, placeholder: 'CV Karya Digital' },
        { id: 'alamatPihak2', label: 'Alamat Pihak II', type: 'textarea', required: true },
        { id: 'wakilPihak2', label: 'Diwakili oleh (Pihak II)', type: 'text', required: true, placeholder: 'Siti Aminah (Owner)' },
        { id: 'lingkupKerjasama', label: 'Lingkup Kerjasama', type: 'textarea', required: true, placeholder: 'Pengembangan aplikasi mobile untuk...' },
        { id: 'jangkaWaktu', label: 'Jangka Waktu', type: 'text', required: true, placeholder: '6 (enam) bulan' },
        { id: 'nilaiKontrak', label: 'Nilai Kontrak (Rp)', type: 'text', required: false, placeholder: '50.000.000' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div style="text-align:center;margin:24px 0;"><p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT PERJANJIAN KERJASAMA</p></div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Pada hari ini, tanggal <strong>${tanggal}</strong>, bertempat di ${data.kota || '...'}, telah dibuat perjanjian kerjasama antara:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:120px;">Nama</td><td>: <strong>${data.namaPihak1 || '...'}</strong></td></tr>
                    <tr><td>Alamat</td><td>: ${data.alamatPihak1 || '...'}</td></tr>
                    <tr><td>Diwakili oleh</td><td>: ${data.wakilPihak1 || '...'}</td></tr>
                </table>
                <p style="margin-left:40px;">Selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:120px;">Nama</td><td>: <strong>${data.namaPihak2 || '...'}</strong></td></tr>
                    <tr><td>Alamat</td><td>: ${data.alamatPihak2 || '...'}</td></tr>
                    <tr><td>Diwakili oleh</td><td>: ${data.wakilPihak2 || '...'}</td></tr>
                </table>
                <p style="margin-left:40px;">Selanjutnya disebut <strong>PIHAK KEDUA</strong>.</p>
                <hr style="margin:16px 0;border:none;border-top:1px solid #ccc;">
                <p><strong>Pasal 1 — Lingkup Kerjasama</strong></p>
                <p style="text-indent:40px;">${data.lingkupKerjasama || '...'}</p>
                <p style="margin-top:12px;"><strong>Pasal 2 — Jangka Waktu</strong></p>
                <p style="text-indent:40px;">Perjanjian berlaku selama <strong>${data.jangkaWaktu || '...'}</strong> sejak tanggal ditandatangani.</p>
                ${data.nilaiKontrak ? `<p style="margin-top:12px;"><strong>Pasal 3 — Nilai Kontrak</strong></p><p style="text-indent:40px;">Nilai kontrak disepakati sebesar <strong>Rp ${data.nilaiKontrak}</strong>.</p>` : ''}
                <p style="margin-top:12px;"><strong>Pasal ${data.nilaiKontrak ? '4' : '3'} — Penyelesaian Perselisihan</strong></p>
                <p style="text-indent:40px;">Segala perselisihan diselesaikan secara musyawarah mufakat. Apabila tidak tercapai, diselesaikan melalui jalur hukum.</p>
                <p style="text-indent:40px;margin-top:16px;">Demikian surat perjanjian ini dibuat rangkap 2 bermaterai cukup.</p>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:40px;">
                <div style="text-align:center;width:45%;"><p><strong>PIHAK PERTAMA</strong></p><br><br><br><p><strong><u>${data.wakilPihak1 || '...'}</u></strong></p></div>
                <div style="text-align:center;width:45%;"><p><strong>PIHAK KEDUA</strong></p><br><br><br><p><strong><u>${data.wakilPihak2 || '...'}</u></strong></p></div>
            </div>
        </div>`;
    }
};
