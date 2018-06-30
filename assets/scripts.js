/* TODO:
 -  popup confirm changes
 -  datepicker for date fields
 -  dropzone for img
 -  loading icon on list until requested json is filled
 -  input fields correct lenght -> eg: sex 1 char, fon only num ect.
 -  add dataset
*/

var globalLeftID = "";
var globalRightID = "";
var globalDATA;
var globalNewDATA;

var resultRight;
var JSONpath;

var ArrayForMagic = [];
var origKeyValueArray = [];

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
                            } else if ("test" === targetValue){
                                
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
    
    
    /*function findAndReplace(object, key, value, replaceValue) {
        for (var x in object) {
            if (object.hasOwnProperty(x)) {
                if (typeof object[x] == 'object') {
                    findAndReplace(object[x], key, value, replaceValue);
                }
                if (object[x] == key) {
                    alert("object[key]: " + object[key]);
                    if (object[key].[x] == value) {
                        alert("object[value]: " + object[value]);
                        object[value] = replaceValue;
                        // break; // uncomment to stop after first replacement
                    }
                    // break; // uncomment to stop after first replacement
                }
            }
        }
    }*/
    
    /*function updateNameById(obj, datasetKey, attributKey, newValue) {
        Object.keys(obj).some(function(key) {
            //alert("obj[key]: " + obj[key]);
            if (obj[key].datasetKey == datasetKey) {
                obj[key].attributKey = newValue;
                return true;  // Stops looping
            }
            // Recurse over lower objects
            else if (obj[key].datasetKey) {
                return updateNameById(obj[key], datasetKey, attributKey, newValue);
            }
        })
    }*/

    
    
    
    function findObjectsAndChange(obj, targetKey, targetProp, targetValue, newValue) {

        //find key by prop: alias
        const myKey = Object.keys(obj).find(x => obj[x].alias === targetKey);
        console.log("myKey: " + myKey);
        console.log("obj[myKey.toString()]: " + obj[myKey.toString()][targetProp]);
        obj[myKey.toString()][targetProp] = newValue;
        
        
        /*function getObject(theObject) {
            if (theObject instanceof Array) {
                for (var i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (var prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        if(theObject[myKey.toString()] === targetKey){
                            console.log("'myKey': " + myKey + " is eq to 'targetKey': " + targetKey);
                            if (theObject[myKey.toString()].prop === targetProp) {
                                console.log("'prop': " + prop + " is eq to 'targetProp': " + targetProp);
                                if (theObject[prop] === targetValue) {
                                    console.log("'theObject[prop]': " + theObject[prop] + " is eq to 'targetValue': " + targetValue);
                                }
                            }
                        }
                        
                        if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                            getObject(theObject[prop]);
                        }
                    }
                }
            }
        }
        getObject(obj);*/
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
                        $("#listRight").append($("<li class='listItemRight' id='" + prop + "'>").text(prop + ": " + theObject[prop]));
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
                        $("#listRight").append($("<li class='listItemRight' id='" + prop + "' style='padding-left:40px;'>").text("↳ " + prop + ": " + theObject[prop]));
                    }
                }
            }
        }
        //getObject1(theObject[prop]);
        
    }
    
    function fillEditElement(attributForFunc, globalLeftIDforFunc, propForFunc, theObjectPropForFunc) {
        console.log("attributForFunc: " + attributForFunc);
        console.log("globalLeftIDforFunc: " + globalLeftIDforFunc);
        console.log("propForFunc: " + propForFunc);
        console.log("theObjectPropForFunc: " + theObjectPropForFunc);
        switch(attributForFunc){
            case "Data":
                break;
            default:
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' class='listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                
                ArrayForMagic[ArrayForMagic.length] = "ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc;
                ArrayForMagic[ArrayForMagic.length] = "ListItemID_" + globalLeftIDforFunc + propForFunc + theObjectPropForFunc;
                                    
                console.log("ArrayForMagic[0]: " + ArrayForMagic[0]);
                console.log("ArrayForMagic[1]: " + ArrayForMagic[1]);
                console.log("ArrayForMagic: " + ArrayForMagic);
                                    
                //filling the input fields based on ID
                $("#Dataset_" + globalLeftIDforFunc + propForFunc).val(globalLeftIDforFunc);
                $("#Attribut_" + propForFunc).val(propForFunc);
                $("#Value_" + theObjectPropForFunc).val(theObjectPropForFunc);
                break;
        }
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
                            fillEditElement(prop, globalLeftID, prop, theObject[prop]);
                            /*switch(prop){
                                case "Data":
                                    var image = new Image();
                                    image.src = "data:image/jpeg;base64," + theObject[prop];
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>Attribut: ↳<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>Value: ↳<img src='"+image.src+"' height='64px' width='64px'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + theObject[prop]).val(theObject[prop]);
                                    
                                    break;
                                case "highlight":
                                    //alert(theObject[prop]);
                                    var highlight = theObject[prop];
                                    highlight = highlight.replace(/\s/g,"");
                                    highlight = highlight.replace("?","_");
                                    //alert(highlight);
                                    
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + highlight +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + highlight).val(theObject[prop]);
                                    break;
                                case "highlight":
                                    //alert(theObject[prop]);
                                    var highlight = theObject[prop];
                                    highlight = highlight.replace(/\s/g,"");
                                    highlight = highlight.replace("?","_");
                                    //alert(highlight);
                                    
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + highlight +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + highlight).val(theObject[prop]);
                                    break;
                                case "title":
                                    //alert(theObject[prop]);
                                    var URLTitel = theObject[prop];
                                    URLTitel = URLTitel.replace(/\s/g,"");
                                    URLTitel = URLTitel.replace("?","_");
                                    //alert(URLTitel);
                                    
                                    $("#listEdit ul").append($("<li style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + URLTitel +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + URLTitel).val(theObject[prop]);
                                    break;
                                case "url":
                                    var URLcutString = theObject[prop];
                                    URLcutString = URLcutString.replace("https://www.youtube.com/watch?v=","");
                                    
                                    $("#listEdit ul").append($("<li id='' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" + URLcutString +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'><iframe id='Value_' style='margin-left: -20.5%;' width='500' height='290' src='https://www.youtube.com/embed/" + URLcutString + "?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe></h3><div class='btnGroupForm'><button>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button>Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + URLcutString).val(theObject[prop]);
                                    
                                    
                                    /*$("#listEdit ul").append($("<iframe width='560' height='315' src='https://www.youtube.com/embed/YRdSAyIrQIw?rel=0' frameborder='0' allow='autoplay; encrypted-media' allowfullscreen></iframe>"));*/
                                    /*break;
                                default:
                                    $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftID + "+" + prop + "+" + theObject[prop] + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftID + prop +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>↳ Attribut:<input id='Attribut_" + prop +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>↳ Value:<input id='Value_" +theObject[prop] +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftID + "+" + prop + "+" + theObject[prop] + "' class='listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listEditResetButton' id='" + globalLeftID + "+" + prop + "+" + theObject[prop] + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listEditRemoveButton' id='ButtonID_" + prop + globalLeftID + theObject[prop] + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                                    
                                    ArrayForMagic[ArrayForMagic.length] = "ButtonID_" + prop + globalLeftID + theObject[prop];
                                    ArrayForMagic[ArrayForMagic.length] = "ListItemID_" + globalLeftID + prop + theObject[prop];
                                    
                                    console.log("ArrayForMagic[0]: " + ArrayForMagic[0]);
                                    console.log("ArrayForMagic[1]: " + ArrayForMagic[1]);
                                    console.log("ArrayForMagic: " + ArrayForMagic);
                                    
                                    //filling the input fields based on ID
                                    $("#Dataset_" + globalLeftID + prop).val(globalLeftID);
                                    $("#Attribut_" + prop).val(prop);
                                    $("#Value_" + theObject[prop]).val(theObject[prop]);
                                    break;
                            }*/
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
        $(".lds-ellipsis#left").css("display", "block");
        JSONpath = "https://cors-anywhere.herokuapp.com/"
        JSONpath += $("#requestJSONText").val();
        
        $.getJSON(JSONpath, function(data) {
            globalDATA = data;
            console.log(data);
            
            $('#listRight').empty();
            $('#listLeft').empty();
            for (i in globalDATA) {
                $("#listLeft").append($("<li class='listItemLeft leftList' id='" + globalDATA[i].alias + "'>").text(i + ": " + globalDATA[i].alias));
            }
        })
            .done(function() { console.log('request succeeded!'); })
            .fail(function(jqXHR, textStatus, errorThrown) { console.log('request failed! ' + textStatus); alert("ERROR: The link you provieded does NOT point to a valid JSON file!") })
            .always(function() { console.log('request ended!');});
        
    });
    
    // SEARCH FUNCTION
    /*$(document).on('click', '#searchInputButton', function () {
        
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
        
    });*/
    $(document).on('click', '#searchInputButton', function () {

        searchInputText = $("#searchInputText").val();
        const myKeyToPut = Object.keys(globalDATA).find(x => globalDATA[x].alias === globalLeftID);
        var putURL = "http://mindpower.com/index.cfm/contacts/" + myKeyToPut;;

        $.getJSON(putURL, function(data) {
                /*$('#listLeft').empty();*/
            $('#listRight').empty();
            findObjects(data, searchInputText, "test", finalResults);
            console.log(finalResults);
            findObjectsFromListLeft(finalResults);
            
                /*for (i in data) {
                    $("#listRight").append($("<li class='listItemRight' id='" + data[i].searchInputText + "'>").text(i + ": " + data[i].searchInputText));
                }*/
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
    
    $(document).on('click', ".listEditSendButton", function () {
        event.preventDefault();
        var currentValues = this.id;
        origKeyValueArray = currentValues.split('+');
        
        console.log("origKeyValueArray[0]: " + origKeyValueArray[0]);
        console.log("origKeyValueArray[1]: " + origKeyValueArray[1]);
        console.log("origKeyValueArray[2]: " + origKeyValueArray[2]);
        
        console.log("Key: " + origKeyValueArray[0]);
        console.log("Value: " + origKeyValueArray[1]);
        
        var newValue = $("#Value_" + origKeyValueArray[2]).val();
        console.log("current Value: " + newValue);
        
        globalNewDATA = globalDATA;
        
        findObjectsAndChange(globalNewDATA, origKeyValueArray[0], origKeyValueArray[1], origKeyValueArray[2], newValue);
        console.log(globalNewDATA);
        console.log(JSON.stringify(globalNewDATA));
        
        
        //$(this).closest('tr').find('.display_image').attr(id);
        
        
        // TODO reload json on successful Post/Put
        
        const myKeyToPut = Object.keys(globalNewDATA).find(x => globalNewDATA[x].alias === origKeyValueArray[0]);
        
        var putURL = "http://mindpower.com/index.cfm/contacts/" + myKeyToPut;
        
        console.log("putURL: " + putURL);
        console.log("JSON to send: " + globalNewDATA[myKeyToPut]);
        
        $.ajax({
            type: 'PUT',
            url: putURL,
            crossDomain: true,
            data: JSON.stringify(globalNewDATA[myKeyToPut]),
            dataType: 'json',
            contentType: 'application/json',
            success: function(responseData, textStatus, jqXHR) {
                console.log("SUCCESS!; responseData: " + responseData + "; textStatus: " + textStatus + "; jqXHR: " + jqXHR);
            },
            error: function (responseData, textStatus, errorThrown) {
                console.log("POST failed!; responseData: " + responseData + "; textStatus: " + textStatus + "; errorThrown: " + errorThrown);
            }
        });
        
        /*jQuery.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            'type': 'POST',
            'url': "http://mindpower.com/index.cfm/contacts",
            'data': JSON.stringify(globalNewDATA),
            'dataType': 'json',
            'success': function () {
                console.log("SUCCESS!");
                
            }
        });*/
    });
    
    //Click on remove button of element
    $(document).on('click', ".listEditRemoveButton", function () {
        //alert("remove: " + this.id);
        console.log("this.id: " + this.id);
        event.preventDefault();
        $("#" + this.id).closest('.listEditItem').remove();
    });
    
    
    //Click on reset button of element
    $(document).on('click', ".listEditResetButton", function () {
        //event.preventDefault();
        var currentValues = this.id;
        console.log("this.id: " + this.id);
        console.log("currentValues: " + currentValues);
        origKeyValueArray = currentValues.split('+');
        
        console.log("origKeyValueArray[0]: " + origKeyValueArray[0]);
        console.log("origKeyValueArray[1]: " + origKeyValueArray[1]);
        console.log("origKeyValueArray[2]: " + origKeyValueArray[2]);
        
        $("#Attribut_" + origKeyValueArray[1]).val(origKeyValueArray[1]);
        $("#Value_" + origKeyValueArray[2]).val(origKeyValueArray[2]);
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
            