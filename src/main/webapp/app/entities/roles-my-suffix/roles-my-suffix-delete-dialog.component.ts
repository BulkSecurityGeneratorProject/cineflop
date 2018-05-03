import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RolesMySuffix } from './roles-my-suffix.model';
import { RolesMySuffixPopupService } from './roles-my-suffix-popup.service';
import { RolesMySuffixService } from './roles-my-suffix.service';

@Component({
    selector: 'jhi-roles-my-suffix-delete-dialog',
    templateUrl: './roles-my-suffix-delete-dialog.component.html'
})
export class RolesMySuffixDeleteDialogComponent {

    roles: RolesMySuffix;

    constructor(
        private rolesService: RolesMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rolesService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rolesListModification',
                content: 'Deleted an roles'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-roles-my-suffix-delete-popup',
    template: ''
})
export class RolesMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rolesPopupService: RolesMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rolesPopupService
                .open(RolesMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
