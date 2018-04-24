"use strict";

var componentHeader = new Component({ name: 'header', parent: 'header', url: './img/logo.png', title: 'Рога и Копыта' });
var componentMenu = new Component({ name: 'menu', parent: 'nav' });
var componentAbout = new Component({ name: 'about', parent: 'main' });
var componentContact = new Component({ name: 'contact', parent: 'main' });
var componentArticles = new Component({ name: 'articles', parent: 'main' });
var componentFooter = new Component({ name: 'footer', parent: 'footer', text: '&#169; Копирайты' });

var viewHeader = '<h1><img src="{url}" alt="{title}"/>{title}</h1>';
var viewMenu = '<ul>{li}</ul>';
var viewArticle = '<section>{article}</section>';
var viewFooter = '<p><small>{text}</small</p>';
var viewAbout = '<section><h2>About</h2><ul>{li}<ul></section>';
var viewContact = '<section><h2>Contact</h2><form><textarea>Text</textarea>' + '<button type="submit">submit</button><form></section>';

var dataMenu = [{
    name: 'Главная',
    url: 'componentArticles'
}, {
    name: 'O нас',
    url: 'componentAbout',
    items: [{
        name: 'Кто мы', url: '#', items: [{
            name: 'Рога', url: '#', items: [{ name: 'Большие', url: '#' }, { name: 'Маленькие', url: '#' }]
        }, {
            name: 'Копыта', url: '#', items: [{ name: 'Парные', url: '#' }, { name: 'Непарные', url: '#' }]
        }]
    }, { name: 'Где мы', url: '#' }, { name: 'Откуда', url: '#' }]
}, {
    name: 'Контакты',
    url: 'componentContact'
}];
var dataArticle = [{ name: 'Статья 1', url: '#', text: 'Some text for you' }, { name: 'Статья 2', url: '#', text: 'Some text for you' }, { name: 'Статья 3', url: '#', text: 'Some text for you' }];
var dataAbout = [{ name: 'Name0', surname: 'Surname0', age: '18', profile: '#', from: 'City' }, { name: 'Name1', surname: 'Surname1', age: '18', profile: '#', from: 'City' }, { name: 'Name2', surname: 'Surname2', age: '18', profile: '#', from: 'City' }];

componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentArticles.setView(viewArticle, dataArticle);
componentFooter.setView(viewFooter);
componentContact.setView(viewContact);
componentAbout.setView(viewAbout, dataAbout);

Component.renderPage(componentHeader, componentMenu, componentArticles, componentFooter);