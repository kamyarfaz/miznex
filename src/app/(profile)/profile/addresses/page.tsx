"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  useAddAddress,
  useDeleteAddress,
  useGetAddresses,
  useGetCities,
  useGetProvinces,
  useUpdateAddress,
} from "@/services";

import {
  AddressCard,
  AddressForm,
  AddressHeader,
  EmptyState,
} from "@/components/profile/addresses";

import { useAddressForm } from "@/hooks/business/useAddressForm";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Address, City, Province } from "@/types/Profile";
import { AddressFormData } from "@/schemas/profile";
import { AddressSkeleton } from "@/components/skeleton";

const addressesData = [
  {
    id: "addr-001",
    province: "California",
    city: "Los Angeles",
    address: "1234 Sunset Blvd, Apt 56",
    created_at: "2025-10-10T15:30:00Z",
  },
  {
    id: "addr-002",
    province: "New York",
    city: "Brooklyn",
    address: "78 Greenpoint Ave, Unit 3B",
    created_at: "2025-09-22T10:15:00Z",
  },
  {
    id: "addr-003",
    province: "Texas",
    city: "Austin",
    address: "8901 Ranch Road 2222, Suite 120",
    created_at: "2025-08-05T08:45:00Z",
  },
];

export default function AddressesPage() {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const { data: addressesDataMocked, isLoading } = useGetAddresses();

  const {
    mutate: deleteAddress,
    isPending: isDeleting,
    variables: deletingVars,
  } = useDeleteAddress();

  const { mutate: updateAddress } = useUpdateAddress();
  const { mutate: addAddress } = useAddAddress();
  const { data: provincesData } = useGetProvinces();
  const { data: citiesData } = useGetCities();

  const { provinces, filteredCities, formData, updateFormData, resetFormData } =
    useAddressForm({
      provincesData: provincesData as Province[],
      citiesData: citiesData as City[],
    });

  const handleSubmit = (data: AddressFormData) => {
    const id = editingId;

    if (id) {
      updateAddress(
        {
          id,
          address: data?.address,
          province: data?.province,
          city: data?.city,
        },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    } else {
      addAddress(
        {
          address: data?.address,
          province: data?.province,
          city: data?.city,
        },
        {
          onSuccess: () => {
            setOpen(false);
          },
        }
      );
    }
    resetFormData();
    setEditingId(null);
  };

  const handleEdit = (address: Address) => {
    setEditingId(address?.id);
    updateFormData({
      address: address?.address,
      province: address?.province,
      city: address?.city,
    });
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteAddress({ id });
  };

  const handleAddAddress = () => {
    setEditingId(null);
    resetFormData();
    setOpen(true);
  };

  // if (isLoading) {
  //   return <AddressSkeleton />;
  // }

  return (
    <div className="space-y-6">
      <AddressHeader />

      <Card className="rounded-3xl shadow-md border border-muted bg-white/90 dark:bg-gray-900/90">
        <CardHeader className="flex justify-end">
          <Button
            size="sm"
            onClick={handleAddAddress}
            className="rounded-md px-4 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 hover:to-yellow-600 text-gray-900 font-semibold shadow-md transition-all gap-2"
          >
            <Plus size={20} className="text-gray-900" />
            افزودن آدرس
          </Button>
        </CardHeader>
        <CardContent>
          {addressesData?.length === 0 ? (
            <EmptyState onAddAddress={handleAddAddress} />
          ) : (
            addressesData?.map((address: any) => (
              <AddressCard
                key={address?.id}
                address={address}
                onEdit={() => handleEdit(address)}
                onDelete={() => handleDelete(address?.id)}
                isDeleting={deletingVars?.id === address?.id && isDeleting}
              />
            ))
          )}
        </CardContent>
      </Card>

      <AddressForm
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleSubmit}
        editingId={editingId}
        provinces={provinces}
        filteredCities={filteredCities}
        formData={formData}
        onFormDataChange={updateFormData}
      />
    </div>
  );
}
