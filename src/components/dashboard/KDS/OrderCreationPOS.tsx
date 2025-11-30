import type { ItemCategoryKDS, OrderItemKDS } from "@/types";
import { Minus, Plus, Send } from 'lucide-react';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { KDSButton } from './KDSButton';
import { KDSFilterTabs } from './KDSFilterTabs';
import { KDSInput } from './KDSInput';
import { KDSMenuItem } from './KDSMenuItem';
import { KDSQuantityBadge } from './KDSQuantityBadge';
import { KDSTextarea } from './KDSTextarea';

interface MenuItem {
  id: string;
  name: string;
  category: ItemCategoryKDS;
  price: number;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Grilled Chicken', category: 'grill', price: 18.99 },
  { id: '2', name: 'Ribeye Steak', category: 'grill', price: 32.99 },
  { id: '3', name: 'Grilled Salmon', category: 'grill', price: 24.99 },
  { id: '4', name: 'Caesar Salad', category: 'salad', price: 12.99 },
  { id: '5', name: 'Greek Salad', category: 'salad', price: 11.99 },
  { id: '6', name: 'Garden Salad', category: 'salad', price: 9.99 },
  { id: '7', name: 'Coca Cola', category: 'drinks', price: 3.99 },
  { id: '8', name: 'Fresh Orange Juice', category: 'drinks', price: 5.99 },
  { id: '9', name: 'Iced Tea', category: 'drinks', price: 3.99 },
  { id: '10', name: 'Chocolate Cake', category: 'dessert', price: 8.99 },
  { id: '11', name: 'Tiramisu', category: 'dessert', price: 9.99 },
  { id: '12', name: 'Bruschetta', category: 'appetizer', price: 7.99 },
  { id: '13', name: 'Mozzarella Sticks', category: 'appetizer', price: 8.99 },
];

interface Props {
  onSendOrder: (items: OrderItemKDS[], tableNumber: string, waiterName: string, notes: string) => void;
}

export function OrderCreationPOS({ onSendOrder }: Props) {
  const [selectedItems, setSelectedItems] = useState<Map<string, { item: MenuItem; quantity: number; notes: string }>>(new Map());
  const [tableNumber, setTableNumber] = useState('');
  const [waiterName, setWaiterName] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategoryKDS | 'all'>('all');

  const addItem = (menuItem: MenuItem) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItem.id);
    if (existing) {
      newMap.set(menuItem.id, { ...existing, quantity: existing.quantity + 1 });
    } else {
      newMap.set(menuItem.id, { item: menuItem, quantity: 1, notes: '' });
    }
    setSelectedItems(newMap);
  };

  const removeItem = (menuItemId: string) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItemId);
    if (existing && existing.quantity > 1) {
      newMap.set(menuItemId, { ...existing, quantity: existing.quantity - 1 });
    } else {
      newMap.delete(menuItemId);
    }
    setSelectedItems(newMap);
  };

  const updateItemNotes = (menuItemId: string, notes: string) => {
    const newMap = new Map(selectedItems);
    const existing = newMap.get(menuItemId);
    if (existing) {
      newMap.set(menuItemId, { ...existing, notes });
    }
    setSelectedItems(newMap);
  };

  const handleSendOrder = () => {
    if (selectedItems.size === 0 || !tableNumber || !waiterName) {
      alert('Please fill in all required fields and add at least one item');
      return;
    }

    const orderItems: OrderItemKDS[] = Array.from(selectedItems.values()).map(({ item, quantity, notes }) => ({
      id: crypto.randomUUID(),
      name: item.name,
      category: item.category,
      quantity,
      notes,
      status: 'new' as const,
    }));

    onSendOrder(orderItems, tableNumber, waiterName, orderNotes);
    
    // Reset form
    setSelectedItems(new Map());
    setTableNumber('');
    setOrderNotes('');
  };

  const filteredMenu = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const total = Array.from(selectedItems.values()).reduce((sum, { item, quantity }) => sum + (item.price * quantity), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Menu Selection */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <div className="mt-4">
              <KDSFilterTabs
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'grill', label: 'Grill' },
                  { value: 'salad', label: 'Salad' },
                  { value: 'drinks', label: 'Drinks' },
                  { value: 'dessert', label: 'Dessert' },
                  { value: 'appetizer', label: 'Appetizer' },
                ]}
                activeFilter={selectedCategory}
                onFilterChange={(cat) => setSelectedCategory(cat as ItemCategoryKDS | 'all')}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredMenu.map(item => (
                <KDSMenuItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  category={item.category}
                  price={item.price}
                  onClick={() => addItem(item)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Current Order</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
            <div className="grid grid-cols-2 gap-2">
              <KDSInput
                label="Table Number"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                placeholder="e.g., 12"
              />
              <KDSInput
                label="Waiter Name"
                value={waiterName}
                onChange={(e) => setWaiterName(e.target.value)}
                placeholder="e.g., John"
              />
            </div>

            <div className="flex-1 overflow-auto space-y-2 pb-2">
              {selectedItems.size === 0 ? (
                <p className="text-muted-foreground text-center py-8">No items selected</p>
              ) : (
                Array.from(selectedItems.values()).map(({ item, quantity, notes }) => (
                  <Card key={item.id}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="flex-1">{item.name}</span>
                        <div className="flex items-center gap-2">
                          <KDSButton
                            size="sm"
                            variant="outline"
                            onClick={() => removeItem(item.id)}
                          >
                            <Minus className="h-3 w-3" />
                          </KDSButton>
                          <KDSQuantityBadge quantity={quantity} />
                          <KDSButton
                            size="sm"
                            variant="outline"
                            onClick={() => addItem(item)}
                          >
                            <Plus className="h-3 w-3" />
                          </KDSButton>
                        </div>
                      </div>
                      <KDSInput
                        placeholder="Special notes..."
                        value={notes}
                        onChange={(e) => updateItemNotes(item.id, e.target.value)}
                        className="text-sm"
                      />
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <KDSTextarea
              label="Order Notes"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Special instructions..."
              rows={2}
            />

            {/* Sticky Bottom Section */}
            <div className="sticky bottom-0 -mx-6 -mb-6 px-6 pb-6 pt-4 bg-white border-t shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
              <div className="flex justify-between mb-4 text-lg">
                <span>Total:</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <KDSButton
                variant="primary"
                fullWidth
                onClick={handleSendOrder}
                disabled={selectedItems.size === 0 || !tableNumber || !waiterName}
                leftIcon={<Send className="h-4 w-4" />}
              >
                Send to Kitchen
              </KDSButton>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
