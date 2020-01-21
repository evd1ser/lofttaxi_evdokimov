import React from 'react'
import mapboxgl, { LngLat, polyline } from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { getLocation } from '../helper'
import { mapboxapikey } from '../settings'
import mapboxSdk from '@mapbox/mapbox-sdk/umd/mapbox-sdk'

const mapbox = mapboxSdk({
  accessToken: mapboxapikey,
})

const mapToken = mapboxapikey
let markers = []

class MapEl extends React.Component {
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      accessToken: mapToken,
      zoom: 8,
    })

    this.setLang()

    this.map.on('load', () => {
      this.addLayer()
      this.generateDirections()
    })

    getLocation(({ coords: { longitude, latitude } }) => {
      this.map.setCenter([longitude, latitude])
      // this.initDraggableMarker([longitude, latitude])
    })
  }

  setLang = () => {
    const language = new MapboxLanguage({
      defaultLanguage: 'ru',
    })

    this.map.addControl(language)
  }

  addLayer = () => {
    /*    map.flyTo({
      center: coordinates[0],
      zoom: 15,
    })*/

    this.map.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [],
        },
      },
    })

    this.map.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#ffc617',
        'line-width': 4,
      },
    })
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { futures } = this.props

    for (let marker of markers) {
      marker.remove()
    }
    const futuresArray = Object.values(futures)
    const futuresKeys = Object.keys(futures)

    if (futuresArray.length) {
      markers = []

      for (let futureIndex in futuresArray) {
        this.initDraggableMarker(
          futuresArray[futureIndex].center,
          futuresKeys[futureIndex]
        )
      }
    }

    this.generateDirections()
  }

  generateMapElement = (name) => {
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

  initDraggableMarker = (coordinate, name) => {
    const { updateFutures } = this.props

    const element = this.generateMapElement(name)

    const marker = new mapboxgl.Marker({
      draggable: true,
      element,
    })
      .setLngLat(coordinate)
      .addTo(this.map)

    markers.push(marker)

    const onDragEnd = () => {
      let lngLat = marker.getLngLat()

      this.getResultOfPoint(`${lngLat.lng},${lngLat.lat}`).then((data) => {
        updateFutures(data, name)
      })
    }

    // marker.getElement().addEventListener('click', function(e) {
    // })
    marker.on('dragend', onDragEnd)
  }

  generateDirections = () => {
    if (markers.length < 2) return

    let waypoints = []

    for (let marker of markers) {
      let lngLat = marker.getLngLat()

      waypoints.push({
        coordinates: [lngLat.lng, lngLat.lat],
      })
    }
    mapbox.directions
      .getDirections({
        language: 'ru',
        geometries: 'geojson',
        waypoints,
      })
      .send()
      .then(({ body: directions }) => {
        const route = directions.routes[0]
        const routeSource = this.map.getSource('route')

        routeSource.setData({
          type: 'Feature',
          geometry: route.geometry,
        })
      })
  }

  getResultOfPoint = (query) => {
    return mapbox.geocoding
      .forwardGeocode({
        query,
      })
      .send()
      .then((response) => {
        const match = response.body

        if (match.features.length) {
          return match.features[0]
        }

        return 0
      })
  }

  componentWillUnmount() {
    markers = []
    this.map.removeLayer('route')
    this.map.removeSource('route')
    this.map.remove()
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
      zIndex: -1,
    }

    return (
      <>
        <div style={style} ref={(el) => (this.mapContainer = el)} />
      </>
    )
  }
}

export default MapEl
