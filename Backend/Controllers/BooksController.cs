using Backend.BL;
using Backend.Data;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly IBookServices bookServices;
        public BooksController(IBookServices _bookServices)
        {
            bookServices = _bookServices;
        }


        [HttpGet]
        public async Task<IActionResult> getAllBooks()
        {
            var Books = await bookServices.getAllBooks();
            return Ok(Books);
        }

        [HttpPost]
        public async Task<IActionResult> postBooks([FromBody] Books book)
        { 
            await bookServices.postBooks(book);
            return Ok(book);
        }


        [HttpGet("{id}")]

        public async Task<IActionResult> GetProductById(int id)
        {
            var book = await bookServices.GetProductById(id);
            return Ok(book);

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> deletebook(int id)
        {
            var book = await bookServices.deletebook(id);
            return Ok(book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] Books updatedBook)
        {
            var bookupdated = await bookServices.UpdateBook(id, updatedBook);

            return Ok(bookupdated);
        }



        [HttpGet("search/{currentlyBorrowed}")]
        public async Task<IActionResult> GetBorrowedBook(int currentlyBorrowed)
        {
            var book = await bookServices.GetBorrowedBook(currentlyBorrowed);
            return Ok(book);
        }


        [HttpGet("searchmybooks/{lentbyID}")]
        public async Task<IActionResult> GetBookLent(int lentbyID)
        {
            var book = await bookServices.GetBookLent(lentbyID);
            return Ok(book);
        }
    }
}
