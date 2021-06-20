import React from 'react'
import { Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import { useAuth } from '../../hooks/auth'

import * as S from './styles'

export function SignIn() {
  const { user, signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInGoogle() {
    try {
      await signInWithGoogle()
    } catch (err) {
      Alert.alert('Ops, aconteceu algo de errado')
    }
  }

  async function handleSignInWithApple() {
    try {
      await signInWithApple()
    } catch (err) {
      Alert.alert('Ops, aconteceu algo de errado')
    }
  }

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
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com o Google"
            onPress={handleSignInGoogle}
          />

          <SignInSocialButton
            svg={AppleSvg}
            title="Entrar com o Apple"
            onPress={handleSignInWithApple}
          />
        </S.FooterWrapper>
      </S.Footer>
    </S.Container>
  )
}
