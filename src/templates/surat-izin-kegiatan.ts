// ── Template: Surat Izin Kegiatan ─────────────────────────────────────
import { TemplateConfig } from './types';

export const suratIzinKegiatan: TemplateConfig = {
    id: 'surat-izin-kegiatan',
    name: 'Surat Izin Kegiatan',
    category: 'izin',
    icon: '🎪',
    description: 'Surat izin penyelenggaraan kegiatan ke RT/RW, kelurahan, atau kepolisian',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuan', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Ketua RT/RW / Lurah / Kapolsek' },
        { id: 'namaOrganisasi', label: 'Penyelenggara', type: 'text', required: true },
        { id: 'namaKegiatan', label: 'Nama Kegiatan', type: 'text', required: true, placeholder: '17 Agustusan / Pengajian' },
        { id: 'tanggalKegiatan', label: 'Tanggal Kegiatan', type: 'text', required: true },
        { id: 'waktuKegiatan', label: 'Waktu', type: 'text', required: true, placeholder: '08.00 - 17.00 WIB' },
        { id: 'tempatKegiatan', label: 'Tempat', type: 'text', required: true },
        { id: 'jumlahPeserta', label: 'Estimasi Peserta', type: 'text', required: false },
        { id: 'namaPenanggungJawab', label: 'Penanggung Jawab', type: 'text', required: true },
        { id: 'noHP', label: 'No. HP/WA', type: 'text', required: true },
    ],
    renderLayout(data) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page"><div class="letter-body" style="line-height:1.8;">
            <div style="text-align:right;margin-bottom:16px;"><p>${tgl}</p></div>
            <p>Hal: <strong>Permohonan Izin Kegiatan</strong></p>
            <p style="margin-top:16px;">Kepada Yth.<br><strong>${data.tujuan || '...'}</strong><br>di Tempat</p>
            <p style="margin-top:16px;">Dengan hormat,</p>
            <p style="text-indent:40px;">Kami dari <strong>${data.namaOrganisasi || '...'}</strong> mengajukan izin kegiatan:</p>
            <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                <tr><td style="width:130px;">Kegiatan</td><td>: <strong>${data.namaKegiatan || '...'}</strong></td></tr>
                <tr><td>Tanggal</td><td>: ${data.tanggalKegiatan || '...'}</td></tr>
                <tr><td>Waktu</td><td>: ${data.waktuKegiatan || '...'}</td></tr>
                <tr><td>Tempat</td><td>: ${data.tempatKegiatan || '...'}</td></tr>
                ${data.jumlahPeserta ? `<tr><td>Peserta</td><td>: ${data.jumlahPeserta}</td></tr>` : ''}
                <tr><td>PJ</td><td>: ${data.namaPenanggungJawab || '...'} (${data.noHP || '...'})</td></tr>
            </table>
            <p style="text-indent:40px;margin-top:12px;">Demikian permohonan ini kami sampaikan. Atas izinnya, kami ucapkan terima kasih.</p>
        </div>
        <div style="margin-top:40px;text-align:right;margin-right:30px;"><p>Hormat kami,</p><br><br><br><p><strong><u>${data.namaPenanggungJawab || '...'}</u></strong></p></div>
        </div>`;
    }
};
