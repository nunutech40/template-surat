// ── Template: Surat Keterangan Pindah ─────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratKeteranganPindah: TemplateConfig = {
    id: 'surat-keterangan-pindah',
    name: 'Surat Keterangan Pindah',
    category: 'keterangan',
    icon: '🏡',
    description: 'Surat keterangan pindah domisili dari kelurahan/desa',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true },
        { id: 'namaKepala', label: 'Nama Lurah/Kepala Desa', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, defaultValue: 'Lurah' },
        { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
        { id: 'nik', label: 'NIK', type: 'text', required: true },
        { id: 'noKK', label: 'No. KK', type: 'text', required: true },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true },
        { id: 'alamatAsal', label: 'Alamat Asal', type: 'textarea', required: true },
        { id: 'alamatTujuan', label: 'Alamat Tujuan', type: 'textarea', required: true },
        { id: 'alasanPindah', label: 'Alasan Pindah', type: 'dropdown', required: true, options: ['Pekerjaan', 'Pendidikan', 'Keamanan', 'Kesehatan', 'Perumahan', 'Keluarga', 'Lainnya'] },
        { id: 'jumlahPengikut', label: 'Jumlah Pengikut (jiwa)', type: 'text', required: false, placeholder: '3' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN PINDAH</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                    <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                    <tr><td>No. KK</td><td>: ${data.noKK || '...'}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                    <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                    <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                    <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                    <tr><td>Alamat Asal</td><td>: ${data.alamatAsal || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Akan pindah ke alamat baru:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Alamat Tujuan</td><td>: ${data.alamatTujuan || '...'}</td></tr>
                    <tr><td>Alasan Pindah</td><td>: ${data.alasanPindah || '...'}</td></tr>
                    ${data.jumlahPengikut ? `<tr><td>Jumlah Pengikut</td><td>: ${data.jumlahPengikut} jiwa</td></tr>` : ''}
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat keterangan pindah ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${letterhead?.institutionName || '...'}, ${tanggal}</p><p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
