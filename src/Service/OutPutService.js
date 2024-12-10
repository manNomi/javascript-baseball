import OutputView from '../View/OutputView.js';
import { RECEIPT } from '../../config/constant.js';

export default class OutputService {
  constructor() {
    this.outputView = new OutputView();
  }

  setOutputService(
    products,
    freeItems,
    totalAmount,
    promoDiscount,
    membershipDiscount,
    finalAmount,
  ) {
    this.products = products;
    this.freeItems = freeItems;
    this.totalAmount = totalAmount;
    this.promoDiscount = promoDiscount;
    this.membershipDiscount = membershipDiscount;
    this.finalAmount = finalAmount;
  }

  printReceipt() {
    this.outputView.print(RECEIPT.HEADER.STORE_NAME());

    this.outputView.print(RECEIPT.HEADER.PRODUCT());
    this.products.forEach((product) => {
      this.outputView.print(
        `${product.name}\t\t${product.quantity}\t${product.amount.toLocaleString()}`,
      );
    });

    this.outputView.print(RECEIPT.HEADER.FREE_ITEM());

    this.freeItems.forEach((item) => {
      this.outputView.print(`${item.name}\t\t${item.quantity}`);
    });

    this.outputView.print(RECEIPT.FOOTER());

    this.outputView.print(
      RECEIPT.LABEL.TOTAL_AMOUNT(
        this.totalAmount.quantity,
        this.totalAmount.amount,
      ),
    );
    this.outputView.print(RECEIPT.LABEL.PROMOTION_DISCOUNT(this.promoDiscount));
    this.outputView.print(
      RECEIPT.LABEL.MEMBERSHIP_DISCOUNT(this.membershipDiscount),
    );
    this.outputView.print(RECEIPT.LABEL.FINAL_AMOUNT(this.finalAmount));
    this.outputView.print('\n');
  }

  outPutReciptHandler(calculator, cart) {
    // 필요한 데이터 생성
    const products = calculator.getProduct().map((name) => {
      const item = cart.find((product) => product.name === name);
      return {
        name: item.name,
        quantity: item.quantity,
        amount: item.price * item.quantity,
      };
    });

    const freeItems = calculator
      .getDiscountProduct()
      .map((discountProduct) => ({
        name: discountProduct.name,
        quantity: discountProduct.quantity,
      }));

    const totalAmount = {
      quantity: calculator.getTotalProductLen(),
      amount: calculator.getTotalMoney(),
    };

    const promoDiscount = calculator.getDiscountMoney();
    const membershipDiscount = calculator.getMembershipMoney();
    const finalAmount = calculator.getPayMoney();

    this.setOutputService(
      products,
      freeItems,
      totalAmount,
      promoDiscount,
      membershipDiscount,
      finalAmount,
    );
  }
}
