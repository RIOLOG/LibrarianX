# LibrarianX
LibrarianX is a Library Management System application developed using , Asp Dotnet Core , Angular , Entity Framewrok


-> Created 2 table (books and users) with the following columns:
1. Books Table:
Name
Rating
Author
Genre
Is Book Available
Description
Lent By User ID
Currently Borrowed By User ID

2. User Tables:
Name
Username
Password
Tokens Available
Books Borrowed
Books Lent



## API Reference

#### Get all items

```http
  GET /api/items
```

    [HttpGet]
    public async Task<List<Books>> getAllBooks()
    {
        var Books = await _dataContext.Books.ToListAsync();
        return Books;
    }


Show all the Books From the Database.

## Tech Stack

**Client:** Angular

**Server:** Net Core , Entity Framework, Asp.Net API

**DataBase** SSMS MDatabase 

