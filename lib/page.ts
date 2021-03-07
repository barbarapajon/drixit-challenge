import { ThenableWebDriver } from 'selenium-webdriver';

// export interface NewablePage<T extends Page> {
//   new(browser: Browser): T;
// }

export abstract class Page {
  protected url: string;

  protected setUrl(url: string) {
    this.url = url;
  }

  public async navigate(): Promise<void> {
    await this.driver.navigate().to(this.url);
    await this.driver.wait(this.loadCondition(), 1000);
  }

  public abstract isLoaded(): Promise<boolean>

  public abstract loadCondition(): any;

  public constructor(protected driver: ThenableWebDriver, url: string) {
    this.url = url
  }
}
