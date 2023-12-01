import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allbooks: undefined | Book[];
  filteredBooks: Book[] = [];

  constructor(private router: Router, private bookservice: BookService) {}

  ngOnInit(): void {
    this.bookservice.getbookall().subscribe((result) => {
      this.allbooks = result;
      this.filteredBooks = this.allbooks; // Initialize filteredBooks with allbooks
      console.log(this.allbooks);
    });
  }

  viewBookDetails(bookid: number): void {
    this.router.navigate(['home/details', bookid]);
  }


  searchBooks(searchTerm: string): void {
    this.filteredBooks = this.allbooks?.filter((book) =>
      book.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];
  }
}
