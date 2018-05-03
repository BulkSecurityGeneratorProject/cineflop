/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { KeywordsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix-detail.component';
import { KeywordsMySuffixService } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.service';
import { KeywordsMySuffix } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.model';

describe('Component Tests', () => {

    describe('KeywordsMySuffix Management Detail Component', () => {
        let comp: KeywordsMySuffixDetailComponent;
        let fixture: ComponentFixture<KeywordsMySuffixDetailComponent>;
        let service: KeywordsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [KeywordsMySuffixDetailComponent],
                providers: [
                    KeywordsMySuffixService
                ]
            })
            .overrideTemplate(KeywordsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeywordsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new KeywordsMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.keywords).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
