import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { KeywordsMySuffixService } from './keywords-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-keywords-my-suffix',
    templateUrl: './keywords-my-suffix.component.html'
})
export class KeywordsMySuffixComponent implements OnInit, OnDestroy {
keywords: KeywordsMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private keywordsService: KeywordsMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.keywordsService.query().subscribe(
            (res: HttpResponse<KeywordsMySuffix[]>) => {
                this.keywords = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInKeywords();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: KeywordsMySuffix) {
        return item.id;
    }
    registerChangeInKeywords() {
        this.eventSubscriber = this.eventManager.subscribe('keywordsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
