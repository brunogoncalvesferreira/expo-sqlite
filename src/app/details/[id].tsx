import { useProductDatabase } from "@/database/useProductDatabase";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Details() {
  const params = useLocalSearchParams<{ id: string}>()

  const [product, setProduct] =  useState({
    name: '',
    price: 0
  })

  const productDatabase = useProductDatabase()

  useEffect(() => {
    if(params.id) {
      productDatabase.show(Number(params.id)).then(response => {
        if(response) {
          setProduct({
            name: response.name,
            price: response.price
          })
        }
      })
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>ID {params.id}</Text>
      <Text>{product.name}</Text>
      <Text>{product.price}</Text>
    </View>
  )
}