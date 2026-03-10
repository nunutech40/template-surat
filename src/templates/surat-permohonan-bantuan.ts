// ── Template: Surat Permohonan Bantuan Dana ───────────────────────────
import { TemplateConfig } from './types';

export const suratPermohonanBantuan: TemplateConfig = {
    id: 'surat-permohonan-bantuan',
    name: 'Surat Permohonan Bantuan Dana',
    category: 'permohonan',
    icon: '🙏',
    description: 'Surat permohonan bantuan dana untuk kegiatan sosial, pembangunan, atau pendidikan',
    needsLetterhead: false,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: false },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Bapak/Ibu Kepala Dinas / Donatur' },
        { id: 'tujuanInstansi', label: 'Instansi Tujuan', type: 'text', required: true, placeholder: 'Dinas Sosial Kota Bandung' },
        { id: 'namaOrganisasi', label: 'Nama Organisasi/Pemohon', type: 'text', required: true, placeholder: 'Yayasan Cinta Kasih / Nama Pribadi' },
        { id: 'alamat', label: 'Alamat Pemohon', type: 'textarea', required: true },
        { id: 'kegiatan', label: 'Kegiatan/Keperluan', type: 'textarea', required: true, placeholder: 'Pembangunan mushola / Kegiatan sosial / Biaya pengobatan' },
        { id: 'jumlahDana', label: 'Jumlah Dana (Rp)', type: 'text', required: false, placeholder: '5.000.000' },
        { id: 'rincianPenggunaan', label: 'Rincian Penggunaan', type: 'textarea', required: false, placeholder: '1. Material bangunan: Rp 3.000.000\n2. Upah tukang: Rp 2.000.000' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: false, placeholder: 'Ketua RT / Ketua Yayasan' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tanggal}</p></div>
                ${data.nomorSurat ? `<p>Nomor: ${data.nomorSurat}</p>` : ''}
                <p>Hal: <strong>Permohonan Bantuan Dana</strong></p>
                <p style="margin-top:16px;">Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>${data.tujuanInstansi || '...'}<br>di Tempat</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">Kami dari <strong>${data.namaOrganisasi || '...'}</strong> yang beralamat di ${data.alamat || '...'}, dengan ini mengajukan permohonan bantuan dana untuk keperluan:</p>
                <p style="text-indent:40px;margin-top:8px;"><strong>${data.kegiatan || '...'}</strong></p>
                ${data.jumlahDana ? `<p style="text-indent:40px;margin-top:8px;">Adapun dana yang kami butuhkan sebesar <strong>Rp ${data.jumlahDana}</strong>.</p>` : ''}
                ${data.rincianPenggunaan ? `<p style="margin-top:8px;"><strong>Rincian Penggunaan:</strong></p><p style="margin-left:40px;white-space:pre-line;">${data.rincianPenggunaan}</p>` : ''}
                <p style="text-indent:40px;margin-top:12px;">Besar harapan kami permohonan ini dapat dikabulkan. Atas perhatian dan bantuan Bapak/Ibu, kami mengucapkan terima kasih.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p>
                ${data.jabatan ? `<p>${data.jabatan}</p>` : ''}<br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
