using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Umbraco.Web;
using Umbraco.Web.Mvc;
using Microsoft.AspNet.Identity;

namespace DemoSite.Controllers.Surface
{
    public class MembershipSurfaceController : Umbraco.Web.Mvc.SurfaceController
    {
        #region överkurs
        private Umbraco.Core.Services.IMemberService _memberService = null;
        public MembershipSurfaceController()
        {
            _memberService = Services.MemberService;
        }
        #endregion
        [HttpPost]
        public ActionResult Register(Models.RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }
            var registerModel = Members.CreateRegistrationModel("testUser");
            registerModel.Email = "peter@kindbergco.se";
            registerModel.Password = "test123456";
            registerModel.Name = "Peter Kindberg";
            registerModel.UsernameIsEmail = true;
            registerModel.Username = "peter";
            registerModel.MemberProperties.Add(new Umbraco.Web.Models.UmbracoProperty() { Alias = "custom", Name = "custom", Value = "My custom var" });
            StringBuilder sb = new StringBuilder();
            foreach (var item in registerModel.MemberProperties)
            {
                sb.Append(item.Alias.ToString() + " - " + item.Name + " - " + item.Value);
            }
            Members.RegisterMember(registerModel, out System.Web.Security.MembershipCreateStatus status);

            return Content(sb.ToString() + status.ToString());
        }

        [HttpPost]
        public ActionResult Login(Models.LoginModel model)
        {
            //_memberService.
            if (Members.Login("peter@kindbergco.se", "test123456"))
            {
                return Content("Success");
            }
            else
            {
                #region Överkurs
                var user = Members.GetByEmail("peter@kindbergco.se");
                if (user == null)
                {
                    // User was not found
                }
                else
                {
                    if (!user.Value<bool>("umbracoMemberApproved"))
                    {
                        // User is not approved
                    }
                    else if (user.Value<bool>("umbracoMemberLockedOut"))
                    {
                        // User is locked out for too many failed login attempts
                    }
                }
                #endregion
                return Content("Fail");
            }
        }
        public ActionResult Logout()
        {
            Members.Logout();
            return Content("Logged out");
        }
    }
}
