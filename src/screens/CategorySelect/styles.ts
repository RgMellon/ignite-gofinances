import { RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons'

import styled from 'styled-components/native'

type CategoryProps = {
  isActive: boolean
}

import { GestureHandlerRootView } from 'react-native-gesture-handler'

export const Container = styled(GestureHandlerRootView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary};
  height: ${RFValue(113)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  height: ${RFValue(18)}px;
`

export const Categories = styled.FlatList`
  flex: 1;
  width: 100%;
`

export const Category = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: ${RFValue(15)}px;

  flex-direction: row;
  align-items: center;

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`

export const Icon = styled(Feather)`
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-right: 16px;
`

export const Name = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`

export const Separator = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.text};
`

export const Footer = styled.View`
  width: 100%;
  padding: 24px;
`