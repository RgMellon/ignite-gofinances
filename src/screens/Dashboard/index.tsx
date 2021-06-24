import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { useTheme } from 'styled-components'
const dataKey = '@gofinances:transactions'

import { HighlightCart } from '../../components/HighlightCard'
import {
  TransactionCard,
  TransactionCardData
} from '../../components/TransactionCard'

import * as S from './styles'
import { useAuth } from '../../hooks/auth'

export type DataListProps = {
  id: string
} & TransactionCardData

type HighlightProps = {
  total: string
  lastTransaction: string
}

type HighlightData = {
  entries: HighlightProps
  expensives: HighlightProps
  resume: HighlightProps
}

export function Dashboard() {
  const theme = useTheme()
  const { signOut, user } = useAuth()

  const [isLoading, setIsLoading] = useState(true)

  const [data, setData] = useState<DataListProps[]>([])
  const [highlightData, setHighlightData] = useState<HighlightData>(
    {} as HighlightData
  )

  function getLastTransactionDate(
    collectionTransactions: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(
        Math,
        collectionTransactions
          .filter((transaction) => transaction.type === type)
          .map((transaction) => new Date(transaction.date).getTime())
      )
    )

    // console.log(lastTransaction)
    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
      'pt-BR',
      {
        month: 'long'
      }
    )}`
  }

  async function loadTransaction() {
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response!) : []

    let entriesTotal = 0
    let expensiveTotal = 0

    const transactionsFormatted: DataListProps[] = transactions.map(
      (transaction: DataListProps) => {
        if (transaction.type === 'positive') {
          entriesTotal += Number(transaction.amount)
        } else {
          expensiveTotal += Number(transaction.amount)
        }

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

    const lastTransactionsEntry = getLastTransactionDate(
      transactions,
      'positive'
    )
    const lastTransactionsExpensives = getLastTransactionDate(
      transactions,
      'negative'
    )

    const totalInterval = `01 a ${lastTransactionsExpensives}`

    setHighlightData({
      entries: {
        total: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntry}`
      },

      expensives: {
        total: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`
      },

      resume: {
        total: (entriesTotal - expensiveTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })

    setIsLoading(false)
  }

  useFocusEffect(
    useCallback(() => {
      loadTransaction()
    }, [])
  )

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </S.LoadContainer>
      ) : (
        <>
          <S.Header>
            <S.UserWrapper>
              <S.UserInfo>
                <S.Photo
                  source={{
                    uri: user?.photo
                  }}
                />
                <S.User>
                  <S.UserGreeting>Olá,</S.UserGreeting>
                  <S.UserName>{user.name}</S.UserName>
                </S.User>
              </S.UserInfo>

              <S.LogoutButton onPress={signOut}>
                <S.Icon name="power" />
              </S.LogoutButton>
            </S.UserWrapper>
          </S.Header>

          <S.HighlightCarts>
            <HighlightCart
              title="Entradas"
              lastTransaction={highlightData.entries.lastTransaction}
              amount={highlightData.entries.total}
              type="up"
            />

            <HighlightCart
              title="Saídas"
              lastTransaction={highlightData.expensives.lastTransaction}
              amount={highlightData.expensives.total}
              type="down"
            />

            <HighlightCart
              title="Total"
              lastTransaction={highlightData.resume.lastTransaction}
              amount={highlightData.resume.total}
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
        </>
      )}
    </S.Container>
  )
}
