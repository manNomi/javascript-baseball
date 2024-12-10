import { OUTPUT_MESSAGE } from '../config/constant.js';

export default class OutputService {
  constructor(outputView) {
    this.outputView = outputView;
  }

  printResult(result) {
    let resultText = '';
    if (result.strike !== 0) {
      resultText += `${result.strike}${OUTPUT_MESSAGE.GAME_STRIKE}`;
    }
    if (result.ball !== 0) {
      resultText += `${result.ball}${OUTPUT_MESSAGE.GAME_BALL}`;
    }
    this.outputView.print(resultText);
  }
}
