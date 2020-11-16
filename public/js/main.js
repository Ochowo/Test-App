  
$(document).ready(function(){
  $('#btnn').on('click', function(e){
    console.log('click');
    var email = $("#email").val();
    var pass = $("#password").val();
    var name = $("#name").val();
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
              location.href = "/dashboard"
            }
          });
        }
      },
      error: function(err){
        location.href = "/error"
      }
    });
  });
});