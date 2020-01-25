import React from 'react'
import mapboxgl, { LngLat, polyline } from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import { mapboxapikey } from '../settings'
import mapboxSdk from '@mapbox/mapbox-sdk/umd/mapbox-sdk'
import {
  getLocation,
  getAvailableFeaturesBy,
  generateMapElement,
  getDirectionGeometry,
  getWaypointsFromMarker,
} from '../helpers/mapHelpers'

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
    })
  }

  setLang = () => {
    const language = new MapboxLanguage({
      defaultLanguage: 'ru',
    })

    this.map.addControl(language)
  }

  addLayer = () => {
    /*map.flyTo({
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

  initDraggableMarker = (coordinate, name) => {
    const { updateFutures } = this.props

    const element = generateMapElement(name)

    const marker = new mapboxgl.Marker({
      draggable: true,
      element,
    })
      .setLngLat(coordinate)
      .addTo(this.map)

    markers.push(marker)

    const onDragEnd = () => {
      let lngLat = marker.getLngLat()

      getAvailableFeaturesBy(`${lngLat.lng},${lngLat.lat}`).then((features) => {
        if (features.length) {
          updateFutures(features[0], name)
        }
      })
    }

    marker.on('dragend', onDragEnd)
  }

  generateDirections = () => {
    if (markers.length < 2) return

    let waypoints = getWaypointsFromMarker(markers)

    getDirectionGeometry(waypoints).then((geometry) => {
      const routeSource = this.map.getSource('route')

      routeSource.setData({
        type: 'Feature',
        geometry,
      })
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
