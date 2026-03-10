// ── Template: Surat Keterangan Ahli Waris ─────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratAhliWaris: TemplateConfig = {
    id: 'surat-ahli-waris',
    name: 'Surat Keterangan Ahli Waris',
    category: 'keterangan',
    icon: '📜',
    description: 'Surat keterangan ahli waris untuk pengurusan warisan, balik nama, asuransi',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true },
        { id: 'namaAlmarhum', label: 'Nama Almarhum/ah', type: 'text', required: true },
        { id: 'nikAlmarhum', label: 'NIK Almarhum', type: 'text', required: true },
        { id: 'ttlAlmarhum', label: 'Tempat, Tgl Lahir Almarhum', type: 'text', required: true },
        { id: 'pekerjaanAlmarhum', label: 'Pekerjaan Terakhir', type: 'text', required: true },
        { id: 'alamatAlmarhum', label: 'Alamat Terakhir', type: 'textarea', required: true },
        { id: 'tanggalMeninggal', label: 'Tanggal Meninggal', type: 'date', required: true },
        { id: 'namaIstriSuami', label: 'Nama Istri/Suami (kosongkan jika tidak ada)', type: 'text', required: false },
        { id: 'statusPasangan', label: 'Status Pasangan', type: 'dropdown', required: false, options: ['Masih Hidup', 'Telah Meninggal Dunia'] },
        { id: 'daftarAhliWaris', label: 'Daftar Ahli Waris (1 per baris: Nama | Hubungan | TTL)', type: 'textarea', required: true, placeholder: 'Andi Santoso | Anak Kandung | Jakarta, 15 Mei 1990\nSiti Aminah | Anak Kandung | Jakarta, 20 Jan 1993' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Pengurusan harta warisan / Balik nama sertifikat' },
        { id: 'namaKepala', label: 'Nama Lurah/Kepala Desa', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, defaultValue: 'Lurah' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const ahliWarisList = (data.daftarAhliWaris || '').split('\n').filter((l: string) => l.trim());
        const ahliWarisRows = ahliWarisList.map((item: string, i: number) => {
            const parts = item.split('|').map((p: string) => p.trim());
            return `<tr><td style="text-align:center;">${i + 1}</td><td>${parts[0] || '-'}</td><td>${parts[1] || '-'}</td><td>${parts[2] || '-'}</td></tr>`;
        }).join('');
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN AHLI WARIS</p>
                <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini menerangkan bahwa:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaAlmarhum || '...'}</strong></td></tr>
                    <tr><td>NIK</td><td>: ${data.nikAlmarhum || '...'}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttlAlmarhum || '...'}</td></tr>
                    <tr><td>Pekerjaan Terakhir</td><td>: ${data.pekerjaanAlmarhum || '...'}</td></tr>
                    <tr><td>Alamat Terakhir</td><td>: ${data.alamatAlmarhum || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;">Telah <strong>meninggal dunia</strong> pada tanggal ${fmtDate(data.tanggalMeninggal)}.</p>
                ${data.namaIstriSuami ? `<p style="text-indent:40px;margin-top:8px;">Semasa hidupnya, almarhum/almarhumah menikah dengan <strong>${data.namaIstriSuami}</strong> (${data.statusPasangan || '...'}).</p>` : ''}
                <p style="text-indent:40px;margin-top:8px;">Adapun ahli waris yang sah adalah sebagai berikut:</p>
                <table style="width:100%;border-collapse:collapse;margin:12px 0;" border="1" cellpadding="6">
                    <thead><tr style="background:#f1f5f9;"><th>No</th><th>Nama</th><th>Hubungan</th><th>Tempat, Tgl Lahir</th></tr></thead>
                    <tbody>${ahliWarisRows || '<tr><td colspan="4" style="text-align:center;">-</td></tr>'}</tbody>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>.</p>
                <p style="text-indent:40px;margin-top:8px;">Demikian surat keterangan ahli waris ini dibuat dengan sebenarnya. Apabila di kemudian hari terdapat ahli waris lain yang tidak tercantum, maka ahli waris yang tercantum bersedia bertanggung jawab sepenuhnya.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${letterhead?.institutionName || '...'}, ${fmtDate(data.tanggal)}</p>
                <p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaKepala || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
