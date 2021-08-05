import React from 'react'

import { View, Text, TextInput, Button, Keyboard } from 'react-native'
// import * as S from './styles'

export function Profile() {
  return (
    <View>
      <Text testID="text-title"> Perfil </Text>

      <TextInput
        testID="input-name"
        placeholder="Nome"
        autoCorrect={false}
        returnKeyType="done"
        value="Renan"
        onSubmitEditing={Keyboard.dismiss}
      />

      <TextInput
        testID="input-surname"
        placeholder="SobreNome"
        autoCorrect={false}
        value="Melo"
      />

      <Button title="Salvar" onPress={() => {}} />
    </View>
  )
}
