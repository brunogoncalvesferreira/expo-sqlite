import { TextInput, StyleSheet, TextInputProps } from "react-native";

export function Input({ ...rest }: TextInputProps) {
  return (
    <TextInput style={styles.input} {...rest}/>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    padding: 16
  }
})