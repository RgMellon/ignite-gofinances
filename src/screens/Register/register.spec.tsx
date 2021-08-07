import React from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import { ThemeProvider } from 'styled-components/native'

import { Register } from '.'

jest.mock('@react-navigation/native')

import theme from '../../global/styles/theme'

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)

describe('<Register />', () => {
  it('should be open the category modal when user click on the button', async () => {
    const { getByTestId } = render(<Register />, {
      wrapper: Providers
    })

    const categoryModal = getByTestId('modal-category')
    const buttonCategory = getByTestId('button-category')

    expect(categoryModal.props.visible).toBeFalsy()

    fireEvent.press(buttonCategory)

    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy()
    })
  })
})
