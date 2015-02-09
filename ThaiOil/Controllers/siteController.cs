using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ThaiOil.Models;

namespace ThaiOil.Controllers
{
    public class siteController : Controller
    {
        public const String _email_from_login = "test@gmail.com";
        public const String _email_from = "test@gmail.com";
        public const String _email_from_pass = "test.ru";
        public const String _email_to = "test@bk.ru";
        public const String _email_to2 = "tesr@gmail.com";
        public const String _email_to3 = "test@gmail.com";
        public const int _email_port = 000;
        public const String _email_host = "test.com";
        public const bool _email_ssl = true;

        private const String _json_products = "/json/products.json";
        private const String _json_categories = "/json/categories.json";

        public bool IsValidEmail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);
                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }

        public static string RenderPartialViewToString(Controller thisController, string viewName, object model)
        {
            // assign the model of the controller from which this method was called to the instance of the passed controller (a new instance, by the way)
            thisController.ViewData.Model = model;

            // initialize a string builder
            using (StringWriter sw = new StringWriter())
            {
                // find and load the view or partial view, pass it through the controller factory
                ViewEngineResult viewResult = ViewEngines.Engines.FindPartialView(thisController.ControllerContext, viewName);
                ViewContext viewContext = new ViewContext(thisController.ControllerContext, viewResult.View, thisController.ViewData, thisController.TempData, sw);

                // render it
                viewResult.View.Render(viewContext, sw);

                //return the razorized view/partial-view as a string
                return sw.ToString();
            }
        }




        [HttpPost]
        public ActionResult AddImage(HttpPostedFileBase fileInput)
        {
            return Json(new { status = 1, html = 'Q'});

        }





        public ActionResult index()
        {
            var path_json_products = Server.MapPath(_json_products);
            var json_str = System.IO.File.ReadAllText(path_json_products);
            ViewBag.products = JsonConvert.DeserializeObject<List<Product>>(json_str).Where(o => o.isPublish == true && o.category_id != 140118160741).OrderBy(o => o.order).ToList();

            var path_json_categories = Server.MapPath(_json_categories);
            var json_str2 = System.IO.File.ReadAllText(path_json_categories);
            ViewBag.categories = JsonConvert.DeserializeObject<List<Category>>(json_str2).Where(o => o.isPublish == true).OrderBy(o => o.order).ToList();

            return View();
        }

        [HttpPost]
        public JsonResult product_get(string alias)
        {
            var path_json_products = Server.MapPath(_json_products);
            var json_str = System.IO.File.ReadAllText(path_json_products);
            var products = JsonConvert.DeserializeObject<List<Product>>(json_str);

            var html_str = RenderPartialViewToString(this, "product_card", products.FirstOrDefault(o => o.alias == alias));

            return Json(new { status = 1, html = html_str });
        }

        public ActionResult about()
        {
            return View();
        }

        public ActionResult partners()
        {
            return View();
        }

        public ActionResult warranty()
        {
            return View();
        }

        public ActionResult delivery()
        {
            return View();
        }

        public ActionResult order()
        {
            return View();
        }

        public ActionResult reviews()
        {
            return View();
        }

        public ActionResult contacts()
        {
            return View();
        }

        public ActionResult coconutoil()
        {
            return View();
        }

        public ActionResult benefits()
        {
            return View();
        }

        public ActionResult wholesale()
        {
            return View();
        }

        public ActionResult paymentsuccess()
        {
            return View();
        }

        public ActionResult paymentfail()
        {
            return View();
        }

        public ActionResult login()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult login(string username, string password, string returnUrl)
        {
            return View();
        }

        public ActionResult logout()
        {
            FormsAuthentication.SignOut();

            return RedirectToAction("index", "site");
        }

        // ОТПРАВКА ЗАКАЗА
        [HttpPost, ValidateInput(false)]
        public JsonResult sendmail()
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Credentials = new NetworkCredential(_email_from_login, _email_from_pass);
                client.Port = _email_port;
                client.Host = _email_host;
                client.EnableSsl = _email_ssl;

                var maFrom = new MailAddress(_email_from);
                var maTo = new MailAddress(_email_to);
                var mmsg = new MailMessage(maFrom.Address, maTo.Address);

                //mmsg.To.Add(_email_to2); // добавляем менеджера по продажам
                mmsg.To.Add(_email_to3); // здесь должно быть условие чтобы оптовые заявки не отпрвлялись валентине

                mmsg.Subject = Request.Form["title"];
                mmsg.SubjectEncoding = Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.BodyEncoding = Encoding.UTF8;
                
                var body = "Со страницы ";
                try
                {
                    body += String.IsNullOrEmpty(Request.Form["url"]) ? (Request.UrlReferrer != null ? Request.UrlReferrer.AbsoluteUri : Request.Url.AbsoluteUri) : Request.Form["url"];
                }
                catch { }
                body += " пришёл запрос.<br/>";
                body += "Время сервера " + DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss") + "<br/>";
                body += "<br/><strong>Имя</strong>: " + Request.Form["name"];
                body += "<br/><strong>Email</strong>: " + Request.Form["email"];
                body += "<br/><strong>Телефон</strong>: " + Request.Form["phone"];
                body += "<br/><strong>Адрес</strong>: " + Request.Form["address"];
                body += "<br/><strong>Примечание</strong>: " + Request.Form["what"];
                var ip = (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? Request.ServerVariables["REMOTE_ADDR"]).Split(',')[0].Trim();
                if (!String.IsNullOrEmpty(ip))
                {
                    body += "<br/><strong>IP адрес</strong>: <a href=\"http://2ip.ru/geoip/?ip=" + ip + "\" target=\"_blank\">" + ip + "</a>";
                }

                mmsg.Body = body;
                client.Send(mmsg);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        // ОТПРАВКА ОТЗЫВА
        [HttpPost, ValidateInput(false)]
        public JsonResult sendmailreview()
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Credentials = new NetworkCredential(_email_from_login, _email_from_pass);
                client.Port = _email_port;
                client.Host = _email_host;
                client.EnableSsl = _email_ssl;

                var maFrom = new MailAddress(_email_from);
                var maTo = new MailAddress(_email_to);
                var mmsg = new MailMessage(maFrom.Address, maTo.Address);
                mmsg.Subject = Request.Form["title"];
                mmsg.SubjectEncoding = Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.BodyEncoding = Encoding.UTF8;

                var body = "Со страницы ";
                try
                {
                    body += String.IsNullOrEmpty(Request.Form["url"]) ? (Request.UrlReferrer != null ? Request.UrlReferrer.AbsoluteUri : Request.Url.AbsoluteUri) : Request.Form["url"];
                }
                catch { }
                body += " пришёл запрос.<br/>";
                body += "Время сервера " + DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss") + "<br/>";
                body += "<br/><strong>Имя</strong>: " + Request.Form["name"];
                body += "<br/><strong>Город</strong>: " + Request.Form["city"];
                body += "<br/><strong>Профессия</strong>: " + Request.Form["profession"];
                body += "<br/><strong>Email</strong>: " + Request.Form["email"];
                body += "<br/><strong>Ссылка на соц сеть</strong>: " + Request.Form["link"];
                body += "<br/><strong>Фото</strong>: " + Request.Form["photo"];
                body += "<br/><strong>Название масла</strong>: " + Request.Form["oil_title"];
                body += "<br/><strong>Отзыв</strong>: " + Request.Form["review"];
                if (!String.IsNullOrEmpty(Request.Form["first_time"])) 
                {
                    body += "<br/><strong>Использовалось в первый раз?</strong>: " + (bool.Parse(Request.Form["first_time"]) ? "Да" : "Нет, не в первый");
                }

                var ip = (Request.ServerVariables["HTTP_X_FORWARDED_FOR"] ?? Request.ServerVariables["REMOTE_ADDR"]).Split(',')[0].Trim();
                if (!String.IsNullOrEmpty(ip))
                {
                    body += "<br/><strong>IP адрес</strong>: <a href=\"http://2ip.ru/geoip/?ip=" + ip + "\" target=\"_blank\">" + ip + "</a>";
                }

                mmsg.Body = body;
                client.Send(mmsg);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        // ПОДПИСКА НА РАССЫЛКУ 2
        [HttpPost, ValidateInput(false)]
        public JsonResult sendsubscription2()
        {
            try
            {
                SmtpClient client = new SmtpClient();
                client.Credentials = new NetworkCredential(_email_from_login, _email_from_pass);
                client.Port = _email_port;
                client.Host = _email_host;
                client.EnableSsl = _email_ssl;

                var maFrom = new MailAddress(_email_from);
                var maTo = new MailAddress(_email_to);
                var mmsg = new MailMessage(maFrom.Address, maTo.Address);

                //mmsg.To.Add(_email_to2); // добавляем менеджера по продажам
                mmsg.To.Add(_email_to3); // добавляем менеджера по продажам

                mmsg.Subject = Request.Form["title"];
                mmsg.SubjectEncoding = Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.BodyEncoding = Encoding.UTF8;

                var body = "Со страницы ";
                try
                {
                    body += String.IsNullOrEmpty(Request.Form["url"]) ? (Request.UrlReferrer != null ? Request.UrlReferrer.AbsoluteUri : Request.Url.AbsoluteUri) : Request.Form["url"];
                }
                catch { }
                body += " пришёл запрос.<br/>";
                body += "<br/><strong>Время сервера</strong>: " + DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss");
                body += "<br/><strong>Email</strong>: " + Request.Form["email"];
                body += "<br/><strong>В группу</strong>: " + Request.Form["group"];
                body += "<br/><strong>Примечание</strong>: " + Request.Form["what"];

                mmsg.Body = body;
                client.Send(mmsg);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

      
        public ActionResult mailer()
        {
            return View();
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult mailer_statistic()
        {
            try
            {
                var path_json_emails = Server.MapPath("/json/emails_for_commercial.json");
                var json_str = System.IO.File.ReadAllText(path_json_emails);
                var emails = JsonConvert.DeserializeObject<List<EmailCommercial>>(json_str);

                return Json(new { status = 1, time = DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss"), sended = emails.Where(o => o.status == true).Count() });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }
        
        // РАССЫЛКА КОММЕРЧЕСКОГО ПРЕДЛОЖЕНИЯ
        [HttpPost, ValidateInput(false)]
        public JsonResult mailer(string from)
        {
            String _from = "test@test.ru";
            String _from_user = "test";
            String _from_pass = "test";
            int _port = 00; //465
            String _host = "test";

            try
            {
                var path_json_emails = Server.MapPath("/json/emails_for_commercial.json");
                var json_str = System.IO.File.ReadAllText(path_json_emails);
                var emails = JsonConvert.DeserializeObject<List<EmailCommercial>>(json_str);

                var body = string.Empty;
                using (StreamReader streamReader = new StreamReader(Server.MapPath("/json/commercial_email_body.html"), Encoding.UTF8))
                {            
                    body = streamReader.ReadToEnd();
                }

                foreach (var item in emails.Where(o => o.status == false).ToList())
                {
                    if (IsValidEmail(item.email))
                    {
                        try 
                        {
                            SmtpClient client = new SmtpClient();
                            client.Credentials = new NetworkCredential(_from_user, _from_pass);
                            client.Port = _port;
                            client.Host = _host;

                            var mmsg = new MailMessage(new MailAddress(_from).Address, new MailAddress(item.email).Address);
                            mmsg.Subject = "Такого в Москве ещё не было";
                            mmsg.SubjectEncoding = Encoding.UTF8;
                            mmsg.IsBodyHtml = true;
                            mmsg.BodyEncoding = Encoding.UTF8;

                           

                            mmsg.Body = body;
                            client.Send(mmsg);

                            //сохраним изменения
                            item.status = true;
                            item.sending_date = DateTime.Now;

                            // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
                            System.IO.File.SetAttributes(path_json_emails, System.IO.File.GetAttributes(path_json_emails) & ~FileAttributes.ReadOnly);

                            // внесём изменения
                            var json = JsonConvert.SerializeObject(emails, Formatting.Indented);
                            System.IO.File.WriteAllText(path_json_emails, json, System.Text.Encoding.UTF8);

                            // задержка от 1 до 2 минут
                            System.Threading.Thread.Sleep(new Random(DateTime.Now.Millisecond).Next(60000, 120000));
                        }
                        catch
                        {
                            continue;
                        }
                    }
                }

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }
    }
}
