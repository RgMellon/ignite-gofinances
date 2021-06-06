import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const dataKey = '@gofinances:transactions'

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
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransaction() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response!) : []

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        const amount = Number(transaction.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date))

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date
        }
      }
    )

    setData(transactionsFormatted)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransaction()
    }, [])
  )

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
