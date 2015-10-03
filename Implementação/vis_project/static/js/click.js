    function updateCookie(){
       var elementValues = {};
       $(':checkbox').each(function(){
         elementValues[this.id] = this.checked;
       });
       $(':radio').each(function(){
         elementValues[this.id] = this.checked;
       });

       $.cookie('elementValues', elementValues, { expires: 7, path: '/' })

     }
    function repopulateFormELements(){
       var elementValues = $.cookie('elementValues');
       if(elementValues){
         Object.keys(elementValues).forEach(function(element) {
           var checked = elementValues[element];
           $("#" + element).prop('checked', checked);
         });

       }


     }

     $(':checkbox').on("change", function(){
       updateCookie();


     });
     $(':radio').on("change", function(){
       updateCookie();


     });
     $('#label1').on("click", function(){
       updateCookie();
        drawTreemapp();


     });
     $('#label2').on("click", function(){
       updateCookie();

     });


     var csrftoken = $.cookie('csrftoken');

     function csrfSafeMethod(method) {
         // these HTTP methods do not require CSRF protection
         return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
     }

     $.ajaxSetup({
        beforeSend: function(xhr, settings) {
          if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
              xhr.setRequestHeader("X-CSRFToken", csrftoken);
              }
        }
      });

    $('input[name=month]').click(function(){
       var idSelector = function() { return this.id; };
       var monthsSelected = $("input[name=month]:checked").map(idSelector).get();

       var monthsJson = JSON.stringify(monthsSelected)
       var yearsSelected = $("input[name=year]:checked").map(idSelector).get();

       var yearsJson = JSON.stringify(yearsSelected)

       var sourcesSelected = $("input[name=source]:checked").map(idSelector).get();

       var sourcesJson = JSON.stringify(sourcesSelected)

       $.ajax({
           url : "inicio", // the endpoint
           type : "POST", // http method
           data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
           dataType: 'json',

           // handle a successful response
           success : function(json) { // remove the value from the input
               console.log(json); // log the returned json to the console
               console.log("success"); // another sanity check
           },

           // handle a non-successful response
           error : function(xhr,errmsg,err) {
               $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                   " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
               console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
           }
       });
       $.ajax({
           url : "iniciop", // the endpoint
           type : "POST", // http method
           data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
           dataType: 'json',

           // handle a successful response
           success : function(json) { // remove the value from the input
               console.log(json); // log the returned json to the console
               console.log("success"); // another sanity check
           },

           // handle a non-successful response
           error : function(xhr,errmsg,err) {
               $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                   " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
               console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
           }
       });

      });

      $('input[name=year]').click(function(){
        var idSelector = function() { return this.id; };
        var monthsSelected = $("input[name=month]:checked").map(idSelector).get();

        var monthsJson = JSON.stringify(monthsSelected)
        var yearsSelected = $("input[name=year]:checked").map(idSelector).get();

        var yearsJson = JSON.stringify(yearsSelected)

        var sourcesSelected = $("input[name=source]:checked").map(idSelector).get();

        var sourcesJson = JSON.stringify(sourcesSelected)

        $.ajax({
            url : "inicio", // the endpoint
            type : "POST", // http method
            data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
            dataType: 'json',

            // handle a successful response
            success : function(json) { // remove the value from the input
                console.log(json); // log the returned json to the console
                console.log("success"); // another sanity check
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
        $.ajax({
            url : "iniciop", // the endpoint
            type : "POST", // http method
            data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
            dataType: 'json',

            // handle a successful response
            success : function(json) { // remove the value from the input
                console.log(json); // log the returned json to the console
                console.log("success"); // another sanity check
            },

            // handle a non-successful response
            error : function(xhr,errmsg,err) {
                $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                    " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
            }
        });
          });

    $('input[name=source]').click(function(){
      var idSelector = function() { return this.id; };
      var monthsSelected = $("input[name=month]:checked").map(idSelector).get();

      var monthsJson = JSON.stringify(monthsSelected)
      var yearsSelected = $("input[name=year]:checked").map(idSelector).get();

      var yearsJson = JSON.stringify(yearsSelected)

      var sourcesSelected = $("input[name=source]:checked").map(idSelector).get();

      var sourcesJson = JSON.stringify(sourcesSelected)

      $.ajax({
          url : "inicio", // the endpoint
          type : "POST", // http method
          data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
          dataType: 'json',

          // handle a successful response
          success : function(json) { // remove the value from the input
              console.log(json); // log the returned json to the console
              console.log("success"); // another sanity check
          },

          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });
      $.ajax({
          url : "iniciop", // the endpoint
          type : "POST", // http method
          data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
          dataType: 'json',

          // handle a successful response
          success : function(json) { // remove the value from the input
              console.log(json); // log the returned json to the console
              console.log("success"); // another sanity check
          },

          // handle a non-successful response
          error : function(xhr,errmsg,err) {
              $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                  " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
              console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
          }
      });

       });



        $(window).load(function() {


          var idSelector = function() { return this.id; };
          var monthsSelected = $("input[name=month]:checked").map(idSelector).get();

          var monthsJson = JSON.stringify(monthsSelected)
          var yearsSelected = $("input[name=year]:checked").map(idSelector).get();

          var yearsJson = JSON.stringify(yearsSelected)

          var sourcesSelected = $("input[name=source]:checked").map(idSelector).get();

          var sourcesJson = JSON.stringify(sourcesSelected)

          $.ajax({
              url : "inicio", // the endpoint
              type : "POST", // http method
              data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
              dataType: 'json',

              // handle a successful response
              success : function(json) { // remove the value from the input
                  console.log(json); // log the returned json to the console
                  console.log("success"); // another sanity check
              },

              // handle a non-successful response
              error : function(xhr,errmsg,err) {
                  $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                      " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                  console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
              }
          });
          $.ajax({
              url : "iniciop", // the endpoint
              type : "POST", // http method
              data : {'data':{'months': monthsJson, 'years':yearsJson, 'sources':sourcesJson}},
              dataType: 'json',

              // handle a successful response
              success : function(json) { // remove the value from the input
                  console.log(json); // log the returned json to the console
                  console.log("success"); // another sanity check
              },

              // handle a non-successful response
              error : function(xhr,errmsg,err) {
                  $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
                      " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
                  console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
              }
          });




        });


     $.cookie.json = true;
     repopulateFormELements();
