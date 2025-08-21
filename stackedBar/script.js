
const svg = d3.select('svg')
    .attr('height', 500)
    .attr("width", 1000)

const data = [10, 25, 37, 44, 50, 60, 85, 90, 90];
const stack = [75, 35, 40, 25, 20, 55, 30, 10, 20];
const stack2 = [20, 20, 20, 20, 25, 20, 21, 25, 35];
const legendArr = [25, 25, 25];
const legendColor = ['teal', 'magenta', 'green'];
const legendText = ['Bachelors', 'Masters', 'Doctorate']
const x_axis = ['Paris', 'London', 'Berlin', 'Tokyo', 'Brussels', 'Oslo', 'Rome', 'Seoul', 'Kabul']

const y_coord = 300;
const barWidth = 20;
const barPadding = 30;

const last_index = data.length - 1;

var color_grading = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range(['grey', 'black']);

    const bar = svg.selectAll('rect.main-bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'main-bar')
    .attr('x', function(d, i) { return i * (barWidth + barPadding) + 40; })
    .attr('y', d => (y_coord - (d * 2)))
    .attr('height', d => d * 2)
    .attr('width', barWidth * 2)
    .attr('fill', 'teal')
    .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'blue');
    })
    .on('mouseout', function(event, d) {
        d3.select(this).attr('fill', 'teal');
    });

const stackBar1 = svg.selectAll('.rect1')
    .data(stack)
    .enter()
    .append('rect')
    .attr('class', 'stack1')
    .attr('x', function(d, i) { return i * (barWidth + barPadding) + 40; })
    .attr('y', function(d, i) { return (y_coord - (data[i] * 2)) - (d * 2); })
    .attr('height', d => d * 2)
    .attr('width', barWidth * 2)
    .attr('fill', 'magenta')
    .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'red');
    })
    .on('mouseout', function(event, d) {
        d3.select(this).attr('fill', 'magenta');
    });

const stackBar2 = svg.selectAll('.rect2')
    .data(stack2)
    .enter()
    .append('rect')
    .attr('class', 'stack2')
    .attr('x', function(d, i) { return i * (barWidth + barPadding) + 40; })
    .attr('y', function(d, i) { return (y_coord - (stack[i] * 2)) - (data[i] * 2) - (d * 2); })
    .attr('height', d => d * 2)
    .attr('width', barWidth * 2)
    .attr('fill', 'green')
    .on('mouseover', function(event, d) {
        d3.select(this).attr('fill', 'darkgreen');
    })
    .on('mouseout', function(event, d) {
        d3.select(this).attr('fill', 'green');
    });

const Xaxis = svg.append('rect')
    .attr('x', 40)
    .attr('y', y_coord + 5)
    .attr('height', 5)
    // Transition starts
    //.transition()
    //.duration(4000)
    .attr('width', last_index * (barWidth + barPadding) + 40)
    .attr('fill', 'black');

// const Yaxis = svg.append('rect')
//     .attr('x', 30)
//     .attr('y', y_coord - (data[last_index] * 2) - 10)
//     .attr('height', data[last_index] * 2 + 20)
//     // Transition starts
//     //.transition()
//     //.duration(4000)
//     .attr('width', 5)
//     .attr('fill', 'black');

// Y Axis Labels Main
svg.selectAll('.y-label')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'mainLabel')
    .attr('x', function(d, i) {return i * (barWidth + barPadding) + 65})
    .attr('y', d => y_coord - ((d*2) / 2) + 5)
    .attr('text-anchor', 'end')
    .text(d => d)
    .attr('fill', 'white')
    .style('font-size', '12px')
    .style('font-weight', 'bold');

// Y Axis Labels Stack 1
svg.selectAll('.y-label')
    .data(stack)
    .enter()
    .append('text')
    .attr('class', 'stack1Label')
    .attr('x', function(d, i) {return i * (barWidth + barPadding) + 65})
    .attr('y', (d, i) => (y_coord - (data[i]*2)) - ((d*2) / 2) + 5)
    .attr('text-anchor', 'end')
    .text(d => d)
    .attr('fill', 'white')
    .style('font-size', '12px')
    .style('font-weight', 'bold');

// Y Axis Labels Stack 2
svg.selectAll('.y-label')
    .data(stack2)
    .enter()
    .append('text')
    .attr('class', 'stack2Label')
    .attr('x', function(d, i) {return i * (barWidth + barPadding) + 65})
    .attr('y', (d, i) => (y_coord - ((data[i]*2)) - (stack[i]*2)) - ((d*2) / 2) + 5)
    .attr('text-anchor', 'end')
    .text(d => d)
    .attr('fill', 'white')
    .style('font-size', '12px')
    .style('font-weight', 'bold');

// X Axis Labels
svg.selectAll('.x-label')
    .data(x_axis)
    .enter()
    .append('text')
    .attr('x', (d, i) => i * (barWidth + barPadding) + barWidth + 40)
    .attr('y', y_coord + 25)
    .attr('text-anchor', 'middle')
    .text(d => d)
    .attr('fill', 'black')
    .style('font-size', '12px')
    .style('font-weight' , 'bold');

const legend1 = svg.append('rect')
    .attr('x' , 600)
    .attr('y', 70)
    .attr('height', 25)
    .attr('width', 25)
    .attr('fill', 'teal')
    .on('mouseover', function(event, d) { // On hover
        d3.select(this).attr('fill', 'blue'); // Change color
    })
    .on('click', function() {
        isolate_data();
    })
    .on('mouseout', function(event, d) { // Reset color
        d3.select(this).attr('fill', 'teal');
    });

const legend2 = svg.append('rect')
    .attr('x' , 600)
    .attr('y', 70 + 40)
    .attr('height', 25)
    .attr('width', 25)
    .attr('fill', 'magenta')
    .on('mouseover', function(event, d) { // On hover
        d3.select(this).attr('fill', 'red'); // Change color
    })
    .on('click', function() {
        isolate_data2();
    })
    .on('mouseout', function(event, d) { // Reset color
        d3.select(this).attr('fill', 'magenta');
    });

const legend3 = svg.append('rect')
    .attr('x' , 600)
    .attr('y', 70 + 80)
    .attr('height', 25)
    .attr('width', 25)
    .attr('fill', 'green')
    .on('mouseover', function(event, d) { // On hover
        d3.select(this).attr('fill', 'darkgreen'); // Change color
    })
    .on('click', function() {
        isolate_data3();
    })
    .on('mouseout', function(event, d) { // Reset color
        d3.select(this).attr('fill', 'green');
    });

svg.append('text')
    .attr('x', 620)
    .attr('y', 50)
    .text('LEGEND')
    .attr('fill', 'black')
    .style('font-size', '20px');

// Legend Label
svg.selectAll('.y-label2')
    .data(legendText)
    .enter()
    .append('text')
    .attr('x', 630)
    .attr('y', (d,i)=> i * 40 + 87)
    //.attr('text-anchor', 'end')
    .text(d => d)
    .attr('fill', 'black')
    .style('font-size', '14px')
    .style('font-weight', 'bold');

function isolate_data() {

    svg.selectAll('.stack1, .stack2')
        .attr('opacity', 0.1);    

}

function isolate_data2() {

    svg.selectAll('.stack2, .main-bar')
    .attr('opacity', 0.1);   

    svg.selectAll('.stack2Label, .mainLabel')
    .attr('opacity', 0.1);   

    svg.selectAll(`.stack1Label`)
        .data(stack)
        .attr('y', d => y_coord - ((d*2) / 2) + 5)
        
    svg.selectAll(`.stack1`)
        .data(stack)
        .attr('y', d => (y_coord - (d * 2)))

}

function isolate_data3() {

    svg.selectAll('.stack1, .main-bar')
    .attr('opacity', 0.1);    

    svg.selectAll('.stack1Label, .mainLabel')
    .attr('opacity', 0.1);   

    svg.selectAll(`.stack2Label`)
        .data(stack2)
        .attr('y', d => y_coord - ((d*2) / 2) + 5)
        
    svg.selectAll(`.stack2`)
        .data(stack2)
        .attr('y', d => (y_coord - (d * 2)))

}

svg.on("click", function (event) {
    if (event.target.tagName === "svg") { // Check if the click is on the background

    svg.selectAll('.main-bar')
        .data(data)
        .attr('y', d => (y_coord - (d * 2)));

    svg.selectAll('.mainLabel')
        .data(data)
        .attr('y', d => y_coord - ((d*2) / 2) + 5);

    svg.selectAll('.stack1')
        .data(stack)
        .attr('y', function(d, i) { return (y_coord - (data[i] * 2)) - (d * 2); });

    svg.selectAll('.stack1Label')
        .data(stack)
        .attr('y', (d, i) => (y_coord - (data[i]*2)) - ((d*2) / 2) + 5);

    svg.selectAll('.stack2')
        .data(stack2)
        .attr('y', function(d, i) { return (y_coord - (stack[i] * 2)) - (data[i] * 2) - (d * 2); });
    
    svg.selectAll('.stack2Label')
        .data(stack2)
        .attr('y', (d, i) => (y_coord - ((data[i]*2)) - (stack[i]*2)) - ((d*2) / 2) + 5);

    svg.selectAll('.stack1, .main-bar')
        .attr('opacity', 1);    

    svg.selectAll('.stack1Label, .mainLabel')
        .attr('opacity', 1);  
        
    svg.selectAll('.stack2, .stack2Label')
        .attr('opacity', 1); 

    }
});