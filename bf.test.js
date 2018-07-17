const Graph = require('./graph')

let graph = new Graph([
  [ 'S', 'E', 8 ],
  [ 'S', 'A', 10 ],
  [ 'A', 'C', 2 ],
  [ 'E', 'D', 1 ],
  [ 'D', 'C', -1 ],
  [ 'D', 'A', -4 ],
  [ 'C', 'B', -2 ],
  [ 'B', 'A', 1 ],
])

console.log('--------------------------------------------------------------------------------------------------------')

const algorithm = require('./bf')
const result = algorithm(graph, 'S')

let find = key => {
  return result.find(i => {
    return i.key = key
  })
}