//TODO get json link from url in input field

var leftGlobalID = "";
var rightGlobalID = "";
var globalDATA;
var resultRight;

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
    
    //"https://cors-anywhere.herokuapp.com/http://mindpower.com/index.cfm/contacts"
    
    $('#requestJSONform').validate({
        submitHandler: function (form) {
            //JSONpath
            //var JSONpath = "<?php echo $JSONpath; ?>";
            $.getJSON("https://cors-anywhere.herokuapp.com/http://mindpower.com/index.cfm/contacts", function(data) {
                globalDATA = data;
                for (i in data) {
                    $("#listKey").append($("<li class='listItemLeft leftList' id='" + data[i].alias + "'>").text(i + ": " + data[i].alias));
                }
            })
                .done(function() { console.log('getJSON request succeeded!'); })
                .fail(function(jqXHR, textStatus, errorThrown) { console.log('getJSON request failed! ' + textStatus); alert("ERROR: No JSON existst at the given URL!") })
                .always(function() { console.log('getJSON request ended!');});
            return false;
        }
    });

    function findObjects(obj, targetProp, targetValue, finalResults) {

        function getObject(theObject) {
            if (theObject instanceof Array) {
                for (let i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (let prop in theObject) {
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
                for (let i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (let prop in theObject) {
                    if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
                        $("#listArray").append($("<li class='listItemRight1' id='" + prop + "'>").text(prop));
                        getObject1(theObject[prop]);
                    } else if (theObject.hasOwnProperty(prop)) {
                        $("#listArray").append($("<li class='listItemRight' id='" + prop + "'>").text(prop));
                    }
                }
            }
        }
        getObject(obj);
        
        function getObject1(theObject) {
            if (theObject instanceof Array) {
                for (let i = 0; i < theObject.length; i++) {
                    getObject1(theObject[i]);
                }
            } else {
                for (let prop in theObject) {
                    if (theObject.hasOwnProperty(prop)) {
                        $("#listArray").append($("<li class='listItemRight' id='" + prop + "' style='padding-left:40px;'>").text("↳ " + prop));
                    }
                }
            }
        }
        getObject(obj);
        
    }

    function findObjects2(obj, targetProp) {

        function getObject(theObject) {
            if (theObject instanceof Array) {
                for (let i = 0; i < theObject.length; i++) {
                    getObject(theObject[i]);
                }
            } else {
                for (let prop in theObject) {
                    console.log(prop + ': ' + theObject[prop]);
                    if (theObject.hasOwnProperty(prop)) {
                        if (prop === targetProp) {
                            switch(prop){
                                case "Data":
                                    var image = new Image();
                                    image.src = "data:image/jpeg;base64," + theObject[prop];
                                    $("#listEdit ul").append($("<h3 id='"+ prop +" "+ leftGlobalID +"' class='titelForTextbox' style='padding: 10px;margin-right: 10px; text-align: left'></h3>").text(leftGlobalID + " ").append($("<h3 class='titelForTextbox' style='padding-left: 25px;text-align: left'></h3>").text("↳ " + prop + ": ").append("<img src='"+image.src+"' height='64px' width='64px'>")));
                                    break;
                                default:
                                    $("#listEdit ul").append($("<h3 id='"+ prop +" "+ leftGlobalID +"' class='titelForTextbox' style='padding: 10px;margin-right: 10px; text-align: left'></h3>").text(leftGlobalID + " ").append($("<h3 class='titelForTextbox' style='padding-left: 25px;text-align: left'></h3>").text("↳ " + prop + ": ").append($("<input id='" + prop + "' class='listItemBottom' style='height: 35px;width: 64%;margin: 10px 10px;border: 3px solid lightslategrey;padding-left: 3px;font-size: 15px;'> <br>").val(theObject[prop]))));
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

    $(document).on('click', '.listItemLeft', function () {
        $('#listArray').empty();
        leftGlobalID = this.id;
        findObjects(globalDATA, "alias", leftGlobalID, finalResults);
        findObjects1(finalResults);

        //reset value
        finalResultsForList = finalResults;
        finalResults = [];
    });

    $(document).on('click', '.listItemRight', function () {
        //$('#listEdit').empty();
        rightGlobalID = this.id;
        console.log('right ID: ' + this.id);
        findObjects(finalResultsForList, rightGlobalID, rightGlobalID, finalResultsForList);
        console.log("============ finalResultsForList: " +finalResultsForList);
        findObjects2(finalResultsForList, rightGlobalID);
    });

    $(document).on('click', '.listItemBottom', function () {
        
    });

});
            