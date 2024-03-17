import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityInfoMessageComponent } from './quality-info-message.component';

describe('QualityInfoMessageComponent', () => {
  let component: QualityInfoMessageComponent;
  let fixture: ComponentFixture<QualityInfoMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QualityInfoMessageComponent]
    });
    fixture = TestBed.createComponent(QualityInfoMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
