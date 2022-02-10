import { getCurrentPrice } from '../../../src/services/coindesk';

describe('Coindesk', () => {
  it('should get current price', async () => {
    const price = await getCurrentPrice('zignaly');
    expect(price).toBeGreaterThan(0);
  });
})
