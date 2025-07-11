import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private readonly API = 'http://localhost:2525/books';

  constructor(private http: HttpClient) {}

  // ✅ Get all books
  getAll(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.API}/all`);
  }

  // ✅ Get a book by ISBN
  getByIsbn(isbn: string): Observable<Book> {
    return this.http.get<Book>(`${this.API}/${isbn}`);
  }

  // ✅ Add a new book
  add(book: Book): Observable<Book> {
    return this.http.post<Book>(this.API, book);
  }

  // ✅ Update a book
  update(isbn: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.API}/${isbn}`, book);
  }

  // ✅ Delete a book
  delete(isbn: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${isbn}`);
  }
}
