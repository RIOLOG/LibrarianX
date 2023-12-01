using Backend.Model;
using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Users> Users { set; get; }
        public DbSet<Books> Books { set; get; }
    }
}
