import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCertificate } from './apply-certificate';

describe('ApplyCertificate', () => {
  let component: ApplyCertificate;
  let fixture: ComponentFixture<ApplyCertificate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApplyCertificate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyCertificate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
