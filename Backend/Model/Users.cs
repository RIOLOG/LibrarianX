using System.ComponentModel.DataAnnotations;

namespace Backend.Model
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = "";
        public string Username { get; set; } = "";
        public string Password { get; set; } = "";
        public int Token { get; set; } = 5;
    }
}
