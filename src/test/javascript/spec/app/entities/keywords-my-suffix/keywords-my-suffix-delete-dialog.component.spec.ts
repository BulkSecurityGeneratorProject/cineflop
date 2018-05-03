/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { KeywordsMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix-delete-dialog.component';
import { KeywordsMySuffixService } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.service';

describe('Component Tests', () => {

    describe('KeywordsMySuffix Management Delete Component', () => {
        let comp: KeywordsMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<KeywordsMySuffixDeleteDialogComponent>;
        let service: KeywordsMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [KeywordsMySuffixDeleteDialogComponent],
                providers: [
                    KeywordsMySuffixService
                ]
            })
            .overrideTemplate(KeywordsMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeywordsMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordsMySuffixService);
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
