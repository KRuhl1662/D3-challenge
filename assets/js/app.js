// set the size of the SVG
let svgWidth = 1000;
let svgHeight = 700;

// set the margins, these will be used to get the chart area
let margin = {
    top: 40,
    right: 40,
    bottom: 40,
    left: 40
};

// chart area calculation time!!!
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group, and shif the group
// wrapper creation
let svg = d3.select('.scatter') // selects the html element you want to use by id
    .append('svg') //appending the svg
    .attr('width', svgWidth) // giving it an attribute of width
    .attr('height', svgHeight); // giving it an attribute of height

// now we are going to append the svg group (<g> is an SVG element container used to group SVG elements)
let chartGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


// Import the CSV with D3
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData)
});