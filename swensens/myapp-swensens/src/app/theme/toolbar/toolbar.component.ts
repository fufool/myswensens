import { Component, Output, EventEmitter, HostListener } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {
  @Output() onMenuIconClick: EventEmitter<any> = new EventEmitter<any>();
  isToolbarFixed: boolean = false;
  showUser: boolean = false;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any): void {
    const scrollThreshold = 50;
    this.isToolbarFixed = window.scrollY > scrollThreshold;
  }
  constructor(public authService: AuthService, private router: Router) { ;
  }

  ngOnInit() { 

  }

  onLogout() {
    this.authService.logout();
  }

  public sidenavToggle(){
    this.onMenuIconClick.emit();
  }
}
