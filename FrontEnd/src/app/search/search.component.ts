
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() searchTermChange = new EventEmitter<string>();
  books: Book[] = [];
  searchTerm = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks(): void {
    this.bookService.getbookall().subscribe((books) => {
      this.books = books;
    });
  }

  // Fix the method name to match the template
  search(): void {
    this.searchTermChange.emit(this.searchTerm);
  }
}
