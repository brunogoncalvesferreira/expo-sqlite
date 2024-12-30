import { Alert, FlatList, Text, View } from 'react-native'

import { Input } from '@/components/input'
import { Button } from '@/components/button'
import { useEffect, useState } from 'react'
import { type ProductDatabase, useProductDatabase } from '@/database/useProductDatabase'
import { Products } from '@/components/products'
import { router } from 'expo-router'

export default function Index() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [id, setId] = useState('')

  const [search, setSearch] = useState('')

  const [products, setProducts] = useState<ProductDatabase[]>([])

  const productDatabase = useProductDatabase()

  async function create() {
    try {
      if(isNaN(Number(price))) {
        return Alert.alert('Preço', 'Preço com valor inválido')
      }

      await productDatabase.create({
        name, price: Number(price)
      })

      Alert.alert('Sucesso', 'Produto criado com sucesso')
      setName('')
      setPrice('')

    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await productDatabase.searchByName(search)
      setProducts(response!)

    } catch (error) {
      console.log(error)
    }
  }

  async function update() {
    try {
      await productDatabase.update({
        id: Number(id),
        name,
        price: Number(price),
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await productDatabase.remove(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }

  function details(item: ProductDatabase) {
    setId(item.id.toString())
    setName(item.name)
    setPrice(item.price.toString())
  }

  async function handleSave() {
    try {
      if(id) {
         update()
      } else {
         create()
      }
      
      setName('')
      setPrice('')
      setId('')
      await list()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    list()
  }, [search])
  
  return (
    <View style={{ padding: 16, gap: 16 }}>
      <Input placeholder='Nome do produto' onChangeText={setName} value={name}/>
      <Input placeholder='Preço do produto' onChangeText={setPrice} value={price}/>

      <Button text='Salvar' onPress={handleSave}/>

      <Input placeholder='Pesquisar produto' onChangeText={setSearch} value={search}/>

      <FlatList
        data={products}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <Products
            name={item.name}
            price={item.price}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onDetails={() => router.navigate(`/details/${item.id}`)}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text>Nenhum produto encontrado</Text>
        )}

        contentContainerStyle={{ gap: 16 }}
      />
    </View>
  )
}