import React from 'react'

import { render } from '@testing-library/react-native'

import { Profile } from '../../screens/Profile'

describe('<Profile />', () => {
  it('should check if show correctly input placeholder', () => {
    const { getByPlaceholderText } = render(<Profile />)

    const inputName = getByPlaceholderText('Nome')

    expect(inputName.props.placeholder).toBeTruthy()
  })

  it('should checks if user data has been loaded', () => {
    const { getByTestId } = render(<Profile />)

    const inputName = getByTestId('input-name')
    const inputSurname = getByTestId('input-surname')

    expect(inputName.props.value).toEqual('Renan')
    expect(inputSurname.props.value).toEqual('Melo')
  })

  it('should check if the input have returnKeyType done', () => {
    const { getByTestId } = render(<Profile />)
    const inputName = getByTestId('input-name')

    expect(inputName.props.returnKeyType).toEqual('done')
  })

  it('should check if the title render is correctly', () => {
    const { getByTestId } = render(<Profile />)

    const textTitle = getByTestId('text-title')

    expect(textTitle.props.children).toContain('Perfil')
  })
})
