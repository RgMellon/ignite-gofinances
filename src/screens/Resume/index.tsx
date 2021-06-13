import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { RFValue } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'
import { VictoryPie } from 'victory-native'

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'

import { HistoryCard } from '../../components/HistoryCard'
import { categories } from '../../utils/categorie'

import * as S from './styles'

type TransactionData = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

type CategoryData = {
  key: string
  name: string
  total: number
  totalFormatted: string
  color: string
  percentFormatted: string
  percent: number
}

export function Resume() {
  const theme = useTheme()

  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])

  async function loadData() {
    const dataKey = '@gofinances:transactions'
    const response = await AsyncStorage.getItem(dataKey)
    const responseFormatted = response ? JSON.parse(response!) : []

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === 'negative'
    )

    const expensiveTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionData) => {
        return accumulator + Number(expensive.amount)
      },
      0
    )

    const totalByCategory: CategoryData[] = []

    categories.forEach((category) => {
      let categorySum = 0

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount)
        }
      })

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        })

        const percent = (categorySum / expensiveTotal) * 100
        const percentFormatted = `${percent.toFixed(0)}%`

        totalByCategory.push({
          name: category.name,
          total: categorySum,
          totalFormatted,
          color: category.color,
          key: category.key,
          percent,
          percentFormatted
        })
      }
    })

    setTotalByCategories(totalByCategory)
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Title> Resumo por categoria </S.Title>
      </S.Header>

      <S.Content
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 24,
          paddingBottom: useBottomTabBarHeight()
        }}
      >
        <S.ChartContainer>
          <VictoryPie
            data={totalByCategories}
            x="percentFormatted"
            y="total"
            colorScale={totalByCategories.map((category) => category.color)}
            style={{
              labels: {
                fontSize: RFValue(18),
                fontWeight: 'bold',
                fill: theme.colors.shape
              }
            }}
            labelRadius={50}
          />
        </S.ChartContainer>

        {totalByCategories.map((category) => (
          <HistoryCard
            key={category.key}
            title={category.name}
            amount={category.totalFormatted}
            color={category.color}
          />
        ))}
      </S.Content>
    </S.Container>
  )
}
