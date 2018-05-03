/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { BlogTestModule } from '../../../test.module';
import { RolesMySuffixComponent } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix.component';
import { RolesMySuffixService } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix.service';
import { RolesMySuffix } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix.model';

describe('Component Tests', () => {

    describe('RolesMySuffix Management Component', () => {
        let comp: RolesMySuffixComponent;
        let fixture: ComponentFixture<RolesMySuffixComponent>;
        let service: RolesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [RolesMySuffixComponent],
                providers: [
                    RolesMySuffixService
                ]
            })
            .overrideTemplate(RolesMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RolesMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RolesMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.roles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
