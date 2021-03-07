import { Page } from "../lib";
import { ComponentFactory, WebComponent } from '../lib/components';
import config from '../config';
import { ThenableWebDriver } from 'selenium-webdriver';

export class HomePage extends Page {
    private factory = new ComponentFactory(this.driver)
    private _header: WebComponent;

    constructor(public driver: ThenableWebDriver) {
        super(driver, `${config.baseUrl}/home`);
    }

    get header(): WebComponent {
        if(!this._header) {
            this._header = this.factory.webComponent('#login-email-input')
        }
        
        return this._header
    }

    public loadCondition() {
        return () => this.header.isDisplayed()
    }

    public async isLoaded(): Promise<boolean> {
        return await this.header.isDisplayed()
    }
    
}