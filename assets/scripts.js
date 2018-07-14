/*
    made by a wonderful team
*/


//a lot of var
var globalLeftID = "";
var globalRightID = "";
var globalDATA;
var globalNewDATA;

var resultRight;
var JSONpath;

var ArrayForMagic = [];
var origKeyValueArray = [];

var searchInputText;
var counterForSelect = 0;

var list = {};


function resetChangesInFields(currentValues){
            
    console.log("this.id: " + this.id);
    console.log("currentValues: " + currentValues);
    // split the string from para into array
    origKeyValueArray = currentValues.split('+');
        
    console.log("origKeyValueArray[0]: " + origKeyValueArray[0]);
    console.log("origKeyValueArray[1]: " + origKeyValueArray[1]);
    console.log("origKeyValueArray[2]: " + origKeyValueArray[2]);
    
    // value and css border to default
    $("#Attribut_" + origKeyValueArray[1]).val(origKeyValueArray[1]);
    $("#Attribut_" + origKeyValueArray[1]).css("border", "3px solid lightslategrey");
    $("#Value_" + origKeyValueArray[2]).val(origKeyValueArray[2]);
    $("#Value_" + origKeyValueArray[2]).css("border", "3px solid lightslategrey");
}

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

function readURL(input) {
    if(input.files && input.files[0]){
        var reader = new FileReader();
            
        reader.onload = function (e) {
            $('#dropForImg').attr('src', e.target.result);
            console.log("*****************: " + e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


$(document).ready(function() {

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
    
    function findObjectsAndChange(obj, targetKey, targetProp, targetValue, newValue) {

        //find key by prop: alias
        const myKey = Object.keys(obj).find(x => obj[x].alias === targetKey);
        console.log("myKey: " + myKey);
        console.log("obj[myKey.toString()]: " + obj[myKey.toString()][targetProp]);
        obj[myKey.toString()][targetProp] = newValue;
        
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
                        $("#listRight").append($("<li class='listItemRight' id='" + prop + "' style='padding-left:40px;'>").text("f061 " + prop + ": " + theObject[prop]));
                    }
                }
            }
        }
    }
    
    function fillEditElement(attributForFunc, globalLeftIDforFunc, propForFunc, theObjectPropForFunc) {
        console.log("attributForFunc: " + attributForFunc);
        console.log("globalLeftIDforFunc: " + globalLeftIDforFunc);
        console.log("propForFunc: " + propForFunc);
        console.log("theObjectPropForFunc: " + theObjectPropForFunc);
        var valueForButton = "";
        switch(attributForFunc){
            case "Data":
                valueForButton = "Data";
                var image = new Image();
                image.src = "data:image/jpeg;base64," + theObjectPropForFunc;
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000; width: 96%;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<img src='"+image.src+"' height='64px' width='64px'><input type='file' id='imgInp'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
            case "sex":
                valueForButton = "sex";
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<input maxlength='1' id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
            case "fon":
                valueForButton = "fon";
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "_" + propForFunc + "_" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<input type='number' id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "_" + propForFunc + "_" + theObjectPropForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "_" + propForFunc + "_" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
            case "birthdate":
                valueForButton = "birthdate";
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<input type='date' id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
            case "email":
                valueForButton = "email";
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<input id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
            default:
                $("#listEdit ul").append($("<li class='listEditItem' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' style='background-color: white; margin: 10px 0px; margin-bottom: 8%; border: solid 3px #ff8000; width: 96%;'><h3 class='titelForTextbox' style='padding-left: 2%;text-align: left'>Dataset:<input disabled id='Dataset_" + globalLeftIDforFunc + propForFunc +"' class='listItemBottomDataset' style='height: 35px;width: 75%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 8%;text-align: left'>f061 Attribut:<input id='Attribut_" + propForFunc +"' class='listItemBottomAttribut' style='height: 35px;width: 68.8%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><h3 class='titelForTextbox' style='padding-left: 20%;text-align: left'>f061 Value:<input id='Value_" + theObjectPropForFunc +"' class='listItemBottomValue' style='height: 35px;width: 67.5%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'></h3><div class='btnGroupForm'><button id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' class='listButtons listEditSendButton'>Send these changes&nbsp;<i class='fas fa-angle-double-right'></i></button><button class='listButtons listEditResetButton' id='" + globalLeftIDforFunc + "+" + propForFunc + "+" + theObjectPropForFunc + "' >Reset these changes&nbsp;<i class='fas fa-ban'></i></button><button class='listButtons listEditRemoveButton' id='ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc + "'>Remove this and cancel&nbsp;<i class='fas fa-times'></i></button></div></li>"));
                break;
        }
        
        ArrayForMagic[ArrayForMagic.length] = "ButtonID_" + propForFunc + globalLeftIDforFunc + theObjectPropForFunc;
        ArrayForMagic[ArrayForMagic.length] = "ListItemID_" + globalLeftIDforFunc + propForFunc + theObjectPropForFunc;

        console.log("ArrayForMagic[0]: " + ArrayForMagic[0]);
        console.log("ArrayForMagic[1]: " + ArrayForMagic[1]);
        console.log("ArrayForMagic: " + ArrayForMagic);

        //filling the input fields based on ID
        $("#Dataset_" + globalLeftIDforFunc + propForFunc).val(globalLeftIDforFunc);
        $("#Attribut_" + propForFunc).val(propForFunc);
        
        switch(valueForButton){
            case 'Data':
                alert("data");
                break;
            case 'fon':
                alert("fon");
                break;
            case 'email':
                alert("theObjectPropForFunc: " + theObjectPropForFunc + "; propForFunc: " + propForFunc);
                $("#Value_" + theObjectPropForFunc).val(theObjectPropForFunc);
                break;
            default:
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
    
    // REQUEST FUNCTION
    $(document).on('click', '#requestJSONButton', function () {
        $("#loading").css("display", "block");
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
            .done(function() { 
                console.log('request succeeded!');
                $("#columnTitel2").css("display", "block");
                $("#loading").css("display", "none");
            })
            .fail(function(jqXHR, textStatus, errorThrown) { console.log('request failed! ' + textStatus); alert("ERROR: The link you provieded does NOT point to a valid JSON file!"); $("#loading").css("display", "none"); })
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
        globalRightID = this.id;
        console.log('right ID: ' + this.id);
        findObjects(finalResultsForList, globalRightID, globalRightID, finalResultsForList);
        console.log("============ finalResultsForList: " +finalResultsForList);
        findObjects2(finalResultsForList, globalRightID);
        $("#columnTitel5").css("display", "block");
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
        
        if (confirm("Are you sure you want to sumit these changes?\nKey: " + origKeyValueArray[0] + "\nAttribute: " + origKeyValueArray[1] + "\nValue: " + newValue)){
            globalNewDATA = globalDATA;
        
            findObjectsAndChange(globalNewDATA, origKeyValueArray[0], origKeyValueArray[1], origKeyValueArray[2], newValue);
            console.log(globalNewDATA);
            console.log(JSON.stringify(globalNewDATA));

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
                    var n = $(".listEditRemoveButton").length;
                    for(var i= 0; i<n; i++){
                        $(".listEditRemoveButton").click();
                    }
                    $('#listRight').empty();
                    $("#requestJSONButton").click();
                    $("#" + origKeyValueArray[0]).click();
                    //$("#requestJSONButton").click();
                },
                error: function (responseData, textStatus, errorThrown) {
                    console.log("POST failed!; responseData: " + responseData + "; textStatus: " + textStatus + "; errorThrown: " + errorThrown);
                }
            });
        } else {
            resetChangesInFields(currentValues);
            alert("The changes made have been reverted!");
        }
    });
    
    //Send new Dataset
    $(document).on('click', ".sendNewDatasetButton", function () {
        
        $(".formForNewDataset").find("input").each(function() {
            if (!$(this).hasClass("ohnono")) {
                var lastChar = this.id.substr(this.id.length - 1);
                var myString = "#" + this.id + lastChar;

                var field = $("#" + this.id).attr('name');
                if($("#" + this.id).attr('name') == "alias"){
                    var value = $("#addInputFieldAliasText").val();
                } else {
                    var value = $(myString).attr('name');
                }
                console.log(field);
                console.log(value);
                list[field] = value;
            }
        });
        console.log(list);
        if (confirm("Are you sure")){

            var putURL = "http://mindpower.com/index.cfm/contacts";
            console.log("putURL: " + putURL);
            //console.log("JSON to send: " + globalNewDATA[myKeyToPut]);

            $.ajax({
                type: 'POST',
                url: putURL,
                crossDomain: true,
                data: JSON.stringify(list),
                dataType: 'json',
                contentType: 'application/json',
                success: function(responseData, textStatus, jqXHR) {
                    console.log("SUCCESS!; responseData: " + responseData + "; textStatus: " + textStatus + "; jqXHR: " + jqXHR);
                    //TODO: remove all input elements and reload lists
                    alert("Successfully send the data!");
                    location.reload();
                    
                },
                error: function (responseData, textStatus, errorThrown) {
                    console.log("POST failed!; responseData: " + responseData + "; textStatus: " + textStatus + "; errorThrown: " + errorThrown);
                }
            });
        } else {
            // TODO: reset all fields
            alert("The changes made have been reverted!");
        }
    });
    
    
    //Click on remove button of element
    $(document).on('click', ".listEditRemoveButton", function () {
        console.log("this.id: " + this.id);
        event.preventDefault();
        // remove the closest elem with class; hide title
        $("#" + this.id).closest('.listEditItem').remove();
        if( $('#listEdit ul li').length < 1 ){
            $("#columnTitel5").css("display", "none");
            $("#columnTitel6").css("display", "none");
        }
    });
    
    //Click on remove button of element
    $(document).on('click', ".close-icon", function () {
        $(this).parent().remove();
    });
    
    
    //Click on reset button of element
    $(document).on('click', ".listEditResetButton", function () {
        event.preventDefault();
        // call to func with current id as para; will decode para and set the value in the input fields to orig; css border to default
        resetChangesInFields(this.id);
        console.log("listEditResetButton this.id: " + this.id);
        console.log("origKeyValueArray[2] this.id: " + origKeyValueArray[2]);
        // check if any <li> still exist; if not hide title
        if( $('#listEdit ul li').length < 1 ){
            $("#columnTitel5").css("display", "none");
            $("#columnTitel6").css("display", "none");
        }
    });
    
    //Click on add fields button 
    $(document).on('click', ".addMoreFieldsButton", function () {
        // increas the counter to make id unique
        counterForSelect++;
        // new <li> with input, dropdown and remove button
        $('#listAddInputField ul').append(
            $('<li class="listInputFieldClass" style="display: flex;margin: 10px 0px;">').append('<input class="addInputField1" id="addInputFieldName_'+ counterForSelect + counterForSelect +'" type=text placeholder="name for attribut" required><select class="counterForSelect" id="counterForSelect_'+ counterForSelect +'" style="font-size: 25px;margin: 0px 10px;"><option value="isText">is text</option><option value="isVideo">is video</option><option value="isPic">is pic</option><option value="isList">is list</option></select><input class="addInputField1 ohnono" id="addInputFieldName_'+ counterForSelect + counterForSelect + counterForSelect +'" type=text placeholder="value for attribut" required><a href="#" class="close-icon"></a>')
        );
    });
    
    // Listener for change in the dropdown for adding new datasets
    $(document).on("change", ".counterForSelect", function () {
        console.log("counterForSelect_: " + counterForSelect);
        // get the value of the currently selected option from the dropdown and assign it to a var
        var ValueSelect = $("#" + this.id).val();
        var currentID = "#" + this.id;
        //$( "#addInputFieldAttribut" ).remove();
        switch(ValueSelect){
            case 'isList':
                $(this).next().remove();
                $(currentID).after('<input id="IDcounterForSelect_'+ counterForSelect + ValueSelect +'" class="addInputField1 ohnono" type=text placeholder="value for attribut" required>');
                $(currentID).after('<input id="IDcounterForSelect_'+ counterForSelect + ValueSelect +'" class="addInputField1 ohnono" type=text placeholder="value for attribut" required>');
                break;
            case 'isVideo':
                $(this).next().remove();
                $(currentID).after('<input id="IDcounterForSelect_'+ counterForSelect + ValueSelect +'" class="addInputField1 ohnono" type=text placeholder="value for attribut" required>');
                break;
            case 'isPic':
                $(this).next().remove();
                $(currentID).after('<input id="IDcounterForSelect_'+ counterForSelect + ValueSelect +'" style="padding: 14px;" type="file" name="pic" accept="image/*">');
                break;
            case 'isText':
                $(this).next().remove();
                $(currentID).after('<input id="IDcounterForSelect_'+ counterForSelect + ValueSelect +'" class="addInputField1 ohnono" type=text placeholder="value for attribut" required>');
                break;
            default:
                alert("ERROR");
        }
        
    });
    
    $(document).on('input', '.addInputField1', function () {
        var n = $("#ULlistAddInputFieldAlias").length;
        for(var i= 0; i<n; i++){
            $("#" + this.id).attr('name', $("#" + this.id).val());
        }
    });
    
    //Img upload
    $("#imgInp").change(function(){
        readURL(this);
    });
    
    //Click on reset button of element
    $(document).on('click', ".tablink", function () {
    });
    
    // Listeners for input change on the edit fields also show the title 6
    $(document).on('input', '.listItemBottomDataset', function () {
        $(".listItemBottomDataset").css("border", "3px solid #ff8000");
    });
    $(document).on('input', '.listItemBottomAttribut', function () {
        $("#" + this.id).css("border", "3px solid #ff8000");
        $("#columnTitel6").css("display", "block");
    });
    $(document).on('input', '.listItemBottomValue', function () {
        $("#" + this.id).css("border", "3px solid #ff8000");
        $("#columnTitel6").css("display", "block");
    });

});
            