import React, { useState } from 'react'
import { ActivityIndicator, Alert } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

import { useTheme } from 'styled-components'

import AppleSvg from '../../assets/apple.svg'
import GoogleSvg from '../../assets/google.svg'
import LogoSvg from '../../assets/logo.svg'
import { SignInSocialButton } from '../../components/SignInSocialButton'

import { useAuth } from '../../hooks/auth'

import * as S from './styles'

export function SignIn() {
  const theme = useTheme()

  const [isLoading, setIsLoading] = useState(false)

  const { signInWithGoogle, signInWithApple } = useAuth()

  async function handleSignInGoogle() {
    setIsLoading(true)
    try {
      return await signInWithGoogle()
    } catch (err) {
      console.log(err)
      Alert.alert('Ops, aconteceu algo de errado')
      setIsLoading(false)
    }
  }

  async function handleSignInWithApple() {
    setIsLoading(true)
    try {
      return await signInWithApple()
    } catch (err) {
      Alert.alert('Ops, aconteceu algo de errado')
    } finally {
      setIsLoading(false)
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
        {isLoading && (
          <ActivityIndicator
            style={{ marginTop: 18 }}
            size="small"
            color={theme.colors.shape}
          />
        )}
      </S.Footer>
    </S.Container>
  )
}
