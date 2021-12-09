import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';
import {LngLatBounds} from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public http: HttpClient) {
  }

  baseUrl: string = environment.remoteUrl + '/List/json/listItems.aspx?listID=123';// this link is have to be change , that will be from where you will take the data
  baseUrl2: string = environment.remoteUrl + '/List/json/listItems.aspx?listID=345';// this link is have to be change , that will be from where you will take the data

  getMapData(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl);
  }

  getMapData2(): Observable<any[]> {
    return this.http.get<any>(this.baseUrl2);
  }

  getProperty(propertyID: string): Observable<any> {
    return this.http.get<any>(environment.remoteUrl + '/List/json/propertyItem.aspx?listID=1230&token=1524&propertyID=' + propertyID);
  }

  updateProperty(propertyId: string | number, changes: Partial<any>): Observable<any> {
    const channge = {
      isFavorite: !changes.favorite,
      listID: changes.listID,
      propertyID: changes.propertyID,
      token: '214545'
    };

    return this.http.post<any>(environment.remoteUrl + '/List/json/updateListItem.aspx', channge);
  }

  public getMenu() {
    return [
      {id: 1, routerLink: '/', title: 'Main', icon: 'home', hasSubMenu: false, parentId: 0},
      /* this code is not function:(Its just for the navigation)
      {id: 2, routerLink: 'load-pins', title: 'Load Pins', icon: 'location_on', hasSubMenu: false, parentId: 0}, 
    {id: 3, routerLink: 'replace-pins', title: 'Replace Pins', icon: 'place', hasSubMenu: false, parentId: 0},
     {id: 4, routerLink: 'zoom-to', title: 'Zoom to', icon: 'my_location', hasSubMenu: false, parentId: 0},
     {id: 5, routerLink: 'auto-zoom', title: 'Auto Zoom', icon: 'zoom_out_map', hasSubMenu: false, parentId: 0},*/
    ];
  }
}
