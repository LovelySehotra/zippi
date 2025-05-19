import { Test, TestingModule } from '@nestjs/testing';
import { BillpayController } from './billpay.controller';
import { BillpayService } from './billpay.service';

describe('BillpayController', () => {
  let billpayController: BillpayController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BillpayController],
      providers: [BillpayService],
    }).compile();

    billpayController = app.get<BillpayController>(BillpayController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(billpayController.getHello()).toBe('Hello World!');
    });
  });
});
