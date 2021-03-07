import { Page } from "../lib";
import { Button, TextInput, ComponentFactory, WebComponent } from '../lib/components';
import config from '../config';
import { ThenableWebDriver } from 'selenium-webdriver';

export class LoginPage extends Page {
    private factory = new ComponentFactory(this.driver)
    private _emailInput: TextInput;
    private _passwordInput: TextInput;
    private _submitButton: Button;
    private _formErrors: WebComponent;
    private _emailErrors: WebComponent;
    private _passwordErrors: WebComponent;

    constructor(public driver: ThenableWebDriver) {
        super(driver, `${config.baseUrl}/`);
    }

    static get EMAIL_IS_REQUIRED() { return 'Email is required' }
    static get PASSWORD_IS_REQUIRED() { return 'Password is required' }
    static get INVALID_EMAIL_OR_PASSWORD() { return 'Invalid email or password' }
    static get EMAIL_BOUNDS_CHARACTERS() { return 'The email should have between 5 and 30 characters' }
    static get EMAIL_FORMAT() { return 'Invalid email format' }
    static get PASSWORD_BOUNDS_CHARACTERS() { return 'The password should have between 5 and 30 characters' }

    get emailInput(): TextInput {
        if(!this._emailInput) {
            this._emailInput = this.factory.textInput('#login-email-input')
        }
        
        return this._emailInput
    }

    get passwordInput(): TextInput {
        if(!this._passwordInput) {
            this._passwordInput = this.factory.textInput('#login-password-input')
        }
        
        return this._passwordInput
    }

    get submitButton(): Button {
        if(!this._submitButton) {
            this._submitButton = this.factory.button('#login-submit-button')
        }
        
        return this._submitButton
    }

    get formErrors(): WebComponent {
        if(!this._formErrors) {
            this._formErrors = this.factory.webComponent('.form-errors')
        }
        return this._formErrors
    }

    get emailErrors(): WebComponent {
        if(!this._emailErrors) {
            this._emailErrors = this.factory.webComponent('#login-email-errors')
        }
        return this._emailErrors
    }

    get passwordErrors(): WebComponent {
        if(!this._passwordErrors) {
            this._passwordErrors = this.factory.webComponent('#login-password-errors')
        }
        return this._passwordErrors
    }

    async fillForm(email: string, password: string) {
        await this.emailInput.type(email)
        await this.passwordInput.type(password)
    }

    async submit() {
        await this.submitButton.click()
    }

    async logIn(email: string, password: string) {
        await this.fillForm(email, password)
        await this.submit()
    }

    public loadCondition() {
        return () => this.emailInput.isDisplayed()
    }

    public async isLoaded(): Promise<boolean> {
        return await this.emailInput.isDisplayed()
    }
    
}