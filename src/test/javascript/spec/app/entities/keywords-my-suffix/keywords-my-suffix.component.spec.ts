/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { KeywordsMySuffixComponent } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.component';
import { KeywordsMySuffixService } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.service';
import { KeywordsMySuffix } from '../../../../../../main/webapp/app/entities/keywords-my-suffix/keywords-my-suffix.model';

describe('Component Tests', () => {

    describe('KeywordsMySuffix Management Component', () => {
        let comp: KeywordsMySuffixComponent;
        let fixture: ComponentFixture<KeywordsMySuffixComponent>;
        let service: KeywordsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [KeywordsMySuffixComponent],
                providers: [
                    KeywordsMySuffixService
                ]
            })
            .overrideTemplate(KeywordsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KeywordsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KeywordsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new KeywordsMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.keywords[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
