// ── Template: Surat Keterangan Penghasilan ────────────────────────────
import { TemplateConfig } from './types';

export const suratKeteranganPenghasilan: TemplateConfig = {
    id: 'surat-keterangan-penghasilan',
    name: 'Surat Keterangan Penghasilan',
    category: 'keterangan',
    icon: '💰',
    description: 'Surat keterangan penghasilan untuk KPR, kredit, atau beasiswa',
    needsLetterhead: false,
    fields: [
        { id: 'namaPerusahaan', label: 'Nama Perusahaan/Instansi', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'alamatPerusahaan', label: 'Alamat Perusahaan', type: 'textarea', required: true, placeholder: 'Jl. Sudirman No.1, Jakarta' },
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/HR/III/2026' },
        { id: 'namaPimpinan', label: 'Nama Pimpinan / HRD', type: 'text', required: true, placeholder: 'Ir. Agus Salim' },
        { id: 'jabatanPimpinan', label: 'Jabatan Pimpinan', type: 'text', required: true, placeholder: 'Direktur / HRD Manager' },
        { id: 'namaKaryawan', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK / No. KTP', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'jabatan', label: 'Jabatan Karyawan', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'mulaiKerja', label: 'Tanggal Mulai Bekerja', type: 'date', required: true },
        { id: 'gajiPokok', label: 'Gaji Pokok (Rp)', type: 'text', required: true, placeholder: '5.000.000' },
        { id: 'tunjangan', label: 'Tunjangan Tetap (Rp)', type: 'text', required: false, placeholder: '1.500.000' },
        { id: 'totalPenghasilan', label: 'Total Penghasilan/bulan (Rp)', type: 'text', required: true, placeholder: '6.500.000' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Pengajuan KPR / Kredit' },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const mulaiKerja = data.mulaiKerja ? new Date(data.mulaiKerja).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:center;margin-bottom:8px;">
                    <p style="font-size:16px;font-weight:700;">${data.namaPerusahaan || '...'}</p>
                    <p style="font-size:12px;">${data.alamatPerusahaan || '...'}</p>
                    <hr style="border:2px solid #333;margin-top:10px;">
                </div>
                <div style="text-align:center;margin:20px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN PENGHASILAN</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPimpinan || '...'}</strong></td></tr>
                        <tr><td>Jabatan</td><td>: ${data.jabatanPimpinan || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;">Dengan ini menerangkan bahwa karyawan kami:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaKaryawan || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                        <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                        <tr><td>Mulai Bekerja</td><td>: ${mulaiKerja}</td></tr>
                    </table>
                    <p style="text-indent:40px;">Memiliki penghasilan sebagai berikut:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Gaji Pokok</td><td>: Rp ${data.gajiPokok || '...'}</td></tr>
                        ${data.tunjangan ? `<tr><td>Tunjangan Tetap</td><td>: Rp ${data.tunjangan}</td></tr>` : ''}
                        <tr><td><strong>Total Penghasilan</strong></td><td>: <strong>Rp ${data.totalPenghasilan || '...'}</strong> /bulan</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">
                        Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>
                        dan dibuat dengan sebenar-benarnya.
                    </p>
                </div>
                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${data.kota || '...'}, ${tanggal}</p>
                    <p>${data.jabatanPimpinan || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaPimpinan || '...'}</u></strong></p>
                </div>
            </div>`;
    }
};
