import React from 'react'

import { render } from '@testing-library/react-native'
import { Input } from '.'

import theme from '../../../global/styles/theme'
import { ThemeProvider } from 'styled-components/native'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('<Input />', () => {
  it('must have border boder color when active', () => {
    const { getByTestId } = render(
      <Input
        testID="input-email"
        placeholder="E-mail"
        autoCorrect={false}
        active={true}
      />,
      {
        wrapper: Providers
      }
    )

    const inputComponent = getByTestId('input-email')

    expect(inputComponent.props.style[0].borderColor).toEqual('#E83F5B')

    expect(inputComponent.props.style[0].borderWidth).toEqual(3)
  })
})
