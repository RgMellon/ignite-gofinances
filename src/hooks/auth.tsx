import React, { createContext, useContext, useEffect, useState } from 'react'

import * as Google from 'expo-google-app-auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as AppleAuthentication from 'expo-apple-authentication'

type AuthProviderProps = {
  children: React.ReactNode
}

type User = {
  id: string
  name: string
  email: string
  photo?: string
}

type AuthContextData = {
  user: User
  loading: boolean
  signInWithGoogle(): Promise<void>
  signInWithApple(): Promise<void>
}

const AuthContext = createContext({} as AuthContextData)

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getLoggedUser() {
      const loggedUser = await AsyncStorage.getItem('@gofinances:user')

      if (loggedUser) {
        setUser(JSON.parse(loggedUser))
      }

      setLoading(false)
    }

    getLoggedUser()
  }, [])

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '366374084282-ckfmtvt5coj4jif66r8omq5so5fmhbbj.apps.googleusercontent.com',
        iosClientId:
          '366374084282-39g4s1rr5b3udo785rfsik849716v64u.apps.googleusercontent.com',
        scopes: ['profile', 'email']
      })

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: result.user.name!,
          photo: result.user.photoUrl!
        }

        setUser(userLogged)

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged)
        )
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined
        }

        setUser(userLogged)

        await AsyncStorage.setItem(
          '@gofinances:user',
          JSON.stringify(userLogged)
        )
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signInWithGoogle, signInWithApple, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext)

  return context
}

export { AuthProvider, useAuth }
