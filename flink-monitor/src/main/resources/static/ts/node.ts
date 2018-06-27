import d3 = require("d3");
import $ =require("jquery");
import {Task} from "./datastructure";

let arcOut = d3.arc()
    .innerRadius(6)
    .outerRadius(12)
    .startAngle(1 * Math.PI);
let arcIn = d3.arc()
    .innerRadius(6)
    .outerRadius(12)
    .startAngle(1 * Math.PI);



export function drawNode(point, posx:number , posy:number, d:Task) {
    let svg = point,
        g = svg.append("g")
            .attr("transform", "translate(" + posx + "," + posy + ")");

    let outQueue = g.append("path")
        .datum({endAngle: 0 * Math.PI})
        .style("fill", "white")
        .style("stroke", "black")
        .attr("d", arcIn)
        .attr("class", "outQueue")
        .attr("id", encodeURIComponent(d.name + "-" + "outQueue"));



    let inQueueOutline = g.append("path")
        .datum({endAngle: 2 * Math.PI})
        .style("stroke", "black")
        .style("fill", "white")
        .attr("d", arcOut)
        .attr("class", "inQueueOutline");
    let inQueue = g.append("path")
        .datum({endAngle: 2 * Math.PI})
        .style("fill", "white")
        .style("stroke", "black")
        .attr("d", arcOut)
        .attr("class", "inQueue")
        .attr("id", encodeURIComponent(d.name + "-" + "inQueue"));
    return g.node();

}
export function updateNode(nodes:Array<object>, input:boolean, output:boolean) {
    let colorScale =  d3.scaleLinear()
                        .domain([0, 1.5])
                        .range(["lightgreen", "red"]);


    d3.selectAll(".inQueue")
        .data(nodes)
        .datum(function (d) {
            return {endAngle: (1 + d.value) * Math.PI, color: colorScale(d.value)}
        })
        .style("fill", function (d) {
            return d.color;
        })
        .transition()
        .duration(500)
        .attrTween("d", arc2Tween);

}
function arc2Tween(d) {
    let interp = d3.interpolate(this._current, d);
    this._current = d;
    return function (t) {
        let tmp = interp(t);
        return arcIn(tmp);
    }
}
