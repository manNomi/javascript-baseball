import { Console } from '@woowacourse/mission-utils';

class InputView {
  async input(message) {
    const inputString = await Console.readLineAsync(message);
    return inputString;
  }
}
export default InputView;
