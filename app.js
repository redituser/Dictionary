let dictionary = []; // 용어를 저장하는 배열

function loadDictionary() {
    fetch('dictionary.json')
        .then(response => response.json())
        .then(data => {
            dictionary = data;
            saveDic(); // 로컬 스토리지에 저장
            console.log(dictionary); // 데이터를 불러와서 콘솔에 출력
            displayDic(dictionary); // 데이터를 화면에 표시
        })
        .catch(error => {
            console.error('Error loading JSON file:', error);
        });
}

function loadDic() {
    const data = localStorage.getItem('dictionary'); // 브라우저의 로컬 스토리지에서 'dictionary' 키로 저장된 데이터를 읽어옴
    
    if (data) { // data 변수 안에 읽을 값이 있는지 확인
        dictionary = JSON.parse(data); // JSON 문자열을 JavaScript 객체로 변환
    } else { // 데이터가 없다면
        dictionary = []; // 빈 배열로 초기화
        loadDictionary(); // JSON 파일에서 데이터를 불러오기
    }

    displayDic(dictionary); // 위의 구문이 끝나면 화면에 표시
}

function saveDic() { // 로컬 스토리지에 저장하기
    localStorage.setItem('dictionary', JSON.stringify(dictionary)); // JSON 문자열로 변환해서 로컬 스토리지에 저장
} // 'dictionary'는 로컬 스토리지에서 불러올 때 사용할 키값

// 용어 사전 화면에 표시하기
function displayDic(dictionary) {
    const content = document.getElementById('content'); // 'content' 요소를 가져옴
    content.innerHTML = '<br><h3>--- 용어 목록 ---</h3><br><br>'; // 초기 내용 설정

    dictionary.forEach((item, index) => { // dictionary 배열을 순회하면서 각 항목을 화면에 추가
        const term = document.createElement('p'); // 새로운 p 요소 생성
        term.textContent = `# ${item.term}`; // 용어를 p 요소에 추가
        content.appendChild(term); // p 요소를 'content' 요소에 추가

        const definition = document.createElement('p'); // 새로운 p 요소 생성
        definition.textContent = `- ${item.definition}`; // 정의를 p 요소에 추가
        content.appendChild(definition); // p 요소를 'content' 요소에 추가

        const deleteButton = document.createElement('button'); // 새로운 button 요소 생성
        deleteButton.textContent = '삭제'; // 버튼에 '삭제' 텍스트 추가
        deleteButton.onclick = () => deleteTerm(index); // 버튼 클릭 시 deleteTerm 함수 호출
        content.appendChild(deleteButton); // 버튼을 'content' 요소에 추가

        content.appendChild(document.createElement('br')); // 줄 바꿈을 위해 br 요소 추가
    });
}

function deleteTerm(index) { // 특정 인덱스의 용어를 삭제하는 함수
    dictionary.splice(index, 1); // 해당 인덱스의 항목을 배열에서 제거
    saveDic(); // 변경된 배열을 로컬 스토리지에 저장
    displayDic(dictionary); // 변경된 배열을 화면에 다시 표시
}

function addTerm() { // 새로운 용어를 추가하는 함수
    const term = document.getElementById('term').value.trim(); // 입력된 용어를 가져옴
    const definition = document.getElementById('definition').value.trim(); // 입력된 정의를 가져옴
    if (term && definition) { // 용어와 정의가 모두 입력되었는지 확인
        dictionary.push({ term, definition }); // dictionary 배열에 새로운 항목 추가
        saveDic(); // 변경된 배열을 로컬 스토리지에 저장
        displayDic(dictionary); // 변경된 배열을 화면에 다시 표시
        document.getElementById('term').value = ''; // 용어 입력 필드 초기화
        document.getElementById('definition').value = ''; // 정의 입력 필드 초기화
    } else { // 용어와 정의가 올바르게 입력되지 않았다면
        alert(`용어와 정의를 입력하세요.`); // 경고 메시지 표시
    }
}

// 검색 기능 추가
function searchTerm() {
    const searchTerm = document.getElementById('search-term').value.trim().toLowerCase();
    const searchResult = dictionary.filter(item => item.term.toLowerCase().includes(searchTerm));
    displaySearchResult(searchResult);
}

function displaySearchResult(results) {
    const searchResultDiv = document.getElementById('search-result');
    searchResultDiv.innerHTML = ''; // 기존의 검색 결과를 초기화

    if (results.length > 0) {
        results.forEach(item => {
            const term = document.createElement('p'); // 새로운 p 요소 생성
            term.textContent = `# ${item.term}`; // 용어를 p 요소에 추가
            searchResultDiv.appendChild(term); // p 요소를 'searchResultDiv' 요소에 추가

            const definition = document.createElement('p'); // 새로운 p 요소 생성
            definition.textContent = `- ${item.definition}`; // 정의를 p 요소에 추가
            searchResultDiv.appendChild(definition); // p 요소를 'searchResultDiv' 요소에 추가

            searchResultDiv.appendChild(document.createElement('br')); // 줄 바꿈을 위해 br 요소 추가
        });
    } else {
        searchResultDiv.textContent = '검색 결과가 없습니다.'; // 검색 결과가 없을 때 메시지 표시
    }
}

// 페이지가 로드될 때 사전 데이터를 불러오기
window.onload = () => {
    loadDic();

    document.getElementById('add-button').addEventListener('click', addTerm);
    document.getElementById('search-button').addEventListener('click', searchTerm);
};
