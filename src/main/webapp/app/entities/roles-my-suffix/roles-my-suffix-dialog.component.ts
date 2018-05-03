import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RolesMySuffix } from './roles-my-suffix.model';
import { RolesMySuffixPopupService } from './roles-my-suffix-popup.service';
import { RolesMySuffixService } from './roles-my-suffix.service';
import { IdeasMySuffix, IdeasMySuffixService } from '../ideas-my-suffix';

@Component({
    selector: 'jhi-roles-my-suffix-dialog',
    templateUrl: './roles-my-suffix-dialog.component.html'
})
export class RolesMySuffixDialogComponent implements OnInit {

    roles: RolesMySuffix;
    isSaving: boolean;

    ideas: IdeasMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rolesService: RolesMySuffixService,
        private ideasService: IdeasMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.ideasService.query()
            .subscribe((res: HttpResponse<IdeasMySuffix[]>) => { this.ideas = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.roles.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rolesService.update(this.roles));
        } else {
            this.subscribeToSaveResponse(
                this.rolesService.create(this.roles));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RolesMySuffix>>) {
        result.subscribe((res: HttpResponse<RolesMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RolesMySuffix) {
        this.eventManager.broadcast({ name: 'rolesListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackIdeasById(index: number, item: IdeasMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-roles-my-suffix-popup',
    template: ''
})
export class RolesMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolesPopupService: RolesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rolesPopupService
                    .open(RolesMySuffixDialogComponent as Component, params['id']);
            } else {
                this.rolesPopupService
                    .open(RolesMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
