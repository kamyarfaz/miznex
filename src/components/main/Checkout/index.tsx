"use client"

import { useState } from "react"
import Link from "next/link"
import {ArrowRight, Check, ShieldAlert} from "lucide-react"
import Modal from "@/components/ui/modal";

const paymentMethods = [
    {
        id: "online",
        name: "پرداخت آنلاین",
        description: "درگاه پرداخت زیرین پال",
        icon: "📱",
        color: "bg-yellow-300",
    },
    {
        id: "pos",
        name: "پرداخت در محل",
        description: "از طریق کارت بانکی با وجه نقد",
        icon: "💳",
        color: "bg-orange-300",
    }
]
export const CheckoutFc = () => {
    const [selectedPayment, setSelectedPayment] = useState("online")
    const [showModal, setShowModal] = useState(false)

    const subtotal = 1100000
    const discount = 160000
    const total = 1440000
    const payable = 1440000

    return (
        <div className="min-h-screen bg-gray-50 pb-6">
            {/* Header */}
            <div className="px-4 py-4">
                <div className="max-w-md mx-auto">
                    <Link href="/cart" className="flex items-center gap-3">
                        <ArrowRight size={24}/>
                        <h1 className="text-lg font-bold flex-1 text-right">تأیید نهایی و پرداخت</h1>
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-md mx-auto px-4 py-6 rounded-2xl bg-white">
                {/* Payment Methods */}
                <div className="mb-8 shadow-md rounded-xl p-4">
                    <h2 className="text-lg font-bold mb-4 text-right">روش های پرداخت</h2>
                    <div className="space-y-3">
                        {paymentMethods.map((method) => (
                            <label
                                key={method.id}
                                className="flex items-center gap-4 p-4 border-b border-gray-200 cursor-pointer"
                            >
                                <div
                                    className={`w-12 h-12 ${method.color} rounded-lg flex items-center justify-center text-xl`}>
                                    {method.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-right">{method.name}</h3>
                                    <p className="text-xs text-gray-500 text-right">{method.description}</p>
                                </div>
                                <div className="relative">
                                    <input
                                        type="radio"
                                        name="payment"
                                        value={method.id}
                                        checked={selectedPayment === method.id}
                                        onChange={(e) => setSelectedPayment(e.target.value)}
                                        className="peer sr-only"
                                    />
                                    <span
                                        className={`w-5 h-5 relative flex items-center justify-center rounded-full border border-gray-400 peer-checked:border-red-600
                                            after:content-[''] after:absolute after:inset-1
                                            after:rounded-full after:bg-red-600
                                            ${selectedPayment === method.id ? "after:scale-100" : "after:scale-0"}
                                            after:transition-transform after:duration-200
                                            `}>
                                    </span>
                                </div>
                            </label>
                        ))}
                        <div
                            className="flex items-center gap-4 p-4 cursor-pointer"
                        >
                            <div className="flex-1">
                                <h3 className="font-bold text-right">وارد کردن کد تخفیف</h3>
                                <p className="text-xs text-gray-500 text-right">کد تخفیف خود را وارد کنید</p>
                            </div>
                            <div className={`text-3xl text-red-400`}>
                                +
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-lg p-6 shadow-md mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">جزئیات پرداخت</h2>
                        <button className="text-red-400 text-lg font-bold text-right">مشاهده سفارش
                        </button>
                    </div>
                    <div className="space-y-4 border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-between text-right">
                            <span className="text-gray-600">جمع سفارش (5)</span>
                            <span className="">{subtotal.toLocaleString()} تومان</span>
                        </div>

                        <div className="flex justify-between text-right">
                            <span className="text-green-600">سود شما از این خرید</span>
                            <span className="text-green-600">{discount.toLocaleString()} تومان</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-right">
                            <span className="text-gray-600">مجموع خرید شما بعد از تخفیف</span>
                            <span className="">{total.toLocaleString()} تومان</span>
                        </div>

                        <div className="flex justify-between text-right py-3 border-y border-gray-200">
                            <span className="font-bold text-lg">مبلغ قابل پرداخت</span>
                            <span className="">{payable.toLocaleString()} تومان</span>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-between items-center">
                        <div className="flex flex-col justify-between text-right text-gray-500">
                            <span className="font-bold text-sm">مبلغ قابل پرداخت</span>
                            <span className="text-xs">{payable.toLocaleString()} تومان</span>
                        </div>

                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition cursor-pointer">
                            پرداخت
                        </button>
                    </div>
                    <p className="mt-5 flex gap-3 items-center text-red-500"><ShieldAlert />پس از زدن دکمه ثبت کد سفارش خود را یادداشت کنید </p>
                </div>
            </div>
            {showModal && <Modal
                onClose={() => setShowModal(false)}
                color="bg-green-50"
                modalContent={
                    <div className="px-6 pb-8 flex flex-col justify-between h-100" style={{ direction: "rtl" }}>
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-14">
                                <span className="text-teal-600 font-medium text-base">سفارش شما با موفقیت ثبت شد</span>
                                <div
                                    className={`transition-all duration-500`}
                                >
                                    <div className="w-6 h-6 rounded-full border-2 border-teal-600 flex items-center justify-center">
                                        <Check className="w-4 h-4 text-teal-600" strokeWidth={3} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="text-red-500 text-center font-bold">کد سفارش شما : ۰۸۶۳۸۸۰</div>
                                <p className="text-sm text-gray-500 leading-relaxed text-center">
                                    در هنگام پرداخت صورت حساب کد سفارش را به صندوق ارائه دهید
                                </p>
                            </div>
                        </div>

                        <div>

                            <div className="space-y-2 text-center">
                                <p className="text-gray-500 leading-relaxed">
                                    سفارش شما برای کافه ارسال شد و در حال آماده سازی است
                                </p>
                                <p className="text-gray-500 leading-relaxed">مشتاق دیدار دوباره شما هستیم</p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className={`w-full py-3 mt-3 border-2 border-red-500 text-red-500 font-semibold cursor-pointer rounded-xl hover:bg-red-50 active:scale-95 transition-all duration-300 text-sm`}
                            >
                                بازگشت به منو
                            </button>
                        </div>
                    </div>
                }
            />}
        </div>
    )
}