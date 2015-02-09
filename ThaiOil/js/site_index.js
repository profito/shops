window.addEvent('domready', function () {
    // ссылки из меню
    $$('.header .menu a[href^=/#]').each(function (link) {
        link.addEvent('click', function (e) {
            if (e) e.stop();
            new Fx.Scroll(window).toElement($(link.get('href').substring(2)));
        });
    });

    // слайды
    var slides = $$('.slides .slide');
    if (slides.length > 0) {
        var dots = $$('.slides .dots')[0];
        var currentIndex = 0;
        var interval;
        slides.each(function (slide, i) {
            var p = new Element('p.active').addEvent('click', function () {
                clearInterval(interval);
                slides[currentIndex].fade('out').removeClass('active');
                dots_link[currentIndex].removeClass('active');
                currentIndex = i;
                slides[currentIndex].fade('in').addClass('active');
                dots_link[currentIndex].addClass('active');
            }).inject(dots);

            if (i > 0) {
                slide.setStyle('opacity', 0);
                p.removeClass('active');
            }
        });
        var dots_link = $$('.slides .dots p');
        var show = function () {
            slides[currentIndex].fade('out').removeClass('active');
            dots_link[currentIndex].removeClass('active');

            currentIndex = currentIndex < slides.length - 1 ? currentIndex + 1 : 0;

            slides[currentIndex].fade('in').addClass('active');
            dots_link[currentIndex].addClass('active');
        };
        window.addEvent('load', function () {
            interval = show.periodical(15000);
        });
    }

    // таймер
    var t_counter = $('t_counter');
    if (t_counter) {
        var p_hours = $('p_hours');
        var p_minutes = $('p_minutes');
        var p_seconds = $('p_seconds');

        var checkTime = function (i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var pluralize = function (n, one, few, many) {
            var modulo10 = n % 10;
            var modulo100 = n % 100;

            if (modulo10 == 1 && modulo100 != 11) {
                return one;
            }
            else if ((modulo10 == 2 || modulo10 == 3 || modulo10 == 4) && !(modulo100 == 12 || modulo100 == 13 || modulo100 == 14)) {
                return few;
            }
            else if (modulo10 == 0 || (modulo10 == 5 || modulo10 == 6 || modulo10 == 7 || modulo10 == 8 || modulo10 == 9) || (modulo100 == 11 || modulo100 == 12 || modulo100 == 13 || modulo100 == 14)) {
                return many;
            }
            else {
                return "";
            }
        }

        var startTime = function () {
            var now = new Date();
            var d = 1 - now.getDay();
            var h = 24 - now.getHours();
            var m = 60 - now.getMinutes();
            var s = 60 - now.getSeconds();

            if (m == 60) m = 0;
            if (s == 60) s = 0;

            h = checkTime(h);
            m = checkTime(m);
            s = checkTime(s);

            t_counter.set('html', h + ' : ' + m + ' : ' + s);
            p_hours.set('html', pluralize(h, 'ЧАС', 'ЧАСА', 'ЧАСОВ'));
            p_minutes.set('html', pluralize(m, 'МИНУТА', 'МИНУТЫ', 'МИНУТ'));
            p_seconds.set('html', pluralize(s, 'СЕКУНДА', 'СЕКУНДЫ', 'СЕКУНД'));

            setTimeout(function () {
                startTime();
            }, 1000);
        }
        startTime();
    }

    // навигация по категориям
    // когда открыта только карточка товара, подсветим в каких категориях находится товар
    var categories_menu = $('categories_menu');

    var transformCategoryMenu = function () {
        categories_menu.getElements('.active').removeClass('active');
        categories_menu.getElements('.second a').addClass('dn');

        // подсветим первый и второй уровень меню
        var category_alias = categories_menu.get('data-category-alias');
        if (category_alias) {
            var active = categories_menu.getElements('a[href=/category/' + category_alias + ']');
            if (active.length > 0) {
                active[0].addClass('active');
                if (active[0].get('data-parent-alias')) {
                    categories_menu.getElements('a[href=/category/' + active[0].get('data-parent-alias') + ']').addClass('active');
                }
            }
            // в первом меню категория уже подсвечена
            var first_active_alias = categories_menu.getElements('.first .active')[0].get('data-alias');
            categories_menu.getElements('.second a[data-parent-alias=' + first_active_alias + ']').removeClass('dn');

            // покажем товары принадлежащие категории
            $$('.catalog .item').addClass('dn');
            $$('.catalog .item[data-category-alias=' + category_alias + ']').removeClass('dn');
        }
    };

    if (categories_menu && categories_menu.get('data-category-alias')) {
        transformCategoryMenu();
    }

    $$('.categories_menu a').each(function (link) {
        link.addEvent('click', function (e) {
            if (e) e.stop();

            categories_menu.set('data-category-alias', this.get('data-alias'));
            transformCategoryMenu();
        });
    });

    // перехок к товарам на главной странице
    if ($('scratch_catalog')) {
        $('scratch_catalog').addEvent('click', function (e) {
            if (e) e.stop();

            $$('.catalog .item').addClass('dn');
            $$('.catalog .item.isMainPage').removeClass('dn');
            categories_menu.removeProperty('data-category-alias');
            transformCategoryMenu();
        });
    }

    // сопутствующие товары
    var related_products = $('related_products');
    var generateRelatedProducts = function () {
        related_products = $('related_products');
        if (related_products) {
            var items = $$('.catalog .item');

            for (var i = 0; i < 4; i++) {
                items.getRandom().clone().removeClass('dn').inject(related_products);
            }
        }
    };

    if (related_products) {
        generateRelatedProducts();
    }

    // подробное описание товара
    document.body.addEvent('click:relay(.catalog .link_more, .related_products .link_more)', function (e) {
        if (e) e.stop();

        var alias = this.get('rel');
        var title = this.getParent().get('title');

        var catalog_menu = $$('.catalog')[0];

        if (!catalog_menu.hasClass('mini')) {
            new Fx.Scroll(window).toElement('scratch_catalog');
            $$('.catalog').addClass('mini');
            $('item_card_container').removeClass('closed');
        }

        new Request.JSON({
            url: '/site/product_get',
            onSuccess: function (responseJSON, responseText) {
                if (responseJSON.status == 1) {
                    $('item_card_container').set('html', responseJSON.html);

                   

                    // блок социальных иконок
                    new Ya.share({
                        element: 'ya_share_' + alias,
                        elementStyle: {
                            'type': 'link',
                            'text': 'Поделись с друзьями',
                            'quickServices': ['yaru', 'vkontakte', 'facebook', 'twitter', 'odnoklassniki', 'moimir', 'gplus']
                        },
                        link: 'http://thai-oil.ru/product/' + alias,
                        title: title
                    });

                    // сопутсвующие товары
                    generateRelatedProducts();

                    // виджет комментариев контакта
                    if ($('vk_product_comments')) {
                        VK.Widgets.Comments('vk_product_comments', { width: 500, limit: 15, autoPublish: 1, pageUrl: 'http://thai-oil.ru/product/' + alias });
                    }
                }
            }
        }).post({ 'alias': alias });
    });

    document.body.addEvent('click:relay(.item_card .btn_close)', function (e) {
        if (e) e.stop();

        $$('.catalog').removeClass('mini');
        $('item_card_container').addClass('closed');
        (function () {
            $('item_card_container').empty();
        }).delay(500);
    });

    document.body.addEvent('click:relay(.item_card .accordion .item h2)', function (e) {
        if (e) e.stop();

        //if (!this.hasClass('expanded')) {
        //    $$('.item_card .accordion h2').removeClass('expanded');
        //    $$('.item_card .accordion .pre_cont').addClass('closed');
        //}

        this.toggleClass('expanded');
        this.getParent().getFirst('.pre_cont').toggleClass('closed');
    });

    // подписка и как купить дешевле
    document.body.addEvent('click:relay(.item_card .how_to_buy_cheaper)', function (e) {
        if (e) e.stop();

        var what = e.target.get('data-what');

       
        $('subscribe').toggleClass('closed');
    });
    document.body.addEvent('click:relay(.item_card .subscribe .form .btn)', function (e) {
        if (e) e.stop();

        var email_inp = e.target.getPrevious();
        var what = e.target.retrieve('what') || e.target.get('data-what');

        if (email_inp) {
            var obj = {};
            obj.title = 'Подписка на рассылку «Как купить дешевле»';
            obj.url = document.URL;
            obj.email = email_inp.get('value');
            obj.group = 'how_to_buy_cheaper';
            obj.what = what;

            if (!obj.email || obj.email.test('Введите Ваш Email', 'i') || obj.email.trim() == '') {
                alert('Укажите Email');
                return false;
            }

            new Request.JSON({
                url: '/site/sendsubscription2',
                onSuccess: function (responseJSON, responseText) {
                    if (responseJSON.status == 1) {
                     

                        alert('Cпасибо, мы рады что Вы решили участвовать в подписке!');
                    } else {
                        alert('К сожалению на сервере произошла ошибка, попробуйте повторить позднее');
                    }
                }
            }).post(obj);
        }
    });

    // звёзды
    var star_cont = $$('.stars > div');
    $$('.stars > p').each(function (item, i) {
        item.addEvent('click', function () {
            new burnUp({ 'offset': 50, 'popup_cont_class': 'star_popup', 'width': new Number(star_cont[i].get('rel')), 'html': star_cont[i].clone().removeClass('dn') });
        });
    });

    // корзина
    blossom_cart = [];
    var cart = $('cart_container');

    if (cart) {
        $$('.cart .toggle').addEvent('click', function (e) {
            if (e) e.stop();

            cart.toggleClass('half_open');
        });

        document.body.addEvent('click:relay(.btn_to_cart)', function (e) {
            if (e) e.stop();

            var alias = this.get('data-alias');
            var title = this.get('data-title');
            var cost = Number.from(this.get('data-cost'));
            var pic = this.get('data-pic');

            

            // проверяем есть ли товар в корзине
            var exists_index = 0;
            var exists = blossom_cart.some(function (item, i) {
                exists_index = i;
                return item.alias == alias;
            });

            if (exists) {
                // добавим +1 по количеству, но не более 99 штук
                if (blossom_cart[exists_index].count <= 98) {
                    blossom_cart[exists_index].count++;
                }
            } else {
                // иначе добавим в корзину "новый" товар
                blossom_cart.push({
                    'alias': alias,
                    'title': title,
                    'cost': cost,
                    'pic': pic,
                    'count': 1
                });
            }

            update_blossom_cart();
            (function () {
                cart.removeClass('half_open');
            }).delay(10);
        });

        var previous_page = 0;
        var update_blossom_cart = function () {
            if (blossom_cart.length == 0) {
                cart.addClass('half_open');
                (function () {
                    cart.addClass('dn');
                }).delay(500);
            } else {
                cart.removeClass('dn');
            }

            // render cart - покажем товары, пейджер, посчитаем общую сумму, повесим заказ на кнопку оформления заказа
            var product_container = cart.getElements('.items')[0].empty();

            var total = 0;
            blossom_cart.each(function (product, i) {
                total += product.count * product.cost;

                var li = new Element('li.item[title=' + product.title + ']').inject(product_container);
                new Element('img.pic[alt=""][src=' + product.pic + ']').inject(li);
                var body = new Element('div.body').inject(li);
                new Element('p.cost[html=' + product.cost.formatMoney() + ' р]').inject(body);
                new Element('a.btn_remove[href=#][html=убрать]').addEvent('click', function (e) {
                    if (e) e.stop();


                    if (product.count > 1) {
                        product.count--;
                    } else {
                        blossom_cart.splice(i, 1);
                    }

                    update_blossom_cart();
                }).inject(body);
                if (product.count > 1) {
                    new Element('p.count[html=x ' + product.count + ']').inject(li);
                }
            });
            $('cart_total_price').set('html', total.formatMoney());

            // сформируем пейджер
            var products = cart.getElements('.items .item');
            var pager_cont = cart.getElements('.pager')[0].empty();
            var page_index = 0;
            var page_size = 4;
            products.each(function (item, i) {
                if (i % page_size == 0) {
                    page_index++;
                    new Element('span', {
                        'class': page_index == 1 ? 'active' : '',
                        'events': {
                            'click': function (e) {
                                if (e) e.stop();

                                pager_cont.getElements('span').removeClass('active');
                                this.addClass('active');

                                previous_page = new Number(this.retrieve('page_index')) - 1;

                                products.addClass('dn');
                                products.each(function (item2) {
                                    if (item2.retrieve('page_index') == (i / page_size + 1)) {
                                        item2.removeClass('dn');
                                    }
                                });
                            }
                        }
                    }).store('page_index', page_index).inject(pager_cont);
                }
                item.store('page_index', page_index);
                if (page_index > 1) item.addClass('dn');
            });

            // визуальные чудеса с пейджером
            var pages = pager_cont.getElements('span');
            if (pages.length > 1) {
                pager_cont.removeClass('hide');
            } else {
                pager_cont.addClass('hide');
            }
            if (pages[previous_page]) {
                pages[previous_page].fireEvent('click');
            }

            // покажем если надо уведомление о бесплатной доставке
            var free_delivery = cart.getElements('.free_delivery');
            if (total >= 5000) {
                free_delivery.removeClass('hide');
            } else {
                free_delivery.addClass('hide');
            }

            // сформируем строку заказа
            var order_str = 'Сумма заказа ' + total.formatMoney() + ' р ::::: ';
            blossom_cart.each(function (product) {
                order_str += product.title;

                if (product.count > 1) {
                    order_str += ' (' + product.cost.formatMoney() + ' р x ' + product.count + ' шт = ' + (product.count * product.cost).formatMoney() + ' р); ';
                } else {
                    order_str += ' (' + product.cost.formatMoney() + ' р); ';
                }
            });
            $('btn_order_cart').set('data-what', order_str).store('onSendComplete', function () {
                blossom_cart.empty();
                update_blossom_cart();
            });

            // сохраним корзину
            if (blossom_cart.length > 0) {
                Cookie.write('cookie_blossom_cart', JSON.encode(blossom_cart), { duration: 365 });
            } else {
                Cookie.dispose('cookie_blossom_cart')
            }
        }

        // если корзина изначально не пустая
        var cookie_blossom_cart = Cookie.read('cookie_blossom_cart');
        if (cookie_blossom_cart != null && cookie_blossom_cart) {
            blossom_cart = JSON.decode(cookie_blossom_cart);

            if (!blossom_cart && typeOf(blossom_cart) != 'array') return false;

            update_blossom_cart();
        };
    }
});