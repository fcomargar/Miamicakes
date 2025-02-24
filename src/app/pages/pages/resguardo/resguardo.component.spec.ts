import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResguardoComponent } from './resguardo.component';

describe('ResguardoComponent', () => {
  let component: ResguardoComponent;
  let fixture: ComponentFixture<ResguardoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResguardoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResguardoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
