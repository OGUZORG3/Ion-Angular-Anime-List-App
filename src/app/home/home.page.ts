import { Component, inject } from '@angular/core';
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    InfiniteScrollCustomEvent,
    IonList,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    IonAlert,
    IonLabel,
    IonBadge,
    IonInfiniteScrollContent,
    IonInfiniteScroll,
     } from '@ionic/angular/standalone';
import { AnimeService } from '../services/anime.service';
import { catchError, finalize, pipe } from 'rxjs';
import { AnimeResult } from '../services/interfaces';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent,IonList,IonItem,IonSkeletonText,IonAvatar,IonAlert,IonLabel,IonBadge,DatePipe,RouterModule,IonInfiniteScrollContent,IonInfiniteScroll],
})
export class HomePage {
  private animeService =  inject(AnimeService);
  private currentPage = 1;
  public error = null;
  public isLoading = true;
  public animes:AnimeResult[] = [];
  public imageBaseUrl = "";
  public dummyArray = new Array(10);
  constructor() {
    this.loadAnimes();
  }
  loadAnimes(event?:InfiniteScrollCustomEvent){
    this.error=null;
      if(!event){

      }
    this.animeService.getTopRatedAnimes(this.currentPage).pipe(
      finalize(()=>{
      this.isLoading=false;
      if(event){
        event.target.complete();
      }
    }),
    catchError((err:any) => {
      console.log(err);
      this.error=err.error.status_message;
      return[];
    }))
    .subscribe({
      next:(res)=>{
        console.log(res);
        this.animes.push(...res.data)
        if (event) {
          event.target.disabled = res.pagination === this.currentPage;
        }
      }
    })
  }
  loadMore(event:InfiniteScrollCustomEvent){
    this.currentPage++;
    this.loadAnimes(event);
  }
}
