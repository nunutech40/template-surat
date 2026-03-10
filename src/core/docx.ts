// ── HTML to DOCX converter using JSZip ─────────────────────────────────
// A .docx file is just a ZIP containing XML files.
// This generates a proper Open XML (OOXML) document that opens in:
// - Microsoft Word (Windows/Mac)
// - Apple Pages
// - Google Docs
// - LibreOffice Writer
import JSZip from 'jszip';

/** Convert HTML content to a .docx Blob */
export async function htmlToDocx(htmlBody: string, title: string): Promise<Blob> {
    const zip = new JSZip();

    // 1. [Content_Types].xml — declares that word/document.xml is the main part
    zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
  <Override PartName="/word/afchunk.mht" ContentType="message/rfc822"/>
</Types>`);

    // 2. _rels/.rels — root relationships
    zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

    // 3. word/_rels/document.xml.rels — document relationships (link to the altChunk)
    zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/aFChunk" Target="afchunk.mht"/>
</Relationships>`);

    // 4. word/document.xml — minimal document that imports the HTML via altChunk
    // A4: 11906 x 16838 twips (210mm x 297mm)
    zip.file('word/document.xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
            xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <w:body>
    <w:altChunk r:id="rId2"/>
    <w:sectPr>
      <w:pgSz w:w="11906" w:h="16838"/>
      <w:pgMar w:top="1134" w:right="850" w:bottom="1134" w:left="850" w:header="709" w:footer="709" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`);

    // 5. word/afchunk.mht — the actual HTML content wrapped in MIME (altChunk format)
    // This is the trick: Word will import this HTML and convert it to native Word content
    const cleanHtml = htmlBody
        .replace(/<img[^>]*class="kop-logo"[^>]*>/gi, '') // Remove base64 logo images (too large for MHT)
        .replace(/class="watermark"[^>]*>.*?<\/div>/gi, '">'); // Remove watermark

    const mhtContent = `MIME-Version: 1.0
Content-Type: multipart/related; boundary="----=_NextPart_boundary"

------=_NextPart_boundary
Content-Type: text/html; charset="utf-8"
Content-Transfer-Encoding: quoted-printable

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; color: #000; }
table { border-collapse: collapse; width: 100%; }
td, th { padding: 4px 8px; vertical-align: top; }
h2 { margin: 0; font-size: 16pt; }
p { margin: 2px 0; }
.letter-kop { text-align: center; margin-bottom: 12px; }
.kop-line { border-top: 3px solid #000; margin: 8px 0 16px 0; }
</style>
</head>
<body>
${cleanHtml}
</body>
</html>
------=_NextPart_boundary--`;

    zip.file('word/afchunk.mht', mhtContent);

    // Generate the .docx file
    return await zip.generateAsync({ type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}
