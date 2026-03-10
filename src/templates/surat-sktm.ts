// ── Template: Surat Keterangan Tidak Mampu (SKTM) ────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `
        <div class="letter-kop">
            <div class="kop-content">
                ${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}
                <div class="kop-text">
                    <h2>${lh.institutionName}</h2>
                    <p>${lh.address}</p>
                    ${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}
                    ${lh.email ? `<p>Email: ${lh.email}</p>` : ''}
                </div>
            </div>
            <hr class="kop-line">
        </div>`;
}

export const suratSKTM: TemplateConfig = {
    id: 'surat-sktm',
    name: 'Surat Keterangan Tidak Mampu (SKTM)',
    category: 'keterangan',
    icon: '🏠',
    description: 'SKTM untuk keperluan beasiswa, bantuan sosial, atau keringanan biaya',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKTM/III/2026' },
        { id: 'namaKepala', label: 'Nama Kepala Desa/Lurah', type: 'text', required: true, placeholder: 'H. Ahmad, S.Sos' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Lurah Sukamaju', defaultValue: 'Lurah' },
        { id: 'nip', label: 'NIP (opsional)', type: 'text', required: false, placeholder: '19750101 200312 1 001' },
        { id: 'namaWarga', label: 'Nama Warga', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Bandung, 15 Mei 1990' },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, placeholder: 'Buruh Harian Lepas' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5, RT 03/RW 02' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Mengajukan beasiswa / keringanan biaya pendidikan' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                ${renderKop(letterhead)}
                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN TIDAK MAMPU</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaKepala || '...'}</strong></td></tr>
                        <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;">Dengan ini menerangkan bahwa:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaWarga || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                        <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                        <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                        <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                        <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">
                        Adalah benar penduduk kami yang berdomisili di alamat tersebut di atas dan termasuk 
                        keluarga <strong>kurang mampu / tidak mampu</strong>.
                    </p>
                    <p style="text-indent:40px;margin-top:8px;">
                        Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>
                        dan dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>
                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${letterhead?.institutionName || '...'}, ${tanggal}</p>
                    <p>${data.jabatan || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
                    ${data.nip ? `<p style="font-size:12px;">NIP. ${data.nip}</p>` : ''}
                </div>
            </div>`;
    }
};
