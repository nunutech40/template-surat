// ── Template: Surat Perjanjian Sewa ───────────────────────────────────
import { TemplateConfig } from './types';

export const suratPerjanjianSewa: TemplateConfig = {
    id: 'surat-perjanjian-sewa',
    name: 'Surat Perjanjian Sewa Rumah/Kost',
    category: 'perjanjian',
    icon: '🏘️',
    description: 'Perjanjian sewa-menyewa rumah, kost, atau ruko',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Perjanjian', type: 'date', required: true },
        { id: 'namaPemilik', label: 'Nama Pemilik (Pihak I)', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikPemilik', label: 'NIK Pemilik', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'alamatPemilik', label: 'Alamat Pemilik', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5' },
        { id: 'namaPenyewa', label: 'Nama Penyewa (Pihak II)', type: 'text', required: true, placeholder: 'Siti Aminah' },
        { id: 'nikPenyewa', label: 'NIK Penyewa', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'alamatPenyewa', label: 'Alamat Asal Penyewa', type: 'textarea', required: true, placeholder: 'Jl. Mawar No. 10' },
        { id: 'objekSewa', label: 'Objek Sewa', type: 'text', required: true, placeholder: 'Rumah / Kamar Kost / Ruko' },
        { id: 'alamatObjek', label: 'Alamat Objek Sewa', type: 'textarea', required: true, placeholder: 'Jl. Kenanga No. 15, RT 01/RW 03' },
        { id: 'hargaSewa', label: 'Harga Sewa (Rp)', type: 'text', required: true, placeholder: '2.000.000' },
        { id: 'periodeSewa', label: 'Periode Sewa', type: 'text', required: true, placeholder: '1 (satu) tahun' },
        { id: 'mulaiSewa', label: 'Tanggal Mulai Sewa', type: 'date', required: true },
        { id: 'berakhirSewa', label: 'Tanggal Berakhir Sewa', type: 'date', required: true },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const mulai = data.mulaiSewa ? new Date(data.mulaiSewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const berakhir = data.berakhirSewa ? new Date(data.berakhirSewa).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT PERJANJIAN SEWA-MENYEWA</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Pada hari ini, tanggal <strong>${tanggal}</strong>, bertempat di ${data.kota || '...'}, telah dibuat perjanjian sewa-menyewa antara:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPemilik || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPemilik || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamatPemilik || '...'}</td></tr>
                    </table>
                    <p style="margin-left:40px;">Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Pemilik)</strong>.</p>
                    <p style="text-indent:40px;margin-top:8px;">Dan:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaPenyewa || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPenyewa || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamatPenyewa || '...'}</td></tr>
                    </table>
                    <p style="margin-left:40px;">Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Penyewa)</strong>.</p>
                    <hr style="margin:16px 0;border:none;border-top:1px solid #ccc;">
                    <p style="text-indent:40px;">Kedua belah pihak sepakat untuk mengadakan perjanjian sewa-menyewa dengan ketentuan sebagai berikut:</p>
                    <p style="margin-top:12px;"><strong>Pasal 1 — Objek Sewa</strong></p>
                    <p style="text-indent:40px;">Pihak Pertama menyewakan <strong>${data.objekSewa || '...'}</strong> yang berlokasi di: <em>${data.alamatObjek || '...'}</em>.</p>
                    <p style="margin-top:12px;"><strong>Pasal 2 — Jangka Waktu</strong></p>
                    <p style="text-indent:40px;">Perjanjian sewa berlaku selama <strong>${data.periodeSewa || '...'}</strong>, terhitung mulai <strong>${mulai}</strong> sampai dengan <strong>${berakhir}</strong>.</p>
                    <p style="margin-top:12px;"><strong>Pasal 3 — Harga Sewa</strong></p>
                    <p style="text-indent:40px;">Harga sewa disepakati sebesar <strong>Rp ${data.hargaSewa || '...'}</strong> untuk jangka waktu ${data.periodeSewa || '...'}.</p>
                    <p style="margin-top:12px;"><strong>Pasal 4 — Kewajiban</strong></p>
                    <p style="text-indent:40px;">Pihak Kedua wajib menjaga objek sewa dalam kondisi baik, membayar tagihan listrik dan air selama masa sewa, dan mengembalikan objek sewa dalam kondisi semula setelah masa sewa berakhir.</p>
                    <p style="text-indent:40px;margin-top:12px;">Demikian surat perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup yang masing-masing mempunyai kekuatan hukum yang sama.</p>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:40px;">
                    <div style="text-align:center;width:45%;">
                        <p><strong>PIHAK PERTAMA</strong></p>
                        <br><br><br>
                        <p><strong><u>${data.namaPemilik || '...'}</u></strong></p>
                    </div>
                    <div style="text-align:center;width:45%;">
                        <p><strong>PIHAK KEDUA</strong></p>
                        <br><br><br>
                        <p><strong><u>${data.namaPenyewa || '...'}</u></strong></p>
                    </div>
                </div>
            </div>`;
    }
};
