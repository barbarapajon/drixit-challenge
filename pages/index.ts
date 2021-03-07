
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { ThenableWebDriver } from 'selenium-webdriver';

export {
    HomePage,
    LoginPage
}

export class AllPages {
    public login: LoginPage;
    public home: HomePage;
    
    constructor(public driver: ThenableWebDriver) {
      this.login = new LoginPage(driver);
      this.home = new HomePage(driver);
    }

    public async dispose(): Promise<void> {
      await this.driver.close();
    }
}
