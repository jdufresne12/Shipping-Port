//John Dufresne
// Javascript file to grab data from database with php 
debugger;
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
    console.log(jsonPayload);
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
			else if(xhr.readyState == 4 && xhr.status==409){
				let errorObj = JSON.parse(xhr.responseText);
				console.log(errorObj);
			}
		};
		xhr.send(jsonPayload);
    } catch(err){
        console.log(err)
	}
}

