
var width = 800,
    height = 350,
    padding = {x: 200, y: 70}
    x = d3.scaleBand().range([0, width - padding.x], 0).padding(0.2),
    y = d3.scaleLinear().range([height - padding.y, 0]);

var axisX = d3.axisBottom(x);   
var axisY = d3.axisLeft(y).ticks(5);

var canvas = d3.select('body').append('svg')
                .attr('class', 'canvas')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('width', width - padding.x)
                .attr('height', height - padding.y)
                .attr('transform', 'translate(50, 0)');

d3.json('js/data.json').then((res) => {

    var data = res.books;
    console.log(data);

    x.domain(data.map((d) => { return d.title }));
    y.domain([0, d3.max(data, (d) => { return d.pages })]);

    canvas.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, '+ (height - padding.y) +')')
        .call(axisX)
        .selectAll('text')
        .attr("y", 30)
        .attr('transform', 'rotate(10)');                  

    canvas.append('g')
        .attr('class', 'y axis')
        .call(axisY)        
        .style('text-anchor', 'end')
        .append('text')                
        .text('Pages');
    
    canvas.append('g')
        .attr('class', 'bars')
        .selectAll('bar')
        .data(data)
        .enter()
        .append('rect')
        .style('fill', 'steelblue')
        .attr('x', (d) => { return x(d.title) })
        .attr('width', x.bandwidth())
        .attr('y', (d) => { return y(d.pages) })
        .attr('height', (d) => { return height - y(d.pages) })
        .attr('transform', 'translate(0, -'+ padding.y +')')
});