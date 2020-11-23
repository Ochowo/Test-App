  
$(document).ready(function(){
  console.log('peep')

     $(document).ajaxStart(function(){
      $("#spinner").css("display", "block");
    }); 
    $(document).ajaxComplete(function(){
      $("#spinner").css("display", "none");
    });
  // var errMsg = localStorage.getItem("conflict-register");
  // $('#err-msg').text(errMsg);
  // var pp = $('#err-msg')
  // pp.html = errMsg != null ? errMsg : 'An error has occured';
  $('#btnn').on('click', function(e){
    //$("#spinner").css("display", "block");
    console.log('click');
    var email = $("#email").val();
    var pass = $("#password").val();
    var name = $("#name").val();
    // if(email === '' && pass === ''){
    //   $('#em-err').text('Email cannot be empty');
    //   return $('#em-err').text('Email cannot be empty');
    // }
    if(email === ''){
     $('#em-err').text('Email cannot be empty');
    }
    if(pass === ''){
      return $('#pas-err').text('Password cannot be empty');
    }
  
    console.log(email,pass)
    $target = $(e.target);
    e.preventDefault();
    $.ajax({
      type:'POST',
      url: '/register',
      contentType: "application/json;charset=utf-8",
      data:JSON.stringify({ name:name, email:email, password:pass }),
      async: true,
      dataType: 'json',
      success: function(response){
        console.log(response, 'dd');
        if (response.status === 'success'){
          
    return location.href = "/dashboard"
      // //     console.log('success')
      // //     // var dateObj = new Date();
      // //     // var formatedDate = dateObj.toISOString().replace('-', '').replace('-', '').replace(':', '').replace(':', '').replace('Z', '').replace('T', '');
      // //     // var newd = formatedDate.split('.')[0];
      // //     // var appKey = 'c7d39451-85b1-4e68-a697-6bfec4ee7280';
      // //     // var pas = 'password123';
      // //     // var encrypted = CryptoJS.SHA256(appKey+'_'+newd+'_'+pas)
        
      // // //     $.ajax({
      // // //       type:'POST',
      // // //       url: 'http://localhost:5000/api/centralauth/CASUsers/enrollUser',
      // // //       headers:{'client': 'c7d39451-85b1-4e68-a697-6bfec4ee7280', 'timestamp': newd, 'apikey': encrypted },
      // // //       data:JSON.stringify({user_id:email, grp_id:5}),
      // // //       async: true,
      // // //       dataType: 'json',
            
      // // // contentType: "application/json;charset=utf-8",
      // // //       success: function(response){
      // // //        console.log(response.message)
      // // //        if(response.message === 'success'){
      // // //          console.log('successful')
      // // //          location.href = "/dashboard"
      // // //        }
      // // //       },
      // //     //   error: function(err){
      // //     //     console.log(err);
      // //     //     //location.href = "/dashboard"
      // //     //   }
      // //     // });
        
        }
      },
      error: function(err){
       // localStorage.setItem("conflict-register", err.responseJSON.message);
        console.log(err, 'ppp')
      }
    });
  
  });
});