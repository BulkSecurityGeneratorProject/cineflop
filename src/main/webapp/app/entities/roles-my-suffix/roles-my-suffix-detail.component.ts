import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RolesMySuffix } from './roles-my-suffix.model';
import { RolesMySuffixService } from './roles-my-suffix.service';

@Component({
    selector: 'jhi-roles-my-suffix-detail',
    templateUrl: './roles-my-suffix-detail.component.html'
})
export class RolesMySuffixDetailComponent implements OnInit, OnDestroy {

    roles: RolesMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rolesService: RolesMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRoles();
    }

    load(id) {
        this.rolesService.find(id)
            .subscribe((rolesResponse: HttpResponse<RolesMySuffix>) => {
                this.roles = rolesResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRoles() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rolesListModification',
            (response) => this.load(this.roles.id)
        );
    }
}
