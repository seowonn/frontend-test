// 가짜 API 함수 (fetchAgreementDetail 대체용)
async function fetchAgreementDetail(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name: "근로계약서",
                type: "pdf",
                categoryName: "근로계약",
                status: "SUCCESS",
                content: "계약 내용입니다. [AI 분석 결과]"
            });
        }, 1000);
    });
}

// URL에서 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// "state" 개념 흉내내기 (예: 링크에서 전달)
const category = urlParams.get("category");
const docName = urlParams.get("docName");
const docType = urlParams.get("docType");

// 상태 저장 변수
let agreementData = null;
let intervalId = null;

function updatePageWithData(data) {
    document.getElementById("loader").style.display = "none";
    document.getElementById("content").style.display = "block";

    const header = document.getElementById("doc-header");
    header.textContent = `${category || data.categoryName} > ${docName || data.name}.${docType || data.type}`;

    document.getElementById("review-body").textContent = data.content;
}

async function loadAgreement() {
    try {
        agreementData = await fetchAgreementDetail(id);
        updatePageWithData(agreementData);

        // polling
        if (agreementData.status !== "SUCCESS" && agreementData.status !== "AI-FAILED") {
            intervalId = setInterval(async () => {
                console.log("⏳ polling...");
                agreementData = await fetchAgreementDetail(id);
                updatePageWithData(agreementData);
                if (agreementData.status === "SUCCESS") clearInterval(intervalId);
            }, 5000);
        }
    } catch (err) {
        alert("데이터 불러오기 실패");
        console.error(err);
    }
}

// 초기 실행
window.onload = () => {
    loadAgreement();
};
