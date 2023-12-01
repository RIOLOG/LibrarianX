import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { Book } from '../models/model';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-singlebook',
  templateUrl: './singlebook.component.html',
  styleUrls: ['./singlebook.component.css']
})
export class SinglebookComponent implements OnInit {
  bookDetails: Book | undefined;
  updatedBookData: Book | undefined;
  bookpresent: boolean = true;
  bookingConfirm: boolean = false;
  notEnoughToken: boolean = false;
  borrowedBy: number | undefined;
  availableToken: number = 0;
  currentUserId: number = 0;
  myBook: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private users: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const bookid = +params['bookid'];

      if (!isNaN(bookid)) {
        // console.log(bookid);
        this.bookService.getBookById(bookid).subscribe(
          (result) => {
            this.bookDetails = result;
            this.refresh();
          },
          (error) => {
            console.error('Error fetching book details', error);
          }
        );
      } else {
        console.error('Invalid bookid:', params['bookid']);
      }
    });
  }

  time = () => {
    this.notEnoughToken = false;
    this.bookingConfirm = false;
  };

  BorrowNow() 
  {
    // console.log('Borrow Now me Hun');
    // console.log('book id:  ', this.bookDetails?.bookid);

    if (this.availableToken < 1) {
      // console.log('If me Hun');
      // console.log(this.availableToken);
      this.notEnoughToken = true;
      setTimeout(this.time, 2000);
    } else {
      this.bookingConfirm = true;
      setTimeout(this.time, 2000);
      if (this.bookDetails) {
        this.bookDetails.isBookAvailable = false;
        this.bookDetails.currentlyBorrowedBy = this.currentUserId;

        this.bookService.updateBook(this.bookDetails).subscribe((result) => {
          if (result) {
            this.users
              .borrowBook(this.currentUserId, result.lentByUserId)
              .subscribe(() => {
                this.refresh();
                this.toastr.success('Successfully Borrowed Book');
              });
          }
        });
      }
    }
  }

  refresh() 
  {
    if (this.bookDetails && this.bookDetails.isBookAvailable === false)
    {
      this.bookpresent = false;
      this.borrowedBy = this.bookDetails.currentlyBorrowedBy ?? 0;
      // console.log(this.bookDetails.isBookAvailable);
      // console.warn(this.bookDetails.currentlyBorrowedBy);
      // console.log(this.bookpresent);
    }

    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.currentUserId = userData;
      // console.log('user id is:  ', userData);

      this.users.getUserbyId(this.currentUserId).subscribe((result) => {
        if (result) {
          // console.log('user info:  ', result);
          this.availableToken = result.token;
          // console.log('user token:  ', result.token);

          if (result.id == this.bookDetails?.lentByUserId) {
            this.myBook = true;
          }
        }
      });
    }
  }
}
