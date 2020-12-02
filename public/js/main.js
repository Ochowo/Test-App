$(document).ready(function(){
  console.log('peep')

     $(document).ajaxStart(function(){
      $("#spinner").css("display", "block");
    }); 
    $(document).ajaxComplete(function(){
      $("#spinner").css("display", "none");
    });
  $('#btnn').on('click', function(e){
    console.log('click');
    var email = $("#email").val();
    var pass = $("#password").val();
    var name = $("#name").val();
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
        console.log(response, 'ddr');
        if (response.status === 'success'){
          
    return location.href = "/dashboard"
      
        }
      },
      error: function(err){
        console.log(err, '<><><>err')
       if(err.responseJSON.message == 'User already exist'){
        $('#em-err').text('User already exist');
       } else {
        return location.href = "/error"
       }
      }
    });
  
  });
});