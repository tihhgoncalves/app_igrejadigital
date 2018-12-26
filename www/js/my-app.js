var myApp = new Framework7();
var $$ = Dom7;

var app_status;

var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

$$(document).on('deviceready', function() {
  register_log('App aberto.');
  mainView.hideToolbar();
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
  $$('a.church-mail').attr('href', 'mailto:' + church.mail);

  $$('.church-administrator-name').text(church.administrator.name);
  $$('.church-administrator-mail').text(church.administrator.mail);
  $$('a.church-administrator-mail').attr('href', 'mailto:' + church.administrator.mail);
  $$('.church-administrator-phone').text(church.administrator.phone);
  $$('.church-administrator-phone-full').text(church.administrator.phonefull);
  $$('a.church-administrator-phone, a.church-administrator-phone-full').attr('href', 'tel:' + church.administrator.phonefull);

  $$('.server-access-lasttime').text(localStorage.getItem('igrejadigital_json_lasttime'));

  $$('.panel .list-block a').on('click', function(){
    myApp.closePanel();
  });

}

/* Parâmetros Default */
$$(document).on('deviceready', function() {

  if(localStorage.getItem('igrejadigital_json_lasttime') == null)
    localStorage.setItem('igrejadigital_json_lasttime', 'nunca');

  if(localStorage.getItem('igrejadigital_json_data') == null)
    localStorage.setItem('igrejadigital_json_data', {});

})

$$(document).on('deviceready', function() {

  app_sync();

  setInterval(function(){
    register_log('Sincronizando (a cada 5min)');
    app_sync();
  }, 150000);//a cada 5min

  $$('a.status-refresh').click(function(){

    myApp.showPreloader('Tentando reconectar...');

    app_sync(function(){

      setTimeout(function(){
        myApp.hidePreloader();
      }, 1000);
    });



  });

  loader_church();
})
$$(document).on('pageInit', function (e) {
    loader_church();
})

