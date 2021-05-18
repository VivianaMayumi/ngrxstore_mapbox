import {Component, Input, OnInit} from '@angular/core';
import {AppService} from '../../services/app.service';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.css']
})
export class VerticalMenuComponent implements OnInit {
  @Input('menuParentId') menuParentId;
  public menuItems = [];

  constructor( private appService: AppService) {}

  ngOnInit(): void {
    this.menuItems = this.appService.getMenu();
  }

}
