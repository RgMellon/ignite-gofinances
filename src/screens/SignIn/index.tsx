import React from 'react'
import { RFValue } from 'react-native-responsive-fontsize'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import * as S from './styles'

export function SignIn() {
  return (
    <S.Container>
      <S.Header>
        <S.TitleWrapper>
          <LogoSvg width={RFValue(180)} height={RFValue(100)} />
          <S.Title>
            Controle suas {'\n'}
            finanças de forma {'\n'} muito simples
          </S.Title>
        </S.TitleWrapper>

        <S.SignInTitle>
          Faça seu login {'\n'}com uma das contas abaixo
        </S.SignInTitle>
      </S.Header>

      <S.Footer>
        <S.FooterWrapper>
          <SignInSocialButton svg={GoogleSvg} title="Entrar com o Google" />
          <SignInSocialButton svg={AppleSvg} title="Entrar com o Apple" />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  )
}
