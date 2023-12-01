export interface signin {
  username: string;
  password: string;
}

export interface User
{
id: number;
name: string;
username: string;
token: number;
}

export interface signup {
  id: number;
  name: string;
  username: string;
  password: string;
}

export class Book 
{
  bookid: number = 0;
  name: string = '';
  author: string = '';
  rating: number = 1;
  image: string='';
  isBookAvailable: boolean = true;
  genre: string = '';
  description: string = '';
  lentByUserId: number = 0;
  currentlyBorrowedBy: number = 0;
}






