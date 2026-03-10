// ── Template: Surat Ucapan Terima Kasih ───────────────────────────────
import { TemplateConfig } from './types';

export const suratUcapanTerimakasih: TemplateConfig = {
    id: 'surat-ucapan-terimakasih',
    name: 'Surat Ucapan Terima Kasih',
    category: 'sosial',
    icon: '💐',
    description: 'Surat ucapan terima kasih resmi untuk bantuan, kerjasama, atau dukungan',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Bapak/Ibu (nama penerima)' },
        { id: 'tujuanInstansi', label: 'Instansi/Alamat', type: 'text', required: false },
        { id: 'konteks', label: 'Konteks/Latar Belakang', type: 'textarea', required: true, placeholder: 'Sehubungan dengan telah terlaksananya acara...' },
        { id: 'ucapan', label: 'Ucapan Terima Kasih', type: 'textarea', required: true, placeholder: 'Kami mengucapkan terima kasih yang sebesar-besarnya atas bantuan dan dukungan yang telah Bapak/Ibu berikan...' },
        { id: 'harapan', label: 'Harapan ke Depan', type: 'textarea', required: false, placeholder: 'Semoga kerjasama yang baik ini dapat terus berlanjut...' },
        { id: 'namaPengirim', label: 'Nama Pengirim', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: false, placeholder: 'Ketua Panitia / Direktur' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tanggal}</p></div>
                <p>Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong>${data.tujuanInstansi ? `<br>${data.tujuanInstansi}` : ''}<br>di Tempat</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">${data.konteks || '...'}</p>
                <p style="text-indent:40px;margin-top:8px;">${data.ucapan || '...'}</p>
                ${data.harapan ? `<p style="text-indent:40px;margin-top:8px;">${data.harapan}</p>` : ''}
                <p style="text-indent:40px;margin-top:12px;">Demikian surat ucapan terima kasih ini kami sampaikan. Semoga Allah SWT membalas kebaikan Bapak/Ibu dengan berlipat ganda.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p>
                ${data.jabatan ? `<p>${data.jabatan}</p>` : ''}<br><br><br>
                <p><strong><u>${data.namaPengirim || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
