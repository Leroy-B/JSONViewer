//TODO popup confirm changes


var leftGlobalID = "";
var rightGlobalID = "";
var globalDATA;
var resultRight;
var JSONpath;

var searchInputText;

$(document).ready(function() {
    
    

    function isArray(what) {
        return Object.prototype.toString.call(what) === '[object Array]';
    }
    function isObject(what) {
        return Object.prototype.toString.call(what) === '[object Object]';
    }  
    function hasAddress(index) {
        if(data[index].hasOwnProperty('address')){
            return true;
        }
    }
    function hasConnectivity(index) {
        if(data[index].hasOwnProperty('connectivity')){
            return true;
        }
    }
    function hasVideos(index) {
        if(data[index].hasOwnProperty('videos')){
            return true;
        }
    }
    function hasLogo(index) {
        if(data[index].hasOwnProperty('logo')){
            return true;
        }
    }
    function hasAwards(index) {
        if(data[index].hasOwnProperty('awards')){
            return true;
        }
    }

    function findObjects(obj, targetProp, targetValue, finalResults) {

        function getObject(theObject) {
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (var prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        console.log(prop + ': ' + theObject[prop]);
                        if (prop === targetProp) {
                            console.log('found alias');
                            if (theObject[prop] === targetValue) {
                                console.log('found prop', prop, ': ', theObject[prop]);
                                finalResults.push(theObject);
                            }
                        }
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            getObject(theObject[prop]);
                        }
                    }
                }
            }
        }
        getObject(obj);
    }

    function findObjects1(obj) {

        function getObject(theObject) {
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (var prop in theObject) {
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        $("#listRight").append($("<li class='sidesMenu1 listItemRight1' style='background-color: black; color: white;cursor: not-allowed;' id='" + prop + "'>").text(prop));
                        getObject1(theObject[prop]);
                    } else if (theObject.hasOwnProperty(prop)) {
                        $("#listRight").append($("<li class='listItemRight' id='" + prop + "'>").text(prop));
                    }
                }
            }
        }
        getObject(obj);
        
        function getObject1(theObject) {
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    getObject1(theObject[i]);
                }
            } else {
                for (var prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        $("#listRight").append($("<li class='listItemRight' id='" + prop + "' style='padding-left:40px;'>").text("↳ " + prop));
                    }
                }
            }
        }
        getObject(obj);
        
    }

    function findObjects2(obj, targetProp) {

        function getObject(theObject) {
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (var prop in theObject) {
                    console.log(prop + ': ' + theObject[prop]);
                    if (theObject.hasOwnProperty(prop)) {
                        if (prop === targetProp) {
                            switch(prop){
                                case "Data":
                                    var image = new Image();
                                    image.src = "data:image/jpeg;base64," + theObject[prop];
                                    $("#listEdit ul").append($("<h3 id='"+ prop +"+"+ leftGlobalID +"' class='titelForTextbox' style='padding: 10px;margin-right: 10px; text-align: left'></h3>").text(leftGlobalID + " ").append($("<h3 class='titelForTextbox' style='padding-left: 25px;text-align: left'></h3>").text("↳ " + prop + ": ").append("<img src='"+image.src+"' height='64px' width='64px'>")));
                                    break;
                                case "url":
                                    $("#listEdit ul").append($("<iframe width='560' height='315' src='https://www.youtube.com/embed/YRdSAyIrQIw?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"));
                                    break;
                                default:
                                    
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input id='Dataset_" + leftGlobalID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>Attribut: ↳<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 66.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>Value: ↳<input id='Attribut_" +theObject[prop] +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    
                                    $("#Dataset_" + leftGlobalID + prop).val(leftGlobalID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Attribut_" + theObject[prop]).val(theObject[prop]);
                                    /*$("#listEdit ul").append($("<h3 id='"+ prop +"+"+ leftGlobalID +"' class='titelForTextbox' style='padding: 10px;margin-right: 10px; text-align: left'></h3>").text(leftGlobalID + " ").append($("<h3 class='titelForTextbox' style='padding-left: 25px;text-align: left'></h3>").text("↳ " + prop + ": ").append($("<input id='" + prop + "' class='listItemBottom' style='height: 35px;width: 64%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'>").val(theObject[prop]))));
                                    $("#listEdit ul").append($("<input id='"+ prop +"+"+ leftGlobalID +"' type='button' class='idek' style='float: right;margin-top: -120px;    margin-right: 10px;'>").val("X"));*/
                                    break;
                            }
                        }
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            getObject(theObject[prop]);
                        }
                    }
                }
            }
        }
        getObject(obj);
        
    }


    var finalResults = [];
    var finalResultsForList = [];

    $(document).on('click', '.idek', function () {
        console.log(this.id);
        //$(this).parents(this.id).eq(1).remove();
        //$(this.id).remove();
        document.getElementById(this.id).outerHTML = "";
        $(".scrollViewLeft ul li#" + rightGlobalID).css("background-color", "#969696");
        console.log(rightGlobalID);
    });
    
    // REQUEST FUNCTION
    $(document).on('click', '#requestJSONButton', function () {
        
        JSONpath = "https://cors-anywhere.herokuapp.com/"
        JSONpath += $("#requestJSONText").val();
        
        $.getJSON(JSONpath, function(data) {
                globalDATA = data;
                $('#listLeft').empty();
                $('#listRight').empty();
                for (i in globalDATA) {
                    $("#listLeft").append($("<li class='listItemLeft leftList' id='" + globalDATA[i].alias + "'>").text(i + ": " + globalDATA[i].alias));
                }
            })
                .done(function() { console.log('request succeeded!'); })
                .fail(function(jqXHR, textStatus, errorThrown) { console.log('request failed! ' + textStatus); alert("ERROR: The link you provieded does NOT point to a valid JSON file!") })
                .always(function() { console.log('request ended!');});
        
    });
    
    // SEARCH FUNCTION
    $(document).on('click', '#searchInputButton', function () {
        
        searchInputText = $("#searchInputText").val();
        var searchInputTextArray = searchInputText.split(";");
        
        for(var i = 0; i<searchInputTextArray.length; i++){
            var temp = searchInputTextArray[i] + "&";
            JSONpath += temp;
        }
        
        $.getJSON(JSONpath, function(data) {
                globalDATA = data;
                $('#listLeft').empty();
                $('#listRight').empty();
                for (i in globalDATA) {
                    $("#listLeft").append($("<li class='listItemLeft leftList' id='" + globalDATA[i].alias + "'>").text(i + ": " + globalDATA[i].alias));
                }
            })
                .done(function() { console.log('search succeeded!'); })
                .fail(function(jqXHR, textStatus, errorThrown) { console.log('search failed! ' + textStatus); alert("ERROR: search!") })
                .always(function() { console.log('search ended!');});
        
    });
    
    $(document).on('click', '.listItemLeft', function () {
        $(".scrollViewLeft ul li").css("background-color", "#969696");
        $(".scrollViewLeft ul li#" + this.id).css("background-color", "#ff8000");
        $('#listRight').empty();
        leftGlobalID = this.id;
        findObjects(globalDATA, "alias", leftGlobalID, finalResults);
        findObjects1(finalResults);

        //reset value
        finalResultsForList = finalResults;
        finalResults = [];
    });

    $(document).on('click', '.listItemRight', function () {
        /*$(".scrollViewRight ul li").css("background-color", "#969696");
        $(".scrollViewRight ul li#" + this.id).css("background-color", "#ff8000");*/
        //$('#listEdit').empty();
        rightGlobalID = this.id;
        console.log('right ID: ' + this.id);
        findObjects(finalResultsForList, rightGlobalID, rightGlobalID, finalResultsForList);
        console.log("============ finalResultsForList: " +finalResultsForList);
        findObjects2(finalResultsForList, rightGlobalID);
    });

    // Listeners for input change on the edit fields
    $(document).on('input', '.listItemBottomDataset', function () {
        $(".listItemBottomDataset").css("border", "3px solid #ff8000");
    });
    $(document).on('input', '.listItemBottomAttribut', function () {
        $(".listItemBottomAttribut").css("border", "3px solid #ff8000");
    });
    $(document).on('input', '.listItemBottomValue', function () {
        $(".listItemBottomValue").css("border", "3px solid #ff8000");
    });

});
            