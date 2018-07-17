const find = (distances, key) => {
  return distances.find(i => {
    return i.key === key
  })
}

const logDistances = (distances) => {
  let order = 'SABCDE'.split('')
  let result = []
  for(var i = 0; i < order.length; i++) {
    let key = order[i]
    let distance = find(distances, key).distance
    result.push(`${key}:${distance}`)
  }
  console.log(result.join(' '))
}


const algorithm = (graph, startName) => {
  // Create an array of distances,
  // * Initialize everything to null
  // * Except for the starting node, which is 0
  let distances = Object.entries(graph.nodes).map((i) => {
    return {
      key: i[0],
      node: i[1],
      distance: i[0] === startName ? 0 : null // distance to itself is 0
    }
  })
  
  logDistances(distances)
  // BF relies on the notion that we only have to look at |v| - 1 
  for(var i = 0; i < distances.length - 1; i++) {
    console.log(`Iteration ${i + 1}`)
    for(var j = 0; j < distances.length - 1; j++) {
      console.log(`\tSubiteration ${j + 1}`)
      let currentNode = distances[j].node
      console.log(`\tcurrentNode: ${currentNode.name}`)
      if(distances[j].distance === null) {
        console.log(`\tSkipping ${currentNode.name} because we don't know how to get there yet`)
        continue
      }

      let distanceToCurrent = find(distances, currentNode.name).distance
      console.log(`\t\tDistance from start to ${currentNode.name}: ${distanceToCurrent}`)
      for(var k = 0; k < currentNode.neighbors.length; k++) {
        let currentNeighbor = currentNode.neighbors[k]
        console.log(`\t\tLooking at neighbor ${currentNeighbor.node.name} with distance from ${currentNode.name}: ${currentNeighbor.distance}`)
        let bestDistanceToNeighbor = find(distances, currentNeighbor.node.name)
        console.log(`\t\tCurrent best distance to neighbor ${currentNeighbor.node.name} is ${bestDistanceToNeighbor.distance}`)

        if (bestDistanceToNeighbor.distance === null) {
          console.log(`\t\tInitializing best distance from start to ${currentNeighbor.node.name} is ${distanceToCurrent} + ${currentNeighbor.distance}`)
          bestDistanceToNeighbor.distance = distanceToCurrent + currentNeighbor.distance
        } else {
          let contenderDistance = currentNeighbor.distance + distanceToCurrent
          if(contenderDistance < bestDistanceToNeighbor.distance) {
            console.log(`\t\tNew best distance found: ${contenderDistance} < ${bestDistanceToNeighbor.distance}`)
            bestDistanceToNeighbor.distance = contenderDistance
          }
        }
      }
      logDistances(distances)
    }
  }
  
  return distances
}

module.exports = algorithm