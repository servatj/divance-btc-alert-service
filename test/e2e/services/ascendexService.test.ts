import { getCurrentPrice } from '../../../src/services/ascendexService';

describe('Ascendex', () => {

  afterEach(() => {});

  it('should get current price', async () => {
    const price = await getCurrentPrice('ZIG/USDT');
    expect(price).toBeGreaterThan(0);
  });
})
