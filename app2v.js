
// ************************************************
// Shopping Cart API
// ************************************************


var shoppingCart = (function() {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

    // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function(name, price, count) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart[item].count ++;
        saveCart();
        return;
      }
    }
    item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  };
  // Set count from item
  obj.setCountForItem = function(name, count) {
    for(var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count --;
          if(cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
    }
    saveCart();
  };

  // Remove all items from cart
  obj.removeItemFromCartAll = function(name) {
    for(var item in cart) {
      if(cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  };

  // Clear cart
  obj.clearCart = function() {
    cart = [];
    saveCart();
  };

  // Count cart
  obj.totalCount = function() {
    var totalCount = 0;
    for(var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function() {
    var totalCart = 0;
    for(var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };

  // List cart
  obj.listCart = function() {
    var cartCopy = [];
    for(i in cart) {
      item = cart[i];
      itemCopy = {};
      for(p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// *****************************************
// Add item
$('.add-to-cart').click(function(event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function() {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
     var output = "";
  for(var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>"
      + "<td>(" + cartArray[i].price + ")</td>"
      + "<td><button class='delete-item btn btn-dark' data-name=" + cartArray[i].name + ">X</button></td>"
      + "<tr><td><div class='input-group'><button class='minus-item input-group-addon btn btn-dark' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-dark input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + " = "
      + "<td>" + cartArray[i].total + "</td>"
      +  "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());

var artikli ="";
 for(var i in cartArray) {
    artikli += "Proizvod: "+cartArray[i].name+"\n"+"Cena: "+ cartArray[i].price+" din."+" komada:x"+cartArray[i].count+"\n";
}

var saldo = shoppingCart.totalCart()+" din. \n";

var porudzbina = "Porudžbina: "+"\n\n"+artikli+"\n"+saldo;
console.log(porudzbina);
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function(event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function(event) {
   var name = $(this).data('name');
   var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();



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

// mailer code
// var service_id = 'gmail';
// var template_id = 'template_eXYdWW2P';
// var template_params = {
// 	name: 'John',
// 	reply_email: 'dejanmail@yahoo.com',
// 	message: 'This is awesome!'+userlikeditems+""
// };
//
// emailjs.send(service_id,template_id,template_params);

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
