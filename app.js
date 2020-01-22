// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Step 2: Create an SVG wrapper,
// append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
// =================================
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Step 3:
// Import data from the data.csv file
// =================================
d3.csv("data.csv").then(random) 

function random(states) {

        states.map(function(data) {
            data.healthcare = +data.healthcare
            data.poverty = +data.poverty
        });

        var yScale = d3.scaleLinear()
            .domain([3, d3.max(states, d => d.healthcare])
            .range([height, 0]);

        var xScale = d3.scaleLinear()
            .domain([4, d3.max(states, d => d.poverty)])
            .range([0, width]);



  // Step 6: Create Axes
  // =============================================
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);



  // Step 7: Append the axes to the chartGroup
  // ==============================================
  // Add bottomAxis
  chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(xAxis);

  // Add leftAxis to the left side of the display
  chartGroup.append("g").call(yAxis);

  // append circles
  var circlesGroup = chartGroup.selectAll("circle")
  .data(states)
  .enter()
  .append("circle")
  .attr("cx", d => xScale(poverty))
  .attr("cy", d => yScale(healthcare))
  .attr("r", "10")
  .attr("fill", "blue");



  var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
          return (`${d.abbr}<br>Poverty: ${d.poverty}%<br>Healthcare: ${d.healthcare}%`);
        });


    // Step 2: Create the tooltip in chartGroup.
    chartGroup.call(toolTip);

    // Step 3: Create "mouseover" event listener to display tooltip
    circlesGroup.on("mouseover", function(data) {
    toolTip.show(data, this);
    })
    // Step 4: Create "mouseout" event listener to hide tooltip
    .on("mouseout", function(data) {
        toolTip.hide(data);
    });
}


