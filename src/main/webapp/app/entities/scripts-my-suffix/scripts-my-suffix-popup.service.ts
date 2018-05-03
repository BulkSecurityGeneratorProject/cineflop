import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ScriptsMySuffix } from './scripts-my-suffix.model';
import { ScriptsMySuffixService } from './scripts-my-suffix.service';

@Injectable()
export class ScriptsMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private scriptsService: ScriptsMySuffixService

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
                this.scriptsService.find(id)
                    .subscribe((scriptsResponse: HttpResponse<ScriptsMySuffix>) => {
                        const scripts: ScriptsMySuffix = scriptsResponse.body;
                        this.ngbModalRef = this.scriptsModalRef(component, scripts);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.scriptsModalRef(component, new ScriptsMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    scriptsModalRef(component: Component, scripts: ScriptsMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.scripts = scripts;
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
