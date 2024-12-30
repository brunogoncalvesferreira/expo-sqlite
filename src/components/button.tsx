import { StyleSheet, Text, TouchableOpacity, type TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  text: string
}

export function Button({ text, ...rest }: Props) {
  return (
    <TouchableOpacity {...rest} style={styles.button} activeOpacity={0.9}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    height: 56,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    color: '#fff',
    fontWeight: 'bold'
  }
})