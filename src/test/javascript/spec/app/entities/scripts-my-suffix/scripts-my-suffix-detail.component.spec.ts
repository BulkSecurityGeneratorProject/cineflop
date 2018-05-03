/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { ScriptsMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix-detail.component';
import { ScriptsMySuffixService } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix.service';
import { ScriptsMySuffix } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix.model';

describe('Component Tests', () => {

    describe('ScriptsMySuffix Management Detail Component', () => {
        let comp: ScriptsMySuffixDetailComponent;
        let fixture: ComponentFixture<ScriptsMySuffixDetailComponent>;
        let service: ScriptsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [ScriptsMySuffixDetailComponent],
                providers: [
                    ScriptsMySuffixService
                ]
            })
            .overrideTemplate(ScriptsMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScriptsMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScriptsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ScriptsMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.scripts).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
