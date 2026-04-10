// 1. PDF 업로드
document.getElementById('pdfUpload')?.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file && file.type === 'application/pdf') {
    const fileURL = URL.createObjectURL(file);
    document.getElementById('pdfViewer').src = fileURL;
    document.getElementById('pdfPlaceholder').style.display = 'none';
    document.getElementById('pdfViewer').style.display = 'block';
    showToast('PDF 로드 완료', '📄');
  }
});

// 2. 언어별 뼈대 세팅
const defaultTemplates = {
  "71": "# 파이썬 코드를 작성하세요\ndef solution():\n    pass",
  "63": "// JS 코드를 작성하세요\nfunction solution() {\n}",
  "62": "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n    }\n}"
};
document.getElementById('langSelect')?.addEventListener('change', function(e) {
  document.getElementById('codeEditor').value = defaultTemplates[e.target.value];
});

// 3. Judge0 API 실행
async function runCodeWithJudge0() {
  const code = document.getElementById('codeEditor').value;
  const langId = document.getElementById('langSelect').value;
  const out = document.getElementById('editorOutput');
  
  if (!code.trim()) { showToast('코드를 입력하세요.', '⚠️'); return; }
  out.innerHTML = '<div class="output-line info">실행 중...</div>';

  try {
    const response = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'x-rapidapi-key': JUDGE0_API_KEY // apikey.js 에 선언된 변수
      },
      body: JSON.stringify({ language_id: parseInt(langId), source_code: code })
    });
    
    const result = await response.json();
    if (result.compile_output) out.innerHTML = `<div class="output-line err">${result.compile_output}</div>`;
    else if (result.stderr) out.innerHTML = `<div class="output-line err">${result.stderr}</div>`;
    else out.innerHTML = `<div class="output-line">${result.stdout}</div>`;

  } catch (error) {
    out.innerHTML = `<div class="output-line err">서버 통신 오류</div>`;
  }
}