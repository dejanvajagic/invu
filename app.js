
// localStorage Cache Code
function likedItemsIndexing (callback) {
  setTimeout(function() {
    $('.like_button').each(function(ids) {
      $(this).attr('id', 'id-' + [ids].toString());
    });
    callback();
  }, 500);
}

function likedItems() {
  console.log("update v2.stb");
  userlikeditems = localStorage.getItem("user-liked".toString()); console.log("loading userlikeditems");
  numHearts = 0;
  var parseNumHearts = parseInt(localStorage.getItem("numHeartsSaved".toString()), 10); console.log("parsing userlikeditems");
  parseNumHearts = parseNumHearts || 0;
  numHearts = parseNumHearts;
console.log("TEST LOAD | numHearts:"+numHearts+" parse:"+parseNumHearts+" LOAD userlikeditems:"+userlikeditems); //////////////////////////

  var all = document.querySelectorAll('.like_button');
  for (var i = 0; i <= all.length; i++) {
    var loadPage = localStorage.getItem(""+[i].toString());
    $("#srce--ikonica").text(numHearts);
    if(numHearts !== 0){
    $("#srce--ikonica").css("color", "white");
    }

  if (loadPage == null) {
    $("#id-"+[i].toString()+"").html('<i class="far fa-heart like"></i>');
    } else {
    $("#id-"+[i].toString()+"").html(loadPage);
}}
}

  $(".like_button").click(function(){
  if($(this).html() == '<i class="fas fa-heart like"></i>'){
    var $unlike = '<i class="far fa-heart like"></i>';
    $(this).html($unlike);

    numHearts--;
    $("#srce--ikonica").text(numHearts);
    if(numHearts <= 0){
    $("#srce--ikonica").css("color", "black");
    }

    var copy2 =  $(this).html();
    var replacer2 = $(this).attr("id");
    replacer2 = replacer2.replace('id-','');
    localStorage.setItem(replacer2, copy2);
console.log("-TEST PRE MEMORISANJA | numHearts:"+numHearts); ///////////////////////////
    localStorage.setItem("numHeartsSaved", numHearts.toString());

  }else if($(this).html() == '<i class="far fa-heart like"></i>'){
  var $likes = '<i class="fas fa-heart like"></i>';
  $(this).html($likes);
  numHearts++;
  $("#srce--ikonica").text(numHearts);
  if(numHearts > 0){
  $("#srce--ikonica").css("color", "white");
  }

  userlikeditems = ""+userlikeditems+" "+$(this).siblings('.card-title').html()+", ";
  console.log("SAVE userlikeditems:"+userlikeditems); //////////////////////////
  localStorage.setItem("user-liked", userlikeditems);

  //localStorage.setItem("statistika", userlikeditems);

  var copy =  $(this).html();
  var replacer = $(this).attr("id");
  replacer = replacer.replace('id-','');
  localStorage.setItem(replacer, copy);
console.log("+TEST PRE MEMORISANJA | numHearts:"+numHearts); ///////////////////////////
  localStorage.setItem("numHeartsSaved", numHearts.toString());
}
});

//Find Hearts
var numHearts = 0;
console.log("TEST PRVI |numHearts:"+numHearts); ////////////////////////////////////
var userlikeditems; console.log("TEST PRVI | userlikeditems:"+userlikeditems); //////////////////////////
var n = -1;
function findHearts(e) {
    if (numHearts==0){alert("Još nemate favorita? | Dodajte (kliknite) srca kod artikala koji vam se svidjaju, pa kliknite ovde za pregled favorita, oni će vas čekati sledeći put kad posetite stranicu, označeni i spremni za kupovinu!");}
    else{
     // window.find("MUŠKE INVU NAOČARE");
     e.preventDefault();
     n++;
     $(window).scrollTop($(".fas:eq("+n+")").offset().top-450);
 }
}
if($("#srce--ikonica").html() == "0"){
$("#srce--ikonica").css("color", "black");
}

$('#button-arrow-up').hide();
$('#buy-button').hide();
$(window).scroll(function(){

       if ($(this).scrollTop() > 100 ) {
           $('#button-arrow-up').fadeIn();
       } else {
           $('#button-arrow-up').fadeOut();
       }

       if ($(this).scrollTop() > 150 ) {
           $('#buy-button').fadeIn();
       } else {
           $('#buy-button').fadeOut();
       }

      });



    $(window).scroll(function() {
       var hT = $('#carousel1-big').offset().top,
           hH = $('#carousel1-big').outerHeight(),
           wH = $(window).height(),
           wS = $(this).scrollTop();
       if (wS > (hT+hH-wH)){
         $("#carousel1-big").carousel(0);
       }});

       $(window).scroll(function() {
          var hT = $('#carousel1').offset().top,
              hH = $('#carousel1').outerHeight(),
              wH = $(window).height(),
              wS = $(this).scrollTop();
          if (wS > (hT+hH-wH)){
            $("#carousel1").carousel(0);
          }});

          $(window).scroll(function() {
             var hT = $('#carousel2-big').offset().top,
                 hH = $('#carousel2-big').outerHeight(),
                 wH = $(window).height(),
                 wS = $(this).scrollTop();
             if (wS > (hT+hH-wH)){
               $("#carousel2-big").carousel(1);
             }});

             $(window).scroll(function() {
                var hT = $('#carousel2').offset().top,
                    hH = $('#carousel2').outerHeight(),
                    wH = $(window).height(),
                    wS = $(this).scrollTop();
                if (wS > (hT+hH-wH)){
                  $("#carousel2").carousel(2);
                }});

                $('.nav-link').on('click', function(){

                       $('.navbar-collapse').collapse('hide');
                       $('html, body').animate({
                         scrollTop: $($.attr(this, 'href')).offset().top - 100
                       }, 10);
                   });

                  
                   $('.cart-ikonica').on('click', function(){

                          $('.navbar-collapse').collapse('hide');

                      });

                      $('.srce-ikonica').on('click', function(){

                             $('.navbar-collapse').collapse('hide');

                         });

  //
  //     $.ajax({
  //         url: "save.php?action=save",
  //         method: "POST",
  //         data: { elem: {
  //             poseta: userlikeditems
  //         }},
  //         success: function (data){
  //           alert("Saved!");
  //     }
  // });
  //
  //


      // $.getJSON("poseta.json", function(data) {
      //     alert(data);// Now use this data to update your view models,
      //     // and Knockout will update your UI automatically
      // });
