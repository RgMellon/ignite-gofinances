import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type CategorySelectorProps = {
  title: string
  onPress: () => void
}

export function CategorySelectButton({
  title,
  onPress
}: CategorySelectorProps) {
  return (
    <S.Container onPress={onPress}>
      <S.Category>{title}</S.Category>

      <S.Icon name="chevron-down" />
    </S.Container>
  )
}
