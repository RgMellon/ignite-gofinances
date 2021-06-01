import React from 'react'
import { TouchableOpacityProps } from 'react-native'

import * as S from './styles'

const icons = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle'
}

type TransactionTypeButtonProps = {
  title: string
  type: 'up' | 'down'
  isActive: boolean
} & TouchableOpacityProps

export function TransactionTypeButton({
  title,
  type,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <S.Container isActive={isActive} type={type} {...rest}>
      <S.Icon name={icons[type]} type={type} />
      <S.Title>{title}</S.Title>
    </S.Container>
  )
}
