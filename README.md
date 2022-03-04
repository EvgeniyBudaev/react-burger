# Яндекс.Практикум. React-разработчик. Проект React-Burger

### https://cosmos-react-burger.nomoredomains.work

## Содержание
- [Описание_проекта](#Описание_проекта)
- [Технологии](#Технологии)
- [Настройка_сервера](#Настройка_сервера)
- [Запуск проекта](#Запуск_проекта)
- [Тесты](#Тесты)
- [Авторы](#Авторы)

### <a name="Описание_проекта">Описание</a>

Космическая бургерная "Stellar Burger" удовлетворит самых взыскательных клиентов.
Благодаря встроенному конструктору вы сможете сконфигурировать бургер из понравившихся ингредиентов. Функционал 
drag and drop добавит комфорт и легкость при выборе ингредиентов. В ленте заказов вы можете отслеживать время
приготовления по номеру заказа. Мы ценим ваше время и поэтому  заказ выполняется не более 15 секунд. О завершении 
приготовления на табло в ленте заказов появится соответствующая информация. Оформить и отслеживать заказ могут только
авторизованные пользователи. В профиле вы можете вносить изменения в свои учетные данные и отслеживать свою ленту
заказов.

### <a name="Технологии">Технологии</a>

В проекте применяется
- **React**,
- **Redux**,
- **TypeScript**,
- **Nginx**,
- **Git**,
- **Coockie**,
- **Node.js**,
- **Cypress**,
- **DragAndDrop**,
- **Eslint**,
- **Prettier**
- 
### <a name="Настройка_сервера">Настройка_сервера</a>

- Установка Node.js:

```python
 node -v локально
 curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
 sudo apt-get install -y nodejs
 node -v на сервере
```

- Установка GIT:

```python
 sudo apt install -y git
 git --version
```

- HTTP-сервер nginx:

```python
 sudo apt update
 sudo apt install -y nginx
 sudo ufw allow 'Nginx Full'
 sudo ufw allow OpenSSH
 sudo ufw enable
 sudo systemctl enable --now nginx
```

- Редактирование файла конфигурации nginx:

```python
 sudo nano /etc/nginx/sites-available/default
 
 server {
        listen 80;

        server_name cosmos-react-burger.nomoredomains.work;

        root /home/admin/frontend;

        location / {
	  try_files $uri $uri/ /index.html;
        }
}

 ctrl-O,ctrl-X
 sudo nginx -t
 sudo systemctl restart nginx
```

- Размещаем фронтенд на сервере:

```python
 1) На удалённом сервере создаём папку для фронтенда. Назовём её, например, frontend
 2) Соберём файлы локально командой npm run build
 3) Скопируем файлы с локального компьютера на удалённый. Это можно сделать командой scp
    scp -r ./build/* admin@62.84.125.180:/home/admin/frontend
```

- Шифрование данных. Протокол HTTPS:

```python
 Выпускаем сертификат.
 sudo apt update
 sudo apt install -y certbot python3-certbot-nginx
 Подключаем сертификат.
 sudo certbot --nginx
 В процессе исполнения вам нужно ответить на несколько вопросов:
 1) Enter email address (англ. «введите почту»). Почта нужна для предупреждений, что сертификат пора обновить.
 2) Please read the Terms of Service; (A)gree/(C)ancel: (англ. «прочитайте правила сервиса; принять/отклонить»). 
    Прочитайте правила по ссылке и введите a. Затем нажмите Enter.
 3) Would you be willing to share your email address with the Electronic Frontier Foundation? (англ. «хотите ли вы 
    поделиться своей почтой с Фондом электронных рубежей»). Отметьте на своё усмотрение y (да) или n (нет) и нажмите 
    Enter.
 4) Which names would you like to activate HTTPS for? (англ. «для каких доменных имён вы хотите включить https?»). Вам
    будет предложен вариант: domainname.students.nomoreparties.co. Это доменные имена, которые мы добавили в поле
    server_name конфигурации nginx в предыдущих уроках. Ничего не вводите, просто нажмите Enter. Тогда https будет
    включён для всех доменов.
 5) Please choose whether or not to redirect HTTP traffic to HTTPS? 1: No redirect, 2: Redirect (англ. «нужно ли
    перенаправлять http траффик на https, 1: не перенаправлять, 2: перенаправлять»). Выберите 1 и нажмите Enter.
 В итоге сертификаты будут выпущены. Также эта команда отредактирует конфигурацию nginx: добавит в неё нужные настройки
 и пропишет пути к сертификату.
 Перезапускаем nginx:
 sudo systemctl reload nginx
```

### <a name="Запуск_проекта">Запуск проекта</a>
```python
 npm install
 npm start
```

### <a name="Тесты">Тесты</a>

```python
  npm run test
  npm run cypress:open
```

### <a name="Авторы">Авторы</a>
```
 Евгений Будаев
```
