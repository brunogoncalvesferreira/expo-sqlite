import { useSQLiteContext } from "expo-sqlite"

export type ProductDatabase = {
  id: number,
  name: string,
  price: number
  createdAt: Date
}

export function useProductDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ProductDatabase, 'id' | 'createdAt'>) {
    const statement = await database.prepareAsync(
      `INSERT INTO products (name, price) VALUES ($name, $price)`
      )

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $price: data.price
      })

      const insertedRowId = result.lastInsertRowId.toString()

      return {
        insertedRowId
      }
      
    } catch (error) {
      console.error(error)
    } finally {
      statement.finalizeAsync()
    }
  }

  async function searchByName(name: string) {
    const query = 'SELECT * FROM products WHERE name LIKE ? ORDER BY createdAt DESC'

    try {
      const response = await database.getAllAsync<ProductDatabase>(
        query,
        `%${name}%`
      )

      return response
      
    } catch (error) {
      console.log(error)
    }
  }

  async function update(data: Omit<ProductDatabase, 'createdAt'>) {
    const statement = await database.prepareAsync(
      `UPDATE products SET name = $name, price = $price WHERE id = $id`
    )
    try {

      const result = await statement.executeAsync({
        $name: data.name,
        $price: data.price,
        $id: data.id
      })

      return result
      
    } catch (error) {
      console.log(error)
    } finally {
      statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync(`DELETE FROM products WHERE id =` + id)
    } catch (error) {
      console.log(error)
    }
  }

  async function show(id: number) {
    try {
      const query = 'SELECT * FROM products WHERE id = ?'

      const response = await database.getFirstAsync<ProductDatabase>(
        query,
        id
      )

      return response
    } catch (error) {
      console.log(error)
    }
  }

  return {
    create, searchByName, update, remove, show
  }
}