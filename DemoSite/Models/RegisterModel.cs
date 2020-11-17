using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace DemoSite.Models
{
    public class RegisterModel
    {
        [Required()]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required(), DataType(DataType.Password)]
        public string Password { get; set; }
        
        [Required(), MinLength(5)]
        public string Name { get; set; }
        
        [Required(), MinLength(5)]
        public string CustomField { get; set; }
    }
}
