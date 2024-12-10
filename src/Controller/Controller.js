import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import InputService from '../Service/InputService.js';
import OutputService from '../Service/OutPutService.js';
import { INPUT_MESSAGEE } from '../config/constant.js';
import getRandomNumber from '../utility/random/index.js';
import regexPatterns from '../utility/validataor/regexPatterns.js';
import Verification from '../model/Verification/index.js';

class Controller {
  constructor() {
    this.inputView = new InputView();
    this.outputView = new OutputView();
    this.inputService = new InputService(this.inputView, this.outputView);
    this.outputService = new OutputService(this.outputView);
  }

  async run() {
    let gameContinued = true;
    while (gameContinued) {
      const randomNumberList = getRandomNumber();
      let win = true;
      while (!win) {
        const inputClientNumber = await this.inputService.inputPattern(
          INPUT_MESSAGEE.GAME_INPUT_NUMBER,
          regexPatterns.THREE_DIGIT_COMMA.regex,
          regexPatterns.THREE_DIGIT_COMMA.description,
        );
        const verification = new Verification(randomNumberList);
        verification.verifyResult(inputClientNumber);
        const result = verification.getResult();
        this.outputService.printResult(result);
        win = verification.getResultWin();
      }
      gameContinued = await this.inputService.inputGameContinue(
        INPUT_MESSAGEE.GAME_RESTART,
      );
    }
  }
}

export default Controller;
