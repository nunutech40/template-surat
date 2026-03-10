// ── Template: Surat Pernyataan ────────────────────────────────────────
import { TemplateConfig } from './types';

export const suratPernyataan: TemplateConfig = {
    id: 'surat-pernyataan',
    name: 'Surat Pernyataan',
    category: 'bisnis',
    icon: '📋',
    description: 'Surat pernyataan umum bermaterai untuk berbagai keperluan',
    needsLetterhead: false,
    fields: [
        { id: 'judul', label: 'Judul Pernyataan', type: 'text', required: true, placeholder: 'SURAT PERNYATAAN', defaultValue: 'SURAT PERNYATAAN' },
        { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Bandung, 15 Mei 1990' },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, placeholder: 'Karyawan Swasta' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5, RT 03/RW 02' },
        { id: 'isiPernyataan', label: 'Isi Pernyataan', type: 'textarea', required: true, placeholder: 'Menyatakan dengan sesungguhnya bahwa...' },
        { id: 'konsekuensi', label: 'Konsekuensi (opsional)', type: 'textarea', required: false, placeholder: 'Apabila dikemudian hari pernyataan ini tidak benar...' },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Bandung' },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div style="text-align:center;margin:24px 0;"><p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">${data.judul || 'SURAT PERNYATAAN'}</p></div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                    <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                    <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                    <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                    <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Dengan ini menyatakan dengan sesungguhnya bahwa:</p>
                <p style="text-indent:40px;margin-top:8px;">${data.isiPernyataan || '...'}</p>
                ${data.konsekuensi ? `<p style="text-indent:40px;margin-top:12px;">${data.konsekuensi}</p>` : '<p style="text-indent:40px;margin-top:12px;">Apabila di kemudian hari pernyataan ini terbukti tidak benar, saya bersedia menerima segala konsekuensi hukum yang berlaku.</p>'}
                <p style="text-indent:40px;margin-top:12px;">Demikian surat pernyataan ini saya buat dengan sebenar-benarnya dalam keadaan sadar, tanpa ada paksaan dari pihak manapun.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>${data.kota || '...'}, ${tanggal}</p>
                <p>Yang menyatakan,</p>
                <p style="margin-top:8px;font-size:11px;color:#666;">Materai Rp 10.000</p>
                <br><br>
                <p><strong><u>${data.nama || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
