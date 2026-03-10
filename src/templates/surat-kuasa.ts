// ── Template: Surat Kuasa ─────────────────────────────────────────────
import { TemplateConfig } from './types';

export const suratKuasa: TemplateConfig = {
    id: 'surat-kuasa',
    name: 'Surat Kuasa',
    category: 'bisnis',
    icon: '📋',
    description: 'Surat kuasa untuk memberikan wewenang kepada orang lain',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaPemberi', label: 'Nama Pemberi Kuasa', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikPemberi', label: 'NIK Pemberi Kuasa', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttlPemberi', label: 'Tempat, Tgl Lahir Pemberi', type: 'text', required: false, placeholder: 'Jakarta, 1 Januari 1990' },
        { id: 'alamatPemberi', label: 'Alamat Pemberi Kuasa', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5, Jakarta' },
        { id: 'namaPenerima', label: 'Nama Penerima Kuasa', type: 'text', required: true, placeholder: 'Siti Aminah' },
        { id: 'nikPenerima', label: 'NIK Penerima Kuasa', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttlPenerima', label: 'Tempat, Tgl Lahir Penerima', type: 'text', required: false, placeholder: 'Bandung, 5 Mei 1992' },
        { id: 'alamatPenerima', label: 'Alamat Penerima Kuasa', type: 'textarea', required: true, placeholder: 'Jl. Mawar No. 10, Jakarta' },
        { id: 'keperluan', label: 'Hal yang Dikuasakan', type: 'textarea', required: true, placeholder: 'Mengambil dokumen BPKB di Kantor Samsat' },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';

        return `
            <div class="letter-page">
                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT KUASA</p>
                </div>

                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Yang bertanda tangan di bawah ini:</p>

                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPemberi || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPemberi || '...'}</td></tr>
                        ${data.ttlPemberi ? `<tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttlPemberi}</td></tr>` : ''}
                        <tr><td>Alamat</td><td>: ${data.alamatPemberi || '...'}</td></tr>
                    </table>

                    <p style="text-indent:40px;">Selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>.</p>

                    <p style="text-indent:40px;margin-top:12px;">Dengan ini memberikan kuasa kepada:</p>

                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPenerima || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPenerima || '...'}</td></tr>
                        ${data.ttlPenerima ? `<tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttlPenerima}</td></tr>` : ''}
                        <tr><td>Alamat</td><td>: ${data.alamatPenerima || '...'}</td></tr>
                    </table>

                    <p style="text-indent:40px;">Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.</p>

                    <hr style="margin:16px 0;border:none;border-top:1px solid #ccc;">

                    <p style="text-indent:40px;font-weight:600;">— KHUSUS —</p>

                    <p style="text-indent:40px;margin-top:8px;">
                        Untuk dan atas nama Pemberi Kuasa, melakukan hal sebagai berikut:
                    </p>

                    <div style="margin:10px 40px;padding:12px 16px;background:#f8f9fa;border-radius:4px;border-left:3px solid #333;">
                        <p><em>${data.keperluan || '...'}</em></p>
                    </div>

                    <p style="text-indent:40px;margin-top:12px;">
                        Demikian surat kuasa ini dibuat dengan sebenar-benarnya untuk dapat 
                        dipergunakan sebagaimana mestinya.
                    </p>
                </div>

                <div style="display:flex;justify-content:space-between;margin-top:40px;">
                    <div style="text-align:center;width:45%;">
                        <p>Penerima Kuasa,</p>
                        <br><br><br>
                        <p><strong><u>${data.namaPenerima || '...'}</u></strong></p>
                    </div>
                    <div style="text-align:center;width:45%;">
                        <p>${data.kota || '...'}, ${tanggal}</p>
                        <p>Pemberi Kuasa,</p>
                        <br><br><br>
                        <p><strong><u>${data.namaPemberi || '...'}</u></strong></p>
                    </div>
                </div>
            </div>
        `;
    }
};
