using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DemoSite.Models
{
    public class LoginModel
    {
        [Required()]
        public string Username { get; set; }
        [Required()]
        public string Password { get; set; }
        public int MyAccountPage { get; set; }
    }
}
