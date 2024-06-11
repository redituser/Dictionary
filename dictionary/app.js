const dictionaryUrl = 'https://redituser.github.io/Dictionary/dictionary.json';
const token = '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';
let dictionary = {};

// 깃허브에서 데이터 불러오기
async function fetchDictionary() {
    try {
        const response = await fetch(dictionaryUrl);
        dictionary = await response.json();
        console.log('불러온 데이터:', dictionary);
    } catch (error) {
        console.error('Error fetching dictionary:', error);
    }
}

// GitHub에 데이터 저장하기
async function updateDictionary() {
    const url = 'https://api.github.com/repos/redituser/Dictionary/contents/dictionary/dictionary.json';

    try {
        // 현재 파일의 SHA 값을 가져오기
        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        const data = await response.json();
        const sha = data.sha;

        // 업데이트할 내용을 Base64로 인코딩 
        const content = btoa(JSON.stringify(dictionary, null, 2));

        // GitHub에 파일 업데이트 요청 보내기
        const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
                message: 'Update dictionary',
                content: content,
                sha: sha
            })
        });

        if (updateResponse.ok) {
            alert('Dictionary updated successfully.');
        } else {
            alert('Failed to update dictionary.');
        }
    } catch (error) {
        console.error('Error updating dictionary:', error);
    }
}

// 페이지 로드 시 데이터 불러오기
window.onload = async () => {
    await fetchDictionary();
};

// 용어 검색
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-term').value;
    const result = dictionary[searchTerm];
    document.getElementById('search-result').innerText = result ? `정의: ${result}` : `용어 없음: ${searchTerm}`;
});

// 용어 추가 기능
document.getElementById('add-button').addEventListener('click', async () => {
    const term = document.getElementById('term').value;  // term 은 입력받은 텍스트 (용어)
    const definition = document.getElementById('definition').value; // definition 도 입력받은 텍스트 (정의)
    if (term && definition) { // 용어가 추가되었다면 
        dictionary[term] = definition; // 임시로 설정한 딕셔너리 에 용어안에 정의를 넣는다 
        alert(`용어 추가됨: ${term}`); // 추가되었다면 이메세지를 띄우고
        await updateDictionary(); // GitHub에 업데이트
    } else {
        alert('용어와 정의를 입력하세요'); // 추가되지않았다면 이메세지를 띄운다
    }
});

// 용어 수정 기능
document.getElementById('edit-button').addEventListener('click', async () => {
    const term = document.getElementById('term').value; 
    const definition = document.getElementById('definition').value;
    if (dictionary[term]) {
        dictionary[term] = definition;
        alert(`용어 수정됨: ${term}`);
        await updateDictionary(); // GitHub에 업데이트
    } else {
        alert(`용어 없음: ${term}`);
    }
});

// 용어 삭제 기능
document.getElementById('delete-button').addEventListener('click', async () => {
    const term = document.getElementById('term').value;
    if (dictionary[term]) {
        delete dictionary[term];
        alert(`용어 삭제됨: ${term}`);
        await updateDictionary(); // GitHub에 업데이트
    } else {
        alert(`용어 없음: ${term}`);
    }
});
