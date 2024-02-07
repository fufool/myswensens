import { isPlatformBrowser } from '@angular/common';
import { Component, Inject,PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent {
  
  public showBackToTop: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object){

  }

  public scrollToTop(){
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset  / (scrollDuration / 20);
    var scrollInterval = setInterval(()=>{
      if(window.pageYOffset != 0){
         window.scrollBy(0, scrollStep);
      }
      else{
        clearInterval(scrollInterval); 
      }
    },10);
    if(window.innerWidth <= 768){
      setTimeout(() => { 
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0,0);
        } 
      });
    }
  }
}
