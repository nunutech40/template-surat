// ── Template: Surat Undangan Rapat ────────────────────────────────────
import { TemplateConfig } from './types';

export const suratUndanganRapat: TemplateConfig = {
    id: 'surat-undangan-rapat',
    name: 'Surat Undangan Rapat',
    category: 'sosial',
    icon: '📩',
    description: 'Surat undangan rapat untuk kantor, organisasi, atau lingkungan warga',
    needsLetterhead: false,
    fields: [
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/UND/III/2026' },
        { id: 'namaOrganisasi', label: 'Nama Organisasi / Instansi', type: 'text', required: true, placeholder: 'PT Maju Bersama / RT 05' },
        { id: 'tujuan', label: 'Ditujukan Kepada', type: 'text', required: true, placeholder: 'Seluruh karyawan / Warga RT 05' },
        { id: 'perihalRapat', label: 'Perihal Rapat', type: 'text', required: true, placeholder: 'Rapat Koordinasi Bulanan' },
        { id: 'hariRapat', label: 'Hari/Tanggal Rapat', type: 'text', required: true, placeholder: 'Senin, 15 April 2026' },
        { id: 'waktu', label: 'Waktu', type: 'text', required: true, placeholder: '09.00 WIB s/d selesai' },
        { id: 'tempatRapat', label: 'Tempat', type: 'text', required: true, placeholder: 'Ruang Rapat Lt. 3 / Balai Warga' },
        { id: 'agendaRapat', label: 'Agenda Rapat', type: 'textarea', required: true, placeholder: '1. Pembahasan program kerja\n2. Evaluasi bulan lalu\n3. Lain-lain' },
        { id: 'namaPengirim', label: 'Nama Pengirim', type: 'text', required: true, placeholder: 'Ir. Ahmad Salim / Ketua RT' },
        { id: 'jabatanPengirim', label: 'Jabatan', type: 'text', required: true, placeholder: 'Manager / Ketua RT' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const agendaLines = (data.agendaRapat || '...').split('\n').map((line, i) =>
            `<li>${line.replace(/^\d+\.\s*/, '')}</li>`
        ).join('');
        return `
            <div class="letter-page">
                <div style="text-align:right;">${data.kota || '...'}, ${tanggal}</div>
                <div style="margin:12px 0;">
                    <table class="letter-data-table">
                        <tr><td style="width:80px;">Nomor</td><td>: ${data.nomorSurat || '...'}</td></tr>
                        <tr><td>Perihal</td><td>: <strong>${data.perihalRapat || '...'}</strong></td></tr>
                    </table>
                </div>
                <div style="margin:20px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>${data.tujuan || '...'}</strong></p>
                    <p>di tempat</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p>Dengan hormat,</p>
                    <p style="text-indent:40px;margin-top:12px;">
                        Dengan ini kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam rapat yang 
                        akan diselenggarakan pada:
                    </p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:100px;">Hari/Tanggal</td><td>: <strong>${data.hariRapat || '...'}</strong></td></tr>
                        <tr><td>Waktu</td><td>: ${data.waktu || '...'}</td></tr>
                        <tr><td>Tempat</td><td>: ${data.tempatRapat || '...'}</td></tr>
                    </table>
                    <p style="text-indent:40px;margin-top:12px;">Dengan agenda sebagai berikut:</p>
                    <ol style="margin:8px 0 8px 60px;">${agendaLines}</ol>
                    <p style="text-indent:40px;margin-top:12px;">
                        Mengingat pentingnya rapat ini, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i 
                        tepat pada waktunya. Atas perhatian dan kehadirannya, kami ucapkan terima kasih.
                    </p>
                </div>
                <div style="margin-top:40px;">
                    <p>Hormat kami,</p>
                    <p>${data.namaOrganisasi || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaPengirim || '...'}</u></strong></p>
                    <p style="font-size:13px;">${data.jabatanPengirim || '...'}</p>
                </div>
            </div>`;
    }
};
