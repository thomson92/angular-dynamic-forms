import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldMetaComponent } from './field-meta.component';

describe('FieldMetaComponent', () => {
  let component: FieldMetaComponent;
  let fixture: ComponentFixture<FieldMetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldMetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldMetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
