import { ClinicAppPage } from './app.po';

describe('clinic-app App', () => {
  let page: ClinicAppPage;

  beforeEach(() => {
    page = new ClinicAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
