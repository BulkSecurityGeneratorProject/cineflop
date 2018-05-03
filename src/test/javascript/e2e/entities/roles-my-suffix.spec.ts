import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Roles e2e test', () => {

    let navBarPage: NavBarPage;
    let rolesDialogPage: RolesDialogPage;
    let rolesComponentsPage: RolesComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Roles', () => {
        navBarPage.goToEntity('roles-my-suffix');
        rolesComponentsPage = new RolesComponentsPage();
        expect(rolesComponentsPage.getTitle())
            .toMatch(/blogApp.roles.home.title/);

    });

    it('should load create Roles dialog', () => {
        rolesComponentsPage.clickOnCreateButton();
        rolesDialogPage = new RolesDialogPage();
        expect(rolesDialogPage.getModalTitle())
            .toMatch(/blogApp.roles.home.createOrEditLabel/);
        rolesDialogPage.close();
    });

    it('should create and save Roles', () => {
        rolesComponentsPage.clickOnCreateButton();
        rolesDialogPage.setRoleInput('role');
        expect(rolesDialogPage.getRoleInput()).toMatch('role');
        rolesDialogPage.ideasSelectLastOption();
        rolesDialogPage.save();
        expect(rolesDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class RolesComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-roles-my-suffix div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class RolesDialogPage {
    modalTitle = element(by.css('h4#myRolesLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    roleInput = element(by.css('input#field_role'));
    ideasSelect = element(by.css('select#field_ideas'));

    getModalTitle() {
        return this.modalTitle.getAttribute('jhiTranslate');
    }

    setRoleInput = function(role) {
        this.roleInput.sendKeys(role);
    };

    getRoleInput = function() {
        return this.roleInput.getAttribute('value');
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
