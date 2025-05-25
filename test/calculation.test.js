const { calculateBMR, adjustCalories } = require('../utils/calculation');

describe('calculateBMR()', () => {
  it('should correctly calculate BMR for male', () => {
    const bmr = calculateBMR({ weight: 70, height: 175, age: 25, gender: 'male' });
    // 10*70 + 6.25*175 - 5*25 + 5 = 1673.75
    expect(bmr).toBeCloseTo(1673.75, 2);
  });

  it('should correctly calculate BMR for female', () => {
    const bmr = calculateBMR({ weight: 70, height: 175, age: 25, gender: 'female' });
    // 10*70 + 6.25*175 - 5*25 - 161 = 1507.75
    expect(bmr).toBeCloseTo(1507.75, 2);
  });
});

describe('adjustCalories()', () => {
  it('should adjust calories for weight loss', () => {
    const adjusted = adjustCalories(1500, 'weight_loss', 'moderate'); // 1500 * 1.55 - 500 = 1825
    expect(adjusted).toBeCloseTo(1825, 2);
  });

  it('should adjust calories for muscle gain', () => {
    const adjusted = adjustCalories(1500, 'muscle_gain', 'high'); // 1500 * 1.75 + 500 = 3125
    expect(adjusted).toBeCloseTo(3125, 2);
  });

  it('should return base calories for maintenance goal', () => {
    const adjusted = adjustCalories(1500, 'maintenance', 'low'); // 1500 * 1.2 = 1800
    expect(adjusted).toBeCloseTo(1800, 2);
  });

  it('should default to low activity factor when activity is undefined', () => {
    const adjusted = adjustCalories(1500, 'weight_loss', undefined); // 1500 * 1.2 - 500 = 1300
    expect(adjusted).toBeCloseTo(1300, 2);
  });
});
