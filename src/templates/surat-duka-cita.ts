// ── Template: Surat Duka Cita ─────────────────────────────────────────
import { TemplateConfig } from './types';

export const suratDukaCita: TemplateConfig = {
    id: 'surat-duka-cita',
    name: 'Surat Duka Cita',
    category: 'sosial',
    icon: '🕯️',
    description: 'Surat duka cita/belasungkawa resmi dari organisasi atau pribadi',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Keluarga', type: 'text', required: true, placeholder: 'Keluarga Besar Alm. Budi Santoso' },
        { id: 'namaAlmarhum', label: 'Nama Almarhum/ah', type: 'text', required: true },
        { id: 'tanggalMeninggal', label: 'Tanggal Meninggal', type: 'text', required: true },
        { id: 'hubungan', label: 'Hubungan dengan Penerima', type: 'text', required: false, placeholder: 'Rekan kerja / Tetangga' },
        { id: 'ucapan', label: 'Ucapan Belasungkawa', type: 'textarea', required: true, placeholder: 'Dengan ini menyampaikan rasa duka yang mendalam...' },
        { id: 'namaPengirim', label: 'Nama Pengirim', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan (opsional)', type: 'text', required: false },
    ],
    renderLayout(data) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page"><div class="letter-body" style="line-height:1.8;">
            <div style="text-align:right;margin-bottom:16px;"><p>${tgl}</p></div>
            <p>Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>di Tempat</p>
            <p style="margin-top:12px;">Hal: <strong>Ucapan Duka Cita</strong></p>
            <p style="margin-top:16px;">Innalillahi wa inna ilaihi roji'un.</p>
            <p style="text-indent:40px;margin-top:8px;">Dengan penuh rasa duka, kami turut berduka cita atas meninggalnya <strong>${data.namaAlmarhum || '...'}</strong> pada ${data.tanggalMeninggal || '...'}${data.hubungan ? `, yang merupakan ${data.hubungan}` : ''}.</p>
            <p style="text-indent:40px;margin-top:8px;">${data.ucapan || '...'}</p>
            <p style="text-indent:40px;margin-top:8px;">Semoga almarhum/almarhumah diterima di sisi-Nya dan keluarga yang ditinggalkan diberikan ketabahan dan kesabaran.</p>
        </div>
        <div style="margin-top:40px;text-align:right;margin-right:30px;">
            <p>Turut berduka cita,</p>${data.jabatan ? `<p>${data.jabatan}</p>` : ''}<br><br><br>
            <p><strong><u>${data.namaPengirim || '...'}</u></strong></p>
        </div></div>`;
    }
};
