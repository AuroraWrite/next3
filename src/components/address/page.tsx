'use client'
import React, { memo, useState } from 'react'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Plus, Edit, Trash2 } from 'lucide-react'
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
import { addAddressAction } from '@/actions/address'
import { toast } from 'sonner'
import type { AddressType } from '@/types/global'
import { removeAddressAction, updateAddressAction } from '@/actions/address'
import { useRouter } from 'next/navigation'

const Address = memo(
  ({ userid, addressList }: { userid: number; addressList: AddressType[] }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const formSchema = z.object({
      name: z.string().min(1, {
        message: 'Name is required',
      }),
      address: z.string().min(1, {
        message: 'Address is required',
      }),
      city: z.string().min(1, {
        message: 'City is required',
      }),
      phone: z
        .string()
        .min(11, { message: 'Phone must be at least 11 characters' })
        .regex(/^\d+$/, { message: 'Phone must contain only numbers' }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: '',
        address: '',
        city: '',
        phone: '',
      },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
      const res = await addAddressAction({
        ...values,
        id: userid,
        phone: Number(values.phone),
      })

      toast(res.message, {
        style: {
          backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
          color: res.status === 200 ? '#155724' : '#721c24',
        },
      })

      res.status === 200 && router.refresh()
      setOpen(false)
      form.reset()
    }

    const removeHandle = async (id: number) => {
      const res = await removeAddressAction(id)

      toast(res.message, {
        style: {
          backgroundColor: res.status === 200 ? '#d4edda' : '#f8d7da',
          color: res.status === 200 ? '#155724' : '#721c24',
        },
      })

      res.status === 200 && router.refresh()
    }

    return (
      <div className="grid grid-cols-2 gap-4 mt-6 mb-4">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <div className="border rounded-sm h-40 cursor-pointer relative text-slate-600">
              <p className="m-3">New Address</p>
              <div className="absolute bottom-2 left-3">
                <Plus size={14} />
              </div>
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-center mb-5">
                Add New Address
              </AlertDialogTitle>
              <AlertDialogDescription>
                Fill in the form below to add a new delivery address.
              </AlertDialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter your name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Please enter your address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Please enter your city"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Please enter your phone"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <Button type="submit" className="cursor-pointer">
                      Save
                    </Button>
                  </AlertDialogFooter>
                </form>
              </Form>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>

        {addressList.map((item) => {
          return (
            <div
              key={item.id}
              className="border rounded-sm h-40 relative text-slate-600"
            >
              <p className="m-3">{item.name}</p>
              <div className="text-sm ml-5">
                <p>{item.address}</p>
                <p>{item.city}</p>
                <p>{item.phone}</p>
              </div>

              <div className="absolute bottom-2 left-3 flex text-xs gap-2">
                <div className="flex items-center cursor-pointer">
                  <Edit
                    size={14}
                    onClick={() =>
                      toast.success('没做', {
                        style: { backgroundColor: '#d4edda', color: 'orange' },
                      })
                    }
                  />
                </div>
                <div
                  className="flex items-center cursor-pointer"
                  onClick={() => removeHandle(item.id)}
                >
                  <Trash2 size={14} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
)

export default Address
