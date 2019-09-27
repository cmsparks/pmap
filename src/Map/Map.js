import * as d3 from "d3"
import Table from "../Table/Table"

export default class Map {
  
  constructor(url, root) {
    this.root = root
    this.width = Number(root.getAttribute("width"))
    this.height = Number(root.getAttribute("height"))
    
    this.mapGroup = d3.select(root).append('g')
      .attr("height", this.height)
      .attr("width", this.width);
    
    this.colorScale =  d3.scaleLinear()
      .domain([-.20,0,.20])
      .range(["#7777ff", "#ffffff", "#ff7777"]);

    this.zoom = d3.zoom()
      .scaleExtent([1,8])
      .on("zoom", this.zoomed.bind(this))

    d3.select(this.root).call(this.zoom)
    
    this.mapData = null
    this.projection = null
    this.path = null
    this.selected = null
    this.table = null

    d3.json(url).then(function(data) {

      this.mapData = data 
      this.selected = this.mapData
      this.projection = d3.geoMercator()
        .fitSize(
          [this.width, this.height],
          {type: "FeatureCollection", features: this.mapData.features }
        )
      this.path = d3.geoPath(this.projection)
      this.draw()

      this.table = new Table(this, document.body)
      this.table.draw()
    }.bind(this))
  }

  draw() {
    this.mapGroup.selectAll("path")
      .data(this.mapData.features)
      .enter().append("path")
        .on("click", this.clicked.bind(this))
        .attr("d", this.path)
        .attr("stroke", "black")
        .attr("stroke-width", "0.25")
        .attr("county", (d) => {return d.properties.NAME})
        .attr("fill", this.fillCounty.bind(this))
  }

  clicked(d) {
    if(this.selected !== this.mapData) {
      let selection = this.selected
      this.selected = this.mapData
      
      d3.select(this.root)
        .transition()
        .duration(750).call(this.zoom.transform, d3.zoomIdentity)
      
      this.mapGroup
        .selectAll("path")
        .filter(function(n, i) {
          if(this.getAttribute("county") !== selection.properties.NAME) {
            return n
          }
        })
        .transition()
        .attrTween("opacity", function() {
          return function(t) {
            return t
          }
        })
        .duration(750) 
      this.table.draw()
    }
    else {
      this.selected = d
      let [[x0,y0], [x1,y1]] = this.path.bounds(d)

      d3.event.stopPropagation();

      d3.select(this.root)
        .transition()
        .duration(750).call(
        this.zoom.transform,
        d3.zoomIdentity
          .translate( this.width / 2, this.height / 2)
          .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / this.width, (y1 - y0) / this.height)))
          .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.mouse(this.root)
      )

      this.mapGroup
        .selectAll("path")
        .filter(function(n, i) {
          if(this.getAttribute("county") !== d.properties.NAME) {
            return n
          }
        })
        .transition()
        .attrTween("opacity", function() {
          return function(t) {
            return 1-t
          }
        })
        .duration(750) 
      this.table.draw()
    }
  }

  fillCounty(d) {
    let demvotes = parseInt(d.properties.DemVotes.replace(/,/g, ''))
    let repvotes = parseInt(d.properties.RepVotes.replace(/,/g, ''))
    
    if(this.selected != null && this.selected == d) {
      return "#ffffff"
    }
    return this.colorScale((repvotes-demvotes)/(demvotes+repvotes))
  }

  zoomed() {
    const {transform} = d3.event
    this.mapGroup.attr("transform", transform)
    this.mapGroup.attr("stroke-width", 1/transform.k)
  }
}

