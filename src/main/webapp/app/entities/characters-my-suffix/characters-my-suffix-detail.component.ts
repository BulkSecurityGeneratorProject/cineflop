import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CharactersMySuffix } from './characters-my-suffix.model';
import { CharactersMySuffixService } from './characters-my-suffix.service';

@Component({
    selector: 'jhi-characters-my-suffix-detail',
    templateUrl: './characters-my-suffix-detail.component.html'
})
export class CharactersMySuffixDetailComponent implements OnInit, OnDestroy {

    characters: CharactersMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private charactersService: CharactersMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCharacters();
    }

    load(id) {
        this.charactersService.find(id)
            .subscribe((charactersResponse: HttpResponse<CharactersMySuffix>) => {
                this.characters = charactersResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCharacters() {
        this.eventSubscriber = this.eventManager.subscribe(
            'charactersListModification',
            (response) => this.load(this.characters.id)
        );
    }
}
