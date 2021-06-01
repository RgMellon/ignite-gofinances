import React, { useState } from 'react'

import { Modal } from 'react-native'

import { Input } from '../../components/Forms/Input'
import { Button } from '../../components/Forms/Button'
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton'
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton'
import { CategorySelect } from '../CategorySelect'

import * as S from './styles'

export function Register() {
  const [transactionType, setTransactionType] = useState('')
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  })

  function handlTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type)
  }

  function handleCloseSelectCategory() {
    setCategoryModalOpen(false)
  }

  function handleOpenSelectCategoryModal() {
    setCategoryModalOpen(true)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />

          <S.TransactionTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              isActive={transactionType === 'up'}
              onPress={() => handlTransactionTypeSelect('up')}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              isActive={transactionType === 'down'}
              onPress={() => handlTransactionTypeSelect('down')}
            />
          </S.TransactionTypes>

          <CategorySelectButton
            title={category.name}
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>

        <Button title="Enviar" />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </S.Container>
  )
}
