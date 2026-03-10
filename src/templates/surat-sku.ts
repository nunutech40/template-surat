// ── Template: Surat Keterangan Usaha (SKU) ───────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratSKU: TemplateConfig = {
    id: 'surat-sku',
    name: 'Surat Keterangan Usaha (SKU)',
    category: 'keterangan',
    icon: '🏪',
    description: 'SKU untuk keperluan pinjaman bank, perizinan, atau tender',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKU/III/2026' },
        { id: 'namaKepala', label: 'Nama Kepala Desa/Lurah', type: 'text', required: true, placeholder: 'H. Ahmad, S.Sos' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, defaultValue: 'Lurah' },
        { id: 'namaWarga', label: 'Nama Pemilik Usaha', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Bandung, 15 Mei 1990' },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, placeholder: 'Wiraswasta' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5' },
        { id: 'namaUsaha', label: 'Nama Usaha', type: 'text', required: true, placeholder: 'Toko Makmur Jaya' },
        { id: 'jenisUsaha', label: 'Jenis Usaha', type: 'text', required: true, placeholder: 'Perdagangan Sembako' },
        { id: 'alamatUsaha', label: 'Alamat Usaha', type: 'textarea', required: true, placeholder: 'Jl. Raya Pasar No. 10' },
        { id: 'sejakTahun', label: 'Beroperasi Sejak Tahun', type: 'text', required: true, placeholder: '2020' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Pengajuan pinjaman / perizinan' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                ${renderKop(letterhead)}
                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN USAHA</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini, ${data.jabatan || '...'} ${letterhead?.institutionName || '...'}, menerangkan bahwa:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaWarga || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                        <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                        <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                        <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                        <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;">Benar yang bersangkutan memiliki usaha dengan rincian sebagai berikut:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama Usaha</td><td>: <strong>${data.namaUsaha || '...'}</strong></td></tr>
                        <tr><td>Jenis Usaha</td><td>: ${data.jenisUsaha || '...'}</td></tr>
                        <tr><td>Alamat Usaha</td><td>: ${data.alamatUsaha || '...'}</td></tr>
                        <tr><td>Beroperasi Sejak</td><td>: Tahun ${data.sejakTahun || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">
                        Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>
                        dan dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>
                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${letterhead?.institutionName || '...'}, ${tanggal}</p>
                    <p>${data.jabatan || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
                </div>
            </div>`;
    }
};
