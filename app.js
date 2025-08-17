const width = 300;
const height = 300;
const radius = Math.min(width, height) / 2;

// Access the input field by its ID
const nameInput = document.getElementById('name');

document.getElementById('form-id').addEventListener('submit', (event) => {
    // Prevent the form from submitting to the server
    event.preventDefault();

    // Retrieve and clean the name input
    const nameValue = nameInput.value;
    const cleanedName = nameValue.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log('Cleaned Name:', cleanedName);

    // Calculate character frequency
    const charFrequency = {};
    for (const char of cleanedName) {
        charFrequency[char] = (charFrequency[char] || 0) + 1;
    }
    console.log('Character Frequency:', charFrequency);

    // Prepare data for D3
    const data = Object.entries(charFrequency).map(([key, value]) => ({
        label: key,
        value: value
    }));

    // Clear previous charts
    const chartsContainer = d3.select("#charts-container");
    chartsContainer.selectAll("*").remove();

    // Create pie chart SVG
    const pieSvg = chartsContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Create donut chart SVG
    const donutSvg = chartsContainer.append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // Pie layout
    const pie = d3.pie().value(d => d.value);

    // Arc generator for pie chart
    const arcPie = d3.arc().innerRadius(0).outerRadius(radius);

    // Arc generator for donut chart
    const arcDonut = d3.arc().innerRadius(radius / 2).outerRadius(radius);

    // Color scale
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Draw pie chart
    pieSvg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arcPie)
        .attr("fill", d => color(d.data.label))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

    // Add labels to pie chart
    pieSvg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arcPie.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => `${d.data.label}: ${d.data.value}`);

    // Draw donut chart
    donutSvg.selectAll("path")
        .data(pie(data))
        .enter()
        .append("path")
        .attr("d", arcDonut)
        .attr("fill", d => color(d.data.label))
        .attr("stroke", "#fff")
        .attr("stroke-width", 2);

    // Add labels to donut chart
    donutSvg.selectAll("text")
        .data(pie(data))
        .enter()
        .append("text")
        .attr("transform", d => `translate(${arcDonut.centroid(d)})`)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => `${d.data.label}: ${d.data.value}`);
});