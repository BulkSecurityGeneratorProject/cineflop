import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RolesMySuffix } from './roles-my-suffix.model';
import { RolesMySuffixService } from './roles-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-roles-my-suffix',
    templateUrl: './roles-my-suffix.component.html'
})
export class RolesMySuffixComponent implements OnInit, OnDestroy {
roles: RolesMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rolesService: RolesMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rolesService.query().subscribe(
            (res: HttpResponse<RolesMySuffix[]>) => {
                this.roles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RolesMySuffix) {
        return item.id;
    }
    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe('rolesListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
