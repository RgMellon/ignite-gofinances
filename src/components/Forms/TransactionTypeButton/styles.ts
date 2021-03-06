import { TouchableOpacity } from 'react-native'
import styled, { css } from 'styled-components/native'

import { Feather } from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize'

type IconProps = {
  type: 'up' | 'down'
}

type ContainerProps = {
  isActive: boolean
  type: 'up' | 'down'
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 48%;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
      border-width: 0px;
    `}

  ${({ isActive, type }) =>
    isActive &&
    type === 'up' &&
    css`
      border-width: 0px;
      background-color: ${({ theme }) => theme.colors.success_light};
    `}
`

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)};
  margin-right: 12px;

  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`
