// ── Template: Surat Permohonan Cuti ───────────────────────────────────
import { TemplateConfig } from './types';

export const suratPermohonanCuti: TemplateConfig = {
    id: 'surat-permohonan-cuti',
    name: 'Surat Permohonan Cuti',
    category: 'permohonan',
    icon: '🏖️',
    description: 'Surat permohonan cuti karyawan — cuti tahunan, sakit, atau melahirkan',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuan', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Bapak/Ibu HRD Manager' },
        { id: 'namaPerusahaan', label: 'Nama Perusahaan', type: 'text', required: true, placeholder: 'PT Maju Bersama' },
        { id: 'nama', label: 'Nama Karyawan', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK Karyawan', type: 'text', required: false, placeholder: 'EMP-2024-001' },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Staff Marketing' },
        { id: 'divisi', label: 'Divisi/Departemen', type: 'text', required: true, placeholder: 'Marketing' },
        { id: 'jenisCuti', label: 'Jenis Cuti', type: 'dropdown', required: true, options: ['Cuti Tahunan', 'Cuti Sakit', 'Cuti Melahirkan', 'Cuti Besar', 'Cuti Alasan Penting', 'Cuti di Luar Tanggungan'] },
        { id: 'mulaiCuti', label: 'Tanggal Mulai Cuti', type: 'date', required: true },
        { id: 'selesaiCuti', label: 'Tanggal Selesai Cuti', type: 'date', required: true },
        { id: 'alasan', label: 'Alasan Cuti', type: 'textarea', required: true, placeholder: 'Keperluan keluarga / istirahat / ...' },
        { id: 'delegasi', label: 'Delegasi Tugas ke', type: 'text', required: false, placeholder: 'Nama rekan pengganti' },
    ],
    renderLayout(data) {
        const fmtDate = (d: string) => d ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${fmtDate(data.tanggal)}</p></div>
                <p>Kepada Yth.<br><strong>${data.tujuan || '...'}</strong><br>${data.namaPerusahaan || '...'}<br>di Tempat</p>
                <p style="margin-top:12px;">Hal: <strong>Permohonan ${data.jenisCuti || 'Cuti'}</strong></p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">Saya yang bertanda tangan di bawah ini:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Nama</td><td>: <strong>${data.nama || '...'}</strong></td></tr>
                    ${data.nik ? `<tr><td>NIK</td><td>: ${data.nik}</td></tr>` : ''}
                    <tr><td>Jabatan</td><td>: ${data.jabatan || '...'}</td></tr>
                    <tr><td>Divisi</td><td>: ${data.divisi || '...'}</td></tr>
                </table>
                <p style="text-indent:40px;margin-top:8px;">Dengan ini mengajukan permohonan <strong>${data.jenisCuti || '...'}</strong> dengan rincian sebagai berikut:</p>
                <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                    <tr><td style="width:140px;">Mulai Cuti</td><td>: ${fmtDate(data.mulaiCuti)}</td></tr>
                    <tr><td>Selesai Cuti</td><td>: ${fmtDate(data.selesaiCuti)}</td></tr>
                    <tr><td>Alasan</td><td>: ${data.alasan || '...'}</td></tr>
                    ${data.delegasi ? `<tr><td>Delegasi Tugas</td><td>: ${data.delegasi}</td></tr>` : ''}
                </table>
                <p style="text-indent:40px;margin-top:12px;">Selama cuti, saya tetap dapat dihubungi melalui telepon/email apabila terdapat hal mendesak terkait pekerjaan.</p>
                <p style="text-indent:40px;margin-top:8px;">Demikian permohonan ini saya sampaikan. Atas perhatian dan persetujuan Bapak/Ibu, saya ucapkan terima kasih.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat saya,</p><br><br><br>
                <p><strong><u>${data.nama || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
