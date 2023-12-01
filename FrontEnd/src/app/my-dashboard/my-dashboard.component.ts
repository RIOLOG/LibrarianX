import { Component, OnInit } from '@angular/core';
import { Book } from '../models/model';
import { BookService } from '../services/book.service';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent implements OnInit {
  bookList: Book[] | undefined
  userId: number=0 
  lentId: number = 0
  updatedBook: Book | undefined
  constructor(private books: BookService, private users: UserService,     private toastr: ToastrService) { }
  ngOnInit(): void
  {
    this.reRender();
  }
  

  returnBook(val: number)
  {
    // console.log("return book id: ", val)
    this.books.getBookById(val).subscribe((result) => {
      // console.log("before return book: ", result)

      this.userId = result.currentlyBorrowedBy ??0;
      this.lentId = result.lentByUserId;
      this.updatedBook = result;
      this.updatedBook.isBookAvailable = true;
      this.toastr.success('Successfully Returned Book');
      this.updatedBook.currentlyBorrowedBy = 0;
      this.books.updateBook(this.updatedBook).subscribe((result) => {
        // console.log("after return book: ", result)

        if (result) {
          this.users.returnBook(this.userId, this.lentId).subscribe((result) => {
            if (result) {
              this.reRender();
            }
          })
        }
      })

    })
  }

  reRender() {
    if (localStorage.getItem('user')) {
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      let userId = userData;
      // console.log("user id: ", userId)

      this.books.searchBookByBorrowed(userId).subscribe((result) => {
        this.bookList = result;
        // console.log("result book: ", result)
      })
    }
  }
}
