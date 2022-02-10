import { getCurrentPrice } from '../../../src/services/binanceService';

describe('Binance', () => {
  it('should get current price', async () => {
    const price = await getCurrentPrice('BTCUSDT');
    expect(price).toBeGreaterThan(0);
  });
})
