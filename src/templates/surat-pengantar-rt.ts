// ── Template: Surat Pengantar RT/RW ───────────────────────────────────
import { TemplateConfig } from './types';
import { Letterhead } from '../core/storage';

function renderKop(lh?: Letterhead): string {
    if (!lh) return '';
    return `
        <div class="letter-kop">
            <div class="kop-content">
                ${lh.logo ? `<img src="${lh.logo}" class="kop-logo" alt="Logo">` : ''}
                <div class="kop-text">
                    <h2>${lh.institutionName}</h2>
                    <p>${lh.address}</p>
                    ${lh.phone ? `<p>Telp: ${lh.phone}</p>` : ''}
                    ${lh.email ? `<p>Email: ${lh.email}</p>` : ''}
                </div>
            </div>
            <hr class="kop-line">
        </div>
    `;
}

export const suratPengantarRT: TemplateConfig = {
    id: 'surat-pengantar-rt',
    name: 'Surat Pengantar RT/RW',
    category: 'pengantar',
    icon: '📨',
    description: 'Surat pengantar dari RT/RW untuk keperluan administrasi',
    needsLetterhead: true,
    fields: [
        { id: 'nomorSurat', label: 'Nomor Surat', type: 'text', required: true, placeholder: '001/RT05/III/2026' },
        { id: 'namaKetuaRT', label: 'Nama Ketua RT', type: 'text', required: true, placeholder: 'H. Dede Supriatna' },
        { id: 'noRT', label: 'Nomor RT/RW', type: 'text', required: true, placeholder: 'RT 05 / RW 02' },
        { id: 'kelurahan', label: 'Kelurahan/Desa', type: 'text', required: true, placeholder: 'Sukamaju' },
        { id: 'kecamatan', label: 'Kecamatan', type: 'text', required: true, placeholder: 'Cibeunying Kaler' },
        { id: 'namaWarga', label: 'Nama Warga', type: 'text', required: true, placeholder: 'Budi Santoso' },
        { id: 'nik', label: 'NIK', type: 'text', required: true, placeholder: '3201xxxxxxxxxx' },
        { id: 'ttl', label: 'Tempat, Tanggal Lahir', type: 'text', required: true, placeholder: 'Bandung, 15 Mei 1990' },
        { id: 'jenisKelamin', label: 'Jenis Kelamin', type: 'dropdown', required: true, options: ['Laki-laki', 'Perempuan'] },
        { id: 'agama', label: 'Agama', type: 'dropdown', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
        { id: 'pekerjaan', label: 'Pekerjaan', type: 'text', required: true, placeholder: 'Wiraswasta' },
        { id: 'alamat', label: 'Alamat', type: 'textarea', required: true, placeholder: 'Jl. Melati No. 5' },
        { id: 'keperluan', label: 'Keperluan', type: 'text', required: true, placeholder: 'Membuat KTP / Surat Pindah' },
        { id: 'keterangan', label: 'Keterangan Tambahan', type: 'textarea', required: false, placeholder: 'Keterangan lain yang perlu ditambahkan' },
        { id: 'tanggal', label: 'Tanggal Surat', type: 'date', required: true },
    ],
    renderLayout(data, letterhead) {
        const tanggal = data.tanggal ? new Date(data.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '..........';

        return `
            <div class="letter-page">
                ${renderKop(letterhead)}

                <div style="text-align:center;margin:24px 0;">
                    <p style="font-size:14px;font-weight:700;text-decoration:underline;letter-spacing:1px;margin-bottom:4px;">SURAT PENGANTAR</p>
                    <p style="font-size:12px;">Nomor: ${data.nomorSurat || '...................'}</p>
                </div>

                <div class="letter-body" style="line-height:1.8;">
                    <p style="text-indent:40px;">
                        Yang bertanda tangan di bawah ini, Ketua ${data.noRT || '...'}, 
                        Kelurahan ${data.kelurahan || '...'}, Kecamatan ${data.kecamatan || '...'}, 
                        dengan ini memberikan pengantar kepada:
                    </p>

                    <table class="letter-data-table" style="margin:8px 0 8px 40px;">
                        <tr><td style="width:160px;">Nama</td><td>: <strong>${data.namaWarga || '...'}</strong></td></tr>
                        <tr><td>NIK</td><td>: ${data.nik || '...'}</td></tr>
                        <tr><td>Tempat, Tgl Lahir</td><td>: ${data.ttl || '...'}</td></tr>
                        <tr><td>Jenis Kelamin</td><td>: ${data.jenisKelamin || '...'}</td></tr>
                        <tr><td>Agama</td><td>: ${data.agama || '...'}</td></tr>
                        <tr><td>Pekerjaan</td><td>: ${data.pekerjaan || '...'}</td></tr>
                        <tr><td>Alamat</td><td>: ${data.alamat || '...'}</td></tr>
                    </table>

                    <p style="text-indent:40px;margin-top:8px;">
                        Orang tersebut di atas adalah benar warga ${data.noRT || '...'}, 
                        Kelurahan ${data.kelurahan || '...'}, Kecamatan ${data.kecamatan || '...'}, 
                        dan bermaksud untuk keperluan:
                    </p>

                    <div style="margin:10px 40px;padding:12px 16px;background:#f8f9fa;border-radius:4px;border-left:3px solid #333;">
                        <p><strong><em>${data.keperluan || '...'}</em></strong></p>
                    </div>

                    ${data.keterangan ? `
                    <p style="text-indent:40px;margin-top:8px;">
                        Keterangan tambahan: <em>${data.keterangan}</em>
                    </p>
                    ` : ''}

                    <p style="text-indent:40px;margin-top:12px;">
                        Demikian surat pengantar ini dibuat untuk dapat dipergunakan 
                        sebagaimana mestinya. Atas perhatiannya diucapkan terima kasih.
                    </p>
                </div>

                <div style="margin-top:40px;text-align:right;margin-right:30px;">
                    <p>${data.kelurahan || '...'}, ${tanggal}</p>
                    <p>Ketua ${data.noRT || '...'}</p>
                    <br><br><br>
                    <p><strong><u>${data.namaKetuaRT || '...'}</u></strong></p>
                </div>
            </div>
        `;
    }
};
