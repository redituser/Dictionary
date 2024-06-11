const dictionary = {
    "제어문": "제어문(Control Statement)은 프로그램의 흐름을 제어하는 명령문입니다. 주요 제어문으로는 if문, switch문, for문, while문 등이 있습니다.",
    "배열": "배열(Array)은 여러 개의 값을 하나의 변수에 저장할 수 있는 자료구조입니다. 각각의 값은 인덱스를 통해 접근할 수 있습니다.",
    "함수": "함수(function)는 특정 작업을 수행하기 위해 작성된 코드 블록입니다. 함수는 선언적 함수, 익명 함수, 화살표 함수 등으로 정의할 수 있습니다.",
    "객체": "객체(object)는 키와 값으로 구성된 속성들의 집합을 의미하는 자료형입니다. 객체는 속성과 메서드로 구성됩니다.",
    "BOM": "브라우저 객체 모델(BOM)은 자바스크립트 언어 사양에 포함되지 않고 웹 브라우저에서 제공하는 객체입니다. 주요 객체로는 window, document, location, history, navigator, screen 등이 있습니다.",
    "DOM": "문서 객체 모델(DOM)은 웹 브라우저에 표시되는 문서를 자바스크립트가 이해할 수 있도록 객체화한 모델 구조입니다. DOM은 문서의 구조를 트리 형태로 표현합니다.",
    "노드": "DOM 트리에서 문서의 각 요소를 나타내는 객체입니다. 주요 노드 타입으로는 문서 노드, 요소 노드, 속성 노드, 텍스트 노드 등이 있습니다.",
    "이벤트": "이벤트(event)는 웹브라우저와 사용자 사이에 상호 작용이 발생하는 특정 시점을 의미합니다. 키보드 입력, 마우스 클릭 등 다양한 이벤트가 있습니다.",
    "이벤트 핸들러": "이벤트 핸들러는 특정 이벤트가 발생했을 때 실행되는 함수입니다. 이벤트와 이벤트 핸들러를 연결하여 이벤트가 발생할 때 실행할 동작을 정의할 수 있습니다."
};


// 용어 검색
document.getElementById('search-button').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-term').value;
    const result = dictionary[searchTerm];
    document.getElementById('search-result').innerText = result ? `정의: ${result}` : `용어 없음: ${searchTerm}`;
});


// 용어 추가 기능
document.getElementById('add-button').addEventListener('click', () => {
    const term = document.getElementById('term').value;  //term 은 입력받은 텍스트 (용어)
    const definition = document.getElementById('definition').value; //definition 도 입력받은 텍스트 (정의)
    if(term && definition){ // 용어가 추가되었다면 
        dictionary[term] = definition; //임시로 설정한 딕셔너리 에 용어안에 정의를 넣는다 
        alert('용어 추가됨 : ${term}'); //추가되었다면 이메세지를 띄우고
    }
    else{
        alert('용어와 정의를 입력하세요'); // 추가되지않았다면 이메세지를 띄운다
    }
});


//용어 수정 기능
document.getElementById('edit-button').addEventListener('click', () => {
    const term = document.getElementById('term').value; 
    const definition = document.getElementById('definition').value;
    const entry = dictionary.find(item => item.term ===term);
    if(entry){
        entry.definition = definition;
        alert('용어 수정됨: ${term}');
        console.log('수정 후 :', dictionary);
    }else{
        alert('용어 없음: ${term}');
    }
});

// 용어 삭제 기능
document.getElementById('delete-button').addEventListener('click', () => {
    const term = document.getElementById('term').value;
    const index = dictionary.findIndex(item => item.term === term);
    if (index !== -1) {
        dictionary.splice(index, 1);
        alert(`용어 삭제됨: ${term}`);
        console.log('삭제 후:', dictionary);  // 디버깅 로그
    } else {
        alert(`용어 없음: ${term}`);
    }
});
