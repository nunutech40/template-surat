// ── Template: Surat Izin Orang Tua ────────────────────────────────────
import { TemplateConfig } from './types';

export const suratIzinOrangTua: TemplateConfig = {
    id: 'surat-izin-orangtua',
    name: 'Surat Izin Orang Tua',
    category: 'izin',
    icon: '👨‍👩‍👧',
    description: 'Surat izin orang tua untuk kegiatan anak — kemah, study tour, organisasi',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuan', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Panitia Kemah / Kepala Sekolah / ...' },
        { id: 'namaOrtu', label: 'Nama Orang Tua/Wali', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikOrtu', label: 'NIK Orang Tua', type: 'text', required: false, placeholder: '3201xxxxxxxxxx' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true },
        { id: 'namaAnak', label: 'Nama Anak', type: 'text', required: true, placeholder: 'Andi Santoso' },
        { id: 'kelas', label: 'Kelas/Tingkat (opsional)', type: 'text', required: false, placeholder: 'XII IPA 1' },
        { id: 'sekolah', label: 'Sekolah/Institusi', type: 'text', required: true, placeholder: 'SMA Negeri 1 Bandung' },
        { id: 'kegiatan', label: 'Nama Kegiatan', type: 'text', required: true, placeholder: 'Kemah Pramuka / Study Tour / LDK' },
        { id: 'tanggalKegiatan', label: 'Tanggal Kegiatan', type: 'text', required: true, placeholder: '15-17 Maret 2026' },
        { id: 'tempatKegiatan', label: 'Tempat Kegiatan', type: 'text', required: true, placeholder: 'Bumi Perkemahan Cibodas' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tanggal}</p></div>
                <p>Kepada Yth.<br><strong>${data.tujuan || '...'}</strong><br>di Tempat</p>
                <p style="margin-top:12px;">Hal: <strong>Surat Izin Orang Tua</strong></p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">Yang bertanda tangan di bawah ini:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaOrtu || '...'}</strong></td></tr>
                    ${data.nikOrtu ? `<tr><td>NIK</td><td>: ${data.nikOrtu}</td></tr>` : ''}
                    <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;">Adalah orang tua/wali dari:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaAnak || '...'}</strong></td></tr>
                    ${data.kelas ? `<tr><td>Kelas</td><td>: ${data.kelas}</td></tr>` : ''}
                    <tr><td>Sekolah</td><td>: ${data.sekolah || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:8px;">Dengan ini memberikan <strong>izin</strong> kepada anak saya untuk mengikuti kegiatan:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Kegiatan</td><td>: <strong>${data.kegiatan || '...'}</strong></td></tr>
                    <tr><td>Tanggal</td><td>: ${data.tanggalKegiatan || '...'}</td></tr>
                    <tr><td>Tempat</td><td>: ${data.tempatKegiatan || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat izin ini saya buat dengan sebenarnya. Saya mempercayakan keselamatan anak saya kepada panitia penyelenggara selama kegiatan berlangsung.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Orang Tua/Wali,</p><br><br><br>
                <p><strong><u>${data.namaOrtu || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
