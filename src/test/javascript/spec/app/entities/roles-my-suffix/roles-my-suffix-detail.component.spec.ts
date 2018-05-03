/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { BlogTestModule } from '../../../test.module';
import { RolesMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix-detail.component';
import { RolesMySuffixService } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix.service';
import { RolesMySuffix } from '../../../../../../main/webapp/app/entities/roles-my-suffix/roles-my-suffix.model';

describe('Component Tests', () => {

    describe('RolesMySuffix Management Detail Component', () => {
        let comp: RolesMySuffixDetailComponent;
        let fixture: ComponentFixture<RolesMySuffixDetailComponent>;
        let service: RolesMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [BlogTestModule],
                declarations: [RolesMySuffixDetailComponent],
                providers: [
                    RolesMySuffixService
                ]
            })
            .overrideTemplate(RolesMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RolesMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RolesMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RolesMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.roles).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
