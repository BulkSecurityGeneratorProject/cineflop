import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Keywords e2e test', () => {

    let navBarPage: NavBarPage;
    let keywordsDialogPage: KeywordsDialogPage;
    let keywordsComponentsPage: KeywordsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Keywords', () => {
        navBarPage.goToEntity('keywords-my-suffix');
        keywordsComponentsPage = new KeywordsComponentsPage();
        expect(keywordsComponentsPage.getTitle())
            .toMatch(/blogApp.keywords.home.title/);

    });

    it('should load create Keywords dialog', () => {
        keywordsComponentsPage.clickOnCreateButton();
        keywordsDialogPage = new KeywordsDialogPage();
        expect(keywordsDialogPage.getModalTitle())
            .toMatch(/blogApp.keywords.home.createOrEditLabel/);
        keywordsDialogPage.close();
    });

    it('should create and save Keywords', () => {
        keywordsComponentsPage.clickOnCreateButton();
        keywordsDialogPage.setKeywordInput('keyword');
        expect(keywordsDialogPage.getKeywordInput()).toMatch('keyword');
        keywordsDialogPage.ideasSelectLastOption();
        keywordsDialogPage.save();
        expect(keywordsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class KeywordsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-keywords-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class KeywordsDialogPage {
    modalTitle = element(by.css('h4#myKeywordsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    keywordInput = element(by.css('input#field_keyword'));
    ideasSelect = element(by.css('select#field_ideas'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setKeywordInput = function(keyword) {
        this.keywordInput.sendKeys(keyword);
    };

    getKeywordInput = function() {
        return this.keywordInput.getAttribute('value');
    };

    ideasSelectLastOption = function() {
        this.ideasSelect.all(by.tagName('option')).last().click();
    };

    ideasSelectOption = function(option) {
        this.ideasSelect.sendKeys(option);
    };

    getIdeasSelect = function() {
        return this.ideasSelect;
    };

    getIdeasSelectedOption = function() {
        return this.ideasSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
