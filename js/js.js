$(function(){

  // Variabels
  var $buttons = $(".button");
  var $buttonsContainer = $(".item");
  var $list = $(".list");
  var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var urlStreams =  'https://wind-bow.gomix.me/twitch-api/streams/';
  var urlChannel = "https://wind-bow.gomix.me/twitch-api/channels/";

  // API request using JSON for Twitch Tv
  (function (){
    for (let i = 0; i < userNames.length; i++) {
      $.getJSON(urlStreams + userNames[i] + "?callback=?", function(data){
        console.log(data);
        // Offlline
        if(data.stream === null){
          $.getJSON(urlChannel + userNames[i] + "?callback=?", function(data2){
            console.log(data2);
            if(data2.error){
              $list.append('<div class="dataList"><Error</div>');
            } else {
              $list.append('<div class="dataList dataOffline"><div class="block"><a href="' +
              data2.url + '"target="_blank"><img src="' +
              data2.logo + '"></a></div><div class="block align"><h3 class="name">' + data2.name +
              '</h3><p class="dataStatus">' + data2.status +
              '</p></div><div class="block align"><p class="status">Offline</p></div></div>');
            }
          })
        // Online
        } else {
          $list.append('<div class="dataList dataOnline"><div class="block"><a href="' +
          data.stream.channel.url + '"target="_blank"><img src="' +
          data.stream.channel.logo + '"></a></div><div class="block align"><h3 class="name">' +
          data.stream.channel.name + ' ' + data.stream.game +
          '</h3><p class="dataStatus">' + data.stream.channel.status +
          '</p></div><div class="block align"><p class="status">Online</p></div></div>');
        }
      });
    }
  }());

  // Function to toogle between API result by adding and removing class Active
  (function toogle(){
    $buttons.on('click', function(){
      var $results = $(".list .dataList");
      $buttonsContainer.removeClass("active");
      if($(this).hasClass("online")){
        $(this).parent().addClass("active");
        $results.hide();
        $results.each(function(){
          if($(this).hasClass("dataOnline")){
            $(this).show();
          }
        });
      } else if($(this).hasClass("offline")){
        $(this).parent().addClass("active");
        $results.hide();
        $results.each(function(){
          if($(this).hasClass("dataOffline")){
            $(this).show();
          }
        });
      } else if($(this).hasClass("all")){
        $(this).parent().addClass("active");
        $results.hide();
        $results.show();
      }
    });
  }());

});
