// ── Template: Surat Perjanjian Hutang Piutang ─────────────────────────
import { TemplateConfig } from './types';

export const suratPerjanjianHutang: TemplateConfig = {
    id: 'surat-perjanjian-hutang',
    name: 'Surat Perjanjian Hutang Piutang',
    category: 'perjanjian',
    icon: '💳',
    description: 'Perjanjian hutang piutang dengan jaminan dan jadwal pembayaran',
    needsLetterhead: false,
    fields: [
        { id: 'tanggal', label: 'Tanggal Perjanjian', type: 'date', required: true },
        { id: 'kota', label: 'Kota', type: 'text', required: true, placeholder: 'Jakarta' },
        { id: 'namaPihak1', label: 'Nama Pemberi Pinjaman (Pihak I)', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nikPihak1', label: 'NIK Pihak I', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'alamatPihak1', label: 'Alamat Pihak I', type: 'textarea', required: true },
        { id: 'namaPihak2', label: 'Nama Peminjam (Pihak II)', type: 'text', required: true, placeholder: 'Siti Aminah' },
        { id: 'nikPihak2', label: 'NIK Pihak II', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'alamatPihak2', label: 'Alamat Pihak II', type: 'textarea', required: true },
        { id: 'jumlahPinjaman', label: 'Jumlah Pinjaman (Rp)', type: 'text', required: true, placeholder: '10.000.000' },
        { id: 'terbilang', label: 'Terbilang', type: 'text', required: true, placeholder: 'Sepuluh juta rupiah' },
        { id: 'jangkaWaktu', label: 'Jangka Waktu Pengembalian', type: 'text', required: true, placeholder: '6 (enam) bulan' },
        { id: 'caraPembayaran', label: 'Cara Pembayaran', type: 'dropdown', required: true, options: ['Sekaligus di akhir', 'Cicilan bulanan', 'Cicilan mingguan'] },
        { id: 'jaminan', label: 'Jaminan (opsional)', type: 'text', required: false, placeholder: 'BPKB Motor Honda Vario 2022' },
    ],
    renderLayout(data) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `
            <div class="letter-page">
                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT PERJANJIAN HUTANG PIUTANG</p>
                </div>
                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">Pada hari ini, tanggal <strong>${tanggal}</strong>, bertempat di ${data.kota || '...'}, kami yang bertanda tangan di bawah ini:</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaPihak1 || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPihak1 || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamatPihak1 || '...'}</td></tr>
                    </table>
                    <p style="margin-left:40px;">Selanjutnya disebut <strong>PIHAK PERTAMA (Pemberi Pinjaman)</strong>.</p>
                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:140px;">Nama</td><td>: <strong>${data.namaPihak2 || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nikPihak2 || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamatPihak2 || '...'}</td></tr>
                    </table>
                    <p style="margin-left:40px;">Selanjutnya disebut <strong>PIHAK KEDUA (Peminjam)</strong>.</p>
                    <hr style="margin:16px 0;border:none;border-top:1px solid #ccc;">
                    <p style="margin-top:12px;"><strong>Pasal 1 — Jumlah Pinjaman</strong></p>
                    <p style="text-indent:40px;">Pihak Pertama memberikan pinjaman uang kepada Pihak Kedua sebesar <strong>Rp ${data.jumlahPinjaman || '...'}</strong> (${data.terbilang || '...'}).</p>
                    <p style="margin-top:12px;"><strong>Pasal 2 — Jangka Waktu</strong></p>
                    <p style="text-indent:40px;">Pinjaman wajib dikembalikan dalam jangka waktu <strong>${data.jangkaWaktu || '...'}</strong> terhitung sejak tanggal perjanjian ini ditandatangani.</p>
                    <p style="margin-top:12px;"><strong>Pasal 3 — Cara Pembayaran</strong></p>
                    <p style="text-indent:40px;">Pengembalian pinjaman dilakukan dengan cara: <strong>${data.caraPembayaran || '...'}</strong>.</p>
                    ${data.jaminan ? `<p style="margin-top:12px;"><strong>Pasal 4 — Jaminan</strong></p><p style="text-indent:40px;">Sebagai jaminan pinjaman, Pihak Kedua menyerahkan: <strong>${data.jaminan}</strong>. Apabila Pihak Kedua tidak mampu melunasi hutang sesuai jangka waktu yang disepakati, maka Pihak Pertama berhak atas jaminan tersebut.</p>` : ''}
                    <p style="margin-top:12px;"><strong>Pasal ${data.jaminan ? '5' : '4'} — Sanksi Keterlambatan</strong></p>
                    <p style="text-indent:40px;">Apabila Pihak Kedua terlambat atau gagal melunasi hutang, maka Pihak Pertama berhak menuntut pelunasan melalui jalur hukum yang berlaku.</p>
                    <p style="margin-top:12px;"><strong>Pasal ${data.jaminan ? '6' : '5'} — Penyelesaian Perselisihan</strong></p>
                    <p style="text-indent:40px;">Segala perselisihan diselesaikan secara musyawarah mufakat. Apabila tidak tercapai, akan diselesaikan melalui Pengadilan Negeri ${data.kota || '...'}.</p>
                    <p style="text-indent:40px;margin-top:16px;">Demikian surat perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup, masing-masing mempunyai kekuatan hukum yang sama.</p>
                </div>
                <div style="display:flex;justify-content:space-between;margin-top:40px;">
                    <div style="text-align:center;width:45%;">
                        <p><strong>PIHAK PERTAMA</strong></p><br><br><br>
                        <p><strong><u>${data.namaPihak1 || '...'}</u></strong></p>
                    </div>
                    <div style="text-align:center;width:45%;">
                        <p><strong>PIHAK KEDUA</strong></p><br><br><br>
                        <p><strong><u>${data.namaPihak2 || '...'}</u></strong></p>
                    </div>
                </div>
            </div>`;
    }
};
