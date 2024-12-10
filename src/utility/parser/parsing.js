/**
 * 콤마로 구분된 문자열을 배열로 변환
 * @param {string} str - 콤마로 구분된 문자열
 * @returns {Array} 변환된 배열
 */
export function parseCommaSeparatedString(str) {
  return str.split(',').map((item) => item.trim());
}

/**
 * 날짜 문자열을 객체로 변환
 * @param {string} dateStr - 날짜 문자열 (예: "2024-12-10")
 * @returns {Object} 날짜 객체 { year, month, day }
 */
export function parseDateString(dateStr) {
  const [year, month, day] = dateStr.split('-').map(Number);
  return { year, month, day };
}
