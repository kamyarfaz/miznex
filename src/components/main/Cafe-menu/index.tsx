"use client";

import { ChangeEvent, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import img from "@/assets/Menu/food.png";
import HandBagSVG from "@/assets/svg/HandBagSVG";
import UserStrokeSVG from "@/assets/svg/UserStrokeSVG";
import SearchSVG from "@/assets/svg/SearchSVG";
import breakfast from "@/assets/Category/breakfast.png";
import drink from "@/assets/Category/drinks.png";
import cakeDessert from "@/assets/Category/cake&dessert.png";
import hotDrink from "@/assets/Category/hot-drink.png";
import iceCream from "@/assets/Category/ice-cream.png";
import steak from "@/assets/Category/steak.png";
import chicken from "@/assets/Category/chicken.png";
import noodles from "@/assets/Category/noodles.png";
import burger from "@/assets/Category/burger.png";
import pizza from "@/assets/Category/pizza.png";
import { CircleCheck, Plus } from "lucide-react";
import NotificationSVG from "@/assets/svg/NotificationSVG";

export const categoryImages = {
  breakfast,
  drink,
  cakeDessert,
  hotDrink,
  iceCream,
  steak,
  chicken,
  noodles,
  burger,
  pizza,
};

type CategoryImageKey = keyof typeof categoryImages;

interface Category {
  id: number;
  name: string;
  imageKey: CategoryImageKey;
}

const categories: Category[] = [
  { id: 1, name: "صبحانه", imageKey: "breakfast" },
  { id: 2, name: "نوشیدنی ها", imageKey: "drink" },
  { id: 3, name: "کیک و دسر", imageKey: "cakeDessert" },
  { id: 4, name: "نوشیدنی گرم", imageKey: "hotDrink" },
  { id: 5, name: "بستنی", imageKey: "iceCream" },
  { id: 6, name: "استیک ها", imageKey: "steak" },
  { id: 7, name: "مرغ", imageKey: "chicken" },
  { id: 8, name: "پاستا و نودل", imageKey: "noodles" },
  { id: 9, name: "برگر", imageKey: "burger" },
  { id: 10, name: "پیتزا", imageKey: "pizza" },
];

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
  {
    id: 3,
    name: "کاراملی",
    price: 720000,
    image: img,
  },
  {
    id: 4,
    name: "لاته",
    price: 60000,
    image: img,
  },
];
export const CafeMenuFC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [pagerModal, setPagerModal] = useState<boolean>(false);
  const [tableNum, setTableNum] = useState<string>("");
  const [pager, setPager] = useState<boolean>(false);
  const t = useTranslations("resturantMenu");
  const params = useParams();
  const router = useRouter();

  const product = {
    id: 1,
    name: "لاته لوتوس",
    price: 220000,
    description: "شیر اسپرسو پیسکوییت لوتوس، یودر شکر",
  };

  const addToCart = () => {
    router.push("/cart");
  };

  return (
    <>
      <div className="min-h-screen bg-[#FAFAFA] pb-6">
        <div className="coffee-header text-white pt-6 pb-12 px-4">
          <div className="max-w-lg mx-auto">
            <div className="flex items-center justify-end mb-6">
              <div className="flex gap-3">
                <HandBagSVG
                  className="size-9 p-[6px] bg-white/20 backdrop-blur rounded-full cursor-pointer"
                  onClick={() => router.push("/cart/")}
                />
                {/* <UserStrokeSVG className="size-9 p-[6px] bg-white/20 backdrop-blur rounded-full" /> */}
              </div>
            </div>
            <h1 className="text-2xl max-md:text-lg font-semibold text-center mb-4">
              {t("welcomeToResturant", { input: `${params.cafe}` })}
            </h1>

            <div className="w-[90%] mx-auto flex items-center bg-white/10 border border-white/30 backdrop-blur rounded-xl px-4 py-2.5 max-md:py-1.5">
              <input
                type="text"
                placeholder={t("searchInResturant")}
                className="bg-transparent flex-1 text-white placeholder-gray-300 outline-none text-sm max-md:text-[12px]"
              />
              <SearchSVG className="mr-2 max-md:scale-95 max-md:right-2 relative" />
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto -mt-6 relative z-10">
          <div className="bg-[#FAFAFA] rounded-3xl md:shadow-lg relative p-4">
            <div className="mb-8">
              <h2 className="text-lg max-md:text-sm font-normal text-headings mb-4 rtl:text-right ltr:text-left">
                {t("category")}
              </h2>
              <div className="grid grid-cols-5 gap-3">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex flex-col items-center justify-center gap-2 pb-1 hover:bg-[#EFF0F1] hover:border-bo-primary border border-transparent rounded-xl cursor-pointer"
                  >
                    <div className="w-14 h-14 relative flex items-center justify-center">
                      <Image
                        src={categoryImages[cat.imageKey]}
                        alt={cat.name}
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm text-center font-normal text-bodyDark whitespace-nowrap">
                      {cat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg max-md:text-sm font-normal text-headings mb-4 rtl:text-right ltr:text-left">
                {t("todayMenu")}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white shadow-[0_0_30px_rgba(0,0,0,0.02)] rounded-[26px] overflow-hidden"
                  >
                    <div className="m-auto size-fit rounded-full drop-shadow-xl">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="object-cover"
                      />
                    </div>
                    <div className="pb-3">
                      <h3 className="font-normal text-sm text-center mb-2 text-bodyDark">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className="w-max p-1.5 rounded-full drop-shadow-2xl bg-surface-secondary cursor-pointer"
                          onClick={() => setShowModal(true)}
                        >
                          <Plus size={20} className="text-action" />
                        </div>
                        <span className="text-sm font-normal text-bodyDark">
                          <span className="font-semibold">
                            {product.price.toLocaleString()}
                          </span>{" "}
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          color="bg-white"
          position="bottom"
          modalContent={
            <div className="overflow-auto h-100 p-4">
              <div className="flex justify-between items-start mb-4 border-b border-[#DADBDD]">
                <div className="text-right flex-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-medium mb-2">{product.name}</h1>
                    <span className="text-sm font-normal text-bodyDark">
                      <span className="font-semibold text-lg">
                        {product.price.toLocaleString()}
                      </span>{" "}
                      تومان
                    </span>
                  </div>
                  <p className="text-bodyNormal text-sm mb-4">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="">
                <h3 className="font-normal text-sm rtl:text-right ltr:text-left mb-3">
                  توضیحات سفارش
                </h3>

                <textarea
                  name=""
                  className="resize-none min-h-[200px] w-full mb-6 px-4 py-3 border border-bodynormal rounded-xl text-sm outline-none focus:border-bodyDark"
                  placeholder="اگر سفارشتان نیاز به توضیحات دارد اینجا بنویسید."
                ></textarea>
              </div>

              <div onClick={addToCart}>
                <button className="w-full cursor-pointer bg-action text-white text-sm  py-3 px-4 rounded-xl">
                  {t("addToCart")}
                </button>
              </div>
            </div>
          }
        />
      )}
      {pagerModal && (
        <Modal
          onClose={() => setPagerModal(false)}
          color="bg-white"
          position="center"
          modalContent={
            pager ? (
              <div className="overflow-auto h-full flex flex-col items-center justify-center gap-8 py-5 sx:px-10">
                <CircleCheck size={28} className="text-success" />
                <h2 className="text-success max-md:text-sm font-normal whitespace-nowrap">
                  درخواست شما ثبت شد و گارسون در راه است
                </h2>
              </div>
            ) : (
              <div className="overflow-auto h-full flex items-center justify-center">
                <div className="w-full max-w-md rounded-2xl text-center">
                  <h2 className="font-bold mb-3 text-headings">
                    فراخوان گارسون
                  </h2>

                  <p className="text-sm text-bodyDark leading-relaxed mb-6">
                    اگر از فراخواندن گارسون به میز خود مطمئن هستید لطفا شماره
                    میز خود را وارد کنید
                  </p>

                  <input
                    type="number"
                    placeholder="شماره میز"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setTableNum(e.target.value)
                    }
                    className="w-full mb-6 px-4 py-3 border border-bodynormal rounded-xl text-sm outline-none focus:border-bodyDark"
                  />

                  <div className="flex gap-5">
                    <button
                      className="flex-1 py-3 rounded-xl bg-action text-white text-sm font-medium hover:bg-action-hover transition disabled:bg-action/40"
                      disabled={tableNum == "" ? true : false}
                      onClick={() => setPager(true)}
                    >
                      تایید
                    </button>
                    <button
                      className="flex-1 py-3 rounded-xl border border-bodynormal text-bodynormal text-sm font-medium"
                      onClick={() => setPagerModal(false)}
                    >
                      انصراف
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        />
      )}
      <div
        className="flex items-center justify-center size-14 bg-action rounded-full cursor-pointer fixed right-1.5 bottom-1.5 z-40"
        onClick={() => setPagerModal((prev) => !prev)}
      >
        <NotificationSVG />
      </div>
    </>
  );
};
