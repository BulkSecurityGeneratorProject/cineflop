import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Ideas e2e test', () => {

    let navBarPage: NavBarPage;
    let ideasDialogPage: IdeasDialogPage;
    let ideasComponentsPage: IdeasComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Ideas', () => {
        navBarPage.goToEntity('ideas-my-suffix');
        ideasComponentsPage = new IdeasComponentsPage();
        expect(ideasComponentsPage.getTitle())
            .toMatch(/blogApp.ideas.home.title/);

    });

    it('should load create Ideas dialog', () => {
        ideasComponentsPage.clickOnCreateButton();
        ideasDialogPage = new IdeasDialogPage();
        expect(ideasDialogPage.getModalTitle())
            .toMatch(/blogApp.ideas.home.createOrEditLabel/);
        ideasDialogPage.close();
    });

    it('should create and save Ideas', () => {
        ideasComponentsPage.clickOnCreateButton();
        ideasDialogPage.setTitleInput('title');
        expect(ideasDialogPage.getTitleInput()).toMatch('title');
        ideasDialogPage.setSynopsisInput('synopsis');
        expect(ideasDialogPage.getSynopsisInput()).toMatch('synopsis');
        ideasDialogPage.setContextInput('context');
        expect(ideasDialogPage.getContextInput()).toMatch('context');
        ideasDialogPage.setImagepathInput('imagepath');
        expect(ideasDialogPage.getImagepathInput()).toMatch('imagepath');
        ideasDialogPage.genderSelectLastOption();
        ideasDialogPage.scriptsSelectLastOption();
        ideasDialogPage.save();
        expect(ideasDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class IdeasComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-ideas-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class IdeasDialogPage {
    modalTitle = element(by.css('h4#myIdeasLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    synopsisInput = element(by.css('input#field_synopsis'));
    contextInput = element(by.css('input#field_context'));
    imagepathInput = element(by.css('input#field_imagepath'));
    genderSelect = element(by.css('select#field_gender'));
    scriptsSelect = element(by.css('select#field_scripts'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setSynopsisInput = function(synopsis) {
        this.synopsisInput.sendKeys(synopsis);
    };

    getSynopsisInput = function() {
        return this.synopsisInput.getAttribute('value');
    };

    setContextInput = function(context) {
        this.contextInput.sendKeys(context);
    };

    getContextInput = function() {
        return this.contextInput.getAttribute('value');
    };

    setImagepathInput = function(imagepath) {
        this.imagepathInput.sendKeys(imagepath);
    };

    getImagepathInput = function() {
        return this.imagepathInput.getAttribute('value');
    };

    setGenderSelect = function(gender) {
        this.genderSelect.sendKeys(gender);
    };

    getGenderSelect = function() {
        return this.genderSelect.element(by.css('option:checked')).getText();
    };

    genderSelectLastOption = function() {
        this.genderSelect.all(by.tagName('option')).last().click();
    };
    scriptsSelectLastOption = function() {
        this.scriptsSelect.all(by.tagName('option')).last().click();
    };

    scriptsSelectOption = function(option) {
        this.scriptsSelect.sendKeys(option);
    };

    getScriptsSelect = function() {
        return this.scriptsSelect;
    };

    getScriptsSelectedOption = function() {
        return this.scriptsSelect.element(by.css('option:checked')).getText();
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
