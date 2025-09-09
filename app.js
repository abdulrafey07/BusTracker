let map;
let busMarker;

function initMap() {
  // Default map center if location is unavailable
  const defaultLocation = { lat: 12.9716, lng: 77.5946 };
  
  map = new google.maps.Map(document.getElementById("map"), {
    center: defaultLocation,
    zoom: 14,
  });

  busMarker = new google.maps.Marker({
    position: defaultLocation,
    map: map,
    icon: "https://img.icons8.com/color/48/bus.png",
  });

  // Try to get live laptop location
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
      function(position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        busMarker.setPosition(pos);
        map.panTo(pos);
      },
      function(error) {
        console.error("Error getting location:", error);
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

window.onload = initMap;
