/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { IdeasMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix-detail.component';
import { IdeasMySuffixService } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.service';
import { IdeasMySuffix } from '../../../../../../main/webapp/app/entities/ideas-my-suffix/ideas-my-suffix.model';

describe('Component Tests', () => {

    describe('IdeasMySuffix Management Detail Component', () => {
        let comp: IdeasMySuffixDetailComponent;
        let fixture: ComponentFixture<IdeasMySuffixDetailComponent>;
        let service: IdeasMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [IdeasMySuffixDetailComponent],
                providers: [
                    IdeasMySuffixService
                ]
            })
            .overrideTemplate(IdeasMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(IdeasMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(IdeasMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new IdeasMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ideas).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
