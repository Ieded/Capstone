let posts = [
  { id: 1, category: 'exam', title: '2025년 운영체제 중간고사 복기본 공유', author: '컴공20_김선배', date: '2시간 전', views: 128, likes: 42, hasFile: true },
  { id: 2, category: 'qna', title: '자료구조 세그먼트 트리 구현 질문있습니다.', author: '코딩꿈나무', date: '5시간 전', views: 89, likes: 5, hasFile: false }
];

function renderBoard(filter = 'all') {
  const list = document.getElementById('postList');
  if(!list) return;
  const filtered = filter === 'all' ? posts : posts.filter(p => p.category === filter);
  const catNames = { exam: '족보공유', qna: '질문답변' };

  list.innerHTML = filtered.map(p => `
    <div class="post-item" onclick="showToast('상세 페이지 준비 중')">
      <div><div style="font-weight:bold; color:var(--text2); text-align:center;">${p.likes}</div><div style="font-size:11px;">추천</div></div>
      <div style="flex:1;">
        <h3 style="font-size:17px; margin-bottom:6px;">[${catNames[p.category]}] ${p.title}</h3>
        <span style="font-size:13px; color:var(--text3);">👤 ${p.author} | 📅 ${p.date}</span>
      </div>
    </div>
  `).join('');
}

function filterBoard(val, el) {
  document.querySelectorAll('.btab').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderBoard(val);
}

// 파일 로드 시 바로 렌더링
window.addEventListener('DOMContentLoaded', () => renderBoard());