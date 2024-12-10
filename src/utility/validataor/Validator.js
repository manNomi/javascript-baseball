class Validate {
  /**
   * 입력값이 빈 문자열인지 확인.
   * @param {string} input - 입력값.
   * @throws {Error} - 입력값이 비어 있으면 에러를 throw.
   */
  static isNotEmpty(input) {
    if (!input || input.trim() === '') {
      throw new Error('입력값이 비어 있을 수 없습니다.');
    }
  }

  /**
   * 입력값이 숫자인지 확인.
   * @param {string} input - 입력값.
   * @throws {Error} - 숫자가 아니거나 음수일 경우 에러를 throw.
   */
  static isNumber(input) {
    const number = parseFloat(input);
    if (isNaN(number)) {
      throw new Error('유효한 숫자를 입력해야 합니다.');
    }
  }

  /**
   * 입력값이 특정 범위 내에 있는지 확인.
   * @param {number} input - 입력값.
   * @param {number} min - 최소값.
   * @param {number} max - 최대값.
   * @throws {Error} - 범위를 벗어나면 에러를 throw.
   */
  static isInRange(input, min, max) {
    const number = parseFloat(input);
    if (number < min || number > max) {
      throw new Error(`입력값은 ${min}에서 ${max} 사이여야 합니다.`);
    }
  }

  /**
   * 입력값이 특정 형식을 따르는지 확인.
   * @param {string} input - 입력값.
   * @param {RegExp} pattern - 유효성을 검사할 정규식.
   * @throws {Error} - 정규식과 일치하지 않으면 에러를 throw.
   */
  static matchesPattern(input, pattern) {
    if (!pattern.test(input)) {
      throw new Error('입력값이 요구된 형식과 일치하지 않습니다.');
    }
  }

  /**
   * 입력값이 지정된 선택지 중 하나인지 확인.
   * @param {string} input - 입력값.
   * @param {string[]} choices - 유효한 선택지 배열.
   * @throws {Error} - 선택지에 포함되지 않으면 에러를 throw.
   */
  static isOneOf(input, choices) {
    if (!choices.includes(input)) {
      throw new Error(
        `유효하지 않은 입력입니다. 다음 중 하나를 선택하세요: ${choices.join(', ')}`,
      );
    }
  }

  /**
   * 문자열이 콤마로 구분된 형식인지 검증
   * @param {string} str - 입력 문자열
   * @returns {boolean} 유효 여부
   */

  static isCommaSeparatedString(str) {
    return typeof str === 'string' && str.includes(',');
  }

  /**
   * 날짜 문자열이 YYYY-MM-DD 형식인지 검증
   * @param {string} dateStr - 날짜 문자열
   * @returns {boolean} 유효 여부
   */
  static isValidDateString(dateStr) {
    return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
  }

  /**
   * 입력값이 날짜 형식인지 확인.
   * @param {string} input - 입력값.
   * @throws {Error} - 유효한 날짜 형식이 아니면 에러를 throw.
   */
  static isDate(input) {
    const date = new Date(input);
    if (isNaN(date.getTime())) {
      throw new Error('유효한 날짜를 입력해야 합니다. (예: YYYY-MM-DD)');
    }
  }
}

export default Validate;
