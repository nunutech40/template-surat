// ── Template: Surat Permohonan Magang ─────────────────────────────────
import { TemplateConfig } from './types';

export const suratPermohonanMagang: TemplateConfig = {
    id: 'surat-permohonan-magang',
    name: 'Surat Permohonan Magang',
    category: 'permohonan',
    icon: '🎓',
    description: 'Surat permohonan magang dari mahasiswa ke perusahaan/instansi',
    needsLetterhead: false,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: false, placeholder: '001/MAG/III/2026' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Yth. (Nama)', type: 'text', required: true, placeholder: 'Bapak/Ibu HRD Manager' },
        { id: 'tujuanPerusahaan', label: 'Nama Perusahaan/Instansi', type: 'text', required: true, placeholder: 'PT Teknologi Maju' },
        { id: 'tujuanAlamat', label: 'Alamat Perusahaan', type: 'textarea', required: true },
        { id: 'asalKampus', label: 'Nama Universitas', type: 'text', required: true, placeholder: 'Universitas Indonesia' },
        { id: 'jurusan', label: 'Jurusan/Program Studi', type: 'text', required: true, placeholder: 'Teknik Informatika' },
        { id: 'nama', label: 'Nama Mahasiswa', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nim', label: 'NIM', type: 'text', required: true, placeholder: '2023010001' },
        { id: 'semester', label: 'Semester', type: 'text', required: true, placeholder: '6' },
        { id: 'periodeStart', label: 'Periode Magang (Mulai)', type: 'text', required: true, placeholder: 'Juli 2026' },
        { id: 'periodeEnd', label: 'Periode Magang (Selesai)', type: 'text', required: true, placeholder: 'September 2026' },
        { id: 'bidangMinat', label: 'Bidang Minat/Divisi', type: 'text', required: true, placeholder: 'Software Development' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tanggal}</p></div>
                ${data.nomorSurat ? `<p>Nomor: ${data.nomorSurat}</p>` : ''}
                <p>Hal: <strong>Permohonan Magang</strong></p>
                <p style="margin-top:16px;">Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>${data.tujuanPerusahaan || '...'}<br>${data.tujuanAlamat || '...'}</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">Sehubungan dengan program magang yang merupakan bagian dari kurikulum akademik, dengan ini kami dari <strong>${data.asalKampus || '...'}</strong>, Program Studi <strong>${data.jurusan || '...'}</strong>, mengajukan permohonan untuk melaksanakan kegiatan magang di perusahaan/instansi yang Bapak/Ibu pimpin.</p>
                <p style="text-indent:40px;margin-top:8px;">Adapun data mahasiswa yang akan melaksanakan magang sebagai berikut:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:160px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                    <tr><td>NIM</td><td>: ${data.nim || '...'}</td></tr>
                    <tr><td>Semester</td><td>: ${data.semester || '...'}</td></tr>
                    <tr><td>Jurusan</td><td>: ${data.jurusan || '...'}</td></tr>
                    <tr><td>Periode Magang</td><td>: ${data.periodeStart || '...'} s/d ${data.periodeEnd || '...'}</td></tr>
                    <tr><td>Bidang Minat</td><td>: ${data.bidangMinat || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:12px;">Besar harapan kami agar permohonan ini dapat dikabulkan. Atas perhatian dan kerjasama yang baik, kami mengucapkan terima kasih.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p><br><br><br>
                <p><strong><u>${data.nama || '...'}</u></strong></p>
                <p style="font-size:12px;">NIM. ${data.nim || '...'}</p>
            </div>
        </div>`;
    }
};
