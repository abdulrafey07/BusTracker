let map;
let busMarker;
let directionsService, directionsRenderer;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 12.9716, lng: 77.5946 },
    zoom: 12,
  });

  // Directions API setup
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Start live tracking
  startLiveTracking();
}

// Live tracking
function startLiveTracking() {
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = { lat: latitude, lng: longitude };

        if (!busMarker) {
          busMarker = new google.maps.Marker({
            position: newPos,
            map: map,
            icon: "https://img.icons8.com/color/48/bus.png",
          });
        } else {
          busMarker.setPosition(newPos);
        }

        map.panTo(newPos);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

// Find route between source and destination
function findRoute() {
  let source = document.getElementById("source").value;
  let destination = document.getElementById("destination").value;

  if (!source || !destination) {
    alert("Please enter both source and destination");
    return;
  }

  let request = {
    origin: source,
    destination: destination,
    travelMode: "DRIVING", // Options: DRIVING, WALKING, TRANSIT
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("Route not found: " + status);
    }
  });
}

const busRoutes = [
  {
    busNumber: "101",
    source: "Ghaziabad",
    destination: "New Delhi",
  },
  {
    busNumber: "202",
    source: "Ghaziabad",
    destination: "Meerut",
  },
  {
    busNumber: "303",
    source: "Banashankari, Bangalore",
    destination: "Hebbal, Bangalore",
  }
];


function findBuses() {
  let source = document.getElementById("source").value.trim();
  let destination = document.getElementById("destination").value.trim();

  let found = busRoutes.filter(
    (route) =>
      route.source.toLowerCase().includes(source.toLowerCase()) &&
      route.destination.toLowerCase().includes(destination.toLowerCase())
  );

  if (found.length > 0) {
    let busList = found.map((bus) => `🚌 Bus ${bus.busNumber}`).join("\n");
    alert(`Available buses:\n${busList}`);
  } else {
    alert("No buses found for this route.");
  }
}


window.onload = initMap;
