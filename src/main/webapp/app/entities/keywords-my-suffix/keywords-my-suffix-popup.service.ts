import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { KeywordsMySuffix } from './keywords-my-suffix.model';
import { KeywordsMySuffixService } from './keywords-my-suffix.service';

@Injectable()
export class KeywordsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private keywordsService: KeywordsMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.keywordsService.find(id)
                    .subscribe((keywordsResponse: HttpResponse<KeywordsMySuffix>) => {
                        const keywords: KeywordsMySuffix = keywordsResponse.body;
                        this.ngbModalRef = this.keywordsModalRef(component, keywords);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.keywordsModalRef(component, new KeywordsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    keywordsModalRef(component: Component, keywords: KeywordsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.keywords = keywords;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
