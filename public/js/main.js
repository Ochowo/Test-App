  
$(document).ready(function(){
  console.log('peep')
  
  // var errMsg = localStorage.getItem("conflict-register");
  // $('#err-msg').text(errMsg);
  // var pp = $('#err-msg')
  // pp.html = errMsg != null ? errMsg : 'An error has occured';
  $('#btnn').on('click', function(e){
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
          console.log('hhh');
          localStorage.setItem('token', response.token);
          $.ajax({
            type:'POST',
            url: 'http://localhost:5000/api/centralauth/CASUsers/enrollUser',
            headers:{"X-ClientSecret": 'c7d39451-85b1-4e68-a697-6bfec4ee7280' },
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({user_id:email, grp_id:5}),
            success: function(response){
             console.log(response.message)
             if(response.message === 'success'){
               console.log('successful')
               location.href = "/dashboard"
             }
            },
            error: function(err){
              console.log(err);
              //location.href = "/dashboard"
            }
          });
        
        }
      },
      error: function(err){
       // localStorage.setItem("conflict-register", err.responseJSON.message);
        console.log(err.responseJSON.message, 'ppp')
        $('#con-err').text(err.responseJSON.message);   
      }
    });
  
  });
});