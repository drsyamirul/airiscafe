// (A) INITIALIZE SHOPPING LIST
items : [], // current shopping list
hform : null, // html add item <form>
hitem : null, // html add item <input> field
hadd : null, // html add item submit button
hlist : null, // html <div> shopping list
init : () => {
  // (A1) GET HTML ELEMENTS
  slist.hform = document.getElementById("shop-form");
  slist.hitem = document.getElementById("shop-item");
  slist.hadd = document.getElementById("shop-add");
  slist.hlist = document.getElementById("shop-list");
 
  // (A2) "ACTIVATE" HTML ADD ITEM FORM
  slist.hitem.setAttribute("autocomplete", "off");
  slist.hform.onsubmit = slist.add;
  slist.hitem.disabled = false;
  slist.hadd.disabled = false;
 
  // (A3) RESTORE PREVIOUS SHOPPING LIST
  if (localStorage.items == undefined) { localStorage.items = "[]"; }
  slist.items = JSON.parse(localStorage.items);
 
  // (A4) DRAW HTML SHOPPING LIST
  slist.draw();
}
window.addEventListener("load", slist.init);

// (B) SAVE SHOPPING LIST INTO LOCAL STORAGE
save : () => {
  if (localStorage.items == undefined) { localStorage.items = "[]"; }
  localStorage.items = JSON.stringify(slist.items);
}
 
// (C) ADD NEW ITEM TO THE LIST
add : (evt) => {
  // (C1) PREVENT FORM SUBMIT
  evt.preventDefault();
 
  // (C2) ADD NEW ITEM TO LIST
  slist.items.push({
    name : slist.hitem.value, // item name
    done : false // true for "got it", false for "not yet"
  });
  slist.hitem.value = "";
  slist.save();
 
  // (C3) REDRAW HTML SHOPPING LIST
  slist.draw();
}

// (D) DELETE SELECTED ITEM
delete : (id) => { if (confirm("Remove this item?")) {
  slist.items.splice(id, 1);
  slist.save();
  slist.draw();
}}
