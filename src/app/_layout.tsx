import { initializeDatabase } from "@/database/initialize-database";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

export default function Layout() {
  return (
    <SQLiteProvider databaseName="database.db" onInit={initializeDatabase}>
      <Slot/>
    </SQLiteProvider>
  )
}