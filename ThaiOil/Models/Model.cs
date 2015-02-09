using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ThaiOil.Models
{
    public class Icons
    {
        public static string[] product_icons = new string[] { "hotprice", "bio", "organic", "raw", "sale", "recommend", "new", "bestchoice" };

        public Icons()
        {
            //product_icons = new string[] {"hotprice","bio","organic","raw","sale","recommend","new","bestchoice"};
        }
    }

    public class Email
    {
        public DateTime date { get; set; }
        public string email { get; set; }
    }

    public class EmailCommercial
    {
        public DateTime sending_date { get; set; }
        public string email { get; set; }
        public bool status { get; set; }
        public int opened { get; set; }
    }

    public class Category
    {
        [Required(ErrorMessage = "ID is required")]
        public long id { get; set; }

        [Required(ErrorMessage = "Publish bool is required")]
        public bool isPublish { get; set; }

        [Required(ErrorMessage = "Alias is required")]
        public string alias { get; set; }

        [Required(ErrorMessage = "Title is required")]
        public string title { get; set; }

        public int order { get; set; }

        [DefaultValue(0)]
        public long parent_id { get; set; }
    }

    public class Product
    {
        [Required(ErrorMessage = "ID is required")]
        public long id { get; set; }

        [Required(ErrorMessage = "Publish bool is required"),DefaultValue(false)]
        public bool isPublish { get; set; } // признак публикации

        public int order { get; set; } // порядок

        [Required(ErrorMessage = "Alias is required")]
        public string alias { get; set; } // алиас ссылки

        [Required(ErrorMessage = "Date Created is required")]
        public DateTime date_created { get; set; } // дата создания

        [Required(ErrorMessage = "Title Short is required")]
        public string title_short { get; set; } // заголовок в каталоге

        [Required(ErrorMessage = "Title Full is required")]
        public string title_full { get; set; } // заголовок на карточке товара

        public string path_preview { get; set; } // ссылка на превью
        public string path_big { get; set; } // ссылка на большую картинку
        public int cost { get; set; } // цена
        public int cost_old { get; set; } // старая цена
        public string description { get; set; } // описание
        public string usage { get; set; } // применение
        public string ingredients { get; set; } // полезный состав

        [DefaultValue(false)]
        public bool isMainPage { get; set; } // признак отображения товара на главной странице

        [DefaultValue(false)]
        public bool isNew { get; set; } // признак отображения товара в новинках

        public string icons { get; set; } // array tags string[] as string ','

        public string related_products { get; set; } // array id's long[] as string ','
        public string own_desc { get; set; } // описание для внутреннего пользования

        public long category_id { get; set; } // принадлежность категории
    }

}