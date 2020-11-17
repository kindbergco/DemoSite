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
using Umbraco.Core.Models;
using Umbraco.Web.Models;
using Umbraco.Core;

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
            var registerModel = Members.CreateRegistrationModel("test");
            registerModel.Email = model.Email;
            registerModel.Password = model.Password;
            registerModel.Name = model.Name;
            registerModel.UsernameIsEmail = true;

            registerModel.MemberProperties.Add(new Umbraco.Web.Models.UmbracoProperty() { Alias = "interestedIn", Name = "interestedIn", Value = model.InterestedIn });

            // How we register the member
            Members.RegisterMember(registerModel, out System.Web.Security.MembershipCreateStatus status);

            if (status == System.Web.Security.MembershipCreateStatus.Success)
            {
                return Redirect("/myAccount");
            } else
            {
                TempData["error"] = status;
                return CurrentUmbracoPage();
            }
        }

        [HttpPost]
        public ActionResult Login(Models.LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return CurrentUmbracoPage();
            }
            //_memberService.

            if (Members.Login(model.Username, model.Password))
            {
                if (model.MyAccountPage > 0) {
                    return RedirectToUmbracoPage(model.MyAccountPage);
                }
                return Redirect("/");
            }
            else
            {
                #region Överkurs
                var user = Members.GetByEmail(model.Username);
                if (user == null)
                {
                    TempData["error"] = "User does not exist";
                    return CurrentUmbracoPage();
                }
                else
                {
                    if (!user.Value<bool>("umbracoMemberApproved"))
                    {
                        TempData["error"] = "We are reviewing your profile, and will let you know when your account is approved.";
                        return CurrentUmbracoPage();
                    }
                    else if (user.Value<bool>("umbracoMemberLockedOut"))
                    {
                        TempData["error"] = "Account is temporarily locked";
                        return CurrentUmbracoPage();
                    }
                }
                #endregion
                TempData["error"] = "Username and password did not match";
                return CurrentUmbracoPage();
            }
        }
        public ActionResult Logout()
        {
            Members.Logout();
            return Redirect("/");
        }
    }
}
