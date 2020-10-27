   // if the SVG area isn't empty when the browser loads, remove it and replace it with a resized version of the chart
  let svgArea = d3.select("#scatter").select("svg");

   if (!svgArea.empty()) {
     svgArea.remove();
   }
 

// set the size of the SVG
let svgWidth = 1500;
let svgHeight = 1000;

// set the margins, these will be used to get the chart area
let margin = {
    top: 80,
    right: 80,
    bottom: 80,
    left: 80
};

// chart area calculation time!!!
let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group, and shif the group
// wrapper creation
let svg = d3.select('#scatter') // selects the html element you want to use by id
    .append('svg') //appending the svg
    .attr('width', svgWidth) // giving it an attribute of width
    .attr('height', svgHeight); // giving it an attribute of height

// now we are going to append the svg group (<g> is an SVG element container used to group SVG elements)
let scatterGroup = svg.append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);


// Import the CSV with D3
d3.csv("assets/data/data.csv").then(function(healthData) {
    console.log(healthData)

    //parse data, cast as numbers
    healthData.forEach(function(data) {
        data.age = +data.age;
        data.smokes = +data.smokes;
    });

    // create scale funtions
    let xLinearScale = d3.scaleLinear()
        .domain([30, d3.max(healthData, d => d.age)])
        .range([0,width]);

    let yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(healthData, d => d.smokes)])
        .range([height, 0]);


    // create axis functions
    let bottomAxis = d3.axisBottom(xLinearScale);
    let leftAxis = d3.axisLeft(yLinearScale);

    // append the axis to the chart
    scatterGroup.append('g')
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);

    scatterGroup.append('g')
        .call(leftAxis);

    
    // create circles
    let circlesGroup = scatterGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinearScale(d.age))
        .attr("cy", d => yLinearScale(d.smokes))
        .attr("r", "15")
        .attr("fill", "blue")
        .attr("opacity", ".5");

    
    // intialize tool tip
    let toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
            return (`${d.state}<br>Age: ${d.age}<br>Smokes: ${d.smokes}`);
        });

    
    // create the tooltip in the chart
    scatterGroup.call(toolTip);


    // create event listeners that will show and hide the tooltip when activated
    circlesGroup.on("mouseover", function(d) {
        toolTip.show(d, this);
    })

        .on("mouseout", function(d) { //what to do when the mouse is no longer on the circle
            toolTip.hide(d);
            });


    //create axes labels
    scatterGroup.append("text") // this will create the y axis label
        .attr("transform", "rotate(-90)")
        .attr("y", 0 -margin.left +40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Number of Smokers");

    scatterGroup.append("text") // this will create the x axis label
        .attr("transform", `translate(${width / 2}, ${height + margin.top +30})`)
        .attr("class", "axisText")
        .text("Age");
}).catch(function(error) {
    console.log(error);
});

