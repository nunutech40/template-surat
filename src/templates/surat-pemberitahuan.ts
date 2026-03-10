// ── Template: Surat Pemberitahuan Resmi ───────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `<div class="letter-kop"><div class="kop-content">${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}<div class="kop-text"><h2>${lh.institutionName}</h2><p>${lh.address}</p>${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}${lh.email ? `<p>Email: ${lh.email}</p>` : ''}</div></div><hr class="kop-line"></div>`;
}

export const suratPemberitahuan: TemplateConfig = {
    id: 'surat-pemberitahuan',
    name: 'Surat Pemberitahuan',
    category: 'pengantar',
    icon: '📢',
    description: 'Surat pemberitahuan resmi dari instansi, perusahaan, atau organisasi',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: false },
        { id: 'tanggal', label: 'Tanggal', type: 'date', required: true },
        { id: 'perihal', label: 'Perihal', type: 'text', required: true, placeholder: 'Pemberitahuan Perubahan Jadwal / Kenaikan Harga / ...' },
        { id: 'tujuanNama', label: 'Kepada Yth.', type: 'text', required: true, placeholder: 'Seluruh Karyawan / Warga RT 03 / ...' },
        { id: 'tujuanAlamat', label: 'Alamat/Instansi Tujuan', type: 'text', required: false, placeholder: 'di Tempat' },
        { id: 'isiPemberitahuan', label: 'Isi Pemberitahuan', type: 'textarea', required: true, placeholder: 'Dengan ini kami memberitahukan bahwa...' },
        { id: 'berlakuMulai', label: 'Berlaku Mulai (opsional)', type: 'text', required: false, placeholder: '1 April 2026' },
        { id: 'tindakanYgDiharapkan', label: 'Tindakan yang Diharapkan (opsional)', type: 'textarea', required: false, placeholder: 'Dimohon untuk segera...' },
        { id: 'kontak', label: 'Kontak Informasi Lebih Lanjut', type: 'text', required: false, placeholder: 'Hubungi 08xx / email@company.com' },
        { id: 'namaPenandatangan', label: 'Nama Penandatangan', type: 'text', required: true },
        { id: 'jabatan', label: 'Jabatan', type: 'text', required: true, placeholder: 'Direktur / Ketua RT / HRD' },
    ],
    renderLayout(data, letterhead) {
        const tgl = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';
        return `<div class="letter-page">
            ${renderKop(letterhead)}
            <div class="letter-body" style="line-height:1.8;">
                <div style="text-align:right;margin-bottom:16px;"><p>${tgl}</p></div>
                ${data.nomorSurat ? `<p>Nomor: ${data.nomorSurat}</p>` : ''}
                <p>Perihal: <strong>${data.perihal || '...'}</strong></p>
                <p style="margin-top:16px;">Kepada Yth.<br><strong>${data.tujuanNama || '...'}</strong><br>${data.tujuanAlamat || 'di Tempat'}</p>
                <p style="margin-top:16px;">Dengan hormat,</p>
                <p style="text-indent:40px;margin-top:8px;">${data.isiPemberitahuan || '...'}</p>
                ${data.berlakuMulai ? `<p style="text-indent:40px;margin-top:8px;">Ketentuan ini berlaku mulai <strong>${data.berlakuMulai}</strong>.</p>` : ''}
                ${data.tindakanYgDiharapkan ? `<p style="text-indent:40px;margin-top:8px;">${data.tindakanYgDiharapkan}</p>` : ''}
                <p style="text-indent:40px;margin-top:12px;">Demikian surat pemberitahuan ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.</p>
                ${data.kontak ? `<p style="margin-top:8px;font-size:12px;color:#666;">Informasi lebih lanjut: ${data.kontak}</p>` : ''}
            </div>
            <div style="margin-top:40px;text-align:right;margin-right:30px;">
                <p>Hormat kami,</p><p>${data.jabatan || '...'}</p><br><br><br>
                <p><strong><u>${data.namaPenandatangan || '...'}</u></strong></p>
            </div>
        </div>`;
    }
};
