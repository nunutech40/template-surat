// ── Template: Surat Dinas / Surat Tugas ───────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratTugas: TemplateConfig = {
    id: 'surat-tugas',
    name: 'Surat Tugas',
    category: 'bisnis',
    icon: '📌',
    description: 'Surat tugas dinas untuk karyawan atau pegawai',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/ST/HRD/III/2026' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaKaryawan', label: 'Nama yang Ditugaskan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikKaryawan', label: 'NIP/NIK', type: 'text', required: false, placeholder: 'EMP-2024-001' },
        { id: 'jabatan', label: 'Jabatan/Pangkat', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'tugasUntuk', label: 'Ditugaskan Untuk', type: 'textarea', required: true, placeholder: 'Menghadiri seminar nasional tentang...' },
        { id: 'tempatTugas', label: 'Tempat Tugas', type: 'text', required: true, placeholder: 'Jakarta Convention Center' },
        { id: 'mulaiTugas', label: 'Tanggal Mulai', type: 'date', required: true },
        { id: 'selesaiTugas', label: 'Tanggal Selesai', type: 'date', required: true },
        { id: 'biaya', label: 'Biaya Ditanggung Oleh', type: 'dropdown', required: true, options: ['Perusahaan/Instansi', 'Pribadi yang bersangkutan', 'APBD/APBN', 'Pihak Penyelenggara'] },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true, placeholder: 'Dr. Ahmad Yani, M.M.' },
        { id: 'jabatanPenandatangan', label: 'Jabatan Penandatangan', type: 'text', required: true, placeholder: 'Direktur / Kepala Bagian' },
    ],
    renderLayout(data, letterhead) {
        const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT TUGAS</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaPenandatangan || '...'}</strong></td></tr>
                    <tr><td>Jabatan</td><td>: ${data.jabatanPenandatangan || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;">Memberikan tugas kepada:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaKaryawan || '...'}</strong></td></tr>
                    ${data.nikKaryawan ? `<tr><td>NIP/NIK</td><td>: ${data.nikKaryawan}</td></tr>` : ''}
                    <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:8px;">Untuk melaksanakan tugas sebagai berikut:</p>
                <p style="margin-left:40px;margin-top:4px;"><strong>${data.tugasUntuk || '...'}</strong></p>
                <table class="letter-data-table" style="margin:12px 0 8px 40px;">
                    <tr><td style="width:140px;">Tempat</td><td>: ${data.tempatTugas || '...'}</td></tr>
                    <tr><td>Tanggal</td><td>: ${fmtDate(data.mulaiTugas)} s/d ${fmtDate(data.selesaiTugas)}</td></tr>
                    <tr><td>Biaya</td><td>: Ditanggung ${data.biaya || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat tugas ini diberikan untuk dilaksanakan dengan penuh tanggung jawab.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${fmtDate(data.tanggal)}</p>
                <p>${data.jabatanPenandatangan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
