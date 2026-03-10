// ── Template: Surat Keterangan Kelahiran ──────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratKeteranganLahir: TemplateConfig = {
    id: 'surat-keterangan-lahir',
    name: 'Surat Keterangan Kelahiran',
    category: 'keterangan',
    icon: '👶',
    description: 'Surat keterangan kelahiran bayi dari bidan/RS/kelurahan',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true },
        { id: 'namaBayi', label: 'Nama Bayi', type: 'text', required: true },
        { id: 'jenisKelaminBayi', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'tanggalLahir', label: 'Tanggal Lahir', type: 'date', required: true },
        { id: 'waktuLahir', label: 'Waktu Lahir', type: 'text', required: true, placeholder: '14.30 WIB' },
        { id: 'tempatLahir', label: 'Tempat Lahir', type: 'text', required: true, placeholder: 'RS/Bidan/Rumah' },
        { id: 'beratBadan', label: 'Berat Badan (gram)', type: 'text', required: true, placeholder: '3200' },
        { id: 'panjangBadan', label: 'Panjang Badan (cm)', type: 'text', required: true, placeholder: '50' },
        { id: 'anakKe', label: 'Anak ke-', type: 'text', required: true, placeholder: '1' },
        { id: 'namaAyah', label: 'Nama Ayah', type: 'text', required: true },
        { id: 'pekerjaanAyah', label: 'Pekerjaan Ayah', type: 'text', required: true },
        { id: 'namaIbu', label: 'Nama Ibu', type: 'text', required: true },
        { id: 'pekerjaanIbu', label: 'Pekerjaan Ibu', type: 'text', required: true },
        { id: 'alamatOrtu', label: 'Alamat Orang Tua', type: 'textarea', required: true },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true, placeholder: 'dr. Siti / Bidan Ani / Lurah' },
        { id: 'jabatanPenandatangan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Bidan / Dokter / Lurah' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN KELAHIRAN</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini menerangkan bahwa pada:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Hari/Tanggal</td><td>: ${fmtDate(data.tanggalLahir)}</td></tr>
                    <tr><td>Pukul</td><td>: ${data.waktuLahir || '...'}</td></tr>
                    <tr><td>Tempat</td><td>: ${data.tempatLahir || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;">Telah lahir seorang bayi:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaBayi || '...'}</strong></td></tr>
                    <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelaminBayi || '...'}</td></tr>
                    <tr><td>Berat Badan</td><td>: ${data.beratBadan || '...'} gram</td></tr>
                    <tr><td>Panjang Badan</td><td>: ${data.panjangBadan || '...'} cm</td></tr>
                    <tr><td>Anak Ke</td><td>: ${data.anakKe || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:8px;">Dari pasangan:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Ayah</td><td>: <strong>${data.namaAyah || '...'}</strong> (${data.pekerjaanAyah || '...'})</td></tr>
                    <tr><td>Ibu</td><td>: <strong>${data.namaIbu || '...'}</strong> (${data.pekerjaanIbu || '...'})</td></tr>
                    <tr><td>Alamat</td><td>: ${data.alamatOrtu || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat keterangan kelahiran ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${fmtDate(data.tanggal)}</p><p>${data.jabatanPenandatangan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
