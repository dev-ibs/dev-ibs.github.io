//alert("js loaded");

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

    var respText = "init";

    var accessToken ="5d3ff18f25914d7c8c54f7ae2cceb662";
    var baseUrl = "https://api.dialogflow.com/v1/";

$(window).load(function() {
  $messages.mCustomScrollbar();
/*   setTimeout(function() {
    fakeMessage("Hey..!!");
  }, 100); */
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    send(msg);
  }, 1000 + (Math.random() * 20) * 100);
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

function fakeMessage(resp) {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/mapslt.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="images/mapslt.png" /></figure>' + resp + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
  }, 1000 + (Math.random() * 20) * 100);

}

function send(msg) {

  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({ query: msg, lang: "en", sessionId: "somerandomthing" }),
    success: function(data) {
      
      //alert(data);

      //setResponse("equal");
      setResponse(data.result.fulfillment.speech);
      //respText: data.result.fulfillment.speech;
      //setResponse(JSON.stringify(data, undefined, 2));
    },
    error: function() {
      
      setResponse("Internal Server Error");
      //respText = "Internal Server Error";
    }
  });

}

function setResponse(response) {
  fakeMessage(response);
}
