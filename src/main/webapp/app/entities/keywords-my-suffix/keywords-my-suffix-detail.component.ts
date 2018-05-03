import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { KeywordsMySuffixService } from './keywords-my-suffix.service';

@Component({
    selector: 'jhi-keywords-my-suffix-detail',
    templateUrl: './keywords-my-suffix-detail.component.html'
})
export class KeywordsMySuffixDetailComponent implements OnInit, OnDestroy {

    keywords: KeywordsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private keywordsService: KeywordsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInKeywords();
    }

    load(id) {
        this.keywordsService.find(id)
            .subscribe((keywordsResponse: HttpResponse<KeywordsMySuffix>) => {
                this.keywords = keywordsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInKeywords() {
        this.eventSubscriber = this.eventManager.subscribe(
            'keywordsListModification',
            (response) => this.load(this.keywords.id)
        );
    }
}
