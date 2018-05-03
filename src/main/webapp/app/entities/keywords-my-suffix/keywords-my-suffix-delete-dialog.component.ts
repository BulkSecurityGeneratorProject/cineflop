import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { KeywordsMySuffixPopupService } from './keywords-my-suffix-popup.service';
import { KeywordsMySuffixService } from './keywords-my-suffix.service';

@Component({
    selector: 'jhi-keywords-my-suffix-delete-dialog',
    templateUrl: './keywords-my-suffix-delete-dialog.component.html'
})
export class KeywordsMySuffixDeleteDialogComponent {

    keywords: KeywordsMySuffix;

    constructor(
        private keywordsService: KeywordsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.keywordsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'keywordsListModification',
                content: 'Deleted an keywords'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-keywords-my-suffix-delete-popup',
    template: ''
})
export class KeywordsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private keywordsPopupService: KeywordsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.keywordsPopupService
                .open(KeywordsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
