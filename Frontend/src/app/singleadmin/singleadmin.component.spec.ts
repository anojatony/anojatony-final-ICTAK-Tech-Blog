import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleadminComponent } from './singleadmin.component';

describe('SingleadminComponent', () => {
  let component: SingleadminComponent;
  let fixture: ComponentFixture<SingleadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
