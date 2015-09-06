var sample_data = [
  {"value": 100, "name": "alpha", "weight": 80},
  {"value": 70, "name": "beta", "weight": 43},
  {"value": 40, "name": "gamma", "weight": 64},
  {"value": 15, "name": "delta", "weight": 20},
  {"value": 5, "name": "epsilon", "weight": 92},
  {"value": 1, "name": "zeta", "weight": 35}
]
var visualization = d3plus.viz()
  .container("#vis")
  .data(sample_data)
  .type("tree_map")
  .id("name")
  .size("value")
  .draw()
