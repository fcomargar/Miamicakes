import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCakesComponent } from './custom-cakes.component';

describe('CustomCakesComponent', () => {
  let component: CustomCakesComponent;
  let fixture: ComponentFixture<CustomCakesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomCakesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomCakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
