// ── Template: Surat Izin Tidak Masuk Kerja ────────────────────────────
import { TemplateConfig } from './types';

export const suratIzinKerja: TemplateConfig = {
    id: 'surat-izin-kerja',
    name: 'Surat Izin Tidak Masuk Kerja',
    category: 'izin',
    icon: '🏢',
    description: 'Surat izin tidak masuk kerja karena sakit, urusan keluarga, atau keperluan lain',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaAtasan', label: 'Nama Atasan / HRD', type: 'text', required: true, placeholder: 'Bapak/Ibu HRD' },
        { id: 'perusahaan', label: 'Nama Perusahaan', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'nama', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'departemen', label: 'Departemen', type: 'text', required: false, placeholder: 'Marketing' },
        { id: 'alasan', label: 'Alasan Izin', type: 'dropdown', required: true, options: ['Sakit', 'Urusan Keluarga', 'Keperluan Pribadi', 'Kedukaan', 'Pernikahan', 'Lainnya'] },
        { id: 'alasanDetail', label: 'Detail Alasan (opsional)', type: 'textarea', required: false, placeholder: 'Demam tinggi dan perlu istirahat' },
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
                    <p><strong>${data.namaAtasan || '...'}</strong></p>
                    <p>${data.perusahaan || '...'}</p>
                    <p>di tempat</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p><strong>Perihal: Izin Tidak Masuk Kerja</strong></p>
                    <p style="margin-top:16px;">Dengan hormat,</p>
                    <p style="text-indent:40px;margin-top:12px;">
                        Saya yang bertanda tangan di bawah ini:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:140px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                        <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                        ${data.departemen ? `<tr><td>Departemen</td><td>: ${data.departemen}</td></tr>` : ''}
                    </table>
                    <p style="text-indent:40px;margin-top:8px;">
                        Bermaksud untuk mengajukan izin tidak masuk kerja pada:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:140px;">Tanggal</td><td>: ${mulai} s/d ${selesai}</td></tr>
                        <tr><td>Alasan</td><td>: <strong>${data.alasan || '...'}</strong></td></tr>
                    </table>
                    ${data.alasanDetail ? `<p style="text-indent:40px;margin-top:8px;">Keterangan: <em>${data.alasanDetail}</em></p>` : ''}
                    <p style="text-indent:40px;margin-top:12px;">
                        Demikian surat izin ini saya buat dengan sebenar-benarnya. 
                        Atas perhatian dan pengertian Bapak/Ibu, saya ucapkan terima kasih.
                    </p>
                </div>
                <div style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <br><br><br>
                    <p><strong><u>${data.nama || '...'}</u></strong></p>
                    <p style="font-size:13px;">${data.jabatan || '...'}</p>
                </div>
            </div>`;
    }
};
