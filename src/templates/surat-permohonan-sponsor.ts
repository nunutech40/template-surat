// ── Template: Surat Permohonan Sponsor ────────────────────────────────
import { TemplateConfig } from './types';

export const suratPermohonanSponsor: TemplateConfig = {
    id: 'surat-permohonan-sponsor',
    name: 'Surat Permohonan Sponsor',
    category: 'permohonan',
    icon: '🏆',
    description: 'Surat permohonan sponsorship untuk kegiatan, event, atau lomba',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Yth.', type: 'text', required: true },
        { id: 'tujuanPerusahaan', label: 'Perusahaan/Instansi', type: 'text', required: true },
        { id: 'namaOrganisasi', label: 'Nama Organisasi Penyelenggara', type: 'text', required: true },
        { id: 'namaKegiatan', label: 'Nama Kegiatan', type: 'text', required: true },
        { id: 'tanggalKegiatan', label: 'Tanggal Kegiatan', type: 'text', required: true },
        { id: 'tempatKegiatan', label: 'Tempat', type: 'text', required: true },
        { id: 'targetPeserta', label: 'Target Peserta', type: 'text', required: false, placeholder: '± 500 orang' },
        { id: 'bentukSponsor', label: 'Bentuk Sponsorship', type: 'textarea', required: true, placeholder: 'Dana / Produk / Media Promosi' },
        { id: 'benefit', label: 'Benefit untuk Sponsor', type: 'textarea', required: true, placeholder: 'Logo di banner, booth, MC mention' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Ketua Panitia' },
        { id: 'noHP', label: 'No. HP/WA', type: 'text', required: true },
    ],
    renderLayout(data) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page"><div class="letter-body" style="line-height:1.8;">
            <div style="text-align:right;margin-bottom:16px;"><p>${tgl}</p></div>
            <p>Hal: <strong>Permohonan Sponsorship</strong></p>
            <p style="margin-top:16px;">Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>${data.tujuanPerusahaan || '...'}<br>di Tempat</p>
            <p style="margin-top:16px;">Dengan hormat,</p>
            <p style="text-indent:40px;">Kami dari <strong>${data.namaOrganisasi || '...'}</strong> akan menyelenggarakan:</p>
            <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                <tr><td style="width:120px;">Kegiatan</td><td>: <strong>${data.namaKegiatan || '...'}</strong></td></tr>
                <tr><td>Tanggal</td><td>: ${data.tanggalKegiatan || '...'}</td></tr>
                <tr><td>Tempat</td><td>: ${data.tempatKegiatan || '...'}</td></tr>
                ${data.targetPeserta ? `<tr><td>Peserta</td><td>: ${data.targetPeserta}</td></tr>` : ''}
            </table>
            <p style="text-indent:40px;margin-top:8px;">Sehubungan hal tersebut, kami mengajukan permohonan sponsorship berupa:</p>
            <p style="margin-left:40px;">${data.bentukSponsor || '...'}</p>
            <p style="margin-top:8px;"><strong>Benefit untuk Sponsor:</strong></p>
            <p style="margin-left:40px;">${data.benefit || '...'}</p>
            <p style="text-indent:40px;margin-top:12px;">Besar harapan kami agar permohonan ini dapat dikabulkan. Atas perhatiannya, kami ucapkan terima kasih.</p>
        </div>
        <div style="margin-top:40px;text-align:right;margin-right:30px;">
            <p>Hormat kami,</p><p>${data.jabatan || '...'}</p><br><br><br>
            <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            <p style="font-size:12px;">HP: ${data.noHP || '...'}</p>
        </div></div>`;
    }
};
