var width = window.innerHeight,
    height = window.innerHeight,
    speed = -1e-3,
    start = Date.now();

var sphere = {type: "Sphere"};

var projection = d3.geo.orthographic()
    .scale(height / 2.1)
    .translate([height / 2, height / 2])
    .precision(.5);

var graticule = d3.geo.graticule();

var canvas = d3.select("body").insert("canvas", ":first-child")
    .attr("width", width)
    .attr("height", height);

var style = document.createElement('style');
style.textContent = `
  canvas {
    position: fixed;
    top: 0; 
    left: -50%;
    width: ${height}px;
    height: ${height}px;
    transform: translate(0, 0);
    pointer-events: none;
    display: block;
    z-index: 1;
  }
`;
document.head.appendChild(style);

var context = canvas.node().getContext("2d");

var path = d3.geo.path()
    .projection(projection)
    .context(context);

// Try to load local world data, fallback to simple globe if not available
d3.json("world-110m.json", function(error, topo) {
  var land, grid = graticule();
  
  // Handle error or fallback for when external data is not available
  if (error) {
    console.log("World topology data unavailable, using optimized fallback mode for throttled networks");
    // Create a simple fallback representation without detailed land data
    land = null;
  } else {
    land = topojson.feature(topo, topo.objects.land);
    console.log("World topology data loaded successfully");
  }

  // Performance optimization: limit frame rate for low-end devices
  var lastTime = 0;
  var targetFPS = 30; // Reduced from default ~60fps for better performance
  var frameInterval = 1000 / targetFPS;
  
  function renderFrame() {
    var currentTime = Date.now();
    if (currentTime - lastTime < frameInterval) {
      requestAnimationFrame(renderFrame);
      return;
    }
    lastTime = currentTime;
    
    context.clearRect(0, 0, width, height);

    projection.rotate([speed * (currentTime - start), -15]).clipAngle(90);

    // Draw sphere outline
    context.beginPath();
    path(sphere);
    context.lineWidth = 2;
    context.strokeStyle = "rgba(102,175,233,0.8)";
    context.stroke();
    context.fillStyle = "rgba(102,175,233,0.05)";
    context.fill();

    projection.clipAngle(180);

    // Draw land if available, otherwise skip
    if (land) {
      context.beginPath();
      path(land);
      context.fillStyle = "rgba(102,175,233,0.15)";
      context.fill();
    }

    // Draw graticule (grid lines)
    context.beginPath();
    path(grid);
    context.lineWidth = 0.5;
    context.strokeStyle = "rgba(102,175,233,0.3)";
    context.stroke();

    // Draw visible hemisphere land if available
    projection.clipAngle(90);
    if (land) {
      context.beginPath();
      path(land);
      context.fillStyle = "rgba(102,175,233,0.2)";
      context.fill();
      context.lineWidth = 0;
      context.strokeStyle = "transparent";
      context.stroke();
    }
    
    requestAnimationFrame(renderFrame);
  }
  
  // Start the animation
  requestAnimationFrame(renderFrame);
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
  var newHeight = window.innerHeight;
  if (newHeight !== height) {
    width = newHeight;
    height = newHeight;
    
    canvas
      .attr("width", width)
      .attr("height", height);
      
    projection
      .scale(height / 2.1)
      .translate([height / 2, height / 2]);
    
    // Update canvas CSS
    var canvasElement = canvas.node();
    canvasElement.style.width = height + 'px';
    canvasElement.style.height = height + 'px';
  }
});

// Remove the frameElement styling as it's not needed for our implementation
// d3.select(self.frameElement).style("height", height + "px");
