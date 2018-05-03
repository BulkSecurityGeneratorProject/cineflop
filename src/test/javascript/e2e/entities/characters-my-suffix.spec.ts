import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Characters e2e test', () => {

    let navBarPage: NavBarPage;
    let charactersDialogPage: CharactersDialogPage;
    let charactersComponentsPage: CharactersComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Characters', () => {
        navBarPage.goToEntity('characters-my-suffix');
        charactersComponentsPage = new CharactersComponentsPage();
        expect(charactersComponentsPage.getTitle())
            .toMatch(/blogApp.characters.home.title/);

    });

    it('should load create Characters dialog', () => {
        charactersComponentsPage.clickOnCreateButton();
        charactersDialogPage = new CharactersDialogPage();
        expect(charactersDialogPage.getModalTitle())
            .toMatch(/blogApp.characters.home.createOrEditLabel/);
        charactersDialogPage.close();
    });

    it('should create and save Characters', () => {
        charactersComponentsPage.clickOnCreateButton();
        charactersDialogPage.setNameInput('name');
        expect(charactersDialogPage.getNameInput()).toMatch('name');
        charactersDialogPage.save();
        expect(charactersDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class CharactersComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-characters-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class CharactersDialogPage {
    modalTitle = element(by.css('h4#myCharactersLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    nameInput = element(by.css('input#field_name'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setNameInput = function(name) {
        this.nameInput.sendKeys(name);
    };

    getNameInput = function() {
        return this.nameInput.getAttribute('value');
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
