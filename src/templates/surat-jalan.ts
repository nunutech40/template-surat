// ── Template: Surat Jalan / Pengiriman Barang ─────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratJalan: TemplateConfig = {
    id: 'surat-jalan',
    name: 'Surat Jalan',
    category: 'bisnis',
    icon: '🚚',
    description: 'Surat jalan pengiriman barang — bukti sah pengiriman ke penerima',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSJ', label: 'Nomor Surat Jalan', type: 'text', required: true, placeholder: 'SJ-2026/03/001' },
        { id: 'tanggal', label: 'Tanggal Kirim', type: 'date', required: true },
        { id: 'nomorPO', label: 'Nomor PO/Invoice (opsional)', type: 'text', required: false },
        { id: 'namaPenerima', label: 'Nama Penerima', type: 'text', required: true },
        { id: 'perusahaanPenerima', label: 'Perusahaan Penerima', type: 'text', required: false },
        { id: 'alamatPenerima', label: 'Alamat Penerima', type: 'textarea', required: true },
        { id: 'daftarBarang', label: 'Daftar Barang (1 per baris: Nama | Qty | Satuan | Keterangan)', type: 'textarea', required: true, placeholder: 'Laptop Asus ROG | 5 | unit | Warna hitam\nMouse Logitech | 10 | pcs | Wireless' },
        { id: 'namaSopir', label: 'Nama Sopir/Pengantar', type: 'text', required: false },
        { id: 'nopolKendaraan', label: 'No. Polisi Kendaraan', type: 'text', required: false },
        { id: 'catatan', label: 'Catatan', type: 'textarea', required: false },
    ],
    renderLayout(data, letterhead) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        const items = (data.daftarBarang || '').split('\n').filter((l: string) => l.trim());
        const tableRows = items.map((item: string, i: number) => {
            const p = item.split('|').map((s: string) => s.trim());
            return `<tr><td style="text-align:center;">${i + 1}</td><td>${p[0] || '-'}</td><td style="text-align:center;">${p[1] || '-'}</td><td style="text-align:center;">${p[2] || '-'}</td><td>${p[3] || '-'}</td></tr>`;
        }).join('');
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div style="text-align:center;margin:24px 0;">
                <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;">SURAT JALAN</p>
            </div>
            <div class="letter-body" style="line-height:1.8;">
                <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
                    <div>
                        <table class="letter-data-table">
                            <tr><td style="width:120px;">No. SJ</td><td>: <strong>${data.nomorSJ || '...'}</strong></td></tr>
                            <tr><td>Tanggal</td><td>: ${tgl}</td></tr>
                            ${data.nomorPO ? `<tr><td>No. PO</td><td>: ${data.nomorPO}</td></tr>` : ''}
                        </table>
                    </div>
                    <div>
                        <table class="letter-data-table">
                            <tr><td style="width:100px;">Kepada</td><td>: <strong>${data.namaPenerima || '...'}</strong></td></tr>
                            ${data.perusahaanPenerima ? `<tr><td></td><td>  ${data.perusahaanPenerima}</td></tr>` : ''}
                            <tr><td>Alamat</td><td>: ${data.alamatPenerima || '...'}</td></tr>
                        </table>
                    </div>
                </div>
                <table style="width:100%;border-collapse:collapse;margin:12px 0;" border="1" cellpadding="6">
                    <thead><tr style="background:#f1f5f9;"><th>No</th><th>Nama Barang</th><th>Qty</th><th>Satuan</th><th>Keterangan</th></tr></thead>
                    <tbody>${tableRows || '<tr><td colspan="5" style="text-align:center;">-</td></tr>'}</tbody>
                </table>
                ${data.namaSopir || data.nopolKendaraan ? `<table class="letter-data-table" style="margin:8px 0;"><tr><td style="width:120px;">Sopir</td><td>: ${data.namaSopir || '-'}</td></tr><tr><td>No. Kendaraan</td><td>: ${data.nopolKendaraan || '-'}</td></tr></table>` : ''}
                ${data.catatan ? `<p style="margin-top:8px;"><strong>Catatan:</strong> ${data.catatan}</p>` : ''}
            </div>
            <div style="display:flex;justify-content:space-between;margin-top:40px;">
                <div style="text-align:center;width:30%;"><p><strong>Pengirim</strong></p><br><br><br><p>(_________________)</p></div>
                <div style="text-align:center;width:30%;"><p><strong>Pengantar</strong></p><br><br><br><p>(${data.namaSopir || '_________________'})</p></div>
                <div style="text-align:center;width:30%;"><p><strong>Penerima</strong></p><br><br><br><p>(${data.namaPenerima || '_________________'})</p></div>
            </div>
        </div>`;
    }
};
