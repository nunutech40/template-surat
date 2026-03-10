// ── Template: Surat Lamaran Kerja ─────────────────────────────────────
import { TemplateConfig } from './types';

export const suratLamaran: TemplateConfig = {
    id: 'surat-lamaran',
    name: 'Surat Lamaran Kerja',
    category: 'lamaran',
    icon: '📝',
    description: 'Surat lamaran kerja formal untuk melamar posisi di perusahaan',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota Pengirim', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'perusahaan', label: 'Nama Perusahaan', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'alamatPerusahaan', label: 'Alamat Perusahaan', type: 'textarea', required: true, placeholder: 'Jl. Sudirman No.1, Jakarta' },
        { id: 'posisi', label: 'Posisi yang Dilamar', type: 'text', required: true, placeholder: 'Staff Administrasi' },
        { id: 'sumberInfo', label: 'Sumber Informasi Lowongan', type: 'text', required: false, placeholder: 'JobStreet / Koran Kompas / Website Perusahaan' },
        { id: 'nama', label: 'Nama Lengkap', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Jakarta, 1 Januari 2000' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5, Jakarta Selatan' },
        { id: 'noHp', label: 'No. HP', type: 'text', required: true, placeholder: '08xx-xxxx-xxxx' },
        { id: 'emailPelamar', label: 'Email', type: 'email', required: false, placeholder: 'budi@email.com' },
        { id: 'pendidikan', label: 'Pendidikan Terakhir', type: 'dropdown', required: true, options: ['SD', 'SMP', 'SMA/SMK', 'D1', 'D2', 'D3', 'D4/S1', 'S2', 'S3'] },
        { id: 'jurusan', label: 'Jurusan / Program Studi', type: 'text', required: false, placeholder: 'Manajemen' },
        { id: 'pengalaman', label: 'Ringkasan Pengalaman (opsional)', type: 'textarea', required: false, placeholder: '2 tahun pengalaman di bidang administrasi' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const sumber = data.sumberInfo ? ` melalui ${data.sumberInfo}` : '';

        return `
            <div class="letter-page">
                <div style="text-align:right;">
                    ${data.kota || '...'}, ${tanggal}
                </div>

                <div style="margin:24px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>HRD ${data.perusahaan || '...'}</strong></p>
                    <p>di ${data.alamatPerusahaan || '...'}</p>
                </div>

                <div class="letter-body" style="line-height:1.8;">
                    <p><strong>Perihal: Lamaran Pekerjaan</strong></p>

                    <p style="margin-top:16px;">Dengan hormat,</p>

                    <p style="text-indent:40px;margin-top:12px;">
                        Berdasarkan informasi lowongan pekerjaan yang saya peroleh${sumber},
                        dengan ini saya mengajukan lamaran untuk posisi
                        <strong>${data.posisi || '...'}</strong> di <strong>${data.perusahaan || '...'}</strong>.
                    </p>

                    <p style="text-indent:40px;margin-top:12px;">Berikut data diri saya:</p>

                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:180px;">Nama Lengkap</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                        <tr><td>Tempat, Tanggal Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                        <tr><td>No. HP</td><td>: ${data.noHp || '...'}</td></tr>
                        ${data.emailPelamar ? `<tr><td>Email</td><td>: ${data.emailPelamar}</td></tr>` : ''}
                        <tr><td>Pendidikan Terakhir</td><td>: ${data.pendidikan || '...'}${data.jurusan ? ` — ${data.jurusan}` : ''}</td></tr>
                    </table>

                    ${data.pengalaman ? `<p style="text-indent:40px;margin-top:12px;">Saya memiliki pengalaman: <em>${data.pengalaman}</em>.</p>` : ''}

                    <p style="text-indent:40px;margin-top:12px;">
                        Sebagai bahan pertimbangan, bersama surat ini saya lampirkan:
                    </p>
                    <ol style="margin:8px 0 8px 60px;">
                        <li>Curriculum Vitae (CV)</li>
                        <li>Fotokopi KTP</li>
                        <li>Fotokopi Ijazah Terakhir</li>
                        <li>Pas Foto Terbaru</li>
                    </ol>

                    <p style="text-indent:40px;margin-top:12px;">
                        Besar harapan saya untuk dapat bergabung dan berkontribusi di 
                        <strong>${data.perusahaan || '...'}</strong>.
                        Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.
                    </p>
                </div>

                <div style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <br><br><br>
                    <p><strong><u>${data.nama || '...'}</u></strong></p>
                </div>
            </div>
        `;
    }
};
