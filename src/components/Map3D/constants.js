export const paintFill = {
  'fill-color': ['get', 'fill'],
  'fill-opacity': ['get', 'fill-opacity'],
}
export const paintLine = {
  'line-opacity': 1,
  'line-color': ['get', 'stroke'],
  'line-width': 1.5,
}
export const paintLineFluvialFlood = {
  'line-opacity': 0.3,
  'line-color': ['get', 'stroke'],
  'line-width': 0.75,
}
export const paintLineBuff = {
  'line-opacity': 1,
  'line-color': ['get', 'stroke'],
  'line-width': 1,
  'line-dasharray': [2, 3],
}
