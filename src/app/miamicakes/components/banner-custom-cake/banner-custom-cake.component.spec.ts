import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCustomCakeComponent } from './banner-custom-cake.component';

describe('BannerCustomCakeComponent', () => {
  let component: BannerCustomCakeComponent;
  let fixture: ComponentFixture<BannerCustomCakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCustomCakeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerCustomCakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
