import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ScriptsMySuffix } from './scripts-my-suffix.model';
import { ScriptsMySuffixPopupService } from './scripts-my-suffix-popup.service';
import { ScriptsMySuffixService } from './scripts-my-suffix.service';

@Component({
    selector: 'jhi-scripts-my-suffix-dialog',
    templateUrl: './scripts-my-suffix-dialog.component.html'
})
export class ScriptsMySuffixDialogComponent implements OnInit {

    scripts: ScriptsMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private scriptsService: ScriptsMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.scripts.id !== undefined) {
            this.subscribeToSaveResponse(
                this.scriptsService.update(this.scripts));
        } else {
            this.subscribeToSaveResponse(
                this.scriptsService.create(this.scripts));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ScriptsMySuffix>>) {
        result.subscribe((res: HttpResponse<ScriptsMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ScriptsMySuffix) {
        this.eventManager.broadcast({ name: 'scriptsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-scripts-my-suffix-popup',
    template: ''
})
export class ScriptsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scriptsPopupService: ScriptsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.scriptsPopupService
                    .open(ScriptsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.scriptsPopupService
                    .open(ScriptsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
