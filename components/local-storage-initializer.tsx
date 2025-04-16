"use client"

import { useEffect } from "react"
import storageService from "@/lib/storage-service"

export function LocalStorageInitializer() {
  useEffect(() => {
    // Initialize localStorage with default data
    storageService.initializeStorage()
  }, [])

  return null
}
