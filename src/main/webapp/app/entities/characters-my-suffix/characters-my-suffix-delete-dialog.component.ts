import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CharactersMySuffix } from './characters-my-suffix.model';
import { CharactersMySuffixPopupService } from './characters-my-suffix-popup.service';
import { CharactersMySuffixService } from './characters-my-suffix.service';

@Component({
    selector: 'jhi-characters-my-suffix-delete-dialog',
    templateUrl: './characters-my-suffix-delete-dialog.component.html'
})
export class CharactersMySuffixDeleteDialogComponent {

    characters: CharactersMySuffix;

    constructor(
        private charactersService: CharactersMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.charactersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'charactersListModification',
                content: 'Deleted an characters'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-characters-my-suffix-delete-popup',
    template: ''
})
export class CharactersMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private charactersPopupService: CharactersMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.charactersPopupService
                .open(CharactersMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
