const Graph = require('./graph')

let graph = new Graph([
  [ 'A', 'B', 4 ],
  [ 'A', 'C', 2 ],
  [ 'B', 'D', 2 ],
  [ 'E', 'D', 1 ],
  [ 'B', 'C', 3 ],
  [ 'C', 'B', 1 ],
  [ 'B', 'E', 3 ],
  [ 'C', 'D', 4 ],
  [ 'C', 'E', 5 ],
])

const algorithm = require('./d')
const result = algorithm(graph, 'A')

let find = key => {
  return result.find(i => {
    return i.key = key
  })
}

console.log(result)