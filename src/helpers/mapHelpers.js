import { mapboxapikey } from '../settings'
import mapboxSdk from '@mapbox/mapbox-sdk/umd/mapbox-sdk'
import * as turf from '@turf/turf'

const mapbox = mapboxSdk({
  accessToken: mapboxapikey,
})

export function getLocation(cb) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(cb)
  } else {
    return new Error('Не поддерживается')
  }
}

export const getAvailableFeaturesBy = (query, limit = 0) => {
  if (!query.length) {
    return Promise.reject()
  }
  return mapbox.geocoding
    .forwardGeocode({
      query,
      limit,
    })
    .send()
    .then((response) => {
      const match = response.body

      return match.features
    })
}

export const generateMapElement = (name) => {
  const markersOpt = {
    address_from: {
      url: require('../assets/img/point_from.png'),
      size: {
        width: 44,
        height: 44,
      },
    },
    name_middle: {
      url: '',
      size: {
        width: 0,
        height: 0,
      },
    },
    address_to: {
      url: require('../assets/img/point_to.png'),
      size: {
        width: 24,
        height: 24,
      },
    },
  }
  const currentMarker = markersOpt[name]

  let el = document.createElement('div')
  el.className = `marker ${name}`
  el.style.backgroundImage = `url('${currentMarker.url}')`
  el.style.width = `${currentMarker.size.width}px`
  el.style.height = `${currentMarker.size.height}px`

  return el
}

export const getDirectionGeometry = (waypoints) => {
  return mapbox.directions
    .getDirections({
      language: 'ru',
      geometries: 'geojson',
      waypoints,
    })
    .send()
    .then(({ body: directions }) => {
      const route = directions.routes[0]
      return route.geometry
    })
}

export const getWaypointsFromMarker = (markers) => {
  let waypoints = []

  for (let marker of markers) {
    let lngLat = marker.getLngLat()

    waypoints.push({
      coordinates: [lngLat.lng, lngLat.lat],
    })
  }

  return waypoints
}

export const animateWay = (map, geometry) => {
  if (!geometry.coordinates.length) return

  let currentGeometry = {
    coordinates: [],
    type: 'LineString',
  }

  var line = turf.lineString(geometry.coordinates)
  var lineDistance = turf.lineDistance(line)

  var arc = []
  var steps = 100

  for (var i = 0; i < lineDistance; i += lineDistance / steps) {
    var segment = turf.along(line, i)
    arc.push(segment.geometry.coordinates)
  }

  const draw = () => {
    const routeSource = map.getSource('route')
    currentGeometry.coordinates.push(arc.shift())

    routeSource.setData({
      type: 'Feature',
      geometry: currentGeometry,
    })

    if (arc.length) {
      requestAnimationFrame(draw)
    }
  }

  draw()
}
