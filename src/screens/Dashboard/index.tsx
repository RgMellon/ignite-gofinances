import React from 'react'
import { HighlightCart } from '../../HighlightCard'

import * as S from './styles'

export function Dashboard() {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/29661994?v=4'
              }}
            />
            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Renan</S.UserName>
            </S.User>
          </S.UserInfo>
          <S.Icon name="power" />
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCarts>
        <HighlightCart
          title="Entradas"
          lastTransaction="Ultima entrada dia 13 de abril de 2021"
          amount="17.400,00"
          type="up"
        />

        <HighlightCart
          title="Saídas"
          lastTransaction="Última saída dia 08 de abril"
          amount="1.259,00"
          type="down"
        />

        <HighlightCart
          title="Total"
          lastTransaction="01 á 16 de abril"
          amount="16.400,00"
          type="total"
        />
      </S.HighlightCarts>
    </S.Container>
  )
}
