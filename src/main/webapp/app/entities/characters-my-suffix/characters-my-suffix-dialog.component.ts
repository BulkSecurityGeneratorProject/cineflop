import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CharactersMySuffix } from './characters-my-suffix.model';
import { CharactersMySuffixPopupService } from './characters-my-suffix-popup.service';
import { CharactersMySuffixService } from './characters-my-suffix.service';

@Component({
    selector: 'jhi-characters-my-suffix-dialog',
    templateUrl: './characters-my-suffix-dialog.component.html'
})
export class CharactersMySuffixDialogComponent implements OnInit {

    characters: CharactersMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private charactersService: CharactersMySuffixService,
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
        if (this.characters.id !== undefined) {
            this.subscribeToSaveResponse(
                this.charactersService.update(this.characters));
        } else {
            this.subscribeToSaveResponse(
                this.charactersService.create(this.characters));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CharactersMySuffix>>) {
        result.subscribe((res: HttpResponse<CharactersMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CharactersMySuffix) {
        this.eventManager.broadcast({ name: 'charactersListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-characters-my-suffix-popup',
    template: ''
})
export class CharactersMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private charactersPopupService: CharactersMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.charactersPopupService
                    .open(CharactersMySuffixDialogComponent as Component, params['id']);
            } else {
                this.charactersPopupService
                    .open(CharactersMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
