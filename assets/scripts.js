/* TODO:
 -  popup confirm changes
 -  datepicker for date fields
 -  dropzone for img
 -  loading icon on list until requested json is filled
*/

var globalLeftID = "";
var globalRightID = "";
var globalDATA;

var resultRight;
var JSONpath;

var ArrayForMagic = [];

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
                        //console.log(prop + ': ' + theObject[prop]);
                        if (prop === targetProp) {
                            //console.log('found alias');
                            if (theObject[prop] === targetValue) {
                                //console.log('found prop', prop, ': ', theObject[prop]);
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

    function findObjectsFromListLeft(obj) {

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
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>Attribut: ↳<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>Value: ↳<img src='"+image.src+"' height='64px' width='64px'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + theObject[prop]).val(theObject[prop]);
                                    
                                    break;
                                case "title":
                                    alert(theObject[prop]);
                                    var URLTitel = theObject[prop];
                                    URLTitel = URLTitel.replace(/\s/g,"");
                                    URLTitel = URLTitel.replace("?","_");
                                    alert(URLTitel);
                                    
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + URLTitel +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + URLTitel).val(theObject[prop]);
                                    
                                    break;
                                case "url":
                                    var URLcutString = theObject[prop];
                                    URLcutString = URLcutString.replace("https://www.youtube.com/watch?v=","");
                                    
                                    $("#listEdit ul").append($("<li id='' style='background-color: white; margin: 10px 0px'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + URLcutString +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'><iframe id='Value_' style='margin-left: -20.5%;' width='500' height='290' src='https://www.youtube.com/embed/" + URLcutString + "?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + URLcutString).val(theObject[prop]);
                                    
                                    
                                    /*$("#listEdit ul").append($("<iframe width='560' height='315' src='https://www.youtube.com/embed/YRdSAyIrQIw?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"));*/
                                    break;
                                default:
                                    $("#listEdit ul").append($("<li id='" + globalLeftID + prop + theObject[prop] + "' style='background-color: white; margin: 10px 0px'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" +theObject[prop] +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listEditRemoveButton' id='ButtonID_" + prop + globalLeftID + theObject[prop] + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    ArrayForMagic[ArrayForMagic.length - 1] = "ButtonID_" + prop + globalLeftID + theObject[prop];
                                    ArrayForMagic[ArrayForMagic.length] = "ListItemID_" + globalLeftID + prop + theObject[prop];
                                    
                                    console.log(ArrayForMagic[0]);
                                    console.log(ArrayForMagic[1]);
                                    console.log(ArrayForMagic);
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + theObject[prop]).val(theObject[prop]);
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
        $(".scrollViewLeft ul li#" + globalRightID).css("background-color", "#969696");
        console.log(globalRightID);
    });
    
    // REQUEST FUNCTION
    $(document).on('click', '#requestJSONButton', function () {
        
        JSONpath = ""//"https://cors-anywhere.herokuapp.com/"
        JSONpath += $("#requestJSONText").val();
        
        $.getJSON(JSONpath, function(data) {
            globalDATA = data;
            console.log(data);
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
        globalLeftID = this.id;
        
        //findObjects(obj [JSON data], targetProp [the property to look for], targetValue [], finalResults [])
        findObjects(globalDATA, "alias", globalLeftID, finalResults);
        findObjectsFromListLeft(finalResults);

        //reset value
        finalResultsForList = finalResults;
        finalResults = [];
    });

    $(document).on('click', '.listItemRight', function () {
        /*$(".scrollViewRight ul li").css("background-color", "#969696");
        $(".scrollViewRight ul li#" + this.id).css("background-color", "#ff8000");*/
        //$('#listEdit').empty();
        globalRightID = this.id;
        console.log('right ID: ' + this.id);
        findObjects(finalResultsForList, globalRightID, globalRightID, finalResultsForList);
        console.log("============ finalResultsForList: " +finalResultsForList);
        findObjects2(finalResultsForList, globalRightID);
    });
    
    
    ///// DO THIS !!!!!!
    $(document).on('click', ".listEditRemoveButton", function () {
        alert("remove: " + this.id);
        //alert("remove: " + ArrayForMagic.find(this.id));
        //ArrayForMagic.find(this.id);
        //$("#" + this.id).closest('.li').remove();
        //$("#" + this.id).remove();
    });
    
    /*$(document).on('click', ArrayForMagic[globalVar1][globalVar2], function () {
        $(ArrayForMagic[globalVar1][2]).remove();
    });*/
    
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
            