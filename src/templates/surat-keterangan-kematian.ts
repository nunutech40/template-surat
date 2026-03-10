// ── Template: Surat Keterangan Kematian ───────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratKeteranganKematian: TemplateConfig = {
    id: 'surat-keterangan-kematian',
    name: 'Surat Keterangan Kematian',
    category: 'keterangan',
    icon: '🕊️',
    description: 'Surat keterangan kematian dari kelurahan/desa untuk administrasi',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true },
        { id: 'namaKepala', label: 'Nama Lurah/Kepala Desa', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, defaultValue: 'Lurah' },
        { id: 'namaAlmarhum', label: 'Nama Almarhum/Almarhumah', type: 'text', required: true },
        { id: 'nik', label: 'NIK', type: 'text', required: true },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'alamatTerakhir', label: 'Alamat Terakhir', type: 'textarea', required: true },
        { id: 'tanggalMeninggal', label: 'Tanggal Meninggal', type: 'date', required: true },
        { id: 'tempatMeninggal', label: 'Tempat Meninggal', type: 'text', required: true, placeholder: 'RSUD / Rumah / ...' },
        { id: 'sebabKematian', label: 'Sebab Kematian', type: 'dropdown', required: true, options: ['Sakit', 'Kecelakaan', 'Lainnya'] },
        { id: 'namaPelapor', label: 'Nama Pelapor', type: 'text', required: true },
        { id: 'hubunganPelapor', label: 'Hubungan Pelapor', type: 'text', required: true, placeholder: 'Anak / Istri / Suami / ...' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN KEMATIAN</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaAlmarhum || '...'}</strong></td></tr>
                    <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                    <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                    <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                    <tr><td>Alamat Terakhir</td><td>: ${data.alamatTerakhir || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Telah <strong>meninggal dunia</strong> pada:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Tanggal Meninggal</td><td>: ${fmtDate(data.tanggalMeninggal)}</td></tr>
                    <tr><td>Tempat</td><td>: ${data.tempatMeninggal || '...'}</td></tr>
                    <tr><td>Sebab Kematian</td><td>: ${data.sebabKematian || '...'}</td></tr>
                </table>
                <p style="margin-top:12px;"><strong>Dilaporkan oleh:</strong></p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: ${data.namaPelapor || '...'}</td></tr>
                    <tr><td>Hubungan</td><td>: ${data.hubunganPelapor || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat keterangan kematian ini dibuat untuk dapat dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${letterhead?.institutionName || '...'}, ${fmtDate(data.tanggal)}</p><p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
