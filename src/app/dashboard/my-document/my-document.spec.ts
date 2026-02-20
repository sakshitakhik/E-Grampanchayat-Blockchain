import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDocument } from './my-document';

describe('MyDocument', () => {
  let component: MyDocument;
  let fixture: ComponentFixture<MyDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyDocument]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDocument);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
