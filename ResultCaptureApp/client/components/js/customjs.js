$(document).ready(function () {
    
    //overview skill and progress tabs
    $("span.overviewMenuItem").click(function () {
        $(".overviewTab").show();
        $(".skillsTab").hide();
        $(".ProgressTab").hide();
    });
    
    $("span.skillMenuItem").click(function () {
        $(".overviewTab").hide();
        $(".skillsTab").show();
        $(".ProgressTab").hide();
    });
    
    $("span.progessMenuIem").click(function () {
        $(".overviewTab").hide();
        $(".skillsTab").hide();
        $(".ProgressTab").show();
    });
    
});