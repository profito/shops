using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ThaiOil.Models;
using Newtonsoft.Json;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Drawing;

namespace ThaiOil.Controllers
{
    public class __adminController : Controller
    {
        private const String _json_products = "/json/products.json";
        private const String _json_categories = "/json/categories.json";


        public ActionResult index()
        {
            var path_json_products = Server.MapPath(_json_products);

            ViewBag.products = JsonConvert.DeserializeObject<List<Product>>(System.IO.File.ReadAllText(path_json_products));
            ViewBag.categories = GetCategories();

            return View();
        }

        public List<Product> GetProducts()
        {
            var path_json_products = Server.MapPath(_json_products);
            var json_str = System.IO.File.ReadAllText(path_json_products);

            return JsonConvert.DeserializeObject<List<Product>>(json_str);
        }

        public void UpdateProductsCache()
        {
            }

        public void SaveProducts(List<Product> products)
        {
            var path_json_products = Server.MapPath(_json_products);

            // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
            System.IO.File.SetAttributes(path_json_products, System.IO.File.GetAttributes(path_json_products) & ~FileAttributes.ReadOnly);

            // внесём изменения
            var json = JsonConvert.SerializeObject(products, Formatting.Indented);
            System.IO.File.WriteAllText(path_json_products, json, System.Text.Encoding.UTF8);

            // обновим кеш
            //UpdateProductsCache();
        }                

        [HttpPost]
        public JsonResult product_create(string id, string alias, string title_short, string title_full, long category_id)
        {
            try
            {
                var path_json_products = Server.MapPath(_json_products);
                var json_str = System.IO.File.ReadAllText(path_json_products);
                var products = JsonConvert.DeserializeObject<List<Product>>(json_str);

                if (products.FirstOrDefault(o => o.alias == alias) != null)
                {
                    throw new System.ArgumentException("Такой Alias уже существует. Измените alias");
                }

                products.Add(new Product
                {
                    id = Convert.ToInt64(DateTime.Now.ToString("yyMMddHHmmss")),
                    category_id = category_id,
                    isPublish = false,
                    order = 936,
                    alias = alias.Trim(),
                    date_created = DateTime.Now,
                    title_short = title_short.Trim(),
                    title_full = title_full.Trim(),
                    cost = 0,
                    cost_old = 0
                });

                // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
                System.IO.File.SetAttributes(path_json_products, System.IO.File.GetAttributes(path_json_products) & ~FileAttributes.ReadOnly);

                // внесём изменения
                var json = JsonConvert.SerializeObject(products, Formatting.Indented);
                System.IO.File.WriteAllText(path_json_products, json, System.Text.Encoding.UTF8);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost, ValidateInput(false)]
        public JsonResult product_edit(long id, Product productToEdit)
        {
            try
            {
                var path_json_products = Server.MapPath(_json_products);
                var json_str = System.IO.File.ReadAllText(path_json_products);
                var products = JsonConvert.DeserializeObject<List<Product>>(json_str);

                if (products.FirstOrDefault(o => o.alias == productToEdit.alias && o.id != id) != null)
                {
                    throw new System.ArgumentException("Такой Alias уже существует. Измените alias");
                }

                var originalProduct = products.FirstOrDefault(o => o.id == id);
                if (!originalProduct.Equals(productToEdit))
                {
                    originalProduct.category_id = productToEdit.category_id;
                    originalProduct.isPublish = productToEdit.isPublish;
                    //originalProduct.order = productToEdit.order;
                    originalProduct.alias = productToEdit.alias;
                    //originalProduct.date_created = productToEdit.date_created;
                    originalProduct.title_short = productToEdit.title_short;
                    originalProduct.title_full = productToEdit.title_full;
                    originalProduct.path_preview = productToEdit.path_preview;
                    originalProduct.path_big = productToEdit.path_big;
                    originalProduct.cost = productToEdit.cost;
                    originalProduct.cost_old = productToEdit.cost_old;
                    originalProduct.description = productToEdit.description;
                    originalProduct.usage = productToEdit.usage;
                    originalProduct.ingredients = productToEdit.ingredients;
                    originalProduct.isMainPage = productToEdit.isMainPage;
                    originalProduct.isNew = productToEdit.isNew;
                    originalProduct.icons = productToEdit.icons;
                    originalProduct.related_products = productToEdit.related_products;
                    originalProduct.own_desc = productToEdit.own_desc;
                }

                // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
                System.IO.File.SetAttributes(path_json_products, System.IO.File.GetAttributes(path_json_products) & ~FileAttributes.ReadOnly);

                // внесём изменения
                var json = JsonConvert.SerializeObject(products, Formatting.Indented);
                System.IO.File.WriteAllText(path_json_products, json, System.Text.Encoding.UTF8);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost]
        public JsonResult product_delete(long id)
        {
            try
            {
                var path_json_products = Server.MapPath(_json_products);
                var json_str = System.IO.File.ReadAllText(path_json_products);
                var products = JsonConvert.DeserializeObject<List<Product>>(json_str);

                var originalProduct = products.FirstOrDefault(o => o.id == id);

                products.Remove(originalProduct);
                
                // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
                System.IO.File.SetAttributes(path_json_products, System.IO.File.GetAttributes(path_json_products) & ~FileAttributes.ReadOnly);

                // внесём изменения
                var json = JsonConvert.SerializeObject(products, Formatting.Indented);
                System.IO.File.WriteAllText(path_json_products, json, System.Text.Encoding.UTF8);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost]
        public JsonResult product_change_order(long[] new_sort)
        {
            try
            {
                var path_json_products = Server.MapPath(_json_products);
                var json_str = System.IO.File.ReadAllText(path_json_products);
                var products = JsonConvert.DeserializeObject<List<Product>>(json_str);

                var i = 0;
                foreach (var id in new_sort)
                {
                    products.FirstOrDefault(o => o.id == id).order = i++;
                }

                // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
                System.IO.File.SetAttributes(path_json_products, System.IO.File.GetAttributes(path_json_products) & ~FileAttributes.ReadOnly);

                // внесём изменения
                var json = JsonConvert.SerializeObject(products, Formatting.Indented);
                System.IO.File.WriteAllText(path_json_products, json, System.Text.Encoding.UTF8);
                
                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        // *****************************************************************************
        // *****************************************************************************
        // *****************************************************************************
        // *****************************************************************************

        public List<Category> GetCategories()
        {
            var categories_list = new List<Category>();
            if (System.Web.HttpContext.Current.Cache["categories_list"] == null)
            {
                UpdateCategoryCache();
            }
            categories_list = (List<Category>)System.Web.HttpContext.Current.Cache["categories_list"];

            return categories_list;
        }

        public void UpdateCategoryCache()
        {
            var path_json_categories = Server.MapPath(_json_categories);
            var json_str = System.IO.File.ReadAllText(path_json_categories);
            var categories = JsonConvert.DeserializeObject<List<Category>>(json_str);

            System.Web.HttpContext.Current.Cache.Insert("categories_list", categories, null, System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(1, 0, 0), System.Web.Caching.CacheItemPriority.Default, null);
        }

        public void SaveCategories(List<Category> categories)
        {
            var path_json_categories = Server.MapPath(_json_categories);

            // уберём атрибут только для чтения, чтобы записать изменения в файле - он появляется из-за TFS
            System.IO.File.SetAttributes(path_json_categories, System.IO.File.GetAttributes(path_json_categories) & ~FileAttributes.ReadOnly);

            // внесём изменения
            var json = JsonConvert.SerializeObject(categories, Formatting.Indented);
            System.IO.File.WriteAllText(path_json_categories, json, System.Text.Encoding.UTF8);

            // обновим кеш
            UpdateCategoryCache();
        }

        [HttpPost]
        public JsonResult category_create(string alias, string title)
        {
            try
            {
                var categories = GetCategories();

                if (categories.FirstOrDefault(o => o.alias == alias) != null)
                {
                    throw new System.ArgumentException("Такой Alias уже существует. Измените alias");
                }

                categories.Add(new Category
                {
                    id = Convert.ToInt64(DateTime.Now.ToString("yyMMddHHmmss")),
                    isPublish = true,
                    order = 936,
                    alias = alias.Trim(),
                    title = title.Trim(),
                    parent_id = string.IsNullOrEmpty(Request.Form["parent_id"]) ? 0 : Convert.ToInt64(Request.Form["parent_id"])
                });

                // сохраним изменения
                SaveCategories(categories);
                
                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost]
        public JsonResult category_edit(long id, Category categoryToEdit)
        {
            try
            {
                var categories = GetCategories();

                if (categories.FirstOrDefault(o => o.alias == categoryToEdit.alias && o.id != id) != null)
                {
                    throw new System.ArgumentException("Такой Alias уже существует. Измените alias");
                }

                var originalCategory = categories.FirstOrDefault(o => o.id == id);
                if (!originalCategory.Equals(categoryToEdit))
                {
                    //originalCategory.isPublish = productToEdit.isPublish;
                    originalCategory.alias = categoryToEdit.alias;
                    originalCategory.title = categoryToEdit.title;
                    //originalCategory.order = productToEdit.order;
                    //originalCategory.parent_id = productToEdit.title_full;

                    // сохраним изменения
                    SaveCategories(categories);
                }

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost]
        public JsonResult category_delete(long id)
        {
            try
            {
                var categories = GetCategories();
                var products = GetProducts();

                var originalCategories = categories.FirstOrDefault(o => o.id == id);

                if (originalCategories != null)
                {
                    // сначала удалим все подкатегории, а товары перенесём в группу ТОВАРЫ БЕЗ КАТЕГОРИИ id "140118160741" alias "uncategory"
                    long uncategory_id = 140118160741;
                
                    foreach (var category in categories.Where(o => o.parent_id == id))
                    {
                        // все продукты в подкатегориях перенесём в мусорную категорию
                        foreach (var product in products.Where(o => o.category_id == category.id))
                        {
                            product.category_id = uncategory_id;
                        }

                        // удалим подкатегорию
                        categories.Remove(category);
                    }

                    // все продукты в удаляемой категории тоже перенесём в мусорную категорию
                    foreach (var product in products.Where(o => o.category_id == id))
                    {
                        product.category_id = uncategory_id;
                    }

                    // удалим категорию
                    categories.Remove(originalCategories);

                    // сохраним изменения
                    SaveProducts(products);
                    SaveCategories(categories);
                }

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }

        [HttpPost]
        public JsonResult category_change_order(long[] new_sort)
        {
            try
            {
                var categories = GetCategories();

                var i = 0;
                foreach (var id in new_sort)
                {
                    categories.FirstOrDefault(o => o.id == id).order = i++;
                }

                // сохраним изменения
                SaveCategories(categories);

                return Json(new { status = 1 });
            }
            catch (Exception ee)
            {
                return Json(new { status = 0, error = "Ошибка: " + ee.Message });
            }
        }


        // *****************************************************************************
        // *************загрузка картинки******************************
        // *****************************************************************************
        // *****************************************************************************
        public void CheckAndCreate(string path)
        {
            if (!(Directory.Exists(path)))
            {
                try
                {
                    Directory.CreateDirectory(path);
                }
                catch (Exception error)
                {
                    //"Не удалось создать папку" 
                }
            }
        }

        public Image resize(Image img, int width, int height)
        {
            Bitmap b = new Bitmap(width, height);
            Graphics g = Graphics.FromImage((Image)b);
            g.DrawImage(img, 0, 0, width, height);
            g.Dispose();
            return (Image)b;
        }

        [HttpPost]
        public ActionResult index(long id_img, HttpPostedFileBase file, String big, String preview)
        {                                                              
            if (file != null && file.ContentLength > 0)
            {
                var extension = Path.GetExtension(file.FileName);
                if (extension == ".jpg" || extension == ".jpeg" || extension == ".png" || extension == ".bmp" || extension == ".ico")
                {
                    var id = Convert.ToInt64(DateTime.Now.ToString("yyMMddHHmmss"));
                    var parrent_path = "/content/products/";
                    var fileName = id + extension;

                    // путь к папки с годом, отпровляем путь если его нет он создается
                    var path_year = (Server.MapPath(parrent_path + DateTime.Now.Year));
                    CheckAndCreate(path_year);

                    // создаем папки preview и big, если их нет 
                    var path_preview = (Server.MapPath(parrent_path + DateTime.Now.Year + "/preview/")); //
                    var path_big = (Server.MapPath(parrent_path + DateTime.Now.Year + "/big/"));
                    CheckAndCreate(path_preview);
                    CheckAndCreate(path_big);

                    var path = Path.Combine(Server.MapPath(parrent_path + DateTime.Now.Year), fileName);
                    file.SaveAs(path);

                    Image infoImage = Image.FromFile(path);

                    if (big == "1")
                    {
                        Image files = resize(infoImage, 500, 500);
                        var path_big_file = Path.Combine(Server.MapPath(parrent_path + DateTime.Now.Year + "/big"), fileName);
                        files.Save(path_big_file, System.Drawing.Imaging.ImageFormat.Jpeg);
                    }
                    if (preview == "1")
                    {
                        Image files = resize(infoImage, 300, 300);
                        var path_preview_file = Path.Combine(Server.MapPath(parrent_path + DateTime.Now.Year + "/preview"), fileName);
                        files.Save(path_preview_file, System.Drawing.Imaging.ImageFormat.Jpeg);
                    }

                    var product = GetProducts();
                    foreach (var pro in product)
                    {
                        if (pro.id == id_img)
                        {
                            if (big == "1")
                            {
                                pro.path_big = parrent_path + DateTime.Now.Year + "/big/" + fileName;
                            }
                            if (preview == "1")
                            {
                                pro.path_preview = parrent_path + DateTime.Now.Year + "/preview/" + fileName;
                            }
                        }
                    }
                    SaveProducts(product);
                }
            }
            return RedirectToAction("index", "__admin");
        }
    }
}
