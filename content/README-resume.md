# Generating resume.pdf for public/

You need a real PDF at `public/resume.pdf` so "Download CV" in the navbar/hero can link to it. The `/resume` page stays for on-site viewing.

Pick **one** method below.

---

## Option A: Using LaTeX (recommended if you have it)

1. **Install LaTeX** (if not already):
   - **Linux (e.g. Parrot OS):** `sudo apt install texlive-latex-base texlive-latex-extra`
   - **macOS:** [MacTeX](https://www.tug.org/mactex/) or `brew install --cask mactex`
   - **Windows:** [MiKTeX](https://miktex.org/) or [TeX Live](https://www.tug.org/texlive/)

2. **Generate the PDF** from the project root:
   ```bash
   npm run resume:pdf
   ```
   This compiles `content/cv-clinton-ouma.tex` and copies the result to `public/resume.pdf`.

3. **If the script fails** (e.g. `pdflatex` not found), run manually:
   ```bash
   cd content
   pdflatex -interaction=nonstopmode cv-clinton-ouma.tex
   cp cv-clinton-ouma.pdf ../public/resume.pdf
   cd ..
   ```

4. **Point the CV link to the PDF**  
   In `src/lib/constants.ts`, set:
   ```ts
   export const RESUME_URL = "/resume.pdf";
   ```
   Then "CV" / "Download CV" will open the PDF. The resume **page** remains at `/resume` for on-site viewing.

---

## Option B: Using the browser (no LaTeX)

1. **Run the dev server** and open the resume page:
   ```bash
   npm run dev
   ```
   Go to: **http://localhost:3000/resume**

2. **Print to PDF:**
   - Click **"Download PDF"** (confetti + print dialog), or press **Ctrl+P** / **Cmd+P**.
   - In the print dialog, choose **"Save as PDF"** or **"Print to PDF"** as the destination.
   - Save the file (e.g. as `resume.pdf`).

3. **Put the file in the project:**
   - Move/copy the saved PDF to: `public/resume.pdf`  
   - So the path is: `Portfolio/public/resume.pdf`

4. **Point the CV link to the PDF**  
   In `src/lib/constants.ts`, set:
   ```ts
   export const RESUME_URL = "/resume.pdf";
   ```

---

## Summary

| What              | URL / path      |
|-------------------|-----------------|
| Resume page       | `/resume`       |
| PDF file (after you generate it) | `/resume.pdf` → `public/resume.pdf` |
| CV link in nav/hero (after step 4) | `RESUME_URL = "/resume.pdf"` |

After you have `public/resume.pdf` and update `RESUME_URL`, commit the PDF (and the constant change) so the site serves the real resume file.
