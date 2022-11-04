import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfildetailComponent } from './profildetail.component';

describe('ProfildetailComponent', () => {
  let component: ProfildetailComponent;
  let fixture: ComponentFixture<ProfildetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfildetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfildetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
