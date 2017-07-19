$(function(){

  var $all = $(".all");
  var $online = $(".online");
  var $offline = $(".offline");
  var $list = $(".list");
  var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  var urlStreams =  'https://wind-bow.gomix.me/twitch-api/streams/';
  var urlChannel = "https://wind-bow.gomix.me/twitch-api/channels/";

  function userData(xxx){
    $list.html("");
    for (var i = 0; i < xxx.length; i++) {
      $.getJSON( urlChannel + xxx[i] + "?callback=?", function(user){
        var usersData = [user];
        for (var i = 0; i < usersData.length; i++) {
          $list.append("<ul><li>" + "<a href=\"" + usersData[i].url
          + "\" target='_blank'><img src=\"" + usersData[i].logo + "\"></a>"
          +"<h3>" + usersData[i].name + "</h3><p>" + usersData[i].status + "</p></li></ul>");
        }
      });
    }
  };

  $all.click(function(){
    userData(userNames);
  });

  $online.click(function(){
    for (var i = 0; i < userNames.length; i++) {
      $.getJSON( urlStreams + userNames[i] + "?callback=?", function(data){
        if(data.stream != null){
          var onlineArray = [];
          onlineArray.push(data.stream.channel.name);
        }
        userData(onlineArray);
      });
    }
  });

});
