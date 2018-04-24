"use strict";

let componentHeader = new Component({name: 'header', parent: 'header', url: './img/logo.png', title: 'Рога и Копыта'});
let componentMenu = new Component({name: 'menu', parent: 'nav'});
let componentAbout = new Component({name: 'about', parent: 'main'});
let componentContact = new Component({name: 'contact', parent: 'main'});
let componentArticles = new Component({name: 'articles', parent: 'main'});
let componentFooter = new Component({name: 'footer', parent: 'footer', text: '&#169; Копирайты'});

let viewHeader = '<h1><img src="{url}" alt="{title}"/>{title}</h1>';
let viewMenu = '<ul>{li}</ul>';
let viewArticle = '<section>{article}</section>';
let viewFooter = '<p><small>{text}</small</p>';
let viewAbout = '<section><h2>About</h2><ul>{li}<ul></section>';
let viewContact = '<section><h2>Contact</h2><form><textarea>Text</textarea>' +
    '<button type="submit">submit</button><form></section>';

let dataMenu = [
    {
        name: 'Главная',
        url: 'componentArticles'
    },
    {
        name: 'O нас',
        url: 'componentAbout',
        items: [
            {
                name: 'Кто мы', url: '#', items: [
                    {
                        name: 'Рога', url: '#', items: [
                            {name: 'Большие', url: '#'},
                            {name: 'Маленькие', url: '#'}
                        ]
                    },
                    {
                        name: 'Копыта', url: '#', items: [
                            {name: 'Парные', url: '#'},
                            {name: 'Непарные', url: '#'}
                        ]
                    }
                ]
            },
            {name: 'Где мы', url: '#'},
            {name: 'Откуда', url: '#'}
        ]
    },
    {
        name: 'Контакты',
        url: 'componentContact'
    }
];
let dataArticle = [
    {name: 'Статья 1', url: '#', text: 'Some text for you'},
    {name: 'Статья 2', url: '#', text: 'Some text for you'},
    {name: 'Статья 3', url: '#', text: 'Some text for you'}
];
let dataAbout = [
    {name: 'Name0', surname: 'Surname0', age: '18', profile: '#', from: 'City'},
    {name: 'Name1', surname: 'Surname1', age: '18', profile: '#', from: 'City'},
    {name: 'Name2', surname: 'Surname2', age: '18', profile: '#', from: 'City'}
];


componentHeader.setView(viewHeader);
componentMenu.setView(viewMenu, dataMenu);
componentArticles.setView(viewArticle, dataArticle);
componentFooter.setView(viewFooter);
componentContact.setView(viewContact);
componentAbout.setView(viewAbout, dataAbout);

Component.renderPage(componentHeader, componentMenu, componentArticles, componentFooter);


