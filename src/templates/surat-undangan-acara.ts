// ── Template: Surat Undangan Acara ────────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratUndanganAcara: TemplateConfig = {
    id: 'surat-undangan-acara',
    name: 'Surat Undangan Acara',
    category: 'sosial',
    icon: '🎉',
    description: 'Surat undangan acara resmi — pengajian, syukuran, pernikahan, dll',
    needsLetterhead: false,
    fields: [
        { id: 'tanggalSurat', label: 'Tanggal Surat', type: 'date', required: true },
        { id: 'namaAcara', label: 'Nama Acara', type: 'text', required: true, placeholder: 'Syukuran / Pengajian / Tasyakuran' },
        { id: 'tujuan', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Bapak/Ibu/Sdr. (nama undangan)' },
        { id: 'alamatTujuan', label: 'Alamat Undangan', type: 'text', required: false, placeholder: 'di Tempat' },
        { id: 'pembukaan', label: 'Kalimat Pembuka', type: 'textarea', required: true, placeholder: 'Dengan memohon rahmat Allah SWT, kami mengundang Bapak/Ibu/Saudara untuk menghadiri acara...' },
        { id: 'hariTanggal', label: 'Hari & Tanggal Acara', type: 'text', required: true, placeholder: 'Sabtu, 15 Maret 2026' },
        { id: 'waktu', label: 'Waktu', type: 'text', required: true, placeholder: '09.00 - selesai' },
        { id: 'tempatAcara', label: 'Tempat', type: 'text', required: true, placeholder: 'Aula Masjid Al-Ikhlas, Jl. Melati No. 5' },
        { id: 'acara', label: 'Acara/Susunan Acara', type: 'textarea', required: false, placeholder: '1. Pembukaan\n2. Sambutan\n3. Doa bersama\n4. Ramah-tamah' },
        { id: 'penutup', label: 'Kalimat Penutup', type: 'textarea', required: true, placeholder: 'Kehadiran Bapak/Ibu/Saudara sangat kami harapkan...' },
        { id: 'namaPengundang', label: 'Nama Pengundang', type: 'text', required: true, placeholder: 'Budi Santoso' },
    ],
    renderLayout(data, letterhead) {
        const tanggalSurat = data.tanggalSurat ? new Date(data.tanggalSurat).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tanggalSurat}</p></div>
                <p>Kepada Yth.<br><strong>${data.tujuan || '...'}</strong><br>${data.alamatTujuan || 'di Tempat'}</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">${data.pembukaan || '...'}</p>
                <table class="letter-data-table" style="margin:12px 0 12px 40px;">
                    <tr><td style="width:120px;">Acara</td><td>: <strong>${data.namaAcara || '...'}</strong></td></tr>
                    <tr><td>Hari/Tanggal</td><td>: ${data.hariTanggal || '...'}</td></tr>
                    <tr><td>Waktu</td><td>: ${data.waktu || '...'}</td></tr>
                    <tr><td>Tempat</td><td>: ${data.tempatAcara || '...'}</td></tr>
                </table>
                ${data.acara ? `<p style="margin-top:8px;"><strong>Susunan Acara:</strong></p><p style="margin-left:40px;white-space:pre-line;">${data.acara}</p>` : ''}
                <p style="text-indent:40px;margin-top:12px;">${data.penutup || '...'}</p>
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p><br><br><br>
                <p><strong><u>${data.namaPengundang || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
