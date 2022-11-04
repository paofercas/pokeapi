import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooselistComponent } from './chooselist.component';

describe('ChooselistComponent', () => {
  let component: ChooselistComponent;
  let fixture: ComponentFixture<ChooselistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooselistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
