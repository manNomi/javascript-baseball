import { Random } from '@woowacourse/mission-utils';

const getRandomNumber = () => {
  const randomNumberList = [];
  while (randomNumberList.length <= 2) {
    const number = Random.pickNumberInRange(1, 9);
    if (!randomNumberList.includes(number)) {
      randomNumberList.push(number);
    }
  }
  return randomNumberList;
};
export default getRandomNumber;
