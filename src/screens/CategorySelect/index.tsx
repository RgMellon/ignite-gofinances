import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

import { Button } from '../../components/Forms/Button'
import { categories } from '../../utils/categorie'

import * as S from './styles'

type Category = {
  key: string
  name: string
}

type Props = {
  category: Category
  setCategory: (item: Category) => void
  closeSelectCategory: () => void
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory
}: Props) {
  function handleCategorySelect(category: Category) {
    setCategory(category)
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        style={{ flex: 1, width: '100%' }}
        data={categories}
        keyExtractor={(item) => item.key}
        ItemSeparatorComponent={() => <S.Separator />}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />

            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
      />

      <S.Footer>
        <Button title="salvar" onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  )
}
