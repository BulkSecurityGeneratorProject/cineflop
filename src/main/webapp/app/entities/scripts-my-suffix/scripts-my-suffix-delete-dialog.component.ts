import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ScriptsMySuffix } from './scripts-my-suffix.model';
import { ScriptsMySuffixPopupService } from './scripts-my-suffix-popup.service';
import { ScriptsMySuffixService } from './scripts-my-suffix.service';

@Component({
    selector: 'jhi-scripts-my-suffix-delete-dialog',
    templateUrl: './scripts-my-suffix-delete-dialog.component.html'
})
export class ScriptsMySuffixDeleteDialogComponent {

    scripts: ScriptsMySuffix;

    constructor(
        private scriptsService: ScriptsMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.scriptsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'scriptsListModification',
                content: 'Deleted an scripts'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-scripts-my-suffix-delete-popup',
    template: ''
})
export class ScriptsMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private scriptsPopupService: ScriptsMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.scriptsPopupService
                .open(ScriptsMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
