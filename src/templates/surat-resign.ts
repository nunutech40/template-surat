// ── Template: Surat Resign / Pengunduran Diri ─────────────────────────
import { TemplateConfig } from './types';

export const suratResign: TemplateConfig = {
    id: 'surat-resign',
    name: 'Surat Pengunduran Diri (Resign)',
    category: 'resign',
    icon: '💼',
    description: 'Surat resign profesional dan sopan untuk mengundurkan diri dari perusahaan',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaAtasan', label: 'Nama Atasan / HRD', type: 'text', required: true, placeholder: 'Bapak/Ibu HRD' },
        { id: 'perusahaan', label: 'Nama Perusahaan', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'alamatPerusahaan', label: 'Alamat Perusahaan', type: 'textarea', required: false, placeholder: 'Jl. Sudirman No.1, Jakarta' },
        { id: 'nama', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'jabatan', label: 'Jabatan / Posisi', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'departemen', label: 'Departemen', type: 'text', required: false, placeholder: 'Marketing' },
        { id: 'tanggalMasuk', label: 'Tanggal Mulai Bekerja', type: 'date', required: false },
        { id: 'tanggalEfektif', label: 'Tanggal Efektif Resign', type: 'date', required: true },
        { id: 'alasan', label: 'Alasan (opsional)', type: 'textarea', required: false, placeholder: 'Ingin mengejar peluang karir lain' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const tanggalEfektif = data.tanggalEfektif ? new Date(data.tanggalEfektif).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const tanggalMasuk = data.tanggalMasuk ? new Date(data.tanggalMasuk).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

        return `
            <div class="letter-page">
                <div style="text-align:right;">
                    ${data.kota || '...'}, ${tanggal}
                </div>

                <div style="margin:24px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>${data.namaAtasan || '...'}</strong></p>
                    <p>${data.perusahaan || '...'}</p>
                    ${data.alamatPerusahaan ? `<p>di ${data.alamatPerusahaan}</p>` : ''}
                </div>

                <div class="letter-body" style="line-height:1.8;">
                    <p><strong>Perihal: Pengunduran Diri</strong></p>

                    <p style="margin-top:16px;">Dengan hormat,</p>

                    <p style="text-indent:40px;margin-top:12px;">
                        Melalui surat ini, saya yang bertanda tangan di bawah ini:
                    </p>

                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:140px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                        <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                        ${data.departemen ? `<tr><td>Departemen</td><td>: ${data.departemen}</td></tr>` : ''}
                    </table>

                    <p style="text-indent:40px;margin-top:8px;">
                        Bermaksud untuk mengajukan pengunduran diri dari <strong>${data.perusahaan || '...'}</strong>,
                        terhitung efektif pada tanggal <strong><em>${tanggalEfektif}</em></strong>.
                    </p>

                    ${tanggalMasuk ? `
                    <p style="text-indent:40px;margin-top:8px;">
                        Saya telah bekerja di ${data.perusahaan || '...'} sejak ${tanggalMasuk}.
                    </p>
                    ` : ''}

                    ${data.alasan ? `
                    <p style="text-indent:40px;margin-top:8px;">
                        Adapun alasan pengunduran diri saya adalah: <em>${data.alasan}</em>.
                    </p>
                    ` : ''}

                    <p style="text-indent:40px;margin-top:12px;">
                        Saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan,
                        bimbingan, dan pengalaman yang telah saya peroleh selama bekerja
                        di <strong>${data.perusahaan || '...'}</strong>.
                    </p>

                    <p style="text-indent:40px;margin-top:8px;">
                        Saya berkomitmen untuk menyelesaikan seluruh tanggung jawab dan melakukan
                        proses serah terima pekerjaan hingga tanggal efektif pengunduran diri.
                    </p>

                    <p style="text-indent:40px;margin-top:8px;">
                        Demikian surat ini saya buat dengan penuh kesadaran dan tanpa paksaan 
                        dari pihak manapun. Atas perhatian dan pengertian Bapak/Ibu, 
                        saya ucapkan terima kasih.
                    </p>
                </div>

                <div style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <br><br><br>
                    <p><strong><u>${data.nama || '...'}</u></strong></p>
                    <p style="font-size:13px;">${data.jabatan || '...'}</p>
                </div>
            </div>
        `;
    }
};
