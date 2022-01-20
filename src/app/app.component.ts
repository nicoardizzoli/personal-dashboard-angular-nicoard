import { animate, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      // aca en el todos a todos, podemos ahora usar la data de la activated route, por ej 1 y 2 que son los valores q le pusimos
      // transition('1 => 2', [ , tambien se puede usar :increment o :decrement
      transition('* => *', [

        query(':enter', [
          style({
            opacity: 0,
            display: 'block',
          }),
          animate(200, style({
            opacity: 1,
          }))
        ], { optional: true })
      ]),
      transition('* => secondary', [
        query(':enter', [
          style({
            opacity: 0,
            display: 'block',
          }),
          animate(200, style({
            opacity: 1,
          }))
        ], { optional: true })
      ])
    ])
  ]
})
export class AppComponent implements OnInit {

  dateTime!: Observable<Date>;

  ngOnInit(): void {
   this.dateTime = timer(0, 1000).pipe(
      map(() => {
        return new Date;
      })
    )
  }

  prepareRoute(outlet: RouterOutlet){
   if(outlet.isActivated){
     const tab =  outlet.activatedRouteData['tabNumber'];
     if (!tab) return 'secondary';
     return tab;
   } else {
     return ''
   }


  }



}
