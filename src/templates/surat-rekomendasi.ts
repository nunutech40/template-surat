// ── Template: Surat Rekomendasi ───────────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratRekomendasi: TemplateConfig = {
    id: 'surat-rekomendasi',
    name: 'Surat Rekomendasi',
    category: 'pengantar',
    icon: '⭐',
    description: 'Surat rekomendasi untuk kerja, beasiswa, atau studi lanjut',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: false, placeholder: '001/REK/III/2026' },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'namaYangDirekomendasikan', label: 'Nama yang Direkomendasikan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'hubungan', label: 'Hubungan', type: 'dropdown', required: true, options: ['Mantan Karyawan', 'Karyawan Aktif', 'Mahasiswa Bimbingan', 'Rekan Kerja', 'Murid'] },
        { id: 'periode', label: 'Periode Bersama', type: 'text', required: true, placeholder: 'Januari 2022 - Desember 2024' },
        { id: 'posisiLama', label: 'Posisi/Jabatan', type: 'text', required: true, placeholder: 'Software Engineer' },
        { id: 'kualitas', label: 'Kualitas & Kemampuan', type: 'textarea', required: true, placeholder: 'Memiliki dedikasi tinggi, mampu bekerja mandiri maupun tim...' },
        { id: 'pencapaian', label: 'Pencapaian (opsional)', type: 'textarea', required: false, placeholder: 'Berhasil memimpin proyek X yang menghasilkan...' },
        { id: 'tujuanRekomendasi', label: 'Tujuan Rekomendasi', type: 'text', required: true, placeholder: 'Melamar posisi Senior Engineer di PT ABC' },
        { id: 'namaPemberi', label: 'Nama Pemberi Rekomendasi', type: 'text', required: true, placeholder: 'Dr. Siti Aminah, M.Sc.' },
        { id: 'jabatanPemberi', label: 'Jabatan Pemberi', type: 'text', required: true, placeholder: 'Engineering Manager' },
        { id: 'kontakPemberi', label: 'Kontak Pemberi (HP/Email)', type: 'text', required: false, placeholder: '08xx / email@company.com' },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT REKOMENDASI</p>
                ${data.nomorSurat ? `<p style="font-size:12px;">Nomor: ${data.nomorSurat}</p>` : ''}
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaPemberi || '...'}</strong></td></tr>
                    <tr><td>Jabatan</td><td>: ${data.jabatanPemberi || '...'}</td></tr>
                    <tr><td>Instansi</td><td>: ${letterhead?.institutionName || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Dengan ini merekomendasikan:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaYangDirekomendasikan || '...'}</strong></td></tr>
                    <tr><td>Hubungan</td><td>: ${data.hubungan || '...'}</td></tr>
                    <tr><td>Posisi/Jabatan</td><td>: ${data.posisiLama || '...'}</td></tr>
                    <tr><td>Periode</td><td>: ${data.periode || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">${data.kualitas || '...'}</p>
                ${data.pencapaian ? `<p style="text-indent:40px;margin-top:8px;">${data.pencapaian}</p>` : ''}
                <p style="text-indent:40px;margin-top:12px;">Surat rekomendasi ini diberikan untuk keperluan <strong><em>${data.tujuanRekomendasi || '...'}</em></strong>. Saya sangat merekomendasikan yang bersangkutan dan yakin akan berkontribusi positif.</p>
                ${data.kontakPemberi ? `<p style="text-indent:40px;margin-top:8px;font-size:12px;">Untuk konfirmasi, saya dapat dihubungi melalui: ${data.kontakPemberi}</p>` : ''}
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${tanggal}</p>
                <p>${data.jabatanPemberi || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPemberi || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
