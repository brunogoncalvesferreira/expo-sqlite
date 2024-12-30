import { Pressable, Text, TouchableOpacity, View, type PressableProps } from "react-native"

interface Props extends PressableProps {
  name: string
  price: number
  onDelete: () => void
  onDetails: () => void
}

export function Products({ name, price, onDelete, onDetails, ...rest}: Props) {
  return (
    <Pressable style={{ backgroundColor: '#dfdfdf', padding: 16, borderRadius: 8 , gap: 8}} {...rest}>
      <Text>{name} - {price}</Text>

      <TouchableOpacity onPress={onDelete}>
        <Text>Excluir</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onDetails}>
        <Text>Detalhes</Text>
      </TouchableOpacity>
    </Pressable>
  )
}