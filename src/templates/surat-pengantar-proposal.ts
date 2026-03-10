// ── Template: Surat Pengantar Proposal ────────────────────────────────
import { TemplateConfig } from './types';

export const suratPengantarProposal: TemplateConfig = {
    id: 'surat-pengantar-proposal',
    name: 'Surat Pengantar Proposal',
    category: 'pengantar',
    icon: '📎',
    description: 'Surat pengantar proposal kegiatan, sponsorship, atau kerjasama',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/BEM/III/2026' },
        { id: 'namaOrganisasi', label: 'Nama Organisasi / Lembaga', type: 'text', required: true, placeholder: 'BEM Universitas Indonesia' },
        { id: 'tujuanNama', label: 'Nama Tujuan', type: 'text', required: true, placeholder: 'Bapak/Ibu Pimpinan' },
        { id: 'tujuanInstansi', label: 'Instansi/Perusahaan Tujuan', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'tujuanAlamat', label: 'Alamat Tujuan', type: 'textarea', required: true, placeholder: 'Jl. Sudirman No.1, Jakarta' },
        { id: 'namaKegiatan', label: 'Nama Kegiatan', type: 'text', required: true, placeholder: 'Seminar Nasional Teknologi 2026' },
        { id: 'tanggalKegiatan', label: 'Tanggal Kegiatan', type: 'text', required: true, placeholder: '15-16 April 2026' },
        { id: 'tempatKegiatan', label: 'Tempat Kegiatan', type: 'text', required: true, placeholder: 'Aula Utama Universitas Indonesia' },
        { id: 'perihal', label: 'Perihal', type: 'text', required: true, placeholder: 'Permohonan Sponsorship / Kerjasama' },
        { id: 'namaKetua', label: 'Nama Ketua Panitia', type: 'text', required: true, placeholder: 'Ahmad Budi' },
        { id: 'namaCP', label: 'Contact Person', type: 'text', required: false, placeholder: 'Siti - 08xx-xxxx-xxxx' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:right;">${data.kota || '...'}, ${tanggal}</div>
                <div style="margin:12px 0;">
                    <table class="letter-data-table">
                        <tr><td style="width:80px;">Nomor</td><td>: ${data.nomorSurat || '...'}</td></tr>
                        <tr><td>Perihal</td><td>: <strong>${data.perihal || '...'}</strong></td></tr>
                        <tr><td>Lampiran</td><td>: 1 (satu) berkas</td></tr>
                    </table>
                </div>
                <div style="margin:20px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>${data.tujuanNama || '...'}</strong></p>
                    <p>${data.tujuanInstansi || '...'}</p>
                    <p>di ${data.tujuanAlamat || '...'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p>Dengan hormat,</p>
                    <p style="text-indent:40px;margin-top:12px;">
                        Kami dari <strong>${data.namaOrganisasi || '...'}</strong> akan menyelenggarakan kegiatan:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:120px;">Kegiatan</td><td>: <strong>${data.namaKegiatan || '...'}</strong></td></tr>
                        <tr><td>Tanggal</td><td>: ${data.tanggalKegiatan || '...'}</td></tr>
                        <tr><td>Tempat</td><td>: ${data.tempatKegiatan || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">
                        Sehubungan dengan hal tersebut, bersama surat ini kami sampaikan proposal kegiatan 
                        untuk bahan pertimbangan Bapak/Ibu. Besar harapan kami mendapat dukungan dan 
                        kerjasama dari ${data.tujuanInstansi || '...'}.
                    </p>
                    <p style="text-indent:40px;margin-top:8px;">
                        Demikian surat pengantar ini kami sampaikan. Atas perhatian dan kerjasama 
                        Bapak/Ibu, kami ucapkan terima kasih.
                    </p>
                    ${data.namaCP ? `<p style="margin-top:12px;font-size:13px;"><em>Contact Person: ${data.namaCP}</em></p>` : ''}
                </div>
                <div style="margin-top:40px;">
                    <p>Hormat kami,</p>
                    <p>${data.namaOrganisasi || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaKetua || '...'}</u></strong></p>
                    <p style="font-size:13px;">Ketua Panitia</p>
                </div>
            </div>`;
    }
};
