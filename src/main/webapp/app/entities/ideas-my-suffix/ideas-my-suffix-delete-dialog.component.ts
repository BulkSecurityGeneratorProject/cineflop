import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IdeasMySuffix } from './ideas-my-suffix.model';
import { IdeasMySuffixPopupService } from './ideas-my-suffix-popup.service';
import { IdeasMySuffixService } from './ideas-my-suffix.service';

@Component({
    selector: 'jhi-ideas-my-suffix-delete-dialog',
    templateUrl: './ideas-my-suffix-delete-dialog.component.html'
})
export class IdeasMySuffixDeleteDialogComponent {

    ideas: IdeasMySuffix;

    constructor(
        private ideasService: IdeasMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ideasService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ideasListModification',
                content: 'Deleted an ideas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ideas-my-suffix-delete-popup',
    template: ''
})
export class IdeasMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ideasPopupService: IdeasMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ideasPopupService
                .open(IdeasMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
