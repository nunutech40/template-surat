// ── Template: Surat Izin Tidak Masuk Sekolah ──────────────────────────
import { TemplateConfig } from './types';

export const suratIzinSekolah: TemplateConfig = {
    id: 'surat-izin-sekolah',
    name: 'Surat Izin Tidak Masuk Sekolah',
    category: 'izin',
    icon: '🏫',
    description: 'Surat izin dari orang tua/wali untuk siswa yang tidak masuk sekolah',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaSekolah', label: 'Nama Sekolah', type: 'text', required: true, placeholder: 'SMA Negeri 1 Jakarta' },
        { id: 'namaGuru', label: 'Nama Wali Kelas / Kepala Sekolah', type: 'text', required: true, placeholder: 'Bapak/Ibu Guru Wali Kelas' },
        { id: 'namaOrtu', label: 'Nama Orang Tua/Wali', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'namaSiswa', label: 'Nama Siswa', type: 'text', required: true, placeholder: 'Ahmad Budi' },
        { id: 'kelas', label: 'Kelas', type: 'text', required: true, placeholder: 'XII IPA 1' },
        { id: 'alasan', label: 'Alasan', type: 'dropdown', required: true, options: ['Sakit', 'Urusan Keluarga', 'Kegiatan Luar Sekolah', 'Lainnya'] },
        { id: 'alasanDetail', label: 'Detail Alasan (opsional)', type: 'textarea', required: false, placeholder: 'Demam dan batuk, perlu istirahat' },
        { id: 'tanggalMulai', label: 'Tanggal Mulai Izin', type: 'date', required: true },
        { id: 'tanggalSelesai', label: 'Tanggal Selesai Izin', type: 'date', required: true },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const mulai = data.tanggalMulai ? new Date(data.tanggalMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const selesai = data.tanggalSelesai ? new Date(data.tanggalSelesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:right;">${data.kota || '...'}, ${tanggal}</div>
                <div style="margin:24px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>${data.namaGuru || '...'}</strong></p>
                    <p>${data.namaSekolah || '...'}</p>
                    <p>di tempat</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p><strong>Perihal: Izin Tidak Masuk Sekolah</strong></p>
                    <p style="margin-top:16px;">Dengan hormat,</p>
                    <p style="text-indent:40px;margin-top:12px;">
                        Saya yang bertanda tangan di bawah ini:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama Orang Tua/Wali</td><td>: <strong>${data.namaOrtu || '...'}</strong></td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:8px;">
                        Memberitahukan bahwa anak saya:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama Siswa</td><td>: <strong>${data.namaSiswa || '...'}</strong></td></tr>
                        <tr><td>Kelas</td><td>: ${data.kelas || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:8px;">
                        Tidak dapat mengikuti kegiatan belajar mengajar pada tanggal 
                        <strong>${mulai}</strong> sampai dengan <strong>${selesai}</strong>,
                        dikarenakan <strong>${data.alasan || '...'}</strong>.
                    </p>
                    ${data.alasanDetail ? `<p style="text-indent:40px;margin-top:8px;">Keterangan: <em>${data.alasanDetail}</em></p>` : ''}
                    <p style="text-indent:40px;margin-top:12px;">
                        Demikian surat izin ini saya buat. Atas perhatian Bapak/Ibu Guru, saya ucapkan terima kasih.
                    </p>
                </div>
                <div style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <p>Orang Tua/Wali Siswa</p>
                    <br><br><br>
                    <p><strong><u>${data.namaOrtu || '...'}</u></strong></p>
                </div>
            </div>`;
    }
};
