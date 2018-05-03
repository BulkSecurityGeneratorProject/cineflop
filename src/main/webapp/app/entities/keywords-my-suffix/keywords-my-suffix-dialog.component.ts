import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { KeywordsMySuffixPopupService } from './keywords-my-suffix-popup.service';
import { KeywordsMySuffixService } from './keywords-my-suffix.service';
import { IdeasMySuffix, IdeasMySuffixService } from '../ideas-my-suffix';

@Component({
    selector: 'jhi-keywords-my-suffix-dialog',
    templateUrl: './keywords-my-suffix-dialog.component.html'
})
export class KeywordsMySuffixDialogComponent implements OnInit {

    keywords: KeywordsMySuffix;
    isSaving: boolean;

    ideas: IdeasMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private keywordsService: KeywordsMySuffixService,
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
        if (this.keywords.id !== undefined) {
            this.subscribeToSaveResponse(
                this.keywordsService.update(this.keywords));
        } else {
            this.subscribeToSaveResponse(
                this.keywordsService.create(this.keywords));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<KeywordsMySuffix>>) {
        result.subscribe((res: HttpResponse<KeywordsMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: KeywordsMySuffix) {
        this.eventManager.broadcast({ name: 'keywordsListModification', content: 'OK'});
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
    selector: 'jhi-keywords-my-suffix-popup',
    template: ''
})
export class KeywordsMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keywordsPopupService: KeywordsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.keywordsPopupService
                    .open(KeywordsMySuffixDialogComponent as Component, params['id']);
            } else {
                this.keywordsPopupService
                    .open(KeywordsMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
