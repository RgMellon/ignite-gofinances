import React from 'react'

import * as S from './style'

type HistoryCardProps = {
  title: string
  amount: string
  color: string
}

export function HistoryCard({ color, title, amount }: HistoryCardProps) {
  return (
    <S.Container color={color}>
      <S.Title>{title} </S.Title>

      <S.Amount>{amount}</S.Amount>
    </S.Container>
  )
}
