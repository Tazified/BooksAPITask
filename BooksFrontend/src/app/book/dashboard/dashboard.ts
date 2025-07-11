import { Component, signal } from '@angular/core';
import { Book } from '../../models/book';
import { BookService } from '../../service/book';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule,FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class BookDashboardComponent {

  actions = [
    { key: 'load',   label: 'Load All' },
    { key: 'add',    label: 'Add' },
    { key: 'update', label: 'Update' },
    { key: 'delete', label: 'Delete' }   // 🆕
  ];
  selected: 'load' | 'add' | 'update' | 'delete' = 'load';

  books = signal<Book[]>([]);
  singleBook = signal<Book | null>(null);
  error = signal('');

  form: Partial<Book> = {
    isbn: '',
    title: '',
    author: '',
    publicationYear: new Date().getFullYear()
  };

  constructor(private bookSvc: BookService) {}

  /* ---------- Execute according to selected action ---------- */
  execute() {
    this.error.set('');
    switch (this.selected) {
      case 'load':   this.loadAll(); break;
      case 'add':    this.add(); break;
      case 'update': this.update(); break;
      case 'delete': this.remove(); break;
    }
  }

  /* ---------- Disable logic ---------- */
  isDisabled(): boolean {
    if (this.selected === 'load') return false;
    if (!this.form.isbn) return true;                   // ISBN always required

    if (this.selected === 'add') {
      return !this.form.title || !this.form.author || !this.form.publicationYear;
    }
    if (this.selected === 'update') {
      return !(this.form.title || this.form.author || this.form.publicationYear);
    }
    // delete: only ISBN needed
    return false;
  }

  /* ---------- Service wrappers ---------- */
  private loadAll() {
    this.bookSvc.getAll().subscribe({
      next: list => this.books.set(list),
      error: err => this.error.set(err.message || 'Load failed')
    });
  }
  private add() {
    this.bookSvc.add(this.form as Book).subscribe({
      next: b => this.singleBook.set(b),
      error: err => this.error.set(err.message || 'Add failed')
    });
  }
  private update() {
    this.bookSvc.update(this.form.isbn!, this.form as Book).subscribe({
      next: b => this.singleBook.set(b),
      error: err => this.error.set(err.message || 'Update failed')
    });
  }
  private remove() {
    this.bookSvc.delete(this.form.isbn!).subscribe({
      next: () => { this.singleBook.set(null); this.error.set('Deleted'); },
      error: err => this.error.set(err.message || 'Delete failed')
    });
  }
}