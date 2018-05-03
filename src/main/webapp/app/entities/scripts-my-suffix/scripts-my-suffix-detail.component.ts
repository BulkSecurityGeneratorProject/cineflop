import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ScriptsMySuffix } from './scripts-my-suffix.model';
import { ScriptsMySuffixService } from './scripts-my-suffix.service';

@Component({
    selector: 'jhi-scripts-my-suffix-detail',
    templateUrl: './scripts-my-suffix-detail.component.html'
})
export class ScriptsMySuffixDetailComponent implements OnInit, OnDestroy {

    scripts: ScriptsMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private scriptsService: ScriptsMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInScripts();
    }

    load(id) {
        this.scriptsService.find(id)
            .subscribe((scriptsResponse: HttpResponse<ScriptsMySuffix>) => {
                this.scripts = scriptsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInScripts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'scriptsListModification',
            (response) => this.load(this.scripts.id)
        );
    }
}
