import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

type CategorySelectorProps = {
  title: string
  onPress: () => void
} & TouchableOpacityProps

export function CategorySelectButton({
  title,
  onPress,
  ...rest
}: CategorySelectorProps) {
  return (
    <S.Container onPress={onPress} {...rest}>
      <S.Category>{title}</S.Category>

      <S.Icon name="chevron-down" />
    </S.Container>
  )
}
