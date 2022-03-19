import { getCurrentPrice } from '../../../src/services/binanceService';

describe('Binance', () => {
  it('should get current price', async () => {
    const price = await getCurrentPrice('AXSUSDT');
    expect(price).toBeGreaterThan(0);
  });
})
