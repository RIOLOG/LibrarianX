using Backend.BL;
using Backend.Data;
using Backend.Migrations;
using Backend.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;



namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserServices userServices;
        public UserController(IUserServices _userServices)
        {
            userServices = _userServices;
        }


        [HttpGet]
        public async Task<IActionResult> GetSpecificUser(string username, string password)
        {
            var user = await userServices.GetSpecificUser(username, password);
            return Ok(user);
        }


        [HttpGet("{userId}")]
        public async Task<IActionResult> getUserbyId(int userId)
        {
            var user = await userServices.getUserbyId(userId);
            return Ok(user);
        }


        [HttpPost]
        public async Task<IActionResult> AddUsers([FromBody] Users user)
        {
            var users = await userServices.AddUsers(user);
            return Ok(user);
        }


        [HttpGet("{value}/{userId}/{lentId}")]
        public async Task<IActionResult> UpdateProduct(int userId, int lentId, string value)
        {
            var val = await userServices.UpdateProduct(userId, lentId, value);
            return Ok(val);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await userServices.DeleteUser(id);

            return Ok(user);
        }



    }
}
