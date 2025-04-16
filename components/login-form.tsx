"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import storageService from "@/lib/storage-service"

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = storageService.login(formData.username, formData.password)

      if (user) {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${user.username}!`,
        })

        // Redirect based on user role
        if (user.role === "admin") {
          router.push("/dashboard/admin")
        } else {
          router.push("/dashboard/student")
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              autoCapitalize="none"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Demo Credentials</span>
        </div>
      </div>
      <div className="grid gap-2 text-sm text-muted-foreground">
        <div>
          <strong>Admin:</strong> username: admin, password: admin123
        </div>
        <div>
          <strong>Student:</strong> username: student, password: student123
        </div>
      </div>
    </div>
  )
}
