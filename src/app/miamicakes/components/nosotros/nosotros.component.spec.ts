import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosotrosComponentc } from './nosotros.component';

describe('NosotrosComponentc', () => {
  let component: NosotrosComponentc;
  let fixture: ComponentFixture<NosotrosComponentc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosotrosComponentc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosotrosComponentc);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
