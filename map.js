mapboxgl.accessToken = "pk.eyJ1IjoidmluY2VudHZhbmJ1c2tpcmsiLCJhIjoiY2wxOHFjajk2MjFiMjNqbjF1bWxsaWt4YiJ9.RX0gnSYBbgZYKkfiXZ0h2g";
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/vincentvanbuskirk/cl4iukez1000t15mkcnmm6ttq',
    maxZoom: 10,
    minZoom: 1,
    center: [0, 5],
    projection: 'naturalEarth',
});

map.on("load", function () {
    map.addLayer(
        {
          id: "country-outline",
          type: "line",
          source: {
            type: "geojson",
            data: "data/countries.geojson",
          },
          paint: {
            "line-color": "#ffffff",
            "line-width": 1.25,
          },
        },
        "waterway-label"
      );

      map.addLayer(
        {
          id: "country-fill",
          type: "fill",
          source: {
            type: "geojson",
            data: "data/merged_countries.geojson",
          },
          paint: {
            'fill-color': {
              property: 'value',
              stops: [[0, '#cbceec'],
              [4, '#979cd8'],
              [6, '#636bc5'],
              [8, '#3d45a3'],
              [10, '#292f6f'],
            ]},
            "fill-outline-color": "#ffffff",
          },
        },
        "country-outline"
      );
});

map.on("click", "country-fill", function (e) {
  var countryName = e.features[0].properties.name; 
  var rank = e.features[0].properties.rank;
  var score = parseFloat(e.features[0].properties.value).toFixed(2)
  countryName = countryName.toUpperCase();

  new mapboxgl.Popup()
    .setLngLat(e.lngLat)
    .setHTML(
      "<h2>" +
      countryName + 
        "</h2>" +
        "<h3>International Ranking: " +
        rank +
        "</h3>" +
        "<h3>Raw Score: " +
        score +
        "</h3>" +
        "<p>"
    )
    .addTo(map);
});

map.on("mouseenter", "country-fill", function () {
  map.getCanvas().style.cursor = "pointer";
});
// Change it back to a pointer when it leaves.
map.on("mouseleave", "country-fill", function () {
  map.getCanvas().style.cursor = "";
});