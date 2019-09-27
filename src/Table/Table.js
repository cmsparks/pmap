export default class Table {
  constructor(map, root) {
    this.root = root
    this.map = map
    console.log(this.map)
  }

  get repVotes() {
    if(this.map.selected.type == "Feature") {
      return parseInt(this.map.selected.properties.RepVotes.replace(/,/g, ''))
    }
    return this.map.selected.features
      .map((feature) => parseInt(feature.properties.RepVotes.replace(/,/g, '')))
      .reduce((acc, v) => acc + v)
  }

  get demVotes() {
    console.log("asdfasdf")
    if(this.map.selected.type == "Feature") {
      return parseInt(this.map.selected.properties.DemVotes.replace(/,/g, ''))
    }
    return this.map.selected.features
      .map((feature) => parseInt(feature.properties.DemVotes.replace(/,/g, '')))
      .reduce((acc, v) => acc + v)
  }

  get otherVotes() {
    if(this.map.selected.type == "Feature") {
      return parseInt(this.map.selected.properties.OtherVotes.replace(/,/g, ''))
    }
    return this.map.selected.features
      .map((feature) => parseInt(feature.properties.OtherVotes.replace(/,/g, '')))
      .reduce((acc, v) => acc + v)
  }

  get totalVotes() {
    return this.repVotes + this.demVotes + this.otherVotes
  }

  get repPercent() {
    return this.repVotes/this.totalVotes
  }

  get demPercent() {
    return this.demVotes/this.totalVotes
  }

  draw() {
    let htmlString =  `
    <h1>Florida Gubernatorial Election 2018</h1>
    <table>
      <tr>
        <th class="winner" style="border-bottom: 2px solid red">Ron DeSantis</th>
        <th style="border-bottom: 2px solid blue">Andrew Gillum</th>
      </tr>
      <tr>
        <td class="winner">${Math.round(this.repPercent*1000)/10}%</td>
        <td>${Math.round(this.demPercent*1000)/10}%</td>
      </tr>
      <tr>
        <td class="winner">${this.repVotes}</td>
        <td>${this.demVotes}</td>
      </tr>
    </table>

    <div id="scale">
      <div style="width:100%; height:80%; background: linear-gradient(90deg, #FF0000 0%, #FFFFFF 51.94%, #0404FF 100%);"></div>
      <p align="left" style="float:left">+20 Rep</p><p align="right">+20 Dem</p>
    </div>

    <div id="source">
      <p>Data: CQ Press</p>
      <p>Shapefiles: US Census Bureau</p>
    </div>
    `
    let div = document.getElementById("info")
    if(div === null) {
      div = document.createElement('div')
    }
    div.setAttribute("id", "info")
    div.innerHTML = htmlString;
    this.root.appendChild(div)
  }


  get locationString() {
    return "Florida"
  }
}
