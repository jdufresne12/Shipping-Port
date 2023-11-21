//John Dufresne
// Javascript file to grab data from database with php 
const urlBase = 'http://13.58.63.232/'; //server where php files are going to be located 

function test(){
    let url = urlBase + "test.php"; //change "test.php" with whatever php file you need to run
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById('shipsList').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
}
