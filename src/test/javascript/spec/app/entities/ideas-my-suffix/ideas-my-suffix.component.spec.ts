/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { IdeasMySuffixComponent } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.component';
import { IdeasMySuffixService } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.service';
import { IdeasMySuffix } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.model';

describe('Component Tests', () => {

    describe('IdeasMySuffix Management Component', () => {
        let comp: IdeasMySuffixComponent;
        let fixture: ComponentFixture<IdeasMySuffixComponent>;
        let service: IdeasMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [IdeasMySuffixComponent],
                providers: [
                    IdeasMySuffixService
                ]
            })
            .overrideTemplate(IdeasMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeasMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeasMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new IdeasMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ideas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
