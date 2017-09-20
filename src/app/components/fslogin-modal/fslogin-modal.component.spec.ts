import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSLoginModalComponent } from './fslogin-modal.component';

describe('FSLoginModalComponent', () => {
  let component: FSLoginModalComponent;
  let fixture: ComponentFixture<FSLoginModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FSLoginModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSLoginModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
