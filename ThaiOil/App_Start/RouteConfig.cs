using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace ThaiOil
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "admin_categories",
                url: "__admin/category/{alias}",
                defaults: new { controller = "__admin", action = "index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "articles", 
                url: "articles/{alias}", 
                defaults: new { controller = "articles", action = "index", alias = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "category",
                url: "category/{category_alias}",
                defaults: new { controller = "site", action = "index", category_alias = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "product",
                url: "product/{product_alias}",
                defaults: new { controller = "site", action = "index", product_alias = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "site", action = "index", id = UrlParameter.Optional }
            );
        }
    }
}