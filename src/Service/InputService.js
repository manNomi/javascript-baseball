export default class InputService {
  constructor(inputView, outputView) {
    this.inputView = inputView; // 사용자 입력 처리 객체
    this.outputView = outputView; // 사용자 출력 처리 객체
  }

  /**
   * 사용자 입력을 처리하고 검증하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @param {Function} validate - 입력값을 검증하는 함수. 유효하지 않은 경우 오류를 throw해야 함.
   * @returns {Promise<string>} - 검증된 사용자 입력값.
   */
  async inputProcess(inputMessage, validate) {
    while (true) {
      try {
        const inputText = await this.inputView.input(inputMessage);
        validate(inputText);
        return inputText; // 검증 통과 시 반환
      } catch (error) {
        this.outputView.print(error.message); // 에러 메시지 출력
      }
    }
  }

  async inputProcessTF(inputMessage, validate) {
    while (true) {
      try {
        const inputText = await this.inputView.input(inputMessage);
        return validate(inputText); // 검증 통과 시 반환
      } catch (error) {
        this.outputView.print(error.message); // 에러 메시지 출력
      }
    }
  }

  /**
   * 사용자 입력을 숫자로 변환하고 검증하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @returns {Promise<number>} - 검증된 숫자 입력값.
   */
  async inputNumber(inputMessage) {
    return await this.inputProcess(inputMessage, (inputText) => {
      const number = parseFloat(inputText);
      if (isNaN(number)) {
        throw new Error('유효한 숫자를 입력해야 합니다.');
      }
      if (number < 0) {
        throw new Error('음수는 입력할 수 없습니다.');
      }
      return number;
    });
  }

  /**
   * 사용자 입력을 선택지 중 하나로 제한하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @param {string[]} choices - 유효한 선택지 목록.
   * @returns {Promise<string>} - 사용자가 선택한 유효한 입력값.
   */
  async inputChoice(inputMessage, choices) {
    return await this.inputProcess(inputMessage, (inputText) => {
      if (!choices.includes(inputText)) {
        throw new Error(
          `유효하지 않은 입력입니다. 다음 중 하나를 선택하세요: ${choices.join(', ')}`,
        );
      }
    });
  }

  /**
   * 사용자 입력을 날짜 형식으로 처리하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @returns {Promise<Date>} - 검증된 날짜 객체.
   */
  async inputDate(inputMessage) {
    return await this.inputProcess(inputMessage, (inputText) => {
      const date = new Date(inputText);
      if (isNaN(date.getTime())) {
        throw new Error('유효한 날짜를 입력해야 합니다. (예: YYYY-MM-DD)');
      }
      return date;
    });
  }

  /**
   * 사용자 입력을 특정 문자열 패턴으로 검증하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @param {RegExp} pattern - 유효성을 검사할 정규식 패턴.
   * @returns {Promise<string>} - 패턴을 만족하는 입력값.
   */
  async inputPattern(inputMessage, pattern, patternMessage) {
    return await this.inputProcess(inputMessage, (inputText) => {
      if (!pattern.test(inputText)) {
        throw new Error(`${patternMessage}: ${pattern}`);
      }
    });
  }

  /**
   * 사용자 입력을 boolean 값으로 처리하는 메서드.
   * @param {string} inputMessage - 사용자에게 표시할 입력 메시지.
   * @returns {Promise<boolean>} - 'yes' 또는 'no'로 변환된 boolean 값.
   */
  async inputBoolean(inputMessage) {
    return await this.inputProcess(inputMessage, (inputText) => {
      const lowerInput = inputText.toLowerCase();
      if (lowerInput === 'yes' || lowerInput === 'y') return true;
      if (lowerInput === 'no' || lowerInput === 'n') return false;
      throw new Error(
        '유효하지 않은 입력입니다. "yes" 또는 "no"를 입력하세요.',
      );
    });
  }

  async inputGameContinue(inputMessage) {
    return await this.inputProcessTF(inputMessage, (inputText) => {
      if (inputText === '1') return true;
      if (inputText === '2') return false;
      throw new Error('유효하지 않은 입력입니다. "1" 또는 "2"를 입력하세요.');
    });
  }
}
