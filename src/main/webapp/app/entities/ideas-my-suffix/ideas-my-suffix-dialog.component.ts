import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IdeasMySuffix } from './ideas-my-suffix.model';
import { IdeasMySuffixPopupService } from './ideas-my-suffix-popup.service';
import { IdeasMySuffixService } from './ideas-my-suffix.service';
import { ScriptsMySuffix, ScriptsMySuffixService } from '../scripts-my-suffix';

@Component({
    selector: 'jhi-ideas-my-suffix-dialog',
    templateUrl: './ideas-my-suffix-dialog.component.html'
})
export class IdeasMySuffixDialogComponent implements OnInit {

    ideas: IdeasMySuffix;
    isSaving: boolean;

    scripts: ScriptsMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private ideasService: IdeasMySuffixService,
        private scriptsService: ScriptsMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.scriptsService.query()
            .subscribe((res: HttpResponse<ScriptsMySuffix[]>) => { this.scripts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.ideas.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ideasService.update(this.ideas));
        } else {
            this.subscribeToSaveResponse(
                this.ideasService.create(this.ideas));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IdeasMySuffix>>) {
        result.subscribe((res: HttpResponse<IdeasMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: IdeasMySuffix) {
        this.eventManager.broadcast({ name: 'ideasListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackScriptsById(index: number, item: ScriptsMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-ideas-my-suffix-popup',
    template: ''
})
export class IdeasMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ideasPopupService: IdeasMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ideasPopupService
                    .open(IdeasMySuffixDialogComponent as Component, params['id']);
            } else {
                this.ideasPopupService
                    .open(IdeasMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
