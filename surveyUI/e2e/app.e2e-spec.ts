import { SurveyUIPage } from './app.po';

describe('survey-ui App', () => {
  let page: SurveyUIPage;

  beforeEach(() => {
    page = new SurveyUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
