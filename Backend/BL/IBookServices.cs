using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.BL
{
    public interface IBookServices
    {
        Task<List<Books>> getAllBooks();
        Task<Books> postBooks(Books book);
        Task<Books?> GetProductById(int id);
        Task<Books?> deletebook(int id);
        Task<Books> UpdateBook(int id, Books updatedBook);
        Task<List<Books>> GetBorrowedBook(int currentlyBorrowed);
        Task<List<Books>> GetBookLent(int lentbyID);

    }

    public class BookServices : IBookServices
    {
        private readonly DataContext _dataContext;
        public BookServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        public async Task<List<Books>> getAllBooks()
        {
            var Books = await _dataContext.Books.ToListAsync();
            return Books;
        }

        [HttpPost]
        public async Task<Books> postBooks([FromBody] Books book)
        {
            await _dataContext.Books.AddAsync(book);
            await _dataContext.SaveChangesAsync();
            return book;
        }


        [HttpGet("{id}")]

        public async Task<Books?> GetProductById(int id)
        {
            var book = await _dataContext.Books.FindAsync(id);
            return book;

        }

        [HttpDelete("{id}")]
        public async Task<Books?> deletebook(int id)
        {
            var book = await _dataContext.Books.FindAsync(id);
            if (book != null)
            {
                _dataContext.Books.Remove(book);
                await _dataContext.SaveChangesAsync();
                return book;
            }
            else return null;
        }

        [HttpPut("{id}")]
        public async Task<Books> UpdateBook(int id, [FromBody] Books updatedBook)
        {
            var existingBook = await _dataContext.Books.FindAsync(id);

            existingBook.Name = updatedBook.Name;
            existingBook.Rating = updatedBook.Rating;
            existingBook.Author = updatedBook.Author;
            existingBook.Genre = updatedBook.Genre;
            existingBook.Description = updatedBook.Description;
            existingBook.CurrentlyBorrowedBy = updatedBook.CurrentlyBorrowedBy;

            existingBook.IsBookAvailable = !existingBook.IsBookAvailable;

            await _dataContext.SaveChangesAsync();

            return existingBook;
        }



        [HttpGet("search/{currentlyBorrowed}")]
        public async Task<List<Books>> GetBorrowedBook(int currentlyBorrowed)
        {
            var book = await _dataContext.Books.Where(b => b.CurrentlyBorrowedBy == currentlyBorrowed).ToListAsync();
            return book;
        }


        [HttpGet("searchmybooks/{lentbyID}")]
        public async Task<List<Books>> GetBookLent(int lentbyID)
        {
            var book = await _dataContext.Books.Where(b => b.LentByUserId == lentbyID).ToListAsync();
            return book;
        }
    }
}
