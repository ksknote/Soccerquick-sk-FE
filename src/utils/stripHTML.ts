//html string에서 순수 문자열만 추출
function stripHTML(htmlString: string) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
}

export default stripHTML;
