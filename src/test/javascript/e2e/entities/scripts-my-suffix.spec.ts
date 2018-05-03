import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Scripts e2e test', () => {

    let navBarPage: NavBarPage;
    let scriptsDialogPage: ScriptsDialogPage;
    let scriptsComponentsPage: ScriptsComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Scripts', () => {
        navBarPage.goToEntity('scripts-my-suffix');
        scriptsComponentsPage = new ScriptsComponentsPage();
        expect(scriptsComponentsPage.getTitle())
            .toMatch(/blogApp.scripts.home.title/);

    });

    it('should load create Scripts dialog', () => {
        scriptsComponentsPage.clickOnCreateButton();
        scriptsDialogPage = new ScriptsDialogPage();
        expect(scriptsDialogPage.getModalTitle())
            .toMatch(/blogApp.scripts.home.createOrEditLabel/);
        scriptsDialogPage.close();
    });

    it('should create and save Scripts', () => {
        scriptsComponentsPage.clickOnCreateButton();
        scriptsDialogPage.setTitleInput('title');
        expect(scriptsDialogPage.getTitleInput()).toMatch('title');
        scriptsDialogPage.save();
        expect(scriptsDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class ScriptsComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-scripts-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class ScriptsDialogPage {
    modalTitle = element(by.css('h4#myScriptsLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
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
