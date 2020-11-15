  
$(document).ready(function(){
  $('#btnn').on('click', function(e){
    console.log('click');
    var email = $("#email").val();
    var pass = $("#password").val();
    console.log(email,pass)
    $target = $(e.target);
    e.preventDefault();
    $.ajax({
      type:'POST',
      url: '/register',
      contentType: "application/json;charset=utf-8",
      data:JSON.stringify({ email:email, password:pass }),
      async: true,
      dataType: 'json',
      success: function(response){
        console.log(response, 'dd');
        if (response.status === 'success'){
          $.ajax({
            type:'POST',
            url: 'http://localhost:5000/api/centralauth/CASUsers/enrollUser?group',
            contentType: "application/json;charset=utf-8",
            headers:{"X-ClientSecret": 'c7d39451-85b1-4e68-a697-6bfec4ee7280' },
            contentType: "application/json;charset=utf-8",
            data:JSON.stringify({user_id:email, grp_id:5}),
            success: function(response){
             console.log(response)
            },
            error: function(err){
              console.log(err);
            }
          });
        }
      },
      error: function(err){
        console.log(err);
      }
    });
  });
});