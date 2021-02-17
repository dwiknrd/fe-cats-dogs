$(document).on("click", ".browse", function() {
    var file = $(this).parents().find(".file");
    file.trigger("click");
  });
  $('input[type="file"]').change(function(e) {
    var fileName = e.target.files[0].name;
    $("#file").val(fileName);

    $("#result").html(`Please wait...`);

  
    var reader = new FileReader();
    reader.onload = function(e) {
      // get loaded data and render thumbnail.
      document.getElementById("preview").src = e.target.result;
    };
    // read the image file as a data URL.
    reader.readAsDataURL(this.files[0]);

    var dataimage = new FormData();
    dataimage.append('file', $('input[type="file"]')[0].files[0]);
    console.log(dataimage)

    $.ajax({
        type: "POST",
        enctype: 'multipart/form-data',
        url: "https://project.dwiknrd.my.id",
        data: dataimage,// now data come in this function
        contentType: "application/json; charset=utf-8",
        crossDomain: true,
        processData: false,
        contentType: false,
        success: function (data, status, jqXHR) {
            console.log(data)
            $("#result").html(`This is image of ${data.class} with confidence level ${data.probability}%`);
        },

        error: function (jqXHR, status) {
            // error handler
            console.log(jqXHR);
            alert('fail' + status.code);
        }
     });
  });
  