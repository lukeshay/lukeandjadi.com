import Page from './page';

class HomePage extends Page {
  get banner() {
    return $('img[data-test-id="banner"]');
  }

  open() {
    return super.open('');
  }
}

export default new HomePage();
