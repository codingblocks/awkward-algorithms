const find = (distances, key) => {
  return distances.find(i => {
    return i.key === key
  })
}

const inner = (distances, unvisited, currentNode) => {
  currentNode.neighbors.forEach(neighbor => {
    neighborDistance = find(distances, neighbor.node.name)
    let myDistanceFromStart = find(distances, currentNode.name).distance
    if(neighborDistance.distance === null) {
      console.log(`New reachable node ${neighbor.node.name} (${neighbor.distance} + ${myDistanceFromStart})`)
      neighborDistance.distance = neighbor.distance + myDistanceFromStart
    } else {
      let bestDistance = find(distances, neighbor.node.name)
      console.log(`Current best distance to ${neighbor.node.name} is ${bestDistance.distance}`)
      let myDistanceToNext = myDistanceFromStart + neighbor.distance
      console.log(`My distance (startNode => ${currentNode.name}) is ${myDistanceFromStart} + ${neighbor.distance} = ${myDistanceToNext}`)
      if(myDistanceToNext < bestDistance.distance) {
        console.log(`Recording new shortest distance to ${currentNode.name} : ${myDistanceToNext}`)
        bestDistance.distance = myDistanceToNext
      }
    }
  })

  // now find the unvisited node with the lowest distance
  let nextNode = null
  let lowestDistance = null
  Object.entries(unvisited).forEach(unvisitedPair => {
    let nodeDistance = find(distances, unvisitedPair[0])

    if(nodeDistance.distance === null) {
      console.log(`Skipping ${unvisitedPair[0]} because distance is unknown`)
      return
    }

    if(nextNode == null || nodeDistance.distance < lowestDistance) {
      nextNode = nodeDistance.node
      lowestDistance = nodeDistance.distance
      console.log(`Setting next to ${unvisitedPair[0]} (${nodeDistance.distance})`)
    }
  })

  return nextNode
}

const algorithm = (graph, startName) => {
  // Create an array of distances,
  // * Initialize everything to null
  // * Except for the starting node, which is 0
  // Create a list of unvisited nodes
  let unvisited = {}
  let distances = Object.entries(graph.nodes).map((i) => {
    unvisited[i[0]] = i[1] // ew! side-effect!
    return {
      key: i[0],
      node: i[1],
      distance: i[0] === startName ? 0 : null // distance to itself is 0
    }
  })
  
  let currentNode = graph.nodes[startName]
  while(currentNode !== null) {
    delete unvisited[currentNode.name] // Scratch off the unvisited nodes
    console.log(`Now doing ${currentNode.name} because it is the unvisited with the shortest distance`)
    currentNode = inner(distances, unvisited, currentNode)
  }
  
  return distances
}

module.exports = algorithm