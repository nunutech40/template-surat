// ── Template: Surat Peringatan (SP) ───────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratPeringatan: TemplateConfig = {
    id: 'surat-peringatan',
    name: 'Surat Peringatan (SP)',
    category: 'resign',
    icon: '⚠️',
    description: 'Surat peringatan karyawan (SP1/SP2/SP3) dari perusahaan',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SP/HRD/III/2026' },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'tingkatSP', label: 'Tingkat SP', type: 'dropdown', required: true, options: ['Surat Peringatan Pertama (SP-1)', 'Surat Peringatan Kedua (SP-2)', 'Surat Peringatan Ketiga (SP-3)'] },
        { id: 'namaKaryawan', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikKaryawan', label: 'NIK Karyawan', type: 'text', required: false, placeholder: 'EMP-2024-001' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'divisi', label: 'Divisi', type: 'text', required: true, placeholder: 'Marketing' },
        { id: 'pelanggaran', label: 'Uraian Pelanggaran', type: 'textarea', required: true, placeholder: 'Tidak masuk kerja tanpa keterangan selama 3 hari berturut-turut pada tanggal...' },
        { id: 'dasarHukum', label: 'Dasar/Peraturan yang Dilanggar', type: 'text', required: false, placeholder: 'Pasal XX Peraturan Perusahaan' },
        { id: 'sanksi', label: 'Sanksi/Tindakan', type: 'textarea', required: true, placeholder: 'Pemotongan tunjangan transportasi selama 1 bulan' },
        { id: 'berlakuHingga', label: 'Berlaku Hingga', type: 'text', required: true, placeholder: '6 bulan sejak tanggal surat ini' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true, placeholder: 'Siti Aminah, S.E.' },
        { id: 'jabatanPenandatangan', label: 'Jabatan', type: 'text', required: true, placeholder: 'HRD Manager' },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">${data.tingkatSP || 'SURAT PERINGATAN'}</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini, ${data.jabatanPenandatangan || '...'} ${letterhead?.institutionName || '...'}, dengan ini memberikan <strong>${data.tingkatSP || 'Surat Peringatan'}</strong> kepada:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaKaryawan || '...'}</strong></td></tr>
                    ${data.nikKaryawan ? `<tr><td>NIK</td><td>: ${data.nikKaryawan}</td></tr>` : ''}
                    <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                    <tr><td>Divisi</td><td>: ${data.divisi || '...'}</td></tr>
                </table>
                <p style="margin-top:12px;"><strong>Uraian Pelanggaran:</strong></p>
                <p style="text-indent:40px;">${data.pelanggaran || '...'}</p>
                ${data.dasarHukum ? `<p style="margin-top:8px;"><strong>Dasar:</strong> ${data.dasarHukum}</p>` : ''}
                <p style="margin-top:12px;"><strong>Sanksi/Tindakan:</strong></p>
                <p style="text-indent:40px;">${data.sanksi || '...'}</p>
                <p style="margin-top:8px;">Surat peringatan ini berlaku selama <strong>${data.berlakuHingga || '...'}</strong>.</p>
                <p style="text-indent:40px;margin-top:12px;">Apabila yang bersangkutan mengulangi atau melakukan pelanggaran lain, maka perusahaan akan mengambil tindakan lebih tegas sesuai peraturan yang berlaku.</p>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:40px;">
                <div style="text-align:center;width:45%;">
                    <p><strong>Yang Menerima,</strong></p><br><br><br>
                    <p><strong><u>${data.namaKaryawan || '...'}</u></strong></p>
                </div>
                <div style="text-align:center;width:45%;">
                    <p>${data.jabatanPenandatangan || '...'}</p><br><br><br>
                    <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
                </div>
            </div>
        </div>`;
    }
};
