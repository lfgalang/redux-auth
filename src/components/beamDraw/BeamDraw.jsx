import "./beamDraw.css"
import React, { useEffect, useRef } from 'react'
import { select } from "d3";
import * as d3 from 'd3';
import textures from 'textures';
import event from "d3";

const x0 = 150;
const y0 = 50;



var section = {
    "beam":{"b":300,"h":500},
    
    "stirrups":{"x0i":84.525,"y0i":84.525,"rdi":28.575,"bni":130.95,"hni":330.95,"x0e":75,"y0e":75,"rde":38.1,"bne":150,"hne":350},

    "rebar":{ "bars": [
        0,
        1
      ],
      "r": [
        9.55,
        17.9
      ],
      "cx": [
        113.0,
        186.99999999999997
      ],
      "cy": [
        405.95000000000005,
        397.6
      ]},

      "hooks":{"cxg":113.1,"cyg":113.1}
    }


const bars = section["rebar"]["bars"]


export default function BeamDraw() {

    //Para manejar los elelemtos como componentes d3
    const svgRef = useRef();

    console.log(bars)

    useEffect(() => {
        const svg = select(svgRef.current);


        // Concrete Section
        var t = textures.lines().size(5).strokeWidth(2);
        svg.call(t);        
        svg.append("rect")
            .attr("width", section["beam"]["b"])
            .attr("height", section["beam"]["h"])
            .attr("fill", "grey")
            .attr("x",x0)
            .attr("y",y0)
            .style("fill",t.url())

        // Feje exterior
        console.log(section["stirrups"]["bni"])
        svg.append("rect")
            .attr("width", section["stirrups"]["bne"])
            .attr("height", section["stirrups"]["hne"])
            .attr("fill", "black")  
            .attr("x",section["stirrups"]["x0e"]+x0)
            .attr("y", section["stirrups"]["y0e"]+y0)
            .attr("rx", section["stirrups"]["rde"])  
            
        // Feje interior
        svg.append("rect")
            .attr("width", section["stirrups"]["bni"])
            .attr("height", section["stirrups"]["hni"])
            .attr("fill", "grey")  
            .attr("x",section["stirrups"]["x0i"]+x0)
            .attr("y", section["stirrups"]["y0i"]+y0)
            .attr("rx", section["stirrups"]["rdi"])   
        
        svg
            .selectAll("circle")
            .data(bars)
            .join(
                enter => enter
                    .append("circle")
                    .attr("r", value => section["rebar"]["r"][value])
                    .attr("cx", value => section["rebar"]["cx"][value]+x0)
                    .attr("cy", value => section["rebar"]["cy"][value]+y0)
                    .attr("stroke", "red")
                    .attr("stroke-width",0.5)
                // update => update.attr("class", "updated"),
                // exit => exit.remove()
            )  
    },[])

    useEffect(() => {
        const svg = select(svgRef.current);
        
        var arc = d3.arc()
                .innerRadius(section["stirrups"]["rdi"])
                .outerRadius(section["stirrups"]["rde"])
                .startAngle( Math.PI / 4)
                .endAngle(-3*Math.PI / 4)
        var group = svg.append('g')
                .attr("transform", 
                    "translate("+ (section["hooks"]["cxg"]+x0) +","+ (section["hooks"]["cyg"]+y0) +")")
        group.append("path")
                .attr("d", arc)
                
    },[])


    return (
        <div className="canvas">
            <svg ref={svgRef} width="600" height="600">
            </svg>
        </div>
            
    )
}