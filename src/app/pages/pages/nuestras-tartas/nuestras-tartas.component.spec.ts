import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuestrasTartasComponent } from './nuestras-tartas.component';

describe('NuestrasTartasComponent', () => {
  let component: NuestrasTartasComponent;
  let fixture: ComponentFixture<NuestrasTartasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuestrasTartasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NuestrasTartasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
