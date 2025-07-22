//TO DO: Fetch data from the PostgreSQL database
function fetchGradeData() {
    //This function will query the PostgreSQL database and return grade data
    console.log("Fetching grade data...");
    //Create a new request for HTTP data
    let xhr = new XMLHttpRequest();
    //This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";
    //When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
        let results;
        //Check if we're done
        if(xhr.readyState === xhr.DONE){
            //Check if we're successful
            if(xhr.status !== 200){
                console.error(`Could not get grades. Status: ${xhr.status}`);
            }
            //And then call the function to update the HTML with our data
            populateGradebook(JSON.parse(xhr.responseText));
        }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

//TODO: Populate table with grade data
function populateGradebook(data) {
    //Will take fetched grade data and populate table
    console.log("Populating gradebook with data:", data); 
    let tableElm = document.getElementById("gradebook"); //Get gradebook table element
    data.forEach(function(assignment){ //For each row we're passed in
        let row = document.createElement("tr"); //create a table row element
        let columns = []; 
        columns.name = document.createElement("td"); //First column is names
        columns.name.appendChild(document.createTextNode(assignment.last_name + "," + assignment.first_name));

        columns.grade = document.createElement("td"); //Second column is grades
        columns.grade.appendChild(document.createTextNode(assignment.total_grade));

        //Add table data columns to table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        //Add the row to the table itself to make data visible
        tableElm.appendChild(row);
    });
    
}
fetchGradeData();

