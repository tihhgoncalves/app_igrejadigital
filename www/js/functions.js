function register_log(text) {

  var log = localStorage.getItem('igrejadigital_log');

  var today = new Date();

  var n_log = '[' + (new Date().toLocaleString()) + '] ' + text;
  localStorage.setItem('igrejadigital_log', log + "\r\n" + n_log);
  console.log(n_log);
}

function app_sync(callback){
  register_log('Preparando para baixar dados do servidor.');

  $$.ajax({
    type: "POST",
    url: "https://taticadesucesso.com.br/igrejadigital.taticadesucesso.com.br/example.json",
    dataType: "json",
    success: function (result){
      register_log('Dados baixados com sucesso.');

      localStorage.setItem('igrejadigital_json_data', result);
      localStorage.setItem('igrejadigital_json_lasttime', new Date().toLocaleString());

      //verifica quais modulos estão disponíveis pro usuario

      if(validate.isset(result.messages))
        $$('.panel-left li#mensagens').show();
      else
        $$('.panel-left li#mensagens').hide();

      if(validate.isset(result.calendar))
        $$('.panel-left li#agenda').show();
      else
        $$('.panel-left li#agenda').hide();

      if(validate.isset(result.contacts))
        $$('.panel-left li#contatos').show();
      else
        $$('.panel-left li#contatos').hide();

      if(validate.isset(result.prayers))
        $$('.panel-left li#oracao').show();
      else
        $$('.panel-left li#oracao').hide();

      if(validate.isset(result.prayers))
        $$('.panel-left li#oracao').show();
      else
        $$('.panel-left li#oracao').hide();

      if(validate.isset(result.church))
        $$('.panel-left li#a-igreja').show();
      else
        $$('.panel-left li#a-igreja').hide();

      register_log('Lista de módulos foi atualizada.');
      app_online();

    },
    error: function(xhr, error){
      register_log('Ocorreu um erro ao tentar acessar o servidor. [' + error + ']');
      mainView.loadPage('offline.html');
      app_offline();

    },

  });

  if(validate.isset(callback))
    callback();

}

function app_offline(){
  $$('.online-only').addClass('is-offline', 'true');
  mainView.showToolbar();
  app_status = 'offline';

  if(app_status == 'online'){
    mainView.loadPage('offline.html');
  }
}

function app_online(){
  $$('.is-offline').removeClass('is-offline');
  mainView.hideToolbar();

  if(app_status == 'offline'){
    myApp.alert('Pronto! Você já está online novamente. ;D');
    mainView.loadPage('index.html');
  }

  app_status = 'online';
}