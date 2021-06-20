import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { SignIn } from '../screens/SignIn'

const Stack = createStackNavigator()

function AuthRoutes() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Entrar" component={SignIn} />
    </Stack.Navigator>
  )
}

export { AuthRoutes }
