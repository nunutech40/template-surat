// ── Template: Surat Keterangan Kerja ──────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratKeteranganKerja: TemplateConfig = {
    id: 'surat-keterangan-kerja',
    name: 'Surat Keterangan Kerja',
    category: 'keterangan',
    icon: '🏢',
    description: 'Surat keterangan kerja dari perusahaan untuk karyawan aktif/pernah bekerja',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKK/HRD/III/2026' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaKaryawan', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikKaryawan', label: 'NIK/No. Karyawan', type: 'text', required: false, placeholder: 'EMP-2024-001' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Jakarta, 15 Mei 1990' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Senior Software Engineer' },
        { id: 'divisi', label: 'Divisi/Department', type: 'text', required: true, placeholder: 'Engineering' },
        { id: 'mulaiKerja', label: 'Tanggal Mulai Bekerja', type: 'text', required: true, placeholder: '1 Januari 2020' },
        { id: 'statusKaryawan', label: 'Status', type: 'dropdown', required: true, options: ['Karyawan Tetap', 'Karyawan Kontrak', 'Karyawan Percobaan'] },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Pengajuan KPR / Visa / dll' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true, placeholder: 'Siti Aminah, S.E.' },
        { id: 'jabatanPenandatangan', label: 'Jabatan Penandatangan', type: 'text', required: true, placeholder: 'HRD Manager' },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN KERJA</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini, ${data.jabatanPenandatangan || '...'} ${letterhead?.institutionName || '...'}, menerangkan bahwa:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaKaryawan || '...'}</strong></td></tr>
                    ${data.nikKaryawan ? `<tr><td>NIK</td><td>: ${data.nikKaryawan}</td></tr>` : ''}
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                    <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                    <tr><td>Divisi</td><td>: ${data.divisi || '...'}</td></tr>
                    <tr><td>Mulai Bekerja</td><td>: ${data.mulaiKerja || '...'}</td></tr>
                    <tr><td>Status</td><td>: ${data.statusKaryawan || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Adalah benar karyawan yang masih aktif bekerja di ${letterhead?.institutionName || '...'} hingga saat dikeluarkannya surat keterangan ini.</p>
                <p style="text-indent:40px;margin-top:8px;">Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong> dan dapat dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${tanggal}</p>
                <p>${data.jabatanPenandatangan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
