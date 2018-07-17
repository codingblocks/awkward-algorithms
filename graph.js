const Node = require('./node')

module.exports = class Graph {
  constructor (distances) {
    let nodes = {}
    distances.map((d) => {
      let n1 = d[0]
      let n2 = d[1]
      let distance = d[2]
      nodes[n1] = nodes[n1] || new Node(n1)
      nodes[n2] = nodes[n2] || new Node(n2)
      nodes[n1].addNeighbor(nodes[n2], distance)
      // Note: we are not assuming this graph is symmetric!
    })
    this.nodes = nodes
  }
}
