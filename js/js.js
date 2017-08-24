$(function(){

  // Variabels
  var $body = $("body");
  var $buttons = $(".button");
  var $buttonsContainer = $(".item");
  var $list = $(".list");
  var userNames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "ThijsHS",
  "habathcx", "RobotCaleb", "noobs2ninjas", "Savjz", "BlackFlrelce", "EULCS1", "brunofin",
  "OverwatchContenders", "QuakeChampions", "wudijo", "bmkibler"];
  var urlStreams =  'https://wind-bow.gomix.me/twitch-api/streams/';
  var urlChannel = "https://wind-bow.gomix.me/twitch-api/channels/";
  var noLogo = "http://en.qrcode-pro.com/generator/no_logo.png?1=1";

  // API request using JSON for Twitch Tv
  function twichData(){
    for (let i = 0; i < userNames.length; i++) {
      $.getJSON(urlStreams + userNames[i] + "?callback=?", function(data){
        console.log(data);
        // Offlline
        if(data.stream === null){
          $.getJSON(urlChannel + userNames[i] + "?callback=?", function(data2){
            console.log(data2);
            if(data2.error){
              $list.append('<div class="dataList"><div class="block"><img src="' +
               noLogo + '"></div><div class="block alignName"><h3 class="name">' +
               data2.message + '</h3></div><div class="block alignStatus"><p class="status">N/A</p></div></div>');
            } else {
              $list.append('<div class="dataList dataOffline"><div class="block"><a href="' +
              data2.url + '"target="_blank"><img src="' +
              data2.logo + '"></a></div><div class="block alignName"><h3 class="name">' + data2.name +
              '</h3><p class="dataStatus">' + data2.status +
              '</p></div><div class="block alignStatus"><p class="status">Offline</p></div></div>');
            }
          })
        // Online
        } else {
          $list.append('<div class="dataList dataOnline"><div class="block"><a href="' +
          data.stream.channel.url + '"target="_blank"><img src="' +
          data.stream.channel.logo + '"></a></div><div class="block alignName"><h3 class="name">' +
          data.stream.channel.name + ' ' + data.stream.game +
          '</h3><p class="dataStatus">' + data.stream.channel.status +
          '</p></div><div class="block alignStatus"><p class="status">Online</p></div></div>');
        }
      });
    }
  };

  // Function to toogle between API result by adding and removing class Active
  function toogle(){
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
  };

  // Function to change background of the bosdy
  function changeWallpaper(){
    var images = [
      "https://wallpaperscraft.com/image/hearthstone_hearthstone_heroes_of_warcraft_catapult_goblin_dwarf_100266_1920x1080.jpg",
      "https://images2.alphacoders.com/437/thumb-1920-437205.jpg",
      "https://images6.alphacoders.com/717/thumb-1920-717752.jpg",
      "https://images3.alphacoders.com/108/thumb-1920-108819.jpg",
      "http://s1.picswalls.com/wallpapers/2014/06/22/starcraft-wide-wallpaper_10591681_46.jpg"
    ];
    var i = Math.floor(Math.random() * 5);
    $body.css('background-image', 'url(' + images[i] +')');
    $body.fadeIn(1000);
  };
  function changeBackGround(){
    $body.fadeOut(1000, changeWallpaper);
  };

  setTimeout(twichData, 1500);
  toogle();
  setInterval(changeBackGround, 10000);

});
