//John Dufresne
// Javascript file to grab data from database with php 
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
    const formData = new FormData(event.target);
    let formObj = {};
    // Log out each key-value pair in the FormData
    for (let [key, value] of formData.entries()) { 
        formObj[key] = value; 
    }
    console.log(formObj); //Can use this object to grab individual form data for validation and SQL query


    // fetch('create_container.php', {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(response => response.json()) // Assuming the PHP file sends back a JSON response
    // .then(data => {
    //     console.log(data); // Handle the response here
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
}
