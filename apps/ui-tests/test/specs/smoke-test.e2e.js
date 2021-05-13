import HomePage from '../pageobjects/home.page';

describe('Home', () => {
  it('should load', async () => {
    await HomePage.open();

    await expect(HomePage.banner).toBeExisting();
  });
});
