 // needs to be inside ready function >>> loads page
 $(function(){

 $('textarea').on('keyup', function(event){
  // function updateCounter()
        var Characters = 140 - $(this).val().length;
        $('.counter').text(Characters);

        if(Characters < 0){
          $('.counter').css('color', 'red');
        }

 });

});