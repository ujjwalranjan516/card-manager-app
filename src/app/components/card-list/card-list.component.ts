import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';
import { EditCardModalComponent } from '../edit-card-modal/edit-card-modal.component';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent implements OnInit {
  cards: Card[] = [];

  constructor(
    private cardService: CardService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cardService.cards$.subscribe(cards => {
      this.cards = cards;
    });
  }

  onEditCard(card: Card): void {
    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '500px',
      data: { card: { ...card } }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.updateCard(result);
      }
    });
  }

  onAddCard(): void {
    const newCard: Card = {
      id: this.generateId(),
      title: '',
      description: ''
    };

    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '500px',
      data: { card: newCard, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardService.addCard(result);
      }
    });
  }

  onDeleteCard(cardId: number): void {
    if (confirm('Are you sure you want to delete this card?')) {
      this.cardService.deleteCard(cardId);
    }
  }

  onRefresh(): void {
    this.cardService.refreshData();
  }

  private generateId(): number {
    return Math.max(...this.cards.map(card => card.id), 0) + 1;
  }
}
