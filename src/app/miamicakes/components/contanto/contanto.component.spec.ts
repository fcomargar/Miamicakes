import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContantoComponent } from './contanto.component';

describe('ContantoComponent', () => {
  let component: ContantoComponent;
  let fixture: ComponentFixture<ContantoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContantoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContantoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
