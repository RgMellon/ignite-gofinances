import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import { SvgProps } from 'react-native-svg'

import * as S from './styles'

type Props = {
  title: string
  svg: React.FC<SvgProps>
} & RectButtonProps

export function SignInSocialButton({ title, svg: Svg, ...rest }: Props) {
  return (
    <S.Button {...rest}>
      <S.ImageContainer>
        <Svg />
      </S.ImageContainer>

      <S.Text>{title}</S.Text>
    </S.Button>
  )
}
