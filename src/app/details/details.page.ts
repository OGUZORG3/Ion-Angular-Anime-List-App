import { AnimeService } from './../services/anime.service';
import { Component, Input, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonItem, IonLabel, IonText, IonTitle, IonToolbar,IonBackButton, IonRow, IonCol, IonGrid } from '@ionic/angular/standalone';
import { AnimeResult } from '../services/interfaces';
import { cashOutline, calendarOutline,star } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { IonIcon } from '@ionic/angular/standalone';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
   imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonBackButton,
    IonItem,
    CurrencyPipe,
    DatePipe,
    IonButton,
    IonRow,
    IonCol,
    IonGrid
  ],
})
export class DetailsPage{
  private animeService = inject(AnimeService);
  public anime: WritableSignal<AnimeResult | null> = signal<AnimeResult | null>(null,);

  @Input()
  set id(animeId:string){
    console.log(animeId);
    this.animeService.getAnimeDetails(animeId).subscribe((anime:any)=>{
      this.anime.set(anime.data)
      console.log(anime.data.images.jpg.image_url)
    });
  }
  constructor() {
    addIcons({cashOutline,calendarOutline,star});
  }


}
