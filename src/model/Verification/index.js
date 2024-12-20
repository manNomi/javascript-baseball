import OutputView from '../../View/OutputView.js';

export default class Verification {
  constructor(randomNumber) {
    this.randomNumber = randomNumber;
    this.resultCount = 3;
    this.strike = 0;
    this.ball = 0;
  }

  verifyResult(clinetInput) {
    const checkedStrike = this.checkStrike(clinetInput);
    const output = new OutputView();
    output.print(checkedStrike);
    const checkedBall = this.checkBall(checkedStrike);
    output.print(checkedBall);

    this.countStrikeBall(checkedBall);
  }

  getResult() {
    return {
      strike: this.strike,
      ball: this.ball,
    };
  }

  getResultWin() {
    if (this.strike === this.resultCount) {
      return true;
    }
    return false;
  }

  // 위치와 숫자가 일치할경우 S로 반환
  // EX [1,2,3] [1,5,3] => [S,5,S]
  checkStrike(input) {
    return input.map((number, index) => {
      if (number === this.randomNumber[index]) {
        return 'S';
      }
      return number;
    });
  }

  checkBall(input) {
    return input.map((number) => {
      if (this.randomNumber.includes(number)) {
        return 'B';
      }
      return number;
    });
  }

  countStrikeBall(input) {
    input.forEach((number) => {
      if (number === 'S') {
        this.strike += 1;
      }
      if (number === 'B') {
        this.ball += 1;
      }
    });
  }
}
