import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardsUrl = 'assets/data/cards.json';
  private cardsSubject = new BehaviorSubject<Card[]>([]);
  public cards$ = this.cardsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http.get<Card[]>(this.cardsUrl).subscribe(
      cards => this.cardsSubject.next(cards),
      error => console.error('Error loading cards:', error)
    );
  }

  getCards(): Observable<Card[]> {
    return this.cards$;
  }

  updateCard(updatedCard: Card): void {
    const currentCards = this.cardsSubject.value;
    const updatedCards = currentCards.map(card =>
      card.id === updatedCard.id ? updatedCard : card
    );
    this.cardsSubject.next(updatedCards);
  }

  addCard(newCard: Card): void {
    const currentCards = this.cardsSubject.value;
    const cardsWithNew = [...currentCards, newCard];
    this.cardsSubject.next(cardsWithNew);
  }

  deleteCard(cardId: number): void {
    const currentCards = this.cardsSubject.value;
    const filteredCards = currentCards.filter(card => card.id !== cardId);
    this.cardsSubject.next(filteredCards);
  }

  // Method to simulate JSON file update
  refreshData(): void {
    this.loadInitialData();
  }
}
