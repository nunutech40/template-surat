(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(r){if(r.ep)return;r.ep=!0;const t=n(r);fetch(r.href,t)}})();const y={product:"surat",apiBase:"https://sains-atomic.web.id"};let u={user:null,type:null,accessToken:null},x=[];const $="surat_access_token",w="surat_user";function v(){u.accessToken?localStorage.setItem($,u.accessToken):localStorage.removeItem($),u.user?localStorage.setItem(w,JSON.stringify({user:u.user,type:u.type})):localStorage.removeItem(w)}function N(){const e=localStorage.getItem($),a=localStorage.getItem(w);if(e&&a)try{const n=JSON.parse(a);return u.accessToken=e,u.user=n.user,u.type=n.type,!0}catch{}return!1}async function L(e,a={}){const n=new Headers(a.headers||{});return u.accessToken&&n.set("Authorization",`Bearer ${u.accessToken}`),fetch(e,{...a,headers:n,credentials:"include"})}function q(){return u.user}function D(){return u.user!==null}function T(){return u.accessToken}function j(e){return x.push(e),()=>{x=x.filter(a=>a!==e)}}function P(){x.forEach(e=>e())}async function M(e,a){try{const n=await fetch(`${y.apiBase}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:a})});if(!n.ok){const s=await n.json().catch(()=>({}));return{ok:!1,error:s?.error?.message||s?.message||"Login gagal. Periksa email dan password."}}const i=await n.json(),r=i?.data?.access_token||i?.access_token;r&&(u.accessToken=r);const t=i?.data?.user||i?.user;return t&&(u.user={id:t.id,email:t.email,name:t.name||"",role:t.role||"subscriber",is_active:!0},u.type="subscriber"),v(),P(),{ok:!0}}catch{return{ok:!1,error:"Koneksi gagal — coba lagi."}}}async function R(e,a,n){try{const i=await fetch(`${y.apiBase}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},credentials:"include",body:JSON.stringify({email:e,password:a,name:n})});if(!i.ok){const r=await i.json().catch(()=>({})),t=r?.error?.message||r?.message||"Registrasi gagal.";return r?.error?.code==="CONFLICT"||i.status===409?{ok:!1,error:"Email sudah terdaftar. Silakan login."}:{ok:!1,error:t}}return{ok:!0}}catch{return{ok:!1,error:"Koneksi gagal — coba lagi."}}}async function H(){try{await L(`${y.apiBase}/api/auth/logout`,{method:"POST"})}catch{}u={user:null,type:null,accessToken:null},v(),P()}async function J(){try{return(await L(`${y.apiBase}/api/access-check?product=${y.product}`)).ok}catch{return!1}}async function C(){if(!u.accessToken)return null;try{const e=await L(`${y.apiBase}/api/auth/me`);if(!e.ok)return u={user:null,type:null,accessToken:null},v(),null;const a=await e.json(),n=a?.data||a?.user||a;return u.user={id:n.id,email:n.email,name:n.name||"",role:n.role||"subscriber",is_active:n.is_active??!0},u.type||(u.type="subscriber"),v(),u.user}catch{return null}}async function z(){return N()&&await C()?(P(),!0):!1}function O(e,a){let n="login";function i(){e.innerHTML=`
      <div class="auth-container">
        <div class="auth-card">
          <div class="auth-logo">
            <span class="logo-icon">🏥</span>
            <span class="logo-text">Klinik</span>
          </div>

          <div class="auth-tabs">
            <button class="auth-tab ${n==="login"?"active":""}" id="tab-login">Masuk</button>
            <button class="auth-tab ${n==="register"?"active":""}" id="tab-register">Daftar</button>
          </div>

          <div id="auth-error"></div>
          <div id="auth-success"></div>

          ${n==="login"?r():t()}
        </div>
      </div>
    `,o()}function r(){return`
      <h2 class="auth-title">Selamat datang kembali</h2>
      <p class="auth-subtitle">Masuk untuk mengakses invoice & kwitansi Anda</p>

      <form id="login-form" autocomplete="on">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input id="inp-email" class="form-input" type="email" placeholder="dokter@email.com" autocomplete="email" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrap">
            <input id="inp-pass" class="form-input" type="password" placeholder="••••••••" autocomplete="current-password" required />
            <button type="button" class="pass-toggle" id="toggle-pass">👁</button>
          </div>
        </div>
        <button id="login-btn" class="btn btn-primary" type="submit">
          Masuk ke Klinik
        </button>
      </form>
    `}function t(){return`
      <h2 class="auth-title">Buat akun baru</h2>
      <p class="auth-subtitle">Daftar dan mulai buat kwitansi profesional hari ini</p>

      <form id="register-form" autocomplete="on">
        <div class="form-group">
          <label class="form-label">Nama Lengkap</label>
          <input id="inp-name" class="form-input" type="text" placeholder="dr. Budi Santoso" autocomplete="name" required />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input id="inp-email" class="form-input" type="email" placeholder="dokter@email.com" autocomplete="email" required />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <div class="form-input-wrap">
            <input id="inp-pass" class="form-input" type="password" placeholder="Min. 8 karakter" autocomplete="new-password" required minlength="8" />
            <button type="button" class="pass-toggle" id="toggle-pass">👁</button>
          </div>
        </div>
        <button id="register-btn" class="btn btn-primary" type="submit">
          Buat Akun Gratis
        </button>
      </form>
      <p style="font-size:12px;color:var(--text-3);text-align:center;margin-top:12px;">
        Dengan mendaftar, Anda menyetujui <a href="/terms.html" target="_blank">Syarat & Ketentuan</a>
      </p>
    `}function s(d){const c=e.querySelector("#auth-error");c.innerHTML=`<div class="error-msg">${d}</div>`}function f(d){const c=e.querySelector("#auth-success");c.innerHTML=`<div class="success-msg">${d}</div>`}function g(){const d=e.querySelector("#auth-error"),c=e.querySelector("#auth-success");d&&(d.innerHTML=""),c&&(c.innerHTML="")}function b(d,c,m){const l=e.querySelector(`#${d}`);l&&(l.disabled=c,l.innerHTML=c?'<div class="spinner"></div>':m)}function o(){e.querySelector("#tab-login")?.addEventListener("click",()=>{n="login",i()}),e.querySelector("#tab-register")?.addEventListener("click",()=>{n="register",i()}),e.querySelector("#toggle-pass")?.addEventListener("click",()=>{const d=e.querySelector("#inp-pass");d&&(d.type=d.type==="password"?"text":"password")}),e.querySelector("#login-form")?.addEventListener("submit",async d=>{d.preventDefault(),g();const c=e.querySelector("#inp-email").value.trim(),m=e.querySelector("#inp-pass").value;b("login-btn",!0,"Masuk ke Klinik");const l=await M(c,m);b("login-btn",!1,"Masuk ke Klinik"),l.ok?a():s(l.error||"Login gagal.")}),e.querySelector("#register-form")?.addEventListener("submit",async d=>{d.preventDefault(),g();const c=e.querySelector("#inp-name").value.trim(),m=e.querySelector("#inp-email").value.trim(),l=e.querySelector("#inp-pass").value;b("register-btn",!0,"Buat Akun Gratis");const p=await R(m,l,c);b("register-btn",!1,"Buat Akun Gratis"),p.ok?(f("Akun berhasil dibuat! Silakan masuk."),setTimeout(()=>{n="login",i()},1500)):s(p.error||"Registrasi gagal.")})}i()}function _(e){return"Rp "+e.toLocaleString("id-ID")}function F(e){return{monthly:"/ bulan","3month":"/ 3 bulan","6month":"/ 6 bulan",yearly:"/ tahun"}[e]||"/ periode"}function W(e,a){let n=[],i=null,r=!0,t=!1,s="";async function f(){r=!0,g();try{const o=await fetch(`${y.apiBase}/api/plans?product=${y.product}`);o.ok&&(n=((await o.json())?.data||[]).filter(m=>m.is_active),n.length>0&&(i=n[0].id))}catch{}r=!1,g()}function g(){e.innerHTML=`
      <div class="pricing-container">
        <div class="pricing-header">
          <div class="pricing-badge">🏥 Klinik Invoice</div>
          <h1 class="pricing-title">Pilih Paket Berlangganan</h1>
          <p class="pricing-subtitle">Buat kwitansi & invoice pasien tanpa batas. Profesional, print-ready, legal.</p>
        </div>

        ${s?`<div class="error-msg" style="max-width:480px;margin-bottom:24px;">${s}</div>`:""}

        ${r?'<div class="spinner" style="margin:40px auto"></div>':n.length===0?`<div style="text-align:center;color:var(--text-2);padding:40px">
                     Paket belum tersedia. Hubungi admin.
                   </div>`:`
            <div class="plans-grid">
              ${n.map(o=>`
                <div class="plan-card ${i===o.id?"selected":""}"
                     data-plan-id="${o.id}"
                     id="plan-${o.id}">
                  <div class="plan-name">${o.label||o.duration}</div>
                  <div class="plan-price">
                    ${_(o.price_idr)}
                    <small>${F(o.duration)}</small>
                  </div>
                  <ul class="plan-features">
                    <li>Invoice & kwitansi unlimited</li>
                    <li>Nomor invoice otomatis</li>
                    <li>Print & ekspor PDF</li>
                    <li>Riwayat transaksi</li>
                    <li>Support via WhatsApp</li>
                  </ul>
                </div>
              `).join("")}
            </div>

            <button id="checkout-btn" class="btn btn-primary"
                    style="max-width:320px;width:100%;font-size:16px;padding:14px"
                    ${i?"":"disabled"}>
              ${t?'<div class="spinner"></div>':"Mulai Berlangganan →"}
            </button>

            <p style="font-size:13px;color:var(--text-3);margin-top:12px;text-align:center;">
              Bayar aman via Midtrans · QRIS · Transfer Bank · GoPay
            </p>
          `}
      </div>
    `,b()}function b(){e.querySelectorAll(".plan-card").forEach(o=>{o.addEventListener("click",()=>{i=o.dataset.planId||null,e.querySelectorAll(".plan-card").forEach(c=>c.classList.remove("selected")),o.classList.add("selected");const d=e.querySelector("#checkout-btn");d&&(d.disabled=!i)})}),e.querySelector("#checkout-btn")?.addEventListener("click",async()=>{if(!(!i||t)){s="",t=!0,g();try{const o=await fetch(`${y.apiBase}/api/checkout`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${T()}`},body:JSON.stringify({plan_id:i,utm_source:"klinik-app"})}),d=await o.json();o.ok&&d?.data?.checkout_url?window.location.href=d.data.checkout_url:o.status===409?a():(s=d?.error?.message||"Gagal membuat transaksi. Coba lagi.",t=!1,g())}catch{s="Koneksi gagal. Periksa internet Anda.",t=!1,g()}}})}f(),window.location.hash.startsWith("#/payment/success")&&a()}const U={id:"surat-lamaran",name:"Surat Lamaran Kerja",category:"lamaran",icon:"📝",description:"Surat lamaran kerja formal untuk melamar posisi di perusahaan",needsLetterhead:!1,fields:[{id:"kota",label:"Kota Pengirim",type:"text",required:!0,placeholder:"Jakarta"},{id:"tanggal",label:"Tanggal Surat",type:"date",required:!0},{id:"perusahaan",label:"Nama Perusahaan",type:"text",required:!0,placeholder:"PT Maju Bersama"},{id:"alamatPerusahaan",label:"Alamat Perusahaan",type:"textarea",required:!0,placeholder:"Jl. Sudirman No.1, Jakarta"},{id:"posisi",label:"Posisi yang Dilamar",type:"text",required:!0,placeholder:"Staff Administrasi"},{id:"nama",label:"Nama Lengkap",type:"text",required:!0,placeholder:"Budi Santoso"},{id:"ttl",label:"Tempat, Tanggal Lahir",type:"text",required:!0,placeholder:"Jakarta, 1 Januari 2000"},{id:"alamat",label:"Alamat",type:"textarea",required:!0,placeholder:"Jl. Melati No. 5, Jakarta Selatan"},{id:"noHp",label:"No. HP",type:"text",required:!0,placeholder:"08xx-xxxx-xxxx"},{id:"emailPelamar",label:"Email",type:"email",required:!1,placeholder:"budi@email.com"},{id:"pendidikan",label:"Pendidikan Terakhir",type:"dropdown",required:!0,options:["SD","SMP","SMA/SMK","D1","D2","D3","D4/S1","S2","S3"]},{id:"jurusan",label:"Jurusan / Program Studi",type:"text",required:!1,placeholder:"Manajemen"},{id:"pengalaman",label:"Ringkasan Pengalaman (opsional)",type:"textarea",required:!1,placeholder:"2 tahun pengalaman di bidang administrasi"}],renderLayout(e){const a=e.tanggal?new Date(e.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...";return`
            <div class="letter-page">
                <div class="letter-place-date" style="text-align:right;">
                    ${e.kota||"..."}, ${a}
                </div>

                <div class="letter-recipient" style="margin:24px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>HRD ${e.perusahaan||"..."}</strong></p>
                    <p>di ${e.alamatPerusahaan||"..."}</p>
                </div>

                <div class="letter-body">
                    <p>Dengan hormat,</p>
                    <p style="margin-top:12px;">
                        Berdasarkan informasi lowongan pekerjaan yang saya peroleh,
                        dengan ini saya mengajukan lamaran untuk posisi
                        <strong>${e.posisi||"..."}</strong> di ${e.perusahaan||"..."}.
                    </p>

                    <p style="margin-top:12px;">Berikut data diri saya:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:180px;">Nama Lengkap</td><td>: ${e.nama||"..."}</td></tr>
                        <tr><td>Tempat, Tanggal Lahir</td><td>: ${e.ttl||"..."}</td></tr>
                        <tr><td>Alamat</td><td>: ${e.alamat||"..."}</td></tr>
                        <tr><td>No. HP</td><td>: ${e.noHp||"..."}</td></tr>
                        ${e.emailPelamar?`<tr><td>Email</td><td>: ${e.emailPelamar}</td></tr>`:""}
                        <tr><td>Pendidikan Terakhir</td><td>: ${e.pendidikan||"..."}${e.jurusan?` — ${e.jurusan}`:""}</td></tr>
                    </table>

                    ${e.pengalaman?`<p style="margin-top:12px;">Saya memiliki ${e.pengalaman}.</p>`:""}

                    <p style="margin-top:12px;">
                        Sebagai bahan pertimbangan, bersama surat ini saya lampirkan:
                    </p>
                    <ol style="margin:8px 0 8px 20px;">
                        <li>Curriculum Vitae (CV)</li>
                        <li>Fotokopi KTP</li>
                        <li>Fotokopi Ijazah Terakhir</li>
                        <li>Pas Foto Terbaru</li>
                    </ol>

                    <p style="margin-top:12px;">
                        Besar harapan saya untuk dapat bergabung dan berkontribusi di ${e.perusahaan||"..."}.
                        Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.
                    </p>
                </div>

                <div class="letter-signature" style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <br><br><br>
                    <p><strong><u>${e.nama||"..."}</u></strong></p>
                </div>
            </div>
        `}};function G(e){return e?`
        <div class="letter-kop">
            <div class="kop-content">
                ${e.logo?`<img src="${e.logo}" class="kop-logo" alt="Logo">`:""}
                <div class="kop-text">
                    <h2>${e.institutionName}</h2>
                    <p>${e.address}</p>
                    ${e.phone?`<p>Telp: ${e.phone}</p>`:""}
                    ${e.email?`<p>Email: ${e.email}</p>`:""}
                </div>
            </div>
            <hr class="kop-line">
        </div>
    `:""}const Y={id:"surat-keterangan-domisili",name:"Surat Keterangan Domisili",category:"keterangan",icon:"📜",description:"Surat keterangan tempat tinggal dari kelurahan/desa",needsLetterhead:!0,fields:[{id:"nomorSurat",label:"Nomor Surat",type:"text",required:!0,placeholder:"001/SKD/III/2026"},{id:"namaKepala",label:"Nama Kepala Desa/Lurah",type:"text",required:!0,placeholder:"H. Ahmad, S.Sos"},{id:"jabatan",label:"Jabatan",type:"text",required:!0,placeholder:"Lurah Sukamaju",defaultValue:"Lurah"},{id:"namaWarga",label:"Nama Warga",type:"text",required:!0,placeholder:"Budi Santoso"},{id:"nik",label:"NIK",type:"text",required:!0,placeholder:"3201xxxxxxxxxx"},{id:"ttl",label:"Tempat, Tanggal Lahir",type:"text",required:!0,placeholder:"Bandung, 15 Mei 1990"},{id:"jenisKelamin",label:"Jenis Kelamin",type:"dropdown",required:!0,options:["Laki-laki","Perempuan"]},{id:"agama",label:"Agama",type:"dropdown",required:!0,options:["Islam","Kristen","Katolik","Hindu","Buddha","Konghucu"]},{id:"pekerjaan",label:"Pekerjaan",type:"text",required:!0,placeholder:"Wiraswasta"},{id:"alamat",label:"Alamat",type:"textarea",required:!0,placeholder:"Jl. Melati No. 5, RT 03/RW 02"},{id:"keperluan",label:"Keperluan",type:"text",required:!0,placeholder:"Mengurus KTP / Keperluan Bank"},{id:"tanggal",label:"Tanggal Surat",type:"date",required:!0}],renderLayout(e,a){const n=e.tanggal?new Date(e.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...";return`
            <div class="letter-page">
                ${G(a)}

                <div class="letter-title" style="text-align:center;margin:24px 0;">
                    <h3 style="text-decoration:underline;margin-bottom:4px;">SURAT KETERANGAN DOMISILI</h3>
                    <p style="font-size:12px;">Nomor: ${e.nomorSurat||"..."}</p>
                </div>

                <div class="letter-body">
                    <p>Yang bertanda tangan di bawah ini:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:160px;">Nama</td><td>: ${e.namaKepala||"..."}</td></tr>
                        <tr><td>Jabatan</td><td>: ${e.jabatan||"..."}</td></tr>
                    </table>

                    <p>Dengan ini menerangkan bahwa:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:160px;">Nama</td><td>: ${e.namaWarga||"..."}</td></tr>
                        <tr><td>NIK</td><td>: ${e.nik||"..."}</td></tr>
                        <tr><td>Tempat, Tgl. Lahir</td><td>: ${e.ttl||"..."}</td></tr>
                        <tr><td>Jenis Kelamin</td><td>: ${e.jenisKelamin||"..."}</td></tr>
                        <tr><td>Agama</td><td>: ${e.agama||"..."}</td></tr>
                        <tr><td>Pekerjaan</td><td>: ${e.pekerjaan||"..."}</td></tr>
                        <tr><td>Alamat</td><td>: ${e.alamat||"..."}</td></tr>
                    </table>

                    <p style="margin-top:12px;">
                        Orang tersebut di atas adalah benar berdomisili di alamat yang disebutkan
                        dan tercatat sebagai penduduk wilayah kami.
                    </p>

                    <p style="margin-top:12px;">
                        Surat keterangan ini dibuat untuk keperluan <strong>${e.keperluan||"..."}</strong>
                        dan dapat dipergunakan sebagaimana mestinya.
                    </p>
                </div>

                <div class="letter-signature" style="margin-top:40px;text-align:right;margin-right:40px;">
                    <p>${a?.institutionName||"..."}, ${n}</p>
                    <p>${e.jabatan||"..."}</p>
                    <br><br><br>
                    <p><strong><u>${e.namaKepala||"..."}</u></strong></p>
                </div>
            </div>
        `}},V={id:"surat-resign",name:"Surat Pengunduran Diri (Resign)",category:"resign",icon:"💼",description:"Surat resign profesional dan sopan untuk mengundurkan diri dari perusahaan",needsLetterhead:!1,fields:[{id:"kota",label:"Kota",type:"text",required:!0,placeholder:"Jakarta"},{id:"tanggal",label:"Tanggal Surat",type:"date",required:!0},{id:"namaAtasan",label:"Nama Atasan / HRD",type:"text",required:!0,placeholder:"Bapak/Ibu HRD"},{id:"perusahaan",label:"Nama Perusahaan",type:"text",required:!0,placeholder:"PT Maju Bersama"},{id:"alamatPerusahaan",label:"Alamat Perusahaan",type:"textarea",required:!1,placeholder:"Jl. Sudirman No.1, Jakarta"},{id:"nama",label:"Nama Karyawan",type:"text",required:!0,placeholder:"Budi Santoso"},{id:"jabatan",label:"Jabatan / Posisi",type:"text",required:!0,placeholder:"Staff Marketing"},{id:"departemen",label:"Departemen",type:"text",required:!1,placeholder:"Marketing"},{id:"tanggalEfektif",label:"Tanggal Efektif Resign",type:"date",required:!0},{id:"alasan",label:"Alasan (opsional)",type:"textarea",required:!1,placeholder:"Ingin mengejar peluang karir lain"}],renderLayout(e){const a=e.tanggal?new Date(e.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...",n=e.tanggalEfektif?new Date(e.tanggalEfektif).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...";return`
            <div class="letter-page">
                <div class="letter-place-date" style="text-align:right;">
                    ${e.kota||"..."}, ${a}
                </div>

                <div class="letter-recipient" style="margin:24px 0;">
                    <p>Kepada Yth.</p>
                    <p><strong>${e.namaAtasan||"..."}</strong></p>
                    <p>${e.perusahaan||"..."}</p>
                    ${e.alamatPerusahaan?`<p>di ${e.alamatPerusahaan}</p>`:""}
                </div>

                <div class="letter-body">
                    <p><strong>Perihal: Pengunduran Diri</strong></p>

                    <p style="margin-top:16px;">Dengan hormat,</p>

                    <p style="margin-top:12px;">
                        Melalui surat ini, saya yang bertanda tangan di bawah ini:
                    </p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:140px;">Nama</td><td>: ${e.nama||"..."}</td></tr>
                        <tr><td>Jabatan</td><td>: ${e.jabatan||"..."}</td></tr>
                        ${e.departemen?`<tr><td>Departemen</td><td>: ${e.departemen}</td></tr>`:""}
                    </table>

                    <p style="margin-top:12px;">
                        Bermaksud untuk mengajukan pengunduran diri dari ${e.perusahaan||"..."},
                        terhitung efektif pada tanggal <strong>${n}</strong>.
                    </p>

                    ${e.alasan?`
                    <p style="margin-top:12px;">
                        Adapun alasan pengunduran diri saya adalah: ${e.alasan}.
                    </p>
                    `:""}

                    <p style="margin-top:12px;">
                        Saya mengucapkan terima kasih yang sebesar-besarnya atas kesempatan,
                        bimbingan, dan pengalaman yang telah saya peroleh selama bekerja
                        di ${e.perusahaan||"..."}.
                    </p>

                    <p style="margin-top:12px;">
                        Saya berkomitmen untuk menyelesaikan seluruh tanggung jawab dan melakukan
                        proses serah terima pekerjaan hingga tanggal efektif pengunduran diri.
                    </p>

                    <p style="margin-top:12px;">
                        Demikian surat ini saya buat dengan penuh kesadaran dan tanpa paksaan dari pihak manapun.
                        Atas perhatian dan pengertian Bapak/Ibu, saya ucapkan terima kasih.
                    </p>
                </div>

                <div class="letter-signature" style="margin-top:40px;">
                    <p>Hormat saya,</p>
                    <br><br><br>
                    <p><strong><u>${e.nama||"..."}</u></strong></p>
                    <p>${e.jabatan||"..."}</p>
                </div>
            </div>
        `}},Q={id:"surat-kuasa",name:"Surat Kuasa",category:"bisnis",icon:"📋",description:"Surat kuasa untuk memberikan wewenang kepada orang lain",needsLetterhead:!1,fields:[{id:"tanggal",label:"Tanggal Surat",type:"date",required:!0},{id:"namaPemberi",label:"Nama Pemberi Kuasa",type:"text",required:!0,placeholder:"Budi Santoso"},{id:"nikPemberi",label:"NIK Pemberi Kuasa",type:"text",required:!0,placeholder:"3201xxxxxxxxxx"},{id:"alamatPemberi",label:"Alamat Pemberi Kuasa",type:"textarea",required:!0,placeholder:"Jl. Melati No. 5, Jakarta"},{id:"namaPenerima",label:"Nama Penerima Kuasa",type:"text",required:!0,placeholder:"Siti Aminah"},{id:"nikPenerima",label:"NIK Penerima Kuasa",type:"text",required:!0,placeholder:"3201xxxxxxxxxx"},{id:"alamatPenerima",label:"Alamat Penerima Kuasa",type:"textarea",required:!0,placeholder:"Jl. Mawar No. 10, Jakarta"},{id:"keperluan",label:"Keperluan / Hal yang Dikuasakan",type:"textarea",required:!0,placeholder:"Mengambil dokumen BPKB di Kantor Samsat"},{id:"kota",label:"Kota",type:"text",required:!0,placeholder:"Jakarta"}],renderLayout(e){const a=e.tanggal?new Date(e.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...";return`
            <div class="letter-page">
                <div class="letter-title" style="text-align:center;margin:24px 0;">
                    <h3 style="text-decoration:underline;margin-bottom:4px;">SURAT KUASA</h3>
                </div>

                <div class="letter-body">
                    <p>Yang bertanda tangan di bawah ini:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:140px;">Nama</td><td>: ${e.namaPemberi||"..."}</td></tr>
                        <tr><td>NIK</td><td>: ${e.nikPemberi||"..."}</td></tr>
                        <tr><td>Alamat</td><td>: ${e.alamatPemberi||"..."}</td></tr>
                    </table>

                    <p style="margin-top:8px;">
                        Selanjutnya disebut sebagai <strong>PEMBERI KUASA</strong>.
                    </p>

                    <p style="margin-top:16px;">Dengan ini memberikan kuasa kepada:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:140px;">Nama</td><td>: ${e.namaPenerima||"..."}</td></tr>
                        <tr><td>NIK</td><td>: ${e.nikPenerima||"..."}</td></tr>
                        <tr><td>Alamat</td><td>: ${e.alamatPenerima||"..."}</td></tr>
                    </table>

                    <p style="margin-top:8px;">
                        Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.
                    </p>

                    <hr style="margin:20px 0;border:1px solid #ddd;">

                    <p>
                        Untuk dan atas nama Pemberi Kuasa, melaksanakan hal sebagai berikut:
                    </p>

                    <div style="margin:12px 0 12px 20px;padding:12px;background:#f8f9fa;border-radius:4px;border-left:3px solid #333;">
                        <p><strong>${e.keperluan||"..."}</strong></p>
                    </div>

                    <p style="margin-top:16px;">
                        Demikian surat kuasa ini dibuat dengan sebenar-benarnya untuk dapat
                        dipergunakan sebagaimana mestinya.
                    </p>
                </div>

                <div style="display:flex;justify-content:space-between;margin-top:40px;">
                    <div class="letter-signature" style="text-align:center;width:45%;">
                        <p>Penerima Kuasa,</p>
                        <br><br><br>
                        <p><strong><u>${e.namaPenerima||"..."}</u></strong></p>
                    </div>
                    <div class="letter-signature" style="text-align:center;width:45%;">
                        <p>${e.kota||"..."}, ${a}</p>
                        <p>Pemberi Kuasa,</p>
                        <br><br><br>
                        <p><strong><u>${e.namaPemberi||"..."}</u></strong></p>
                    </div>
                </div>
            </div>
        `}};function X(e){return e?`
        <div class="letter-kop">
            <div class="kop-content">
                ${e.logo?`<img src="${e.logo}" class="kop-logo" alt="Logo">`:""}
                <div class="kop-text">
                    <h2>${e.institutionName}</h2>
                    <p>${e.address}</p>
                    ${e.phone?`<p>Telp: ${e.phone}</p>`:""}
                    ${e.email?`<p>Email: ${e.email}</p>`:""}
                </div>
            </div>
            <hr class="kop-line">
        </div>
    `:""}const Z={id:"surat-pengantar-rt",name:"Surat Pengantar RT/RW",category:"pengantar",icon:"📨",description:"Surat pengantar dari RT/RW untuk keperluan administrasi",needsLetterhead:!0,fields:[{id:"nomorSurat",label:"Nomor Surat",type:"text",required:!0,placeholder:"001/RT05/III/2026"},{id:"namaKetuaRT",label:"Nama Ketua RT/RW",type:"text",required:!0,placeholder:"H. Dede Supriatna"},{id:"noRT",label:"Nomor RT/RW",type:"text",required:!0,placeholder:"RT 05 / RW 02"},{id:"kelurahan",label:"Kelurahan/Desa",type:"text",required:!0,placeholder:"Sukamaju"},{id:"kecamatan",label:"Kecamatan",type:"text",required:!0,placeholder:"Cibeunying Kaler"},{id:"namaWarga",label:"Nama Warga",type:"text",required:!0,placeholder:"Budi Santoso"},{id:"nik",label:"NIK",type:"text",required:!0,placeholder:"3201xxxxxxxxxx"},{id:"alamat",label:"Alamat",type:"textarea",required:!0,placeholder:"Jl. Melati No. 5"},{id:"keperluan",label:"Keperluan",type:"text",required:!0,placeholder:"Membuat KTP / Surat Pindah"},{id:"keterangan",label:"Keterangan Tambahan",type:"textarea",required:!1,placeholder:"Keterangan lain yang perlu ditambahkan"},{id:"tanggal",label:"Tanggal Surat",type:"date",required:!0}],renderLayout(e,a){const n=e.tanggal?new Date(e.tanggal).toLocaleDateString("id-ID",{day:"numeric",month:"long",year:"numeric"}):"...";return`
            <div class="letter-page">
                ${X(a)}

                <div class="letter-title" style="text-align:center;margin:24px 0;">
                    <h3 style="text-decoration:underline;margin-bottom:4px;">SURAT PENGANTAR</h3>
                    <p style="font-size:12px;">Nomor: ${e.nomorSurat||"..."}</p>
                </div>

                <div class="letter-body">
                    <p>Yang bertanda tangan di bawah ini, Ketua ${e.noRT||"..."}, Kelurahan ${e.kelurahan||"..."}, 
                    Kecamatan ${e.kecamatan||"..."}, dengan ini memperkenalkan/memberikan pengantar kepada:</p>

                    <table class="letter-data-table" style="margin:12px 0 12px 20px;">
                        <tr><td style="width:140px;">Nama</td><td>: ${e.namaWarga||"..."}</td></tr>
                        <tr><td>NIK</td><td>: ${e.nik||"..."}</td></tr>
                        <tr><td>Alamat</td><td>: ${e.alamat||"..."}</td></tr>
                    </table>

                    <p style="margin-top:12px;">
                        Orang tersebut di atas adalah benar warga ${e.noRT||"..."}, Kelurahan ${e.kelurahan||"..."},
                        Kecamatan ${e.kecamatan||"..."}, dan bermaksud untuk keperluan:
                    </p>

                    <div style="margin:12px 0 12px 20px;padding:12px;background:#f8f9fa;border-radius:4px;border-left:3px solid #333;">
                        <p><strong>${e.keperluan||"..."}</strong></p>
                    </div>

                    ${e.keterangan?`
                    <p style="margin-top:12px;">
                        Keterangan tambahan: ${e.keterangan}
                    </p>
                    `:""}

                    <p style="margin-top:12px;">
                        Demikian surat pengantar ini dibuat untuk dapat dipergunakan sebagaimana mestinya.
                        Atas perhatiannya diucapkan terima kasih.
                    </p>
                </div>

                <div class="letter-signature" style="margin-top:40px;text-align:right;margin-right:40px;">
                    <p>${e.kelurahan||"..."}, ${n}</p>
                    <p>Ketua ${e.noRT||"..."}</p>
                    <br><br><br>
                    <p><strong><u>${e.namaKetuaRT||"..."}</u></strong></p>
                </div>
            </div>
        `}},A=[U,Y,V,Q,Z];function ee(){return[...new Set(A.map(e=>e.category))]}function ae(e){return A.filter(a=>a.category===e)}const te={lamaran:"📝 Surat Lamaran",keterangan:"📜 Surat Keterangan",pengantar:"📨 Surat Pengantar",bisnis:"📋 Surat Bisnis & Perjanjian",resign:"💼 Surat Resign & HR",sosial:"🎉 Surat Sosial"},E="surat_letters";function B(){try{const e=localStorage.getItem(E);return e?JSON.parse(e):[]}catch{return[]}}function re(e){localStorage.setItem(E,JSON.stringify(e))}function ne(e){re(B().filter(a=>a.id!==e))}function I(e){const a=ee(),n=B();e.innerHTML=`
        <div class="dashboard">
            <div class="dashboard-header">
                <h1>📝 Buat Surat</h1>
                <p class="dashboard-subtitle">Pilih template, isi form, langsung print/PDF.</p>
            </div>

            <div class="search-bar">
                <input type="text" id="template-search" placeholder="🔍 Cari template surat..." class="search-input">
            </div>

            <div id="template-grid" class="template-grid">
                ${a.map(r=>`
                    <div class="category-section" data-category="${r}">
                        <h2 class="category-title">${te[r]}</h2>
                        <div class="category-cards">
                            ${ae(r).map(t=>`
                                <div class="template-card" data-template-id="${t.id}" data-name="${t.name.toLowerCase()}">
                                    <span class="template-icon">${t.icon}</span>
                                    <div class="template-info">
                                        <h3>${t.name}</h3>
                                        <p>${t.description}</p>
                                    </div>
                                    <button class="btn-use-template" data-id="${t.id}">Gunakan →</button>
                                </div>
                            `).join("")}
                        </div>
                    </div>
                `).join("")}
            </div>

            ${n.length>0?`
                <div class="history-section">
                    <h2>📂 Riwayat Surat</h2>
                    <div class="history-list">
                        ${n.map(r=>`
                            <div class="history-item" data-letter-id="${r.id}">
                                <div class="history-info">
                                    <strong>${r.templateName}</strong>
                                    <span class="history-date">${new Date(r.createdAt).toLocaleDateString("id-ID")}</span>
                                </div>
                                <div class="history-actions">
                                    <button class="btn-open-letter" data-id="${r.id}">Buka</button>
                                    <button class="btn-delete-letter" data-id="${r.id}">🗑️</button>
                                </div>
                            </div>
                        `).join("")}
                    </div>
                </div>
            `:""}
        </div>
    `;const i=e.querySelector("#template-search");i?.addEventListener("input",()=>{const r=i.value.toLowerCase();e.querySelectorAll(".template-card").forEach(t=>{const s=t.getAttribute("data-name")||"";t.style.display=s.includes(r)?"":"none"}),e.querySelectorAll(".category-section").forEach(t=>{const s=t.querySelectorAll('.template-card[style=""], .template-card:not([style])');t.style.display=s.length>0?"":"none"})}),e.querySelectorAll(".btn-use-template").forEach(r=>{r.addEventListener("click",()=>{const t=r.getAttribute("data-id");t&&(window.location.hash=`#/template/${t}`)})}),e.querySelectorAll(".btn-delete-letter").forEach(r=>{r.addEventListener("click",()=>{const t=r.getAttribute("data-id");t&&confirm("Hapus surat ini?")&&(ne(t),I(e))})}),e.querySelectorAll(".btn-open-letter").forEach(r=>{r.addEventListener("click",()=>{const t=r.getAttribute("data-id");t&&(window.location.hash=`#/letter/${t}`)})})}function ie(e,a){const n=q(),i=n?.name?n.name[0].toUpperCase():"?";e.innerHTML=`
    <nav class="nav">
      <a href="#/" class="nav-brand" id="nav-home">
        <span class="brand-icon">🏥</span>
        <span class="brand-name">Klinik</span>
      </a>
      <div class="nav-actions">
        <div class="user-badge">
          <div class="avatar">${i}</div>
          <span class="user-name">${n?.name||n?.email||"Dokter"}</span>
        </div>
        <button id="logout-btn" class="btn-logout">Keluar</button>
      </div>
    </nav>
  `,e.querySelector("#logout-btn")?.addEventListener("click",async()=>{confirm("Yakin ingin keluar?")&&(await H(),a())})}function se(){if(document.getElementById("feedback-fab"))return;const e=document.createElement("div");e.id="feedback-fab",e.innerHTML=`
    <button id="feedback-trigger" title="Kirim Saran / Feedback" aria-label="Beri Feedback">
      💬
    </button>

    <!-- Modal -->
    <div id="feedback-modal" role="dialog" aria-modal="true" aria-labelledby="feedback-modal-title" style="display:none;">
      <div id="feedback-modal-box">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 id="feedback-modal-title" style="font-size:15px;font-weight:700;color:var(--text-1);">
            💬 Kirim Saran atau Pertanyaan
          </h3>
          <button id="feedback-close" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text-3);line-height:1;">×</button>
        </div>
        <p style="font-size:13px;color:var(--text-3);margin-bottom:16px;">
          Ada yang kurang? Ada request fitur? Ada bug? Cerita aja langsung.
        </p>

        <div id="feedback-form-area">
          <!-- Kategori -->
          <div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap;">
            <button class="fb-cat-btn active" data-cat="saran"   style="">💡 Saran Fitur</button>
            <button class="fb-cat-btn"         data-cat="pertanyaan" style="">❓ Pertanyaan</button>
            <button class="fb-cat-btn"         data-cat="bug"    style="">🐛 Bug / Error</button>
          </div>

          <!-- Rating -->
          <div style="margin-bottom:14px;">
            <label style="font-size:12px;color:var(--text-3);display:block;margin-bottom:6px;">Seberapa puas dengan Klinik App?</label>
            <div id="star-rating" style="display:flex;gap:6px;">
              ${[1,2,3,4,5].map(a=>`
                <button class="star-btn" data-val="${a}" title="${a} bintang"
                        style="font-size:22px;background:none;border:none;cursor:pointer;opacity:.4;transition:opacity .15s;">★</button>
              `).join("")}
            </div>
          </div>

          <!-- Pesan -->
          <textarea id="feedback-msg" class="form-input" rows="4"
            placeholder="Tulis pesanmu di sini... (min. 10 karakter)"
            style="resize:vertical;min-height:90px;font-size:13px;"></textarea>

          <!-- Error / Success -->
          <div id="feedback-error" style="display:none;color:var(--danger);font-size:13px;margin-top:8px;"></div>

          <button id="feedback-submit" class="btn btn-primary" style="margin-top:12px;width:100%;">
            Kirim Feedback
          </button>
        </div>

        <!-- Success state -->
        <div id="feedback-success" style="display:none;text-align:center;padding:24px 0;">
          <div style="font-size:40px;margin-bottom:12px;">🙏</div>
          <p style="font-weight:600;color:var(--text-1);">Makasih atas feedbacknya!</p>
          <p style="font-size:13px;color:var(--text-3);margin-top:4px;">Gue baca semua pesan yang masuk.</p>
          <button id="feedback-reset" class="btn btn-ghost" style="margin-top:16px;">Kirim lagi</button>
        </div>
      </div>
    </div>
  `,document.body.appendChild(e),le(),oe()}function le(){if(document.getElementById("feedback-fab-styles"))return;const e=document.createElement("style");e.id="feedback-fab-styles",e.textContent=`
    #feedback-fab {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
    }
    #feedback-trigger {
      width: 48px; height: 48px; border-radius: 50%;
      background: var(--accent); border: none; cursor: pointer;
      font-size: 20px; box-shadow: 0 4px 16px rgba(59,130,246,.4);
      transition: transform .15s, box-shadow .15s;
      display: flex; align-items: center; justify-content: center;
    }
    #feedback-trigger:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(59,130,246,.5); }
    #feedback-modal {
      position: fixed; inset: 0; background: rgba(0,0,0,.6);
      display: flex; align-items: flex-end; justify-content: flex-end;
      padding: 0 24px 86px; z-index: 9998;
    }
    #feedback-modal-box {
      background: var(--bg-2); border: 1px solid var(--border);
      border-radius: var(--radius); padding: 20px;
      width: 340px; max-width: calc(100vw - 48px);
      box-shadow: var(--shadow-lg, 0 20px 60px rgba(0,0,0,.5));
      animation: fbSlideUp .2s ease;
    }
    @keyframes fbSlideUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
    .fb-cat-btn {
      padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;
      border: 1px solid var(--border); background: var(--bg-3);
      color: var(--text-3); cursor: pointer; transition: all .15s;
    }
    .fb-cat-btn.active, .fb-cat-btn:hover {
      background: var(--accent); border-color: var(--accent); color: #fff;
    }
    .star-btn.active { opacity: 1 !important; }
    .star-btn:hover, .star-btn.hovered { opacity: .85 !important; }
  `,document.head.appendChild(e)}function oe(){const e=document.getElementById("feedback-trigger"),a=document.getElementById("feedback-modal"),n=document.getElementById("feedback-close"),i=document.getElementById("feedback-submit"),r=document.getElementById("feedback-reset"),t=document.getElementById("feedback-msg"),s=document.getElementById("feedback-error"),f=document.getElementById("feedback-form-area"),g=document.getElementById("feedback-success");let b="saran",o=null;const d=()=>{a.style.display="flex",t.focus()},c=()=>{a.style.display="none"};e.addEventListener("click",d),n.addEventListener("click",c),a.addEventListener("click",l=>{l.target===a&&c()}),document.querySelectorAll(".fb-cat-btn").forEach(l=>{l.addEventListener("click",()=>{document.querySelectorAll(".fb-cat-btn").forEach(p=>p.classList.remove("active")),l.classList.add("active"),b=l.dataset.cat})});const m=document.querySelectorAll(".star-btn");m.forEach(l=>{l.addEventListener("click",()=>{o=parseInt(l.dataset.val),m.forEach((p,k)=>p.classList.toggle("active",k<o))}),l.addEventListener("mouseenter",()=>{const p=parseInt(l.dataset.val);m.forEach((k,S)=>k.classList.toggle("hovered",S<p))}),l.addEventListener("mouseleave",()=>{m.forEach(p=>p.classList.remove("hovered"))})}),i.addEventListener("click",async()=>{const l=t.value.trim();if(s.style.display="none",l.length<10){s.textContent="Pesan minimal 10 karakter ya.",s.style.display="block";return}i.textContent="Mengirim...",i.disabled=!0;try{const p=T(),k=await fetch(`${y.apiBase}/api/feedback`,{method:"POST",headers:{"Content-Type":"application/json",...p?{Authorization:`Bearer ${p}`}:{}},body:JSON.stringify({category:b,message:l,page_url:window.location.href,...o?{rating:o}:{}})});if(k.ok)f.style.display="none",g.style.display="block";else{const S=await k.json().catch(()=>({}));s.textContent=S.error?.message||"Gagal mengirim. Coba lagi.",s.style.display="block"}}catch{s.textContent="Koneksi gagal. Coba lagi.",s.style.display="block"}finally{i.textContent="Kirim Feedback",i.disabled=!1}}),r?.addEventListener("click",()=>{f.style.display="block",g.style.display="none",t.value="",o=null,m.forEach(l=>l.classList.remove("active")),document.querySelectorAll(".fb-cat-btn").forEach((l,p)=>l.classList.toggle("active",p===0)),b="saran",c()})}const h=document.getElementById("app");h.innerHTML=`
  <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;gap:12px;color:var(--text-3)">
    <div class="spinner" style="border-color:var(--border);border-top-color:var(--accent)"></div>
    <span style="font-size:14px">Memuat...</span>
  </div>
`;z().then(async e=>{e?await K():de()});function de(){h.innerHTML="",O(h,async()=>{h.innerHTML="",await K()})}function ue(){h.innerHTML="",W(h,async()=>{h.innerHTML="",await K()})}async function K(){if(!(q()?.role==="admin")&&!await J()){ue();return}h.innerHTML=`
    <div id="nav-container"></div>
    <div id="main-container"></div>
  `;const n=document.getElementById("nav-container"),i=document.getElementById("main-container");ie(n,()=>{window.location.reload()}),I(i),se(),j(()=>{D()||window.location.reload()})}
