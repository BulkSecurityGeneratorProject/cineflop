/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { ScriptsMySuffixComponent } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix.component';
import { ScriptsMySuffixService } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix.service';
import { ScriptsMySuffix } from '../../../../../../main/webapp/app/entities/scripts-my-suffix/scripts-my-suffix.model';

describe('Component Tests', () => {

    describe('ScriptsMySuffix Management Component', () => {
        let comp: ScriptsMySuffixComponent;
        let fixture: ComponentFixture<ScriptsMySuffixComponent>;
        let service: ScriptsMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [ScriptsMySuffixComponent],
                providers: [
                    ScriptsMySuffixService
                ]
            })
            .overrideTemplate(ScriptsMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ScriptsMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ScriptsMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ScriptsMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.scripts[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
