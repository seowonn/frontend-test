// 예시 fetchAgreementDetail 구현
async function fetchAgreementDetail(id) {
  // 실제 API로 대체 가능
  return {
    id: id,
    status: "SUCCESS",
    incorrectTexts: [
      {
        id: "1",
        incorrectText: "직원의 수습 기간은 3년으로 한다.",
        correctedText: "수습 기간은 통상 3개월 이내로 한다.",
        proofText: "근로기준법 제11조에 따라 수습은 통상 3개월을 넘지 않음.",
        currentPage: 1,
        accuracy: 92
      },
      {
        id: "2",
        incorrectText: "시급은 5000원으로 한다.",
        correctedText: "최저임금법에 따라 시급은 9620원 이상이어야 함.",
        proofText: "2023년 최저임금 기준 미달.",
        currentPage: 2,
        accuracy: 88
      }
    ],
    url: "example.png",  // 이미지 파일
    totalPage: 3
  };
}

// 카드 생성
function createReviewCard(data, index, totalPage) {
  const div = document.createElement("div");
  div.className = "card";

  div.innerHTML = `
    <div class="card-title">#${index + 1} ${data.incorrectText}</div>
    <div class="card-sub">페이지: ${data.currentPage} / ${totalPage} | 정확도: ${data.accuracy}%</div>
    <div class="card-text"><strong>보완 의견:</strong> ${data.proofText}</div>
    <div class="card-text"><strong>수정 제안:</strong> ${data.correctedText}</div>
  `;

  return div;
}

// 초기 렌더링
window.onload = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id") || "test";

  const data = await fetchAgreementDetail(id);

  // 이미지 렌더링
  document.getElementById("doc-image").src = data.url;

  // 카드 렌더링
  const container = document.getElementById("review-list");
  container.innerHTML = "";

  if (data.status === "SUCCESS") {
    data.incorrectTexts.forEach((item, index) => {
      const card = createReviewCard(item, index, data.totalPage);
      container.appendChild(card);
    });
  } else {
    container.innerHTML = "<p>AI 분석 실패 혹은 진행 중입니다.</p>";
  }

  document.getElementById("view-report").onclick = () => {
    alert(`'${id}' 문서의 AI 분석 보고서로 이동합니다.`);
    // location.href = `/agreements/analysis/${data.id}`; // 실제 라우팅
  };
};
