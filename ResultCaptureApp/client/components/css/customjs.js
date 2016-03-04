$(document).ready(function () {
    
    //dob date picker

    $('.dob').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
    
    
    //Select Common

    //$('select').material_select();
   
    
    //upload image
    document.getElementById("uploadBtn").onchange = function () {
    document.getElementById("uploadFile").placeholder = "Your Picture Added";
    document.getElementById("myImg").classList.add("profilePic");
        
        
    };
    
    
    $(function () {
        $(":file").change(function () {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = imageIsLoaded;
                reader.readAsDataURL(this.files[0]);
            }
        });
    });

    function imageIsLoaded(e) {
        $('#myImg').attr('src', e.target.result);
        var picWidth = $(".profilePic").height();
        var picHeight = $(".profilePic").width();
   

        
        if(picWidth >= picHeight){
            $('.profilePic').css("width", "100%");
            $('.profilePic').css("height", "auto");
        }
        
        else{
            $('.profilePic').css("width", "auto");
            $('.profilePic').css("height", "100%");
        }
    };

});