/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { IdeasMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix-delete-dialog.component';
import { IdeasMySuffixService } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.service';

describe('Component Tests', () => {

    describe('IdeasMySuffix Management Delete Component', () => {
        let comp: IdeasMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<IdeasMySuffixDeleteDialogComponent>;
        let service: IdeasMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [IdeasMySuffixDeleteDialogComponent],
                providers: [
                    IdeasMySuffixService
                ]
            })
            .overrideTemplate(IdeasMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeasMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeasMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
