import { Builder, ThenableWebDriver } from 'selenium-webdriver';
import { specification, when, then } from '../lib/mocha-bdd'
import { LoginPage } from '../pages/LoginPage';
import { AllPages } from '../pages/index';
import { HomePage } from '../pages/HomePage';
import { ensure } from '../lib/ensure';


specification('Login', async () => {
    let driver: ThenableWebDriver;
    const VALID_EMAIL = "test@validemail.com"
    const VALID_PASSWORD = "validpassword"
    const EMAIL_MIN_LENGTH = 6
    let loginPage: LoginPage
    let homePage: HomePage
    let pages: AllPages

    beforeEach(async () => {
        driver = new Builder().forBrowser('chrome').build();
        pages = new AllPages(driver)
        loginPage = pages.login
        homePage = pages.home
        await loginPage.navigate()
    });

    when('credentials are correct', async () => {
        then('goes to homepage', async () => {
            await loginPage.logIn(VALID_EMAIL, VALID_PASSWORD)
            await ensure(homePage).isLoaded()
        })    
    })

    when('email is not valid', async () => {
        then(`shows ${LoginPage.INVALID_EMAIL_OR_PASSWORD} message`, async () => {
            await loginPage.logIn("bla@invalidemail.com", VALID_PASSWORD)
            await ensure(loginPage.formErrors).isVisible()
            await ensure(loginPage.formErrors).textIs(LoginPage.INVALID_EMAIL_OR_PASSWORD)
        })    
    })

    when('password is not valid', async () => {
        then(`shows ${LoginPage.INVALID_EMAIL_OR_PASSWORD} message`, async () => {
            await loginPage.logIn(VALID_EMAIL, "invalidpassword")
            await ensure(loginPage.formErrors).isVisible()
            await ensure(loginPage.formErrors).textIs(LoginPage.INVALID_EMAIL_OR_PASSWORD)
        })    
    })

    when(`email less than ${EMAIL_MIN_LENGTH} characters`, async () => {
        then(`shows an error message telling you should enter a email with at least than ${EMAIL_MIN_LENGTH}`, async () => {
            await loginPage.logIn("1@4.c", VALID_PASSWORD)
            await ensure(loginPage.emailErrors).isVisible()
            await ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_BOUNDS_CHARACTERS)
        })    
    })

    when('more than n character email', () => {
        then('shows error message more than n characters email', async () => {
            const moreThanNCharacters = "testwithmorethanncharactersultrasuperpro@validemail.com"
            await loginPage.fillForm(moreThanNCharacters, VALID_PASSWORD)
            await loginPage.submitButton.isDisabled()
            await ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_BOUNDS_CHARACTERS)
        })    
    })

    when('less than n characters password', () => {
        then('error message', async () => {
            const shortPassword = "inva"
            await loginPage.fillForm(VALID_EMAIL, shortPassword)
            await loginPage.submitButton.isDisabled()
            await loginPage.passwordErrors.isDisplayed()
            await ensure(loginPage.passwordErrors).textIs(LoginPage.PASSWORD_BOUNDS_CHARACTERS)
        })    
    })

    when('more than n characters password', () => {
        then('error message', async () => {
            const shortPassword = "invalidpasswordsupermegaarchipro"
            await loginPage.fillForm(VALID_EMAIL, shortPassword)
            await loginPage.submitButton.isDisabled()
            await loginPage.passwordErrors.isDisplayed()
            await ensure(loginPage.passwordErrors).textIs(LoginPage.PASSWORD_BOUNDS_CHARACTERS)
        })    
    })

    when('invalid email format', () => {
        then("error message when haven't got @", async () => {
            const invalidEmailFormat = "testvalidemail.com"
            await loginPage.fillForm(invalidEmailFormat, VALID_PASSWORD)
            await loginPage.submitButton.isDisabled()
            await loginPage.emailErrors.isDisplayed()
            ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_FORMAT)
        })    

        then('error message when have spaces', async () => {
            const invalidEmailFormat = "test @ validemail.com"
            await loginPage.fillForm(invalidEmailFormat, VALID_PASSWORD)
            await loginPage.submitButton.isDisabled()
            await loginPage.emailErrors.isDisplayed()
            ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_FORMAT)
        })    

        then('error message when use special characters', async () => {
            const invalidEmailFormat = "test!@specialcharacters.com"
            await loginPage.fillForm(invalidEmailFormat, VALID_PASSWORD)
            await loginPage.submitButton.isDisabled()
            await loginPage.emailErrors.isDisplayed()
            ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_FORMAT)
        })    
    })

    when('empty email field', () => {
        then('shows error message', async () => {
            await loginPage.fillForm("", VALID_PASSWORD)
            await loginPage.submitButton.isDisabled()
            ensure(loginPage.emailErrors).textIs(LoginPage.EMAIL_IS_REQUIRED)
        })    
    })

    when('empty password field', () => {
        then('error message', async () => {
            then('error message', async () => {
                await loginPage.fillForm(VALID_EMAIL, "")
                await loginPage.submitButton.isDisabled()
                ensure(loginPage.passwordErrors).textIs(LoginPage.PASSWORD_IS_REQUIRED)
            })    
        })    
    })

    afterEach(async () => {
        await pages.dispose()
    }) 

})