"use client"

import { useState } from "react"
import { useTranslations } from "next-intl";
import Link from "next/link"
import Image from "next/image";
import { ArrowRight, Trash2 } from "lucide-react"
import img from "@/assets/Menu/lotos.png"

const cartItems = [
    {
        id: 1,
        name: "لاته لوتوس",
        description: "شیر اسپرسو پیسکوییت لوتوس، پودر شکر",
        price: 220000,
        quantity: 1,
        image: img,
    },
    {
        id: 2,
        name: "لاته لوتوس",
        description: "شیر اسپرسو پیسکوییت لوتوس، پودر شکر",
        price: 220000,
        quantity: 1,
        image: img,
    },
    {
        id: 3,
        name: "لاته لوتوس",
        description: "شیر اسپرسو پیسکوییت لوتوس، پودر شکر",
        price: 220000,
        quantity: 2,
        image: img,
    },
    {
        id: 4,
        name: "لاته لوتوس",
        description: "شیر اسپرسو پیسکوییت لوتوس، پودر شکر",
        price: 220000,
        quantity: 2,
        image: img,
    },
    {
        id: 5,
        name: "لاته لوتوس",
        description: "شیر اسپرسو پیسکوییت لوتوس، پودر شکر",
        price: 220000,
        quantity: 1,
        image: img,
    },
]

export const CartFc = () => { 
    const [items, setItems] = useState(cartItems)
    const [promoCode, setPromoCode] = useState("")
    const translate = useTranslations("cart");

    const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id))
    }
    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) removeItem(id)
        else setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-6">
            {/* Header */}
            <div className="px-4 py-4">
                <div className="max-w-md mx-auto">
                    <Link href="/" className="flex items-center gap-3">
                        <ArrowRight size={24} />
                        <h1 className="text-lg font-bold flex-1 text-right">سفارشات شما</h1>
                    </Link>
                </div>
            </div>

            {/* Cart Items */}
            <div className="max-w-md mx-auto px-4 py-6 bg-white rounded-lg">
                <div className="space-y-4 mb-6">
                    {items.map((item, idx) => (
                        <div key={item.id} className={`p-4 flex flex-col gap-4 ${idx === items.length - 1 ? "" : "border-b"}`}>
                            <div className="flex gap-4">
                                <div className="relative w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <Image src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 self-center text-right">
                                    <h3 className="font-bold mb-1">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-2">{item.description}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-sm font-bold text-gray-800">{item.price.toLocaleString()} تومان</p>
                                <div className="flex items-center gap-2 border py-2 px-4 rounded-full">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="text-lg cursor-pointer"
                                    >
                                        +
                                    </button>
                                    <span className="w-6 h-6 flex items-center justify-center text-sm font-bold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="text-lg cursor-pointer"
                                    >
                                        -
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Promo Code */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder={translate("addYourTableCode")}
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-right bg-gray-200"
                    />
                    <Link href="/checkout">
                        <button className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-10 rounded-xl transition">
                           {translate("accept")}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}