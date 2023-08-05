var locationData;
var postofficeData;

var postalCardDiv;

document.getElementById("dataDiv").style.display = "none";

async function ShowData() {

  document.getElementById("btnDiv").style.display = "none";
  var dataDiv = document.getElementById("dataDiv");
  var main = document.getElementById('main')
  main.style.display = 'none'
  dataDiv.style.display = "block";

  var IPAddress;

  await $.getJSON("https://api.ipify.org?format=json", function (data) {
    IPAddress = data.ip;
  });

  console.log(IPAddress)

  await fetch(`https://ipinfo.io/${IPAddress}?token=30dd7efacbc702`)
  .then(response => response.json())
  .then(response => locationData=response)
  .catch(()=>{ alert("Problem with fetching data")});

  var latLong = locationData.loc.split(",");
  let lat = latLong[0].trim();
  let long = latLong[1].trim();

  dataDiv.innerHTML += `
  <h3 id = 'h'>Ip Address :<h3>
  <div class="infoDiv" id="infoDiv1">
        <div>
          <div>Lat : ${lat}</div>
          <div>Long : ${long}</div>
        </div>

        <div>
          <div>City : ${locationData.city}</div>
          <div>Region : ${locationData.region}</div>
        </div>

        <div>
          <div>Organisation : ${locationData.org}</div>
          <div>Hostname : ${"ipInfo"}</div>
        </div>
      </div>

      <div id="mapDiv">
   
      <center> <h1> your current location <h1></center>

      <iframe
      src="https://maps.google.com/maps?q=${lat}, ${long}&z=15&output=embed"
      frameborder="0"
      id="mapFrame"
    ></iframe>
      </div>
      
      `;

  console.log(locationData);
  
  let datetime_str = new Date().toLocaleString("en-US", {
    timeZone: `${locationData.timezone}`,
  });


  await fetch(`https://api.postalpincode.in/pincode/${locationData.postal}`)
  .then(response => response.json())
  .then( response => response[0] )
  .then(response => {
    console.log(response);
    dataDiv.innerHTML += `<div class="infoDiv" id="infoDiv2">
        <div>TimeZone : ${locationData.timezone}</div>
        <div>Date And Time : ${datetime_str}</div>
        <div>Pincode : ${locationData.postal}</div>
        <div>
          Message :
          <p>${response.Message}</p>
        </div>
      </div>
      
       <div id="postalInfoDiv">

        <div id="searchbarDiv">
      
        <img  id = "mg" src = "./11.jpeg"/><input type="text"   placeholder="Search by Name" onkeyup="searchPostOffice()" id="searchBox"  />
        </div>

        <div id="postalCardDiv"></div>`;

        postalCardDiv = document.getElementById("postalCardDiv");

      return response.PostOffice;
    } )
   .then(data =>{
      console.log(data);

      postofficeData=data;

      data.forEach(element => {
        console.log(element);

        postalCardDiv.innerHTML += ` <div class="card">
            <div>Name : ${element.Name}</div>
            <div>Branch Type : ${element.BranchType}</div>
            <div>Delivery Status : ${element.DeliveryStatus}</div>
            <div>District : ${element.District}</div>
            <div>Division : ${element.Division}</div>
          </div>`;

      });
    })
    .catch(()=>{ alert("Problem with fetching data")});


}

function searchPostOffice(){
    postalCardDiv.innerHTML="";
    var searchValue = document.getElementById("searchBox").value;

    var filteredPostOffice =  postofficeData.filter(item => {
        var stringifiedItem = JSON.stringify(item);
    
        return stringifiedItem.toLowerCase().includes(searchValue.toLowerCase());
    })

    filteredPostOffice.forEach(element => {
        postalCardDiv.innerHTML += ` <div class="card">
            <div>Name : ${element.Name}</div>
            <div>Branch Type : ${element.BranchType}</div>
            <div>Delivery Status : ${element.DeliveryStatus}</div>
            <div>District : ${element.District}</div>
            <div>Division : ${element.Division}</div>
            </div>`;
    });
    
}


const apiBaseUrl = 'https://ipinfo.io/json';
const accessToken = '0143ed28f6f6db';

fetch(apiBaseUrl, {
  headers: {
    'Authorization': `Bearer ${accessToken}`
  }
})
.then(response => {
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Error fetching IP address');
  }
})
.then(data => {
  const ipAddress = data.ip;
  document.getElementById('spn1').innerText = ipAddress;

})
.catch(error => {
  console.error('Error fetching IP address:', error);
  document.getElementById('spn1').innerText = 'Error fetching IP address';

});
