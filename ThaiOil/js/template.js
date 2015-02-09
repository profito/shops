window.addEvent('domready', function () {

    if (window.location.search.length > 1) {
        for (var url_params = {}, i = 0, vArr = window.location.search.substring(1).split('&') ; i < vArr.length; v = vArr[i++].split('='), url_params[v[0]] = v[1]) { }
        
       
    }

    $$('.write_review').addEvent('click', function (e) {
        if (e) e.stop();

        var form = new Element('form.popup_form[method=post][action=#]');
        new Element('h1[html=ПОДЕЛИТЕСЬ СВОИМ МНЕНИЕМ!]').inject(form);
        new Element('p.brown[html=Поля отмеченные звёздочкой обязательны для заполнения]').inject(form);
        new Element('p.h10').inject(form);
        new Element('input[type=text][name=name][value=Имя Фамилия*][onfocus="if(this.value==\'Имя Фамилия*\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Имя Фамилия*\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=city][value=Город*][onfocus="if(this.value==\'Город*\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Город*\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=profession][value="Профессия/сфера деятельности"][onfocus="if(this.value==\'Профессия/сфера деятельности\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Профессия/сфера деятельности\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=email][value=Email][onfocus="if(this.value==\'Email\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Email\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=link][value="Ссылка на страницу в социальной сети"][onfocus="if(this.value==\'Ссылка на страницу в социальной сети\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Ссылка на страницу в социальной сети\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=photo][value="Ссылка на Вашу фотографию"][onfocus="if(this.value==\'Ссылка на Вашу фотографию\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Ссылка на Вашу фотографию\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=oil_title][value="Название масла о котором отзыв"][onfocus="if(this.value==\'Название масла о котором отзыв\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Название масла о котором отзыв\';"]').inject(form);
        new Element('p').inject(form);
        new Element('textarea[name=review][value=Отзыв*][onfocus="if(this.value==\'Отзыв*\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Отзыв*\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[id=first_time_checkbox][type=checkbox][name=first_time]').inject(form);
        new Element('label[for=first_time_checkbox][html="кокосовое масло использовалось в первый раз"]').inject(form);
        new Element('p').inject(form);
        new Element('a.submit.submit_review[html=ОТПРАВИТЬ ОТЗЫВ][href=#]').store('what', 'обратный звонок').inject(form);
        new burnUp({ 'offset': 50, width: 500, 'html': form });
    });

    $$('.recall').addEvent('click', function (e) {
        if (e) e.stop();

        var form = new Element('form.popup_form[method=post][action=#]');
        new Element('h1[html=ОБРАТНЫЙ ЗВОНОК]').inject(form);
        new Element('input[type=text][name=name][value=Имя][onfocus="if(this.value==\'Имя\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Имя\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=email][value=Email][onfocus="if(this.value==\'Email\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Email\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=phone][value=Телефон*][onfocus="if(this.value==\'Телефон*\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Телефон*\';"]').inject(form);
        new Element('p').inject(form);
        new Element('a.submit.submit_order[html=ЗАКАЗАТЬ ЗВОНОК][href=#]').store('what', 'обратный звонок с розницы').inject(form);
        new burnUp({ 'offset': 200, 'html': form });
    });

    document.body.addEvent('click:relay(.btn_buy)', function (e) {
        if (e) e.stop();

        var form = new Element('form.popup_form[method=post][action=#]');
        new Element('h1[html=ОСТАВЬТЕ ЗАЯВКУ]').inject(form);
        new Element('input[type=text][name=name][value=Имя][onfocus="if(this.value==\'Имя\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Имя\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=email][value=Email][onfocus="if(this.value==\'Email\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Email\';"]').inject(form);
        new Element('p').inject(form);
        new Element('input[type=text][name=phone][value=Телефон*][onfocus="if(this.value==\'Телефон*\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Телефон*\';"]').inject(form);
        new Element('p').inject(form);
        new Element('textarea[name=address][value=Адрес доставки][onfocus="if(this.value==\'Адрес доставки\') this.value=\'\';"][onblur="if(this.value==\'\') this.value=\'Адрес доставки\';"]').inject(form);
        new Element('p').inject(form);
        var a = new Element('a.submit.submit_order[html=ОТПРАВИТЬ][href=#]').store('what', e.target.get('data-what')).inject(form);
        if (this.retrieve('onSendComplete')) {
            a.store('onSendComplete', this.retrieve('onSendComplete'));
        }
        new burnUp({ 'offset': 150, 'html': form });

    });

    document.body.addEvent('click:relay(.submit)', function (e) {
        if (e) e.stop();

        var onSendComplete = this.retrieve('onSendComplete');

        // если кнопка купить
        if (e.target.hasClass('submit_order')) {
            var obj = this.getParent().toJSON();
            obj.title = 'Заявка на розницу!';
            obj.url = document.URL;
            obj.what = e.target.retrieve('what') || e.target.get('data-what');

            // если форма на странице уже открыта
            if (e.target.getParent().hasClass('open_form')) {
                
             
            }

           

            if (!obj.phone || obj.phone.test('Телефон', 'i') || obj.phone.trim() == '') {
                alert('Укажите телефон');
                return false;
            }

            if (obj.name && obj.name.test('Имя', 'i')) {
                obj.name = '';
            }

            if (obj.email && obj.email.test('Email', 'i')) {
                obj.email = '';
            }

            if (obj.address && obj.address.test('Адрес доставки', 'i')) {
                obj.address = '';
            }

            new Request.JSON({
                url: '/site/sendmail',
                onRequest: function () {
                    $$('.blossom_popup_cont').addClass('preload');
                },
                onSuccess: function (responseJSON, responseText) {
                    $$('.blossom_popup_cont').removeClass('preload');

                    if (responseJSON.status == 1) {
                       
                      
                        alert('Cпасибо, мы приняли Ваш заказ, в самое ближайшее время наш менеджер свяжется с Вами. \nНам очень приятно что Вы оставили заявку!');
                        $$('.blossom_popup_cont').each(function (popup) {
                            popup.retrieve('popup_class').close();
                        });

                        if (onSendComplete) onSendComplete();
                    } else {
                        alert('К сожалению на сервере произошла ошибка, попробуйте повторить позднее');
                    }
                }
            }).post(obj);
        }
        else if (e.target.hasClass('submit_review')) // иначе кнопка отправить отзыв
        {
            var obj = this.getParent().toJSON();
            obj.title = 'Отзыв покупателя';
            obj.url = document.URL;

            if (!obj.name || obj.name.test('Имя', 'i') || obj.name.trim() == '') {
                alert('Укажите Ваше имя');
                return false;
            }

            if (!obj.city || obj.city.test('Город', 'i') || obj.city.trim() == '') {
                alert('Укажите город');
                return false;
            }

            if (!obj.review || obj.review.test('Отзыв*', 'i') || obj.review.trim() == '') {
                alert('Напишите отзыв');
                return false;
            }

            obj.review = obj.review.replace(/\r?\n/g, '<br />');

            new Request.JSON({
                url: '/site/sendmailreview',
                onRequest: function () {
                    $$('.blossom_popup_cont').addClass('preload2');
                },
                onSuccess: function (responseJSON, responseText) {
                    $$('.blossom_popup_cont').removeClass('preload2');

                    if (responseJSON.status == 1) {
                        alert('Ваш отзыв успешно отправлен, мы проверим его и опубликуем на сайте. Cпасибо!');
                        $$('.blossom_popup_cont').each(function (popup) {
                            popup.retrieve('popup_class').close();
                        });
                    } else {
                        alert('К сожалению на сервере произошла ошибка, попробуйте повторить позднее');
                    }
                }
            }).post(obj);
        }
    });
});

//**************************************

burnUp = new Class({
    Implements: [Options, Events, Chain],
    options: {
        'width': 400,
        'opacity': 0.9,
        'offset': 50,
        'popup_back': null,
        'popup_cont': null,
        'popup_border': null,
        'popup_cont_class': null,
        'html': null
    },
    initialize: function (options) {
        this.setOptions(options);

        var _tc = this.options.this_class = this;
        var _tc_o = _tc.options;

        //создадим html
        _tc_o.popup_back = new Element('div.blossom_popup_back').setStyle('opacity', _tc_o.opacity).inject(document.body);
        _tc_o.popup_cont = new Element('div.blossom_popup_cont').setStyle('width', _tc_o.width).inject(document.body);
        if (_tc_o.popup_cont_class)
        {
            _tc_o.popup_cont.addClass(_tc_o.popup_cont_class);
        }
        _tc_o.popup_border = new Element('div.blossom_popup_border').inject(_tc_o.popup_cont);
        new Element('img.close_btn[alt=""][src="/img/icon_close.png"]')
            .addEvent('click', function () { _tc.close(); }).inject(_tc_o.popup_cont);

        //присвоим класс к диву, чтобы найти объект всплывающего окна по диву div.blossom_popup_cont
        _tc_o.popup_cont.store('popup_class', _tc);

        // расстянем фон на весь экран
        if (_tc_o.popup_back.getHeight().toInt() < window.getScrollSize().y)
            _tc_o.popup_back.setStyle('height', window.getScrollSize().y);

        _tc_o.popup_back.addEvent('click', function () { _tc.close(); });

        // зададим координаты
        _tc_o.popup_cont.setStyles({
            'top': _tc_o.offset + window.getScroll().y,
            'left': window.getSize().x / 2 - _tc_o.popup_cont.getWidth() / 2 + window.getScroll().x
        });

        //вставим код
        if (_tc_o.html) {
            if (typeOf(_tc_o.html) == 'string' || typeOf(_tc_o.html) == 'number') {
                _tc_o.popup_border.set('html', _tc_o.html);
            } else {
                _tc_o.html.inject(_tc_o.popup_border);
            }
        }

        return _tc;
    },
    clear: function () {
        this.options.popup_border.empty();

        return this;
    },
    set: function (html) {
        var _tc_o = this.options;

        if (typeOf(html) == 'string' || typeOf(html) == 'number') {
            _tc_o.popup_border.set('html', html);
        } else {
            html.inject(_tc_o.popup_border);
        }

        return this;
    },
    close: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;

        _tc_o.popup_back.destroy();
        _tc_o.popup_cont.destroy();

        return _tc;
    }
});

//**************************************

Element.implement({
    toJSON: function () {
        var json = {};
        this.getElements('input, select, textarea', true).each(function (el) {
            if (!el.name || el.disabled || el.type == 'submit' || el.type == 'reset' || el.type == 'file') return;
            var value;
            if (el.tagName.toLowerCase() == 'select') {
                value = Element.getSelected(el).map(function (opt) {
                    return opt.value;
                });
            } else {
                if (el.type == 'radio' && !el.checked) {
                    value = null;
                } else if (el.type == 'checkbox') {
                    value = el.checked;
                } else {
                    value = el.value;
                }
            }

            Array.from(value).each(function (val) {
                if (typeof val != 'undefined') {
                    json[el.name] = val;
                }
            });
        });
        return json;
    }
});

//**************************************

Number.prototype.formatMoney = function (c, d, t) {
    // (123456789.12345).formatMoney(2, '.', ',');
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 0 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? " " : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

//**************************************

moopupGallery = new Class({
    Implements: [Options, Events, Chain],
    options: {
        index: 0,
        arr_mini_src: [],
        arr_full_src: [],
        arr_alt_txt: [],
        show_original_link: true,
        autoplay: false,
        autoplay_time: 5, // in seconds
        autoplay_timer: null,
        current_img: null,
        settings: {
            nav_opacity_max: 1,
            nav_opacity_min: 0.7,
            back_opacity: 0.85,
            gallery_offset: 140,
            nav_offset: 20,
            arrow_offset_min: 0,
            arrow_offset_max: -5000,
            mini_border_up: '#8A8986',
            mini_border_over: '#FFFFFF'
        },
        src: {
            play: '/img/popup_play.gif',
            stop: '/img/popup_stop.gif',
            arrow_left: '/img/popup_arrow_left.gif',
            arrow_right: '/img/popup_arrow_right.gif',
            close: '/img/popup_close.gif'
        },
        lang: {
            left: 'Влево',
            right: 'Вправо',
            play: 'Слайд-шоу',
            close: 'Закрыть',
            of: 'из',
            show_original: 'открыть оригинал'
        },
        html: {
            popup_back: null,
            popup_nav: null,
            popup_img: null,
            img_placeholder: null,
            output_counter: null,
            left_btn: null,
            right_btn: null,
            mini_nav: null,
            play_btn: null,
            close_btn: null,
            mini_gllr_cont: null,
            mini_gllr: null
        }
        /*
        onInit              : function() {},   // fire when 
        onStart             : function() {},   // fire when 
        onChangeStart       : function() {},   // fire when 
        onChangeComplete    : function() {},   // fire when 
        onClose             : function() {}    // fire after the moopupGallery is closed (destroyed)
        
        arr_mini_img        : [],       // внутренний массив для мини-изображений
        ready               : true,     // флаг готовности к смене изображения
        this_class          : null,     // внутренний доступ к текущему классу
        abroad              : false     // флаг выхода изображения за границы видимой области
        */
    },
    initialize: function (options) {
        this.setOptions(options); // присвоим index, arr_mini_src, arr_full_src, arr_alt_txt
        this.fireEvent('onInit'); // присвоим событие onInit если задано

        var _tc = this.options.this_class = this; // для глобального доступа
        var _tc_o = _tc.options;

        if (_tc_o.arr_full_src.clean().length == 0 || _tc_o.arr_full_src.clean().length == 0) {
            alert('Один из массивов изображений пустой');
            return false;
        }

        _tc.prepareHtml();
        _tc_o.ready = true;
        _tc.initShow();
        _tc.initEvents();
        _tc.changeImage();

        if (_tc_o.autoplay == true) _tc.autoplayStart(); // запустим слайд-шоу
    },
    prepareHtml: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        //    <div id="popup_back"></div>
        //    <div id="popup_img">
        //        <div id="popup_img_ph"></div>
        //        <img class="close" alt="Close" src="/img/popup_close.gif"/>
        //    </div>
        //    <div id="popup_nav">
        //        <img alt="Left" class="l" src="/img/popup_arrow_left.gif"/>
        //        <p class="counter"></p>
        //        <img alt="Right" class="r" src="/img/popup_arrow_right.gif"/>
        //        <p class="cb"></p>
        //        <div class="mini_gallery_container">
        //            <div class="mini_gallery">
        //            </div>
        //        </div>
        //        <p class="mini_nav">
        //            <img class="play" alt="SlideShow" src=""/>
        //            <img class="close" alt="Close" src="/img/popup_close.gif"/>
        //        </p>
        //    </div>

        _tc_html.popup_back = new Element('div', { 'class': 'popup_back' }).setStyle('opacity', _tc_s.back_opacity).inject(document.body);
        _tc_html.popup_img = new Element('div', { 'class': 'popup_img' }).inject(document.body);
        _tc_html.img_placeholder = new Element('div', { 'class': 'img_placeholder' }).inject(_tc_html.popup_img);
        new Element('img', { 'class': 'close', 'alt': _tc_o.lang.close, 'src': _tc_o.src.close }).addEvent('click', function () {
            _tc.close();
        }).inject(_tc_html.popup_img);
        _tc_html.popup_nav = new Element('div', { 'class': 'popup_nav' }).inject(document.body);

        _tc_html.left_btn = new Element('img', { 'class': 'l', alt: _tc_o.lang.left, src: _tc_o.src.arrow_left }).inject(_tc_html.popup_nav);
        _tc_html.output_counter = new Element('p', { 'class': 'counter' }).inject(_tc_html.popup_nav);
        _tc_html.right_btn = new Element('img', { 'class': 'r', alt: _tc_o.lang.right, src: _tc_o.src.arrow_right }).inject(_tc_html.popup_nav);
        new Element('p', { 'class': 'cb' }).inject(_tc_html.popup_nav);
        _tc_html.mini_gllr_cont = new Element('div', { 'class': 'mini_gallery_container' }).inject(_tc_html.popup_nav);
        _tc_html.mini_gllr = new Element('div', { 'class': 'mini_gallery' }).inject(_tc_html.mini_gllr_cont);
        _tc_html.mini_nav = new Element('div', { 'class': 'mini_nav' }).inject(_tc_html.popup_nav).setStyles({ 'opacity': 0 });
        _tc_html.play_btn = new Element('img', { 'class': 'play', 'alt': _tc_o.lang.play, 'src': _tc_o.src.play }).inject(_tc_html.mini_nav);
        _tc_html.close_btn = new Element('img', { 'class': 'close', 'alt': _tc_o.lang.close, 'src': _tc_o.src.close }).inject(_tc_html.mini_nav);

        _tc_o.arr_mini_src.each(function (mini_src, i) {
            new Element('p').setStyles({
                'background': _tc_s.mini_border_up + ' url(' + mini_src + ') no-repeat 50% 50%',
                'border': '1px solid ' + _tc_s.mini_border_up
            }).inject(_tc_html.mini_gllr);
        });
        _tc_o.arr_mini_img = _tc_html.mini_gllr.getChildren('p');
    }.protect(),
    initShow: function () {
        this.fireEvent('onStart'); // присвоим событие onStart если задано

        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        // покажем галерею
        $$(_tc_html.popup_back, _tc_html.popup_nav, _tc_html.popup_img).setStyle('display', 'block');

        // расстянем фон на весь экран
        if (_tc_html.popup_back.getHeight().toInt() < window.getScrollSize().y)
            _tc_html.popup_back.setStyle('height', window.getScrollSize().y);

        // зададим координаты
        _tc_html.popup_nav.setStyles({
            'top': _tc_s.nav_offset + window.getScroll().y,
            'left': window.getSize().x / 2 - _tc_html.popup_nav.getWidth().toInt() / 2 + window.getScroll().x
        });
        _tc_html.popup_img.setStyles({
            'top': _tc_s.gallery_offset + window.getScroll().y,
            'left':
                _tc_o.current_img ?
                window.getSize().x / 2 - _tc_o.current_img.width / 2 + window.getScroll().x :
                window.getSize().x / 2 - _tc_html.popup_img.getStyle('width').toInt() / 2 + window.getScroll().x
        });

        // зададим ширину минигалереи и начальные координаты
        _tc_html.mini_gllr.setStyles({
            'width': _tc_o.arr_mini_img.length *
					(_tc_o.arr_mini_img[0].getWidth() +
					_tc_o.arr_mini_img[0].getStyle('margin-left').toInt() +
					_tc_o.arr_mini_img[0].getStyle('margin-right').toInt() + 2), // +2 для ие6, да-да ие гавно
            'left': _tc_html.mini_gllr_cont.getWidth() / 2 -
					_tc_o.arr_mini_img[_tc_o.index].offsetLeft -
					_tc_o.arr_mini_img[_tc_o.index].getWidth() / 2
        });
    }.protect(),
    initEvents: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        // присвоим события для мини-изображений
        _tc_o.arr_mini_img.each(function (p, i) {
            p.addEvents({
                'click': function () {
                    if (!_tc_o.ready || _tc_o.autoplay) return false;
                    else if (_tc_o.index != i) {
                        if (!_tc_o.ready) return false;
                        _tc_o.index = i;
                        _tc.changeImage();
                    }
                },
                'mouseenter': function () {
                    if (_tc_o.autoplay) return false;
                    this.set('tween', { transition: 'cubic:out', duration: 300 }).tween('border-color', _tc_s.mini_border_over);
                },
                'mouseleave': function () {
                    if (_tc_o.index != i)
                        this.set('tween', { transition: 'cubic:out', duration: 300 }).tween('border-color', _tc_s.mini_border_up);
                }
            });
        });

        // присвоим функции кнопкам навигации
        _tc_html.left_btn.addEvent('click', function () {
            if (!_tc_o.ready) return false;
            _tc_o.index--;
            _tc.changeImage();
        });
        _tc_html.right_btn.addEvent('click', function () {
            if (!_tc_o.ready) return false;
            _tc_o.index++;
            _tc.changeImage();
        });
        _tc_html.close_btn.addEvent('click', function () {
            _tc.close();
        });
        _tc_html.play_btn.addEvent('click', function () {
            if (this.getProperty('src') == _tc_o.src.stop) _tc.autoplayStop(); //остановим слайд-шоу
            else _tc.autoplayStart(); // запустим слайд-шоу
        });

        // спрячем кнопки мини_навигации
        _tc_html.popup_nav.addEvent('mouseenter', function () {
            _tc_html.mini_nav.fade('in');
        });
        _tc_html.popup_nav.addEvent('mouseleave', function () {
            _tc_html.mini_nav.fade('out');
        });

        // зададим эффект при наведении на кнопки навигации
        $$([_tc_html.popup_nav.getChildren('img'), _tc_html.play_btn, _tc_html.close_btn].flatten())
            .setStyle('opacity', _tc_s.nav_opacity_min)
            .addEvents({
                'mouseenter': function () {
                    this.set('tween', { transition: 'cubic:out', duration: 300 }).tween('opacity', _tc_s.nav_opacity_max);
                },
                'mouseleave': function () {
                    this.set('tween', { transition: 'cubic:out', duration: 300 }).tween('opacity', _tc_s.nav_opacity_min);
                }
            }
        );

        _tc_html.popup_img.set('tween', { transition: 'cubic:out', duration: 50 }).set('morph', {
            transition: 'cubic:out',
            duration: 250,
            onComplete: function () {
                _tc_html.img_placeholder.empty(); // почистим от всех дочерних элементов

                _tc_o.current_img.inject(_tc_html.img_placeholder);
                _tc_o.current_img.setStyle('opacity', 0).set('tween', {
                    duration: 500,
                    onComplete: function () {
                        _tc.fireEvent('onChangeComplete'); // присвоим событие onChangeComplete если задано
                        _tc_o.ready = true;

                        // создадим подпись, если она есть или 
                        // ссылку на оригинал, если изображение вышло за границу
                        if (_tc_o.arr_alt_txt[_tc_o.index] || _tc_o.abroad) {
                            var p_height = 0;
                            // проверим условие нужно ли показывать ссылку на оригинальный размер
                            if (_tc_o.show_original_link) {
                                p_height = new Element('p').set('html',
                                    (_tc_o.abroad ? '» <a target="_blank" style="font-size:12px; font-weight:bold;" href="' + _tc_o.current_img.getProperty('src') + '">' +
                                        _tc_o.lang.show_original + '</a> «<br/>' : '') +
                                    (_tc_o.arr_alt_txt[_tc_o.index] ? _tc_o.arr_alt_txt[_tc_o.index] : '')).inject(_tc_html.img_placeholder).getHeight();
                            } else if (_tc_o.arr_alt_txt[_tc_o.index]) {
                                p_height = new Element('p').set('html', _tc_o.arr_alt_txt[_tc_o.index]).inject(_tc_html.img_placeholder).getHeight();
                            }

                            

                            // растянем белое окно
                            _tc_html.popup_img.tween('height', _tc_o.current_img.height + p_height);
                        }
                    }
                }).tween('opacity', 1);
            }
        });
    }.protect(),
    changeImage: function () {
        this.fireEvent('onChangeStart'); // присвоим событие onChangeStart если задано

        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        _tc_o.ready = false; // не реагировать на действия пользователя, пока не загрузится изображение

        if (_tc_o.index < 0) {
            _tc_o.index = 0;
            return false;
        }
        else if (_tc_o.index >= _tc_o.arr_full_src.length) {
            _tc_o.index = _tc_o.arr_full_src.length - 1;
            return false;
        }

        if (_tc_o.autoplay == false) {
            if (_tc_o.index == 0) _tc_html.left_btn.setStyle('top', _tc_s.arrow_offset_max);
            else if (_tc_o.index > 0) _tc_html.left_btn.setStyle('top', _tc_s.arrow_offset_min);
            if (_tc_o.index < _tc_o.arr_full_src.length - 1) _tc_html.right_btn.setStyle('top', _tc_s.arrow_offset_min);
            else if (_tc_o.index == _tc_o.arr_full_src.length - 1) _tc_html.right_btn.setStyle('top', _tc_s.arrow_offset_max);
        }

        // выделим текущее изображение в минигалерее
        _tc_o.arr_mini_img.set('tween', { transition: 'cubic:out', duration: 300 }).tween('border-color', _tc_s.mini_border_up);
        _tc_o.arr_mini_img[_tc_o.index].set('tween', { transition: 'cubic:out', duration: 300 }).tween('border-color', _tc_s.mini_border_over);

        // прокрутим минигалерею на текущее изображение
        _tc_html.mini_gllr.set('tween', { duration: 500 }).tween('left',
			_tc_html.mini_gllr_cont.getWidth() / 2 -
			_tc_o.arr_mini_img[_tc_o.index].offsetLeft - _tc_o.arr_mini_img[_tc_o.index].getWidth() / 2
		);

        _tc_html.img_placeholder.empty(); // почистим от всех дочерних элементов
        _tc_html.output_counter.set('html', (_tc_o.index + 1) + ' ' + _tc_o.lang.of + ' ' + _tc_o.arr_full_src.length); // напишем текущий номер

        _tc_o.abroad = false;

        // покажем изображение
        _tc_o.current_img = new Asset.image(_tc_o.arr_full_src[_tc_o.index], {
            alt: _tc_o.arr_alt_txt[_tc_o.index] ? _tc_o.arr_alt_txt[_tc_o.index] : '',
            onload: function () {
                _tc_html.popup_nav.setStyles({
                    'top': _tc_s.nav_offset + window.getScroll().y,
                    'left': window.getSize().x / 2 - _tc_html.popup_nav.getWidth() / 2 + window.getScroll().x
                });

                // посчитаем доступную зону просмотра
                var available_width = window.getSize().x - 100;
                var available_height = window.getSize().y - 100 - _tc_s.gallery_offset;

                // если изображение вылазит за границы доступной зоны, то меняем размеры
                if (_tc_o.current_img.width > available_width || _tc_o.current_img.height > available_height) {
                    _tc_o.abroad = true;

                    var new_width, new_height;

                    var new_ratio = available_width / available_height;
                    var original_ratio = _tc_o.current_img.width / _tc_o.current_img.height;

                    if (new_ratio > original_ratio) {
                        new_height = available_height;
                        new_width = Math.floor(original_ratio * available_height);
                    }
                    else {
                        new_height = Math.floor(available_width / original_ratio);
                        new_width = available_width;
                    }

                    _tc_o.current_img.width = new_width > available_width ? available_width : new_width;
                    _tc_o.current_img.height = new_height > available_height ? available_height : new_height;
                }

                _tc_html.popup_img.morph({
                    'top': _tc_s.gallery_offset + window.getScroll().y,
                    'left': window.getSize().x / 2 - _tc_o.current_img.width / 2 + window.getScroll().x,
                    'width': _tc_o.current_img.width,
                    'height': _tc_o.current_img.height
                });
            }
        }).addEvent('click', function () { _tc.close() });

        return _tc;
    },
    autoplayStart: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        _tc_o.autoplay = true;

        _tc_html.play_btn.setProperty('src', _tc_o.src.stop);
        _tc_html.left_btn.setStyle('top', _tc_s.arrow_offset_max);
        _tc_html.right_btn.setStyle('top', _tc_s.arrow_offset_max);

        _tc_html.mini_gllr.setStyle('opacity', _tc_s.nav_opacity_min == 0 ? 0 : _tc_s.nav_opacity_min / 2);
        _tc_html.output_counter.setStyle('opacity', _tc_s.nav_opacity_min == 0 ? 0 : _tc_s.nav_opacity_min / 2);

        _tc_o.arr_mini_img.setStyle('cursor', 'default');

        _tc_o.autoplay_timer = function () {
            if (_tc_o.ready == true) {
                _tc_o.index++;
                if (_tc_o.index > _tc_o.arr_full_src.length - 1) _tc_o.index = 0;
                _tc.changeImage();
            }
        }.periodical(_tc_o.autoplay_time * 1000);

        return _tc;
    },
    autoplayStop: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;
        var _tc_html = _tc.options.html;
        var _tc_s = _tc.options.settings;

        _tc_o.autoplay = false;

        _tc_html.play_btn.setProperty('src', _tc_o.src.play);
        if (_tc_o.index != 0) _tc_html.left_btn.setStyle('top', _tc_s.arrow_offset_min);
        if (_tc_o.index != _tc_o.arr_full_src.length - 1) _tc_html.right_btn.setStyle('top', _tc_s.arrow_offset_min);

        _tc_html.mini_gllr.setStyle('opacity', 1);
        _tc_html.output_counter.setStyle('opacity', 1);

        _tc_o.arr_mini_img.setStyle('cursor', 'pointer');

        clearInterval(_tc_o.autoplay_timer);

        return _tc;
    },
    removeHtml: function () {
        var _tc_html = this.options.html;

        _tc_html.popup_back.destroy();
        _tc_html.popup_img.destroy();
        _tc_html.popup_nav.destroy();
    }.protect(),
    close: function () {
        var _tc = this.options.this_class;
        var _tc_o = _tc.options;

        _tc_o.arr_mini_src.empty();
        _tc_o.arr_full_src.empty();
        _tc_o.arr_alt_txt.empty();
        _tc_o.arr_mini_img.empty();

        clearInterval(_tc_o.autoplay_timer);

        _tc.removeHtml();

        _tc.fireEvent('onClose'); // присвоим событие onComplete если задано

        return _tc;
    }
});