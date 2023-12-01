using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Books
    {
        [Key]
        public int Bookid { get; set; }
        public string Name { get; set; } = null!;
        public int Rating { get; set; }
        public string Author { get; set; } = null!;
        public string Image { get; set; } = null!;
        public string Genre { get; set; } = null!;
        public bool IsBookAvailable { get; set; } = true;
        public int CurrentlyBorrowedBy { get; set; } = 0;
        public string? Description { get; set; }
        public int LentByUserId { get; set; }

    }
}
