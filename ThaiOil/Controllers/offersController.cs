using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThaiOil.Controllers
{
    public class offersController : Controller
    {
        public ActionResult coconutoil()
        {
            //return View();
            return RedirectPermanent("/");
        }
    }
}
