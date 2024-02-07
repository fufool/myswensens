import { Component, ElementRef, ViewChild,} from '@angular/core';
import { register } from 'swiper/element/bundle';
import { Swiper } from 'swiper/types';

@Component({
  selector: 'app-promotions-featured',
  templateUrl: './promotions-featured.component.html',
  styleUrls: ['./promotions-featured.component.scss'],
})

export class PromotionsFeaturedComponent {
  
  @ViewChild('swiperRef')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  ngAfterViewInit(): void {
    register();
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  onActiveIndexChange() {
    console.log(this.swiper?.activeIndex);
  }

}
