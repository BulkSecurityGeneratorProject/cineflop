import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { IdeasMySuffix } from './ideas-my-suffix.model';
import { IdeasMySuffixService } from './ideas-my-suffix.service';

@Component({
    selector: 'jhi-ideas-my-suffix-detail',
    templateUrl: './ideas-my-suffix-detail.component.html'
})
export class IdeasMySuffixDetailComponent implements OnInit, OnDestroy {

    ideas: IdeasMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private ideasService: IdeasMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInIdeas();
    }

    load(id) {
        this.ideasService.find(id)
            .subscribe((ideasResponse: HttpResponse<IdeasMySuffix>) => {
                this.ideas = ideasResponse.body;
            });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInIdeas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ideasListModification',
            (response) => this.load(this.ideas.id)
        );
    }
}
