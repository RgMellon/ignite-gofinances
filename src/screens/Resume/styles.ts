import { RFValue } from 'react-native-responsive-fontsize'
import styled from 'styled-components/native'

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(112)}px;

  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
`

export const Content = styled.ScrollView``

export const ChartContainer = styled.View`
  align-items: center;
  width: 100%;
`