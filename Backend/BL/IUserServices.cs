using Microsoft.AspNetCore.Mvc;
using Backend.Data;
using Backend.Model;
using Microsoft.EntityFrameworkCore;


namespace Backend.BL
{
    public interface IUserServices
    {
        Task<Users> GetSpecificUser(string username, string password);
        Task<Users> getUserbyId(int userId);
        Task<Users> AddUsers(Users user);

        Task<int> UpdateProduct(int userId, int lentId, string value);

        Task<Users> DeleteUser(int id);

    }

    public class UserServices: IUserServices
    {
        private readonly DataContext _dataContext;
        public UserServices(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<Users> GetSpecificUser(string username, string password)
        {
            var user = await _dataContext.Users
                .FirstOrDefaultAsync(u => u.Username == username && u.Password == password);

            return user;
        }

        [HttpGet("{userId}")]
        public async Task<Users> getUserbyId(int userId)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            return (user);
        }


        [HttpPost]
        public async Task<Users> AddUsers(Users user)
        {
            await _dataContext.Users.AddAsync(user);
            await _dataContext.SaveChangesAsync();
            return user;
        }


        [HttpGet("{value}/{userId}/{lentId}")]
        public async Task<int> UpdateProduct(int userId, int lentId, string value)
        {
            var user = await _dataContext.Users.FindAsync(userId);
            var lenter = await _dataContext.Users.FindAsync(lentId);
            if (value == "borrow")
            {
                user.Token -= 1;
                lenter.Token += 1;
            }
            else if (value == "return")
            {
                user.Token += 1;
                lenter.Token -= 1;
            }
            _dataContext.SaveChanges();
            return 200;
        }


        [HttpDelete("{id}")]
        public async Task<Users> DeleteUser(int id)
        {

            var user = await _dataContext.Users.FindAsync(id);

            _dataContext.Users.Remove(user);
            await _dataContext.SaveChangesAsync();

            return (user);
        }

    }
}
