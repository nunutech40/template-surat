// ── Template: Surat Berita Acara ──────────────────────────────────────
import { TemplateConfig } from './types';

export const suratBeritaAcara: TemplateConfig = {
    id: 'surat-berita-acara',
    name: 'Surat Berita Acara',
    category: 'bisnis',
    icon: '📝',
    description: 'Berita acara serah terima, rapat, atau kejadian penting',
    needsLetterhead: false,
    fields: [
        { id: 'judulBA', label: 'Judul Berita Acara', type: 'text', required: true, placeholder: 'Berita Acara Serah Terima Barang / Rapat / ...' },
        { id: 'nomorBA', label: 'Nomor', type: 'text', required: false },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'waktu', label: 'Waktu', type: 'text', required: true, placeholder: '09.00 - 11.00 WIB' },
        { id: 'tempat', label: 'Tempat', type: 'text', required: true },
        { id: 'isiBA', label: 'Isi Berita Acara', type: 'textarea', required: true, placeholder: 'Pada hari ini telah dilakukan serah terima barang berupa...' },
        { id: 'kesimpulan', label: 'Kesimpulan/Hasil', type: 'textarea', required: false },
        { id: 'namaPihak1', label: 'Nama Pihak I / Yang Menyerahkan', type: 'text', required: true },
        { id: 'jabatanPihak1', label: 'Jabatan Pihak I', type: 'text', required: false },
        { id: 'namaPihak2', label: 'Nama Pihak II / Yang Menerima', type: 'text', required: true },
        { id: 'jabatanPihak2', label: 'Jabatan Pihak II', type: 'text', required: false },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">${(data.judulBA || 'BERITA ACARA').toUpperCase()}</p>
                ${data.nomorBA ? `<p style="font-size:12px;">Nomor: ${data.nomorBA}</p>` : ''}
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <p style="text-indent:40px;">Pada hari ini, tanggal <strong>${tanggal}</strong>, pukul <strong>${data.waktu || '...'}</strong>, bertempat di <strong>${data.tempat || '...'}</strong>, telah dilaksanakan:</p>
                <p style="text-indent:40px;margin-top:12px;">${data.isiBA || '...'}</p>
                ${data.kesimpulan ? `<p style="margin-top:12px;"><strong>Kesimpulan/Hasil:</strong></p><p style="text-indent:40px;">${data.kesimpulan}</p>` : ''}
                <p style="text-indent:40px;margin-top:16px;">Demikian berita acara ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.</p>
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:40px;">
                <div style="text-align:center;width:45%;">
                    <p><strong>${data.jabatanPihak1 || 'Pihak I'}</strong></p><br><br><br>
                    <p><strong><u>${data.namaPihak1 || '...'}</u></strong></p>
                </div>
                <div style="text-align:center;width:45%;">
                    <p><strong>${data.jabatanPihak2 || 'Pihak II'}</strong></p><br><br><br>
                    <p><strong><u>${data.namaPihak2 || '...'}</u></strong></p>
                </div>
            </div>
        </div>`;
    }
};
