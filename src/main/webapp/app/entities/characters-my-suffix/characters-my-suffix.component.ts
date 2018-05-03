import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CharactersMySuffix } from './characters-my-suffix.model';
import { CharactersMySuffixService } from './characters-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-characters-my-suffix',
    templateUrl: './characters-my-suffix.component.html'
})
export class CharactersMySuffixComponent implements OnInit, OnDestroy {
characters: CharactersMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private charactersService: CharactersMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.charactersService.query().subscribe(
            (res: HttpResponse<CharactersMySuffix[]>) => {
                this.characters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCharacters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CharactersMySuffix) {
        return item.id;
    }
    registerChangeInCharacters() {
        this.eventSubscriber = this.eventManager.subscribe('charactersListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
