// ── Template: Surat Penawaran Harga ───────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratPenawaranHarga: TemplateConfig = {
    id: 'surat-penawaran-harga',
    name: 'Surat Penawaran Harga',
    category: 'bisnis',
    icon: '💰',
    description: 'Surat penawaran harga barang atau jasa ke calon klien/perusahaan',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/PH/III/2026' },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'tujuanNama', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Bapak/Ibu Pimpinan' },
        { id: 'tujuanPerusahaan', label: 'Perusahaan Tujuan', type: 'text', required: true },
        { id: 'tujuanAlamat', label: 'Alamat Tujuan', type: 'textarea', required: true },
        { id: 'perihal', label: 'Perihal', type: 'text', required: true, placeholder: 'Penawaran Harga Barang Elektronik' },
        { id: 'pembuka', label: 'Kalimat Pembuka', type: 'textarea', required: true, placeholder: 'Dengan ini kami menawarkan produk/jasa kami sebagai berikut:' },
        { id: 'daftarItem', label: 'Daftar Barang/Jasa (1 per baris: Nama | Qty | Harga)', type: 'textarea', required: true, placeholder: 'Laptop Asus ROG | 5 unit | Rp 15.000.000\nMouse Logitech | 10 unit | Rp 350.000' },
        { id: 'totalHarga', label: 'Total Harga (Rp)', type: 'text', required: false, placeholder: '78.500.000' },
        { id: 'keteranganHarga', label: 'Keterangan Harga', type: 'text', required: false, placeholder: 'Harga belum termasuk PPN 11%' },
        { id: 'masaBerlaku', label: 'Masa Berlaku Penawaran', type: 'text', required: true, placeholder: '30 hari sejak tanggal surat' },
        { id: 'syaratPembayaran', label: 'Syarat Pembayaran', type: 'text', required: true, placeholder: 'DP 50%, pelunasan saat barang diterima' },
        { id: 'waktuPengiriman', label: 'Waktu Pengiriman', type: 'text', required: false, placeholder: '7-14 hari kerja setelah PO' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Direktur / Marketing Manager' },
    ],
    renderLayout(data, letterhead) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const items = (data.daftarItem || '').split('\n').filter((l: string) => l.trim());
        const tableRows = items.map((item: string, i: number) => {
            const parts = item.split('|').map((p: string) => p.trim());
            return `<tr><td style="text-align:center;">${i + 1}</td><td>${parts[0] || '-'}</td><td style="text-align:center;">${parts[1] || '-'}</td><td style="text-align:right;">${parts[2] || '-'}</td></tr>`;
        }).join('');
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div class="letter-body" style="line-height:1.8;">
                <div style="display:flex;justify-content:space-between;margin-bottom:16px;">
                    <div><p>Nomor: ${data.nomorSurat || '...'}</p><p>Perihal: <strong>${data.perihal || '...'}</strong></p></div>
                    <div style="text-align:right;"><p>${tgl}</p></div>
                </div>
                <p>Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>${data.tujuanPerusahaan || '...'}<br>${data.tujuanAlamat || '...'}</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">${data.pembuka || '...'}</p>
                <table style="width:100%;border-collapse:collapse;margin:12px 0;" border="1" cellpadding="6">
                    <thead><tr style="background:#f1f5f9;"><th>No</th><th>Nama Barang/Jasa</th><th>Qty</th><th>Harga</th></tr></thead>
                    <tbody>${tableRows || '<tr><td colspan="4" style="text-align:center;">-</td></tr>'}</tbody>
                    ${data.totalHarga ? `<tfoot><tr style="font-weight:700;"><td colspan="3" style="text-align:right;">Total</td><td style="text-align:right;">Rp ${data.totalHarga}</td></tr></tfoot>` : ''}
                </table>
                ${data.keteranganHarga ? `<p style="font-size:12px;color:#666;margin-top:4px;">*${data.keteranganHarga}</p>` : ''}
                <table class="letter-data-table" style="margin:12px 0 8px 0;">
                    <tr><td style="width:170px;">Masa Berlaku</td><td>: ${data.masaBerlaku || '...'}</td></tr>
                    <tr><td>Syarat Pembayaran</td><td>: ${data.syaratPembayaran || '...'}</td></tr>
                    ${data.waktuPengiriman ? `<tr><td>Waktu Pengiriman</td><td>: ${data.waktuPengiriman}</td></tr>` : ''}
                </table>
                <p style="text-indent:40px;margin-top:12px;">Demikian surat penawaran ini kami sampaikan. Besar harapan kami dapat menjalin kerjasama yang baik. Atas perhatiannya, kami ucapkan terima kasih.</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p><p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
