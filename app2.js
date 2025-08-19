const width = 500;
const height = 300;
const margin = { top: 20, right: 30, bottom: 30, left: 40 };

// Function to generate a random array of numbers
function generateRandomArray(length, max) {
    return Array.from({ length: length }, () => Math.floor(Math.random() * max));
}

// Create scales
const xScale = d3.scaleLinear()
    .range([margin.left, width - margin.right]);

const yScale = d3.scaleLinear()
    .range([height - margin.bottom, margin.top]);

// Function to update the charts
function updateCharts(data) {
    // Update scales
    xScale.domain([0, data.length - 1]);
    yScale.domain([0, d3.max(data)]);

    // Update Scatter Plot
    const scatterSvg = d3.select("#scatter-container svg");
    const scatterCircles = scatterSvg.selectAll("circle").data(data);

    scatterCircles.enter()
        .append("circle")
        .merge(scatterCircles)
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d))
        .attr("r", 5)
        .attr("fill", "steelblue");

    scatterCircles.exit().remove();

    scatterSvg.select(".x-axis")
        .call(d3.axisBottom(xScale).ticks(data.length));
    scatterSvg.select(".y-axis")
        .call(d3.axisLeft(yScale));

    // Update Line Graph
    const lineSvg = d3.select("#line-container svg");
    const lineGenerator = d3.line()
        .x((d, i) => xScale(i))
        .y(d => yScale(d));

    const linePath = lineSvg.selectAll(".line-path")
        .data([data]); // Pass data as an array for the line generator

    linePath.enter()
        .append("path")
        .attr("class", "line-path")
        .merge(linePath)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    linePath.exit().remove();

    const lineCircles = lineSvg.selectAll("circle").data(data);

    lineCircles.enter()
        .append("circle")
        .merge(lineCircles)
        .attr("cx", (d, i) => xScale(i))
        .attr("cy", d => yScale(d))
        .attr("r", 4)
        .attr("fill", "orange");

    lineCircles.exit().remove();

    lineSvg.select(".x-axis")
        .call(d3.axisBottom(xScale).ticks(data.length));
    lineSvg.select(".y-axis")
        .call(d3.axisLeft(yScale));
}

// Initial setup for Scatter Plot
const scatterSvg = d3.select("#scatter-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

scatterSvg.append("g").attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`);
scatterSvg.append("g").attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`);

// Initial setup for Line Graph
const lineSvg = d3.select("#line-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

lineSvg.append("g").attr("class", "x-axis")
    .attr("transform", `translate(0,${height - margin.bottom})`);
lineSvg.append("g").attr("class", "y-axis")
    .attr("transform", `translate(${margin.left},0)`);

// Generate initial data and render charts
let randomArray = generateRandomArray(20, 100);
updateCharts(randomArray);

// Add event listener to the button
document.getElementById("generate-array-btn").addEventListener("click", () => {
    randomArray = generateRandomArray(20, 100);
    updateCharts(randomArray);
});
