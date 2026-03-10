// ── Template: Surat Keterangan Aktif Kuliah ───────────────────────────
import { TemplateConfig } from './types';

export const suratAktifKuliah: TemplateConfig = {
    id: 'surat-aktif-kuliah',
    name: 'Surat Keterangan Aktif Kuliah',
    category: 'keterangan',
    icon: '🎓',
    description: 'Surat keterangan aktif kuliah dari perguruan tinggi',
    needsLetterhead: false,
    fields: [
        { id: 'namaKampus', label: 'Nama Perguruan Tinggi', type: 'text', required: true, placeholder: 'Universitas Indonesia' },
        { id: 'fakultas', label: 'Fakultas', type: 'text', required: true, placeholder: 'Fakultas Teknik' },
        { id: 'alamatKampus', label: 'Alamat Kampus', type: 'textarea', required: true, placeholder: 'Jl. Margonda Raya, Depok' },
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/SKAK/FT/III/2026' },
        { id: 'namaDekan', label: 'Nama Dekan / Pejabat', type: 'text', required: true, placeholder: 'Prof. Dr. Ir. Ahmad, M.T.' },
        { id: 'nipDekan', label: 'NIP', type: 'text', required: false, placeholder: '19750101 200312 1 001' },
        { id: 'namaMahasiswa', label: 'Nama Mahasiswa', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nim', label: 'NIM', type: 'text', required: true, placeholder: '2106654321' },
        { id: 'prodi', label: 'Program Studi', type: 'text', required: true, placeholder: 'Teknik Informatika' },
        { id: 'semester', label: 'Semester', type: 'dropdown', required: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
        { id: 'tahunAkademik', label: 'Tahun Akademik', type: 'text', required: true, placeholder: '2025/2026' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Pengajuan beasiswa / keperluan administrasi' },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Depok' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:center;margin-bottom:8px;">
                    <p style="font-size:16px;font-weight:700;">${data.namaKampus || '...'}</p>
                    <p style="font-size:14px;font-weight:600;">${data.fakultas || '...'}</p>
                    <p style="font-size:12px;">${data.alamatKampus || '...'}</p>
                    <hr style="border:2px solid #333;margin-top:10px;">
                </div>
                <div style="text-align:center;margin:20px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT KETERANGAN AKTIF KULIAH</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini, Dekan ${data.fakultas || '...'} ${data.namaKampus || '...'}, menerangkan bahwa:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaMahasiswa || '...'}</strong></td></tr>
                        <tr><td>NIM</td><td>: ${data.nim || '...'}</td></tr>
                        <tr><td>Program Studi</td><td>: ${data.prodi || '...'}</td></tr>
                        <tr><td>Semester</td><td>: ${data.semester || '...'}</td></tr>
                        <tr><td>Tahun Akademik</td><td>: ${data.tahunAkademik || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">
                        Adalah benar mahasiswa aktif di ${data.fakultas || '...'}, ${data.namaKampus || '...'}, 
                        pada semester <strong>${data.semester || '...'}</strong> tahun akademik <strong>${data.tahunAkademik || '...'}</strong>.
                    </p>
                    <p style="text-indent:40px;margin-top:8px;">
                        Surat keterangan ini dibuat untuk keperluan <strong><em>${data.keperluan || '...'}</em></strong>
                        dan dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>
                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${data.kota || '...'}, ${tanggal}</p>
                    <p>Dekan ${data.fakultas || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaDekan || '...'}</u></strong></p>
                    ${data.nipDekan ? `<p style="font-size:12px;">NIP. ${data.nipDekan}</p>` : ''}
                </div>
            </div>`;
    }
};
