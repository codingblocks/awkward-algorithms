module.exports = class Node {
  constructor (name) {
    this.name = name
    this.neighbors = []
  }
  addNeighbor (node, distance) {
    this.neighbors.push({ node, distance })
  }
}
