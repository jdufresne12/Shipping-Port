//John Dufresne
// Javascript file to grab data from database with php 
//debugger;
const urlBase = 'http://104.236.195.67/'; //server where php files are going to be located 

function test(){
    let url = urlBase + "example.php"; //change "test.php" with whatever php file you need to run
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('shipsList').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}

function addContainer(){
    event.preventDefault();
    //Grabbing Data from page
    let companyName = document.getElementById("company-name").value;
    let containerStatus = "at source";
    let containerSource = document.querySelector('input[name="source"]:checked').value;
    let sourceId = document.getElementById("source-id").value;
    let containerDestination = document.querySelector('input[name="destination"]:checked').value;
    let destinationId = document.getElementById("destination-id").value;
    let storageArea = document.querySelector('input[name="storageArea"]:checked').value;

    //Storing Data in temp: (variable:value), then turning into JSON object for php
    let tmp = {companyName:companyName, containerStatus: containerStatus, storageArea:storageArea, sourceId:sourceId, 
    containerSource:containerSource, destinationId:destinationId, containerDestination:containerDestination}
    let jsonPayload = JSON.stringify( tmp );
    let msg = "Something went wrong... double check fields.";
    let url = urlBase + "create_container.php";
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function() 
        {
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(JSON.parse(xhr.responseText));
            } 
            else{
                let errorObj = JSON.parse(xhr.responseText);
                console.log(errorObj);
            }
        };
        xhr.send(jsonPayload);
    } catch(err){
        console.log(err)
    }
    //window.location.href = 'homepage.html';
}

function addShip(shipName) {
    // Perform an AJAX request to add the record to the database
    let url = urlBase + "add_ship.php";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE) {
            if (this.status === 200) {
                alert('Ship registered successfully!');
            } else {
                console.error('Error:', this.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send('ship-name=' + encodeURIComponent(shipName));
}

function checkShip() {
    let shipName = document.getElementById('ship-name').value;
    let tmp = {shipName:shipName}
    let jsonPayload = JSON.stringify( tmp );
    
    // Perform an AJAX request to the PHP script
    let url = urlBase + "check_ship.php";
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                // Handle the response from the server
                var response = JSON.parse(this.responseText);
            } else {
                console.error('Error:', this.status);
            }
        }
    };
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(jsonPayload);
}


function searchShipInfo(){
    //Grabbing Data from page
    let shipId = document.getElementById("ship-ID").value;
    let tmp = {shipId:shipId}
    let flag = "invalid"; //If valid ship id is entered, clear the flag

    let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + "shipdetails.php";
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let responseObj;
                if (xhr.status == 200) {
                    try {
                        responseObj = JSON.parse(xhr.responseText);
                        document.getElementById("invalid-id").innerHTML = ""; // Clear error message
                        document.getElementById("ship-name").innerHTML = responseObj.ship_name;
                        document.getElementById("captain-name").innerHTML = responseObj.captain_name;
                        document.getElementById("ship-action").innerHTML = responseObj.ship_action;
                        document.getElementById("berth").innerHTML = responseObj.berth_id;
                        console.clear();
                    } catch (parseError) {
                        responseObj = xhr.responseText;
                        document.getElementById("ship-name").innerHTML = "";
                        document.getElementById("captain-name").innerHTML = "";
                        document.getElementById("ship-action").innerHTML = "";
                        document.getElementById("berth").innerHTML = "";
                        document.getElementById("invalid-id").innerHTML = "Invalid Ship Id entered";
                        console.error("Error parsing server response:", parseError);
                    }
                } else{
                    console.log("error");
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err);
    }
}

function searchTruckInfo(){
    //Grabbing Data from page
    let truckId = document.getElementById("truck-ID").value;
    let tmp = {truckId:truckId}
    let flag = "invalid"; //If valid truck id is entered, clear the flag

    let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + "truckdetails.php";
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let responseObj;
                if (xhr.status == 200) {
                    try {
                        responseObj = JSON.parse(xhr.responseText);
                        document.getElementById("invalid-id").innerHTML = ""; // Clear error message
                        document.getElementById("driver-name").innerHTML = responseObj.driver_name;
                        document.getElementById("truck-number").innerHTML = responseObj.truck_number;
                        document.getElementById("storage-area").innerHTML = responseObj.storage_area;
                        document.getElementById("truck-action").innerHTML = responseObj.truck_action;
                        console.clear();
                    } catch (parseError) {
                        responseObj = xhr.responseText
                        document.getElementById("driver-name").innerHTML = "";
                        document.getElementById("truck-number").innerHTML = "";
                        document.getElementById("storage-area").innerHTML = "";
                        document.getElementById("truck-action").innerHTML = "";
                        document.getElementById("invalid-id").innerHTML = "Invalid Truck Id entered";
                        console.error("Error parsing server response:", parseError);
                    }
                } else{
                    console.log("error");
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        console.log(err);
    }
}

function searchContainerInfo(){
    let containerId = document.getElementById("containerId").value;
    let tmp = {containerId:containerId}
    let jsonPayload = JSON.stringify( tmp );
    let url = urlBase + "containerdetails.php";
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let responseObj;
                if (xhr.status == 200) {
                    try {
                        responseObj = JSON.parse(xhr.responseText);
                        document.getElementById("invalid-id").innerHTML = ""; // Clear error message
                        document.getElementById("company-name").innerHTML = responseObj.company_name;
                        document.getElementById("container-status").innerHTML = responseObj.container_status;
                        document.getElementById("storage-area").innerHTML = responseObj.storage_area;
                        document.getElementById("source-id").innerHTML = responseObj.source_id;
                        document.getElementById("container-source").innerHTML = responseObj.container_source;
                        document.getElementById("destination-id").innerHTML = responseObj.dest_id;
                        document.getElementById("container-destination").innerHTML = responseObj.container_destination;
                        console.clear();
                    } catch (parseError) {
                        responseObj = xhr.responseText
                        document.getElementById("company-name").innerHTML = "";
                        document.getElementById("container-status").innerHTML = "";
                        document.getElementById("storage-area").innerHTML = "";
                        document.getElementById("source-id").innerHTML = "";
                        document.getElementById("container-source").innerHTML = "";
                        document.getElementById("destination-id").innerHTML = "";
                        document.getElementById("container-destination").innerHTML = "";
                        document.getElementById("invalid-id").innerHTML = "Invalid Container Id entered";
                        console.error("Error parsing server response:", parseError);
                    }
                } else{
                    console.log("error");
                }
            }
        };
        xhr.send(jsonPayload);
    } catch (err) {
        errorFlag = true;
        console.log(err);
    }
}

function berthStatus(){
    let url = urlBase + "berthstatus.php";
    let xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                let responseObj = JSON.parse(xhr.responseText);
                if (xhr.status == 200) {
                    responseObj.forEach(function(berth){
                        let elementId = `berth-${berth.berth_id}`;
                        let element = document.getElementById(elementId);
                        if(berth.berth_status == "FREE"){
                            element.innerHTML = "Vacant";
                        }
                        else{
                            element.innerHTML = "Occupied by Ship(" + berth.ship_id + ")" ;
                        }
                    });
                } else{
                    console.log("error");
                }
            }
        };
        xhr.send();
    } catch (err) {
        console.log(err);
    }
}

function jumpTo(page){
    window.location.href = page;
}