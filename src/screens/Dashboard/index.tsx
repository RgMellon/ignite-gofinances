import React from 'react'

import { HighlightCart } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardData
} from '../../components/TransactionCard'

import * as S from './styles'

export type DataListProps = {
  id: string
} & TransactionCardData

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: 'Desenvolvimento de site',
      amount: 'R$ 12.00,00',
      category: {
        name: 'vendas',
        icon: 'dollar-sign'
      },
      date: '12/08/2020'
    },
    {
      id: '2',
      type: 'negative',
      title: 'Pizza maneira',
      amount: 'R$ 50,00',
      category: {
        name: 'Alimentação',
        icon: 'coffee'
      },
      date: '12/08/2020'
    }
  ]

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

          <S.LogoutButton onPress={() => alert('oi')}>
            <S.Icon name="power" />
          </S.LogoutButton>
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

      <S.Transactions>
        <S.Title> Listagem </S.Title>

        <S.TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />

        {/* <TransactionCard data={data} /> */}
      </S.Transactions>
    </S.Container>
  )
}
