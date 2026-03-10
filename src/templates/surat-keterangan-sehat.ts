// ── Template: Surat Keterangan Sehat ──────────────────────────────────
import { TemplateConfig } from './types';

export const suratKeteranganSehat: TemplateConfig = {
    id: 'surat-keterangan-sehat',
    name: 'Surat Keterangan Sehat',
    category: 'keterangan',
    icon: '🏥',
    description: 'Surat keterangan sehat dari dokter/klinik untuk keperluan kerja atau pendidikan',
    needsLetterhead: false,
    fields: [
        { id: 'namaKlinik', label: 'Nama Klinik / RS', type: 'text', required: true, placeholder: 'Klinik Sehat Sentosa' },
        { id: 'alamatKlinik', label: 'Alamat Klinik', type: 'textarea', required: true, placeholder: 'Jl. Raya Kesehatan No. 5, Jakarta' },
        { id: 'telpKlinik', label: 'Telp Klinik', type: 'text', required: false, placeholder: '021-xxxxxxx' },
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKS/III/2026' },
        { id: 'namaDokter', label: 'Nama Dokter', type: 'text', required: true, placeholder: 'dr. Siti Aminah, Sp.PD' },
        { id: 'sipDokter', label: 'No. SIP', type: 'text', required: false, placeholder: '503/SIP/III/2026' },
        { id: 'namaPasien', label: 'Nama Pasien', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'umur', label: 'Umur', type: 'text', required: true, placeholder: '25 tahun' },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'alamat', label: 'Alamat Pasien', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5' },
        { id: 'tekananDarah', label: 'Tekanan Darah', type: 'text', required: false, placeholder: '120/80 mmHg' },
        { id: 'beratBadan', label: 'Berat Badan', type: 'text', required: false, placeholder: '65 kg' },
        { id: 'tinggiBadan', label: 'Tinggi Badan', type: 'text', required: false, placeholder: '170 cm' },
        { id: 'keterangan', label: 'Keterangan / Hasil Pemeriksaan', type: 'text', required: true, placeholder: 'Dalam keadaan sehat jasmani dan rohani', defaultValue: 'Dalam keadaan sehat jasmani dan rohani' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Melamar pekerjaan / masuk sekolah' },
        { id: 'tanggal', label: 'Tanggal Pemeriksaan', type: 'date', required: true },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:center;margin-bottom:8px;">
                    <p style="font-size:16px;font-weight:700;">${data.namaKlinik || '...'}</p>
                    <p style="font-size:12px;">${data.alamatKlinik || '...'}</p>
                    ${data.telpKlinik ? `<p style="font-size:12px;">Telp: ${data.telpKlinik}</p>` : ''}
                    <hr style="border:2px solid #333;margin-top:10px;">
                </div>
                <div style="text-align:center;margin:20px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN SEHAT</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama Dokter</td><td>: <strong>${data.namaDokter || '...'}</strong></td></tr>
                        ${data.sipDokter ? `<tr><td>No. SIP</td><td>: ${data.sipDokter}</td></tr>` : ''}
                    </table>
                    <p style="text-indent:40px;">Menerangkan bahwa setelah dilakukan pemeriksaan terhadap:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPasien || '...'}</strong></td></tr>
                        <tr><td>Umur</td><td>: ${data.umur || '...'}</td></tr>
                        <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                    </table>
                    ${(data.tekananDarah || data.beratBadan || data.tinggiBadan) ? `
                    <p style="text-indent:40px;margin-top:8px;">Hasil pemeriksaan fisik:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        ${data.tekananDarah ? `<tr><td style="width:160px;">Tekanan Darah</td><td>: ${data.tekananDarah}</td></tr>` : ''}
                        ${data.beratBadan ? `<tr><td>Berat Badan</td><td>: ${data.beratBadan}</td></tr>` : ''}
                        ${data.tinggiBadan ? `<tr><td>Tinggi Badan</td><td>: ${data.tinggiBadan}</td></tr>` : ''}
                    </table>` : ''}
                    <p style="text-indent:40px;margin-top:12px;">
                        Dinyatakan: <strong>${data.keterangan || 'Dalam keadaan sehat jasmani dan rohani'}</strong>.
                    </p>
                    <p style="text-indent:40px;margin-top:8px;">
                        Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>.
                    </p>
                </div>
                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${tanggal}</p>
                    <p>Dokter Pemeriksa,</p>
                    <br><br><br>
                    <p><strong><u>${data.namaDokter || '...'}</u></strong></p>
                    ${data.sipDokter ? `<p style="font-size:12px;">SIP: ${data.sipDokter}</p>` : ''}
                </div>
            </div>`;
    }
};
