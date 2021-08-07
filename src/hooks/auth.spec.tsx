import { renderHook, act } from '@testing-library/react-hooks'
import { mocked } from 'ts-jest/utils'
import { AuthProvider, useAuth } from './auth'
import { logInAsync } from 'expo-google-app-auth'

// import * as Google from 'expo-google-app-auth'

jest.mock('expo-google-app-auth')

describe('Auth Hook', () => {
  it('should be able to sign in with google account', async () => {
    const googleMocked = mocked(logInAsync as any)

    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'any_id',
        name: 'test',
        email: 'test@mail.com',
        photo: 'test-photo'
      }
    })

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user.email).toBe('test@mail.com')
  })

  it('user should not able to connect if cancel the authentication', async () => {
    const googleMocked = mocked(logInAsync as any)

    googleMocked.mockReturnValueOnce({
      type: 'cancel'
    })

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider })

    await act(() => result.current.signInWithGoogle())

    expect(result.current.user).not.toHaveProperty('id')
  })
})
