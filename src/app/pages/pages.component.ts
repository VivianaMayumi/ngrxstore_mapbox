import {AfterViewInit, Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {MediaChange, MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: any;
  public sidenavOpen: boolean = true;

  mainToolbarFixed = false;

  MapFotoUrl = 'assets/images/map.jpg';
  public watcher: Subscription;

  constructor(public router: Router, public mediaObserver: MediaObserver) {
    this.watcher = mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.sidenavOpen = false;
      }
      else if (change.mqAlias === 'sm'){
        this.sidenavOpen = false;
      }
      else if (change.mqAlias === 'md'){
        this.sidenavOpen = true;
      }
      else{
        this.sidenavOpen = true;
      }
    });
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    } else {
      this.sidenavOpen = true;
    }
  }

  /* Posible to be delete viviana
  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      });
    }
  }*/

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (window.innerWidth < 960) {
          this.sidenav.close();
        }else{
          this.sidenavOpen = true;
        }
        this.mainToolbarFixed = false;
        setTimeout(() => {
          window.scrollTo(0, 0);
        });
      }
    });
  }

}
