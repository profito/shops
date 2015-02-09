using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ThaiOil.Controllers
{
    public class articlesController : Controller
    {
        //
        // GET: /articles/{alias}

        public ActionResult index(string alias)
        {
            return View();
        }
    }
}
