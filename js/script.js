
var width = 800,
    height = 350,
    padding = {x: 250, y: 70}
    x = d3.scaleBand().range([0, width - padding.x], 0).padding(0.2),
    y = d3.scaleLinear().range([height - padding.y, 0]);

var axisX = d3.axisBottom(x);   
var axisY = d3.axisLeft(y).ticks(5);


var canvas = d3.select('body').append('svg')
                .attr('class', 'canvas')
                .attr('width', width)
                .attr('height', height)
                .attr('style', 'border: 1px solid #eee')
                .append('g')
                .attr('width', width - padding.x)
                .attr('height', height - padding.y)
                .attr('transform', 'translate('+ 50 +', 10)');


var tooltip = d3.select("body").append("div").attr("class", "toolTip");

d3.json('js/data.json').then((res) => {

    var data = res.books;

    x.domain(data.map((d) => { return d.title }));
    y.domain([0, d3.max(data, (d) => { return d.pages })]);

    canvas.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, '+ (height - padding.y) +')')
        .call(axisX)
        .selectAll('text')
        .style('text-anchor', 'start')
        .attr("y", 10)
        .attr('transform', 'rotate(10)');                  

    canvas.append('g')
        .attr('class', 'y axis')
        .call(d3.axisLeft(y).tickSizeInner([-width + padding.x ]))
        .append('text')
        .attr('transform', 'translate(-10, 3)')
        .attr('fill', 'black')        
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
        .attr('height', (d) => { return height - padding.y - y(d.pages) })
        

    canvas.selectAll('.bars rect')
        .on("mousemove", function(d) {
            d3.select(this)
                .transition()
                .duration("200")               
                .style("fill", "red");
            tooltip
            .style("left", d3.event.pageX - 50 + "px")
            .style("top", d3.event.pageY - 30 + "px")
            .style("display", "inline-block")
            .html('Author: ' + d.author);
        })
        .on("mouseout", function(d, i) {
            d3.select(this)
                .transition()
                .duration("200")
                .style("fill", "steelblue");
            tooltip.style("display", "none");
        });
        
});