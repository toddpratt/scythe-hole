
$(function() {
  let template = Handlebars.compile($("#messages-template").html());
  
  function fetchMessages() {
    $.get('/messages/asdf', messages => {
      var msgsDiv = $("#messages");
      msgsDiv.empty().html(template({
        messages: messages,
        changeMe: 1
      }));
      msgsDiv.css("top", 440 - msgsDiv.height());
    });
    setTimeout(fetchMessages, 5000);
  }
  fetchMessages();

  if(location.pathname == "/") {
    $("#no-chan").show();
  } else {
    $("no-chan").hide();
  }
  
  if(localStorage.nick) {
    $("#username").val(localStorage.nick);
  } else {
    $(".message-container").hide();
  }
  
  $("#username").change(d => {
    localStorage.nick = $("#username").val();
    if(localStorage.nick) {
      $(".message-container").show();
    }
  });
  
  $("#message").keypress(ev => {
    if(ev.which == 13) {
      var msg = $("#message").val();
      var nick = $("#username").val();

      if(msg.length > 0) {
        $.post('/message' + location.pathname, {nick: nick, message: msg});
      }
    }
  });
});
