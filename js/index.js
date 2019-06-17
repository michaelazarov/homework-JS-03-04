//-------------------------------------------------03
//Объявите функцию без формальных параметров, которая выводит в консоль сама себя и все переданные ей аргументы
//Вызовите эту функцию с аргументами 10, false, "google"
//-------------------------------------------------

var fun1 = function(){
	console.log (arguments.callee )
	console.log (arguments)
}
fun1(10, false, "google")

//-------------------------------------------------03
//Объявите функцию userInfo, которая выводит в консоль:
//свойство "Дата регистрации: " + свойство data контекста вызова, если свойство registered имеет значение true
//сообщение "Незарегистрированный пользователь: " + свойство name в противном случае
//( используйте переменные в литералах )
//Создайте два объекта с одинаковым набором свойств:
//name ( строка )
//registered ( логическое значение )
//data ( дата в формате "дд.мм.гг" )
//Добавьте каждому объекту метод getInfo, который будет ссылкой на функцию userInfo
//Вызовите каждый метод
//-------------------------------------------------

//Вариант 1
function Users (name = "noname", registered = false, data = new Date().toLocaleDateString()) {
    this.name = name
    this.registered = registered
    this.data = data
    this.getInfo = userInfo
}

var userInfo = function(){
    this.registered 
        ? console.log(`Дата регистрации: "${this.data}`)
            : console.log(`Незарегистрированный пользователь: ${this.name}`)
}

var user1 =  new Users("Ivan")
var user2 =  new Users("Elena", true)
user1.getInfo()
user2.getInfo()

//Вариант 2
function Users (name = "noname", registered = false, data = new Date().toLocaleDateString()) {
    this.name = name
    this.registered = registered
    this.data = data
}
Users.prototype.getInfo = userInfo

var userInfo = function(){
    this.registered 
        ? console.log(`Дата регистрации: "${this.data}`)
            : console.log(`Незарегистрированный пользователь: ${this.name}`)
}

var user1 =  new Users("Ivan")
var user2 =  new Users("Elena", true)
user1.getInfo()
user2.getInfo()

//-------------------------------------------------03
//Есть три объекта: users, posts и comments
//( готовые объекты уже ждут вас по ссылке )
//Написать код функции getPostComments ( postId ),
//которая возвращает массив всех комментариев к посту
//с идентификатором postId
//( с именем автора комментария и текстом комментария )
//-------------------------------------------------

var users = [
        {
                userId: 14587,
                name: "Ivan",
                email: "ivan78@gmail.com"
        },
        {
                userId: 28419,
                name: "Georg",
                email: "georg.klep@gmail.com"
        },
        {
                userId: 41457,
                name: "Stephan",
                email: "stephan.borg@gmail.com"
        }
]
var posts = [
        {
                postId: 7891451,
                author: 14587,
                text: "Imagine we can encapsulate these secondary responsibilities in functions"
        },
        {
                postId: 7891452,
                author: 28419,
                text: `В конструкторе ключевое слово super используется как функция, вызывающая родительский конструктор. 
                        Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. 
                        Ключевое слово super также может быть использовано для вызова функций родительского объекта`
        },
        {
                postId: 7891453,
                author: 28419,
                text: `DOM не обрабатывает или не вынуждает проверять пространство имен как таковое. 
                        Префикс пространства имен, когда он связан с конкретным узлом, не может быть изменен`
        },
        {
                postId: 7891454,
                author: 14587,
                text: "Ключевое слово super используется для вызова функций, принадлежащих родителю объекта"
        }
]
var comments = [
        {
                commentId: 91078454,
                postId: 7891451,
                author: 28419,
                text: `The static String.fromCharCode() method returns a string created 
                        from the specified sequence of UTF-16 code units`
        },
        {
                commentId: 91078455,
                postId: 7891451,
                author: 41457,
                text: `HTML элемент <template> — это механизм для отложенного рендера клиентского контента, 
                        который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript`
        },
        {
                commentId: 91078457,
                postId: 7891452,
                author: 41457,
                text: "Глобальный объект String является конструктором строк, или, последовательностей символов"
        },
        {
                commentId: 91078458,
                postId: 7891452,
                author: 14587,
                text: `The Element.namespaceURI read-only property returns the namespace URI of the element, 
                        or null if the element is not in a namespace`
        }
]

//Вариант 1.1
function getCurrentPostComments ( postId ) {
	
    var res = []
    var i = 0
    for(var comment of comments){
        if (comment.postId === postId) {
             for(var user of users){               
                if(user.userId === comment.author){
                    var userObj = {}
                    userObj.autor = user.name
                    userObj.text = comment.text
                    res[i++] = userObj
                    if (userFind) break 
                }
                //console.log (`${user.name}: ${comment.text}`)                            
            }
        }
    }
    return res
}
console.log ( getCurrentPostComments ( 7891451 ) )

//Вариант 1.2
function getCurrentPostComments2 ( postId ) {
    if(isNaN(postId)) return null 
    postIdInner = 1*postId //приводим число в виде строки к типу число
    var res = []
    var i = 0
    for(var comment of comments){
        if (comment.postId === postIdInner) {
             for(var user of users){                
                if(user.userId === comment.author){
                    var userObj = {}
                    userObj.autor = user.name
                    userObj.text = comment.text
                    res[i++] = userObj
                    break
                }
                //console.log (`${user.name}: ${comment.text}`)
            }
        }
    }
    return res
}
console.log ( getCurrentPostComments ( "7891451" ) )

//Вариант 2
function getCurrentPostComments ( postId ) {
	
    var res = []
    var i = 0
    for(var comment of comments){
        if (comment.postId === postId) {
             for(var user of users){
                if(user.userId === comment.author){
                    var userObj = {}
                    userObj.autor = user.name
                    userObj.text = comment.text
                    res[i++] = userObj
                    userFind = true
                    break
                }      
            }
        }
    }
    return res
}
console.log ( getCurrentPostComments ( 7891451 ) )

//-------------------------------------------------04
//Создайте объект, свойства которого описывают содержимое дамской сумочки
//Создайте метод объекта, позволяющий удалить что-то из сумочки
//Создайте метод объекта, позволяющий положить что-то в сумочку
//-------------------------------------------------

//Вариант 1 все свойства и методы публичные
var WomanBag = function(){
    this.lipstick = "good lipstick"
    this.mirror = "small mirror"
}

WomanBag.prototype.deleteProp = function(prop){
    delete  this[prop]
}
WomanBag.prototype.addProp = function(prop,value){
    this[prop] = value
}

womanBag1 = new WomanBag;
womanBag1.deleteProp("lipstick")
womanBag1.addProp("small bear","micha")

womanBag2= new WomanBag;
womanBag2.addProp("bottle of beer","lager")

console.dir(womanBag1)
console.dir(womanBag2)

//Вариант 2 свойства приватные, методы публичные
var WomanBag = function(){
    var intoBag = {
        lipstick: "good lipstick",
        mirror: "small mirror",
        pad: "slim"
    }
    this.deleteProp = function(prop){
        delete intoBag[prop]
    }
    this.addProp = function(prop,value){
        intoBag[prop] = value
    }
	//для проверки наличия отдельных свойств
    this.getValueProp = function(prop){
        return intoBag[prop]
    } 
	//для проверки наличия всех свойств
    this.getAllProp = function(){
        var props = ""
        for(var prop in intoBag)
            props += `${prop}: ${intoBag[prop]}; `
        return props
    }    
}

womanBag1 = new WomanBag
womanBag1.deleteProp("lipstick")
womanBag1.addProp("small bear","misha")
womanBag2 = new WomanBag
womanBag2.addProp("bottle of beer","lager")
//womanBag1.getAllProp()
// womanBag2.getAllProp()



//Вариант 3 свойства приватные, методы публичные, 
//удаление через приватный метод с проверкой пароля
var WomanBag = function(password){
    var intoBag = {
        lipstick: "good lipstick",
        mirror: "small mirror",
        pad: "slim",      
    }
    var pass = password
    var deleteProp_ = function(prop, pass){
        pass === password
            ? delete intoBag[prop]
                : console.log("Who are you?")
    }
    this.deleteProp = function(prop, pass){
        deleteProp_(prop, pass)
    }
    this.addProp = function(prop,value){
        intoBag[prop] = value
    }
    this.getValueProp = function(prop){
        return intoBag[prop]
    } 
    this.getAllProp = function(){
        var props = ""
        for(var prop in intoBag)
            props += `${prop}: ${intoBag[prop]}; `
        return props
    }     
}


womanBag1 = new WomanBag("my1")
womanBag1.deleteProp("lipstick","my1")
womanBag1.addProp("small bear","misha")
womanBag2 = new WomanBag("my2")
womanBag2.addProp("bottle of beer","lager")
womanBag2.deleteProp("lipstick")
// womanBag1.getAllProp()
// womanBag2.getAllProp()





//-------------------------------------------------04
//Объявить конструктор LibraryBook, с помощью которого можно 
//создавать и редактировать объекты, хранящие информацию о книгах в библиотеке
// 📦 Приватные свойства объекта:
//     🔑 title ( название книги ),
//     🔑 year ( год издания ),
//     🔑 author ( автор ),
//     🔑 readerName ( кому выдана ),
//     🔑 readerData ( когда выдана )

// 📦 Приватный метод 🔑 giveTheBook ( client ):
//         внесение изменений в свойства:
//             🔑 readerName ( client )
//             🔑 readerData ( текущая дата )

// 📋 Публичные методы:
//     📋 getBookInfo () - посмотреть информацию о наличии книги 
//        ( вывести в консоль readerData )
//     📋 getTheBook ( client ) -  получить книгу:
//        проверка, что книга не выдана на руки 
//        ( приватное свойство readerName 
//          должно быть пустой строкой )
//        если выдана - вернуть null
//        если не выдана, то вызвать приватный метод 
//        giveTheBook ( client ) и вернуть bookTitle
//     📋 returnBook () - вернуть книгу:
//        сбросить значения приватных свойств
//        readerName, readerData
//-------------------------------------------------

var LibraryBook = function(bookTitle  = "", author = "",  year = "" ){
    readerName = ""
    readerData = ""
    
    var giveTheBook = function( client ){
        readerName = client
        readerData = new Date().toLocaleDateString()
        return bookTitle
    }
    this.getBookInfo = function(){
        readerData !== ''
            ? console.log(`${readerData}, ${readerName}`)
                : console.log("Книга в наличии")
    } 
    this.getTheBook  = function( client ){
        readerData === '' 
            ? giveTheBook( client )
                : null
    }
    this.returnBook = function(){
        readerName = ""
        readerData = ""
    }

}

book1 = new LibraryBook("Над пропастью во ржи","Джером Д. Сэлинджер","2000")
book2 = new LibraryBook("Унесённые ветром","Маргарет Митчелл","2010")
book3 = new LibraryBook("Сто лет одиночества","Габриэль Гарсия Маркес","2010")
book1.getTheBook("Иван Петров")
book1.getBookInfo()
book1.returnBook()
book1.getBookInfo()


//-------------------------------------------------04
// Объявите конструктор, который создает экземпляры с унаследованным методом addProperty
// Метод addProperty должен принимать два аргумента:
// имя свойства
// значение свойства
// и добавлять экземпляру новое свойство с указанным именем и значением
//-------------------------------------------------
var AddItems = function(){
    this.addProperty = function(nameProp, valueProp){
        this[nameProp] = valueProp
    }
}
var item1 = new AddItems()
var item2 = new AddItems()
var x = 0;
while (x <= 10){
    item1.addProperty("prop_"+x, x++)
}
console.log(item1)




