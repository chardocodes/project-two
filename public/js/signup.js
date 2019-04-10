$("#user-sign-up").on("submit", function (e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/signup",
    data: {
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim(),
        firstName: $("#name")
        .val()
        .trim(),
        lastName: $("#lastName")
        .val()
        .trim(),
        address: $("#address")
        .val()
        .trim(),
        city: $("#city")
        .val()
        .trim(),
        state: $("#state")
        .val()
        .trim(),
        zip: $("#zip")
        .val()
        .trim(),
    }
  })
    .then(function (data) {
      console.log(data);
      window.location.replace(data);
    })
    .catch(function (err) {
      console.log(err);
      alert(err.responseText);
    });
});
