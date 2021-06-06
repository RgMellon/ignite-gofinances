import React from 'react'
import { categories } from '../../utils/categorie'

import * as S from './styles'

export type TransactionCardData = {
  type: 'positive' | 'negative'
  name: string
  amount: string
  category: string
  date: string
}

type TransactionCardProps = {
  data: TransactionCardData
}

export function TransactionCard({ data }: TransactionCardProps) {
  const category = categories.filter((item) => item.key === data.category)[0]

  return (
    <S.Container>
      <S.Title>{data.name}</S.Title>

      <S.Amount type={data.type}>
        {data.type === 'negative' ? `- ${data.amount}` : data.amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>

        <S.Date>{data.date}</S.Date>
      </S.Footer>
    </S.Container>
  )
}
