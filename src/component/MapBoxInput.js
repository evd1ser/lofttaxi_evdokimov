import React from 'react'
import { TextField } from '@material-ui/core'
import useFocus from '../hooks/useFocus'
import { getAvailableFeaturesBy } from '../helpers/mapHelpers'

const MapBoxInput = ({
  label = 'Откуда',
  name = 'address_from',
  newPointOnMap = () => {},
  future,
}) => {
  const [value, setValue] = React.useState('')
  const [features, setFeatures] = React.useState([])
  const [focusRef, isFocus] = useFocus()

  const onChangeInputHandler = ({ target: { value } }) => {
    getAvailableFeaturesBy(value).then((features) => {
      setFeatures(features)
    })

    setValue(value)
  }

  if (future && value !== future.text && !isFocus) {
    //если передан параметр обновляем имя
    setValue(future.text)
  }

  const handleSelectOfFeature = (e, feature) => {
    e.preventDefault()
    setValue(feature.text) // устанавливаем название из геолокации
    setFeatures([]) // очищаем список найденых мест
    newPointOnMap(feature, name) // передаем наверх что выбрано это место
  }

  const renderFeature = (feature) => {
    const { id, place_name } = feature
    return (
      <div
        className="order-form__drop-item"
        key={id}
        onClick={(e) => handleSelectOfFeature(e, feature)}
      >
        {place_name}
      </div>
    )
  }

  let imagePlaceholder =
    name === 'address_from'
      ? require('../assets/icons/map_from.svg')
      : require('../assets/icons/map_to.svg')

  let addClass = features.length ? 'order-form__item_active' : ''

  return (
    <div className={`order-form__item ${addClass}`}>
      <div className="order-form__icon">
        <img src={imagePlaceholder} alt="" />
      </div>
      <div className="order-form__wrap">
        <TextField
          ref={focusRef}
          className="order-form__input"
          label={label}
          type="text"
          name={name}
          value={value}
          onChange={onChangeInputHandler}
        />
        {features && (
          <div className="order-form__dropdown">
            {features.map(renderFeature)}
          </div>
        )}
      </div>
    </div>
  )
}

export default MapBoxInput
