// Initialize app
var myApp = new Framework7();


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
    //loader_church();
});


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        //myApp.alert('Here comes About page1');
    }

})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    //myApp.alert('Here comes About page2');
})


/*
$$(document).on('click', '#favorites', function (e) {
    myApp.alert('Show my favorites');
});

$$(document).on('click', '#about', function (e) {
    myApp.alert('Show About');
});

$$(document).on('click', '#settings', function (e) {
    myApp.alert('Show Settings');
});
*/

/* Carrega Dados da Igreja */
function loader_church(){
    $$('.church-name').text(church.name);
    $$('.church-phone').text(church.phone);
    $$('.church-phone-full').text(church.phonefull);
    $$('a.church-phone, a.church-phone-full').attr('href', 'tel:' + church.phonefull);
    $$('.church-mail').text(church.mail);
    ('a.church-mail').attr('href', 'mailto:' + church.mail);

  $$('.panel-left a').on('click', function(){
    myApp.closePanel();
    console.log('123');
  });

}

$$(document).on('deviceready', function() {
    loader_church();
})
$$(document).on('pageInit', function (e) {
    loader_church();


})