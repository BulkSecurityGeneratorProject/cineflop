/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { BlogTestModule } from '../../../test.module';
import { CharactersMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix-delete-dialog.component';
import { CharactersMySuffixService } from '../../../../../../main/webapp/app/entities/characters-my-suffix/characters-my-suffix.service';

describe('Component Tests', () => {

    describe('CharactersMySuffix Management Delete Component', () => {
        let comp: CharactersMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CharactersMySuffixDeleteDialogComponent>;
        let service: CharactersMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [CharactersMySuffixDeleteDialogComponent],
                providers: [
                    CharactersMySuffixService
                ]
            })
            .overrideTemplate(CharactersMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CharactersMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CharactersMySuffixService);
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
