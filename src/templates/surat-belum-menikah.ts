// ── Template: Surat Keterangan Belum Menikah ──────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratBelumMenikah: TemplateConfig = {
    id: 'surat-belum-menikah',
    name: 'Surat Keterangan Belum Menikah',
    category: 'keterangan',
    icon: '💍',
    description: 'Surat keterangan belum menikah dari kelurahan untuk berbagai keperluan',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKBM/III/2026' },
        { id: 'namaKepala', label: 'Nama Lurah/Kepala Desa', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, defaultValue: 'Lurah' },
        { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true },
        { id: 'nik', label: 'NIK', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Bandung, 15 Mei 1995' },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Melamar pekerjaan / Pendaftaran CPNS' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN BELUM MENIKAH</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini, ${data.jabatan || '...'} ${letterhead?.institutionName || '...'}, menerangkan bahwa:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                    <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                    <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                    <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                    <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                    <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Berdasarkan data yang ada, yang bersangkutan <strong>belum pernah melangsungkan pernikahan</strong> dan berstatus <strong>belum menikah</strong> sampai saat surat keterangan ini diterbitkan.</p>
                <p style="text-indent:40px;margin-top:8px;">Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong> dan dapat dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${letterhead?.institutionName || '...'}, ${tanggal}</p><p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
