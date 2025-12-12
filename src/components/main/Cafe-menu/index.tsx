"use client"

import { useState } from "react";
import { Search, ShoppingBag, User } from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddCircle from "@/assets/Menu/add-circle.svg";
import Modal from "@/components/ui/modal";
import img from "@/assets/Menu/food.png";
import { useTranslations } from "next-intl";

const categories = [
    {id: 1, name: "صبحانه", icon: "☕"},
    {id: 2, name: "نوشیدنی ها", icon: "🍺"},
    {id: 3, name: "کیک و دسر", icon: "🍰"},
    {id: 4, name: "نوشیدنی گرم", icon: "☕"},
    {id: 5, name: "صبحانه", icon: "🍳"},
    {id: 6, name: "استیک ها", icon: "🥩"},
    {id: 7, name: "مرغ", icon: "🍗"},
    {id: 8, name: "پاستا و نودل", icon: "🍜"},
    {id: 9, name: "برگر", icon: "🍔"},
    {id: 10, name: "پیتزا", icon: "🍕"},
]

const recommendedProducts = [
    {
        id: 1,
        name: "لاته کاراملی",
        price: 220000,
        image: img,
    },
    {
        id: 2,
        name: "آیس لاته",
        price: 240000,
        image: img,
    },
]
export const CafeMenuFC = () => {
    
    const [showModal, setShowModal] = useState(false)
    const [selectedType, setSelectedType] = useState("گرم")
    const [selectedSize, setSelectedSize] = useState("متوسط")
    const [selectedSugar, setSelectedSugar] = useState("کم")
    const [selectedSyrup, setSelectedSyrup] = useState("کاراملی")
    const translate = useTranslations("resturantMenu");
    const params = useParams();

    const product = {
        id: 1,
        name: "لاته لوتوس",
        price: 220000,
        description: "شیر اسپرسو پیسکوییت لوتوس، یودر شکر",
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 pb-6">
                {/* Header */}
                <div className="coffee-header text-white pt-6 pb-12 px-4">
                    <div className="max-w-md mx-auto">
                        <div className="flex items-center justify-end mb-6">
                            <div className="flex gap-2">
                                <ShoppingBag size={20} className="size-12 p-3 backdrop-blur rounded-full"/>
                                <User size={20} className="size-12 p-3 backdrop-blur rounded-full"/>
                            </div>
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-4">{translate("welcomeToResturant", { input: `${params.cafe}` })}</h1>

                        {/* Search Bar */}
                        <div
                            className="flex items-center bg-white/10 border border-white/30 backdrop-blur rounded-lg px-4 py-3">
                            <input
                                type="text"
                                placeholder={translate("searchInResturant")}
                                className="bg-transparent flex-1 text-white placeholder-gray-300 outline-none text-sm"
                            />
                            <Search size={28} className="text-gray-300 mr-2"/>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-md mx-auto -mt-6 relative z-10">
                    {/* Categories Section */}
                    <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-4">
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4 rtl:text-right ltr:text-left">{translate("category")}</h2>
                            <div className="grid grid-cols-5 gap-3">
                                {categories.map((cat) => (
                                    <div key={cat.id} className="flex flex-col items-center gap-2">
                                        <div className="w-14 h-14 flex items-center justify-center text-3xl">
                                            {cat.icon}
                                        </div>
                                        <span className="text-sm text-center text-gray-600">{cat.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold mb-4 rtl:text-right ltr:text-left">{translate("todayMenu")}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {recommendedProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="product-card hover:shadow-md transition-shadow">
                                        <div className="m-auto size-fit rounded-full drop-shadow-2xl">
                                            <Image src={product.image || "/placeholder.svg"}
                                                   alt={product.name} className="object-cover"/>
                                        </div>
                                        <div className="p-3">
                                            <h3 className="font-semibold text-sm text-center mb-2">{product.name}</h3>
                                            <div className="flex items-center justify-evenly">
                                                <Image src={AddCircle} alt="addCyrcle"
                                                       className="size-8 object-cover cursor-pointer"
                                                       onClick={() => setShowModal(true)}
                                                />
                                                <span
                                                    className="text-sm font-bold text-gray-700">{product.price.toLocaleString()} تومان</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <Modal
                onClose={() => setShowModal(false)}
                color="bg-white"
                modalContent={
                    <div className="overflow-auto h-100 p-4">
                        <div className="flex justify-between items-start mb-4">
                            <div className="text-right flex-1">
                                <div className="flex justify-between items-center">
                                    <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                                    <span
                                        className="text-lg font-medium text-gray-800">{product.price.toLocaleString()} تومان</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                            </div>
                        </div>

                        {/* Type Selection */}
                        <div className="border-b mb-3 pb-6">
                            <h3 className="font-bold rtl:text-right ltr:text-left mb-3">{translate("type")}</h3>
                            <div className="flex gap-3 flex-row-reverse">
                                {["سرد", "گرم"].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setSelectedType(type)}
                                        className={`flex-1 py-1 px-4 rounded-full border-2 transition text-gray-800 ${
                                            selectedType === type ? "border-gray-800" : "border-gray-300"
                                        }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="border-b mb-3 pb-6">
                            <h3 className="font-bold rtl:text-right ltr:text-left mb-3">{translate("size")}</h3>
                            <div className="flex gap-3 flex-row-reverse">
                                {["کوچک", "متوسط", "بزرگ"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`flex-1 py-1 px-4 rounded-full border-2 transition text-gray-800 ${
                                            selectedSize === size ? "border-gray-800" : "border-gray-300"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sugar Level */}
                        <div className="border-b mb-3 pb-6">
                            <h3 className="font-bold rtl:text-right ltr:text-left mb-3">{translate("suger")}</h3>
                            <div className="flex gap-3 flex-row-reverse">
                                {["کم", "زیاد", "بدون شکر"].map((sugar) => (
                                    <button
                                        key={sugar}
                                        onClick={() => setSelectedSugar(sugar)}
                                        className={`flex-1 py-1 px-4 rounded-full border-2 transition text-gray-800 ${
                                            selectedSugar === sugar
                                                ? "border-gray-800"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        {sugar}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Syrup Selection */}
                        <div className="mb-6">
                            <h3 className="font-bold rtl:text-right ltr:text-left mb-3">{translate("syrup")}</h3>
                            <div className="space-y-2">
                                {["سیروپ کاراملی", "سیروپ وانیلی", "سیروپ فندقی"].map((syrup) => (
                                    <label
                                        key={syrup}
                                        className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-50"
                                    >
                                        <input
                                            type="radio"
                                            name="syrup"
                                            value={syrup}
                                            checked={selectedSyrup === syrup}
                                            onChange={(e) => setSelectedSyrup(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="rtl:text-right ltr:text-left flex-1">{syrup}</span>
                                        <span
                                            className="text-sm font-light text-gray-800">{"15000"} تومان</span>

                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Link href="/cart">
                            <button
                                className="w-full cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-xl transition">
                                {translate("addToCart")}
                            </button>
                        </Link>
                    </div>
                }
            />}
        </>)
}