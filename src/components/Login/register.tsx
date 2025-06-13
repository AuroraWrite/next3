'use client'
import React, { Dispatch, memo, SetStateAction, useState } from 'react'
import { NotAccountType } from '@/types/global'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerAction } from '@/actions/users'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const Register = memo(
  ({
    setNotAccount,
  }: {
    setNotAccount: Dispatch<SetStateAction<NotAccountType>>
  }) => {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const formSchema = z.object({
      email: z.string().email({ message: 'Invalid email address' }),
      name: z.string().min(2, {
        message: 'Password must be at least 2 characters.',
      }),
      password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
      }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: '',
        name: '',
        password: '',
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true)
      const res = await registerAction(
        values.email,
        values.name,
        values.password
      )
      setLoading(false)
      toast(res.message, {
        style: {
          backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
          color: res.status === 200 ? '#155724' : '#721c24',
        },
      })
      if (res.status === 200) {
        router.refresh()
      }
    }

    return (
      <div className="container2 my-20">
        <h1 className="text-xl mb-3 text-center font-bold">
          Create an account
        </h1>
        <p className="mb-6 text-center">
          Create an account to access an enhanced shopping experience
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="email"
                      placeholder="Please enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Please enter your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Please enter your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm mt-3">
          Already have an account?
          <span
            className="underline text-orange-400 cursor-pointer"
            onClick={() => setNotAccount('login')}
          >
            Login
          </span>
        </p>
      </div>
    )
  }
)

export default Register
