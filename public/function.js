async function login(pass, usr) {
  try {
    var detail = { passw: pass, userName: usr };
    let x = JSON.stringify(detail);
    var res = await fetch("/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; charset=utf-8"
      },
      body: x
    });
    if (res.status == 200) {
      userNameP = x.usr;
      let url = "?username=" + usr;
      window.history.replaceState(null, null, url);
      $.get("nav", {
        userName: usr
      })
        .done(function(data) {
          $("#navbar").html(data);
        })
        .fail(function() {
          alert("error");
        });
      $("#myModal").modal("toggle");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    } else if (res.status == 404) alert("user name or password is not correct");
  } catch (error) {
    alert("error");
  }
}

function contact() {
  $.get("contact", {})
    .done(function(data) {
      $("#content").html(data);
    })
    .fail(function() {
      alert("error");
    });
}

function about() {
  $.get("about", {})
    .done(function(data) {
      $("#content").html(data);
    })
    .fail(function() {
      alert("error");
    });
}
function branches() {
  $("#body").load("/branches");
}

function catalog() {
  $.get("catalog", {})
    .done(function(data) {
      $("#content").html(data);
    })
    .fail(function() {
      alert("error");
    });
}

function usertable() {
  $.get("userManage", {})
    .done(function(data) {
      $("#content").html(data);
    })
    .fail(function() {
      alert("error");
    });
}

function branchlist() {
  $.get("branches", {})
    .done(function(data) {
      $("#content").html(data);
    })
    .fail(function() {
      alert("error");
    });
}

function logout() {
  let url = "http://localhost:8001";
  location.replace(url);
}

function load() {
  if (window.location.href.includes("#")) {
    let page = window.location.href.substr(
      window.location.href.indexOf("#") + 1
    );
    //alert(page);
    if (page == "about") about();
    else if (page == "contact") contact();
    else if (page == "catalog") catalog();
    else if (page == "userManage") usertable();
    else if (page == "branches") branchlist();
    else about();
    if (window.location.href.includes("?")) loadNav();
  }
}

function loadNav() {
  var urlP = new URLSearchParams(window.location.search);
  usrP = urlP.get("username");
  $.get("nav", {
    userName: usrP
  })
    .done(function(data) {
      $("#navbar").html(data);
    })
    .fail(function() {
      alert("error");
    });
}

async function del(userN) {
  var urlP = new URLSearchParams(window.location.search);
  usrP = urlP.get("username");
  if (userN == usrP) {
    alert("can't delete your user name.");
  } else {
    try {
      var detail = { usr: userN };
      let x = JSON.stringify(detail);
      var res = await fetch("/del", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json; charset=utf-8"
        },
        body: x
      });
      if (res.status == 200) {
        alert("User successfully deleted");
      } else if (res.status == 404) alert("user name is'nt delete");
    } catch (error) {
      alert("error");
    }
  }
}

async function edit(psw, gender, numId, usrname, address, role, idB) {
  try {
    var detail = {
      userName: usrname,
      pass: psw,
      gender: gender,
      id: numId,
      address: address,
      category: role,
      idB: idB
    };
    let y = JSON.stringify(detail);
    var res = await fetch("/edit", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; charset=utf-8"
      },
      body: y
    });
    if (res.status == 200) {
      alert("User successfully updated");
      $("#modalEdit").modal("toggle");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    } else if (res.status == 404) {
      alert("User update failed");
      $("#modalEdit").modal("toggle");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    }
  } catch (error) {
    alert("error");
  }
}

async function addU(psw, gender, numId, usrname, address, role, idB) {
  try {
    var detail = {
      userName: usrname,
      pass: psw,
      gender: gender,
      id: numId,
      address: address,
      category: role,
      idB: idB
    };
    let y = JSON.stringify(detail);
    var res = await fetch("/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json; charset=utf-8"
      },
      body: y
    });
    if (res.status == 200) {
      alert("User successfully added");
      $("#modalAdd").modal("toggle");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    } else if (res.status == 404) {
      alert("user name already exists");
      $("#modalAdd").modal("toggle");
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
    }
  } catch (error) {
    alert("error");
  }
}
