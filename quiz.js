$(document).ready(function () {
  $.get("http://5d76bf96515d1a0014085cf9.mockapi.io/quiz", function (data) {
    var init = 1;
    var [response] = [data];
    console.log(response);

    for (x of response) {
      const question = $("<h3>")
        .addClass("question")
        .html(`Q${init}.  ${x.question}`);
      $("#question_form").append(question);
      r = 0;

      for (let y = 0; y < x.options.length; y++) {
        const optio = x.options[y];

        const label = $("<label>").addClass("label");

        const input = $("<input>")
          .prop({
            type: "radio",
            name: "q" + init,
            value: y + 1,
          })
          .addClass("radio_button");

        const break_line = $("<br>");
        $("#question_form").append(label, break_line);

        label.append(input);

        var answ = $("<a>").html(optio);
        label.append(answ);

        if (y == x.answer - 1) {
          var right = $("<i>")
            .addClass("fas fa-check correct hidden")
            .prop({
              id: init * 10 + y,
            });
          label.append(right);
        } else {
          var wrong = $("<i>")
            .addClass("fas fa-times wrong hidden")
            .prop({ id: init * 10 + y });
          label.append(wrong);
        }
      }

      init++;
      const line = $("<div>").addClass("dash");
      $("#question_form").append(line);
    }

    const sub = $("<div>")
      .addClass("submit")
      .append(
        $("<input>").prop({
          id: "but",
          type: "submit",
        })
      );

    $("#question_form").append(sub);

    sub.click(function (e) {
      e.preventDefault();

      let score = 0;
      var selected = [];
      var flag = 1;

      for (let q = 1; q <= response.length; q++) {
        var va = "q" + q;
        selected.push($("input[name=" + va + "]:checked").val() - 1);
        var answer = response[q - 1].answer;
        if (answer == selected[q - 1] + 1) {
          score = score + 1;
        } else if (answer != selected) {
          $("#" + flag + selected[q - 1]).css("opacity", 1);
        }
        flag++;
      }

      const marks = document.querySelector(".marks");

      marks.innerHTML = `${score} / ${response.length}`;

      console.log("ok");

      $(".correct").removeClass("hidden");
      // $(".wrong").removeClass("hidden");
    });
  });
});
