import { Send, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

import { colorTokens, radiusTokens, spacingTokens } from './tokens';
import type { OrderKDS } from '@/types';
import { KDSButton } from './KDSButton';
import { KDSCategoryBadge } from './KDSCategoryBadge';
import { KDSFilterTabs } from './KDSFilterTabs';
import { KDSInput } from './KDSInput';
import { KDSMenuItem } from './KDSMenuItem';
import { KDSNotificationToast } from './KDSNotificationToast';
import { KDSOrderCard } from './KDSOrderCard';
import { KDSQuantityBadge } from './KDSQuantityBadge';
import { KDSStatusBadge } from './KDSStatusBadge';
import { KDSTextarea } from './KDSTextarea';
import { KDSTimer } from './KDSTimer';

export function DesignSystemDocs() {
  // Mock data for examples
  const mockOrder: OrderKDS = {
    id: '1',
    orderNumber: 123,
    items: [
      { id: '1', name: 'Grilled Chicken', category: 'grill', quantity: 2, status: 'new', notes: 'No sauce' },
      { id: '2', name: 'Caesar Salad', category: 'salad', quantity: 1, status: 'new' },
    ],
    status: 'new',
    createdAt: new Date(Date.now() - 5 * 60000),
    updatedAt: new Date(),
    waiterName: 'John',
    tableNumber: '12',
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1>Kitchen Display System</h1>
        <h2 className="text-muted-foreground">Design System Documentation</h2>
        <p className="text-muted-foreground">
          A comprehensive design system for restaurant order management interfaces.
          Built with React, TypeScript, Tailwind CSS, and Motion.
        </p>
      </div>

      <Tabs defaultValue="colors" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="typography">Typography</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="components">Components</TabsTrigger>
          <TabsTrigger value="buttons">Buttons</TabsTrigger>
          <TabsTrigger value="forms">Forms</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
        </TabsList>

        {/* Colors Tab */}
        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Colors</CardTitle>
              <p className="text-sm text-muted-foreground">
                Semantic colors for order status indication
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(colorTokens.status).map(([status, colors]) => (
                <div key={status} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border-2"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm capitalize">{status}</p>
                    <p className="text-xs text-muted-foreground font-mono">{colors.background}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Colors</CardTitle>
              <p className="text-sm text-muted-foreground">
                Color-coded item categories for quick identification
              </p>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {Object.entries(colorTokens.category).map(([category, colors]) => (
                <div key={category} className="space-y-2">
                  <div
                    className="h-20 rounded-lg border"
                    style={{
                      backgroundColor: colors.background,
                      borderColor: colors.border,
                    }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm capitalize">{category}</p>
                    <p className="text-xs text-muted-foreground font-mono">{colors.background}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brand Colors</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(colorTokens.brand).map(([name, color]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 rounded-lg"
                    style={{ backgroundColor: color }}
                  />
                  <div className="space-y-1">
                    <p className="text-sm capitalize">{name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{color}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Typography Tab */}
        <TabsContent value="typography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Type Scale</CardTitle>
              <p className="text-sm text-muted-foreground">
                Consistent typography hierarchy for readability
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="text-5xl">Heading 1 (5xl)</p>
                  <p className="text-xs text-muted-foreground font-mono">3rem / 48px</p>
                </div>
                <div>
                  <p className="text-4xl">Heading 2 (4xl)</p>
                  <p className="text-xs text-muted-foreground font-mono">2.25rem / 36px</p>
                </div>
                <div>
                  <p className="text-3xl">Heading 3 (3xl)</p>
                  <p className="text-xs text-muted-foreground font-mono">1.875rem / 30px</p>
                </div>
                <div>
                  <p className="text-2xl">Heading 4 (2xl)</p>
                  <p className="text-xs text-muted-foreground font-mono">1.5rem / 24px</p>
                </div>
                <div>
                  <p className="text-xl">Heading 5 (xl)</p>
                  <p className="text-xs text-muted-foreground font-mono">1.25rem / 20px</p>
                </div>
                <div>
                  <p className="text-base">Body Text (base)</p>
                  <p className="text-xs text-muted-foreground font-mono">1rem / 16px</p>
                </div>
                <div>
                  <p className="text-sm">Small Text (sm)</p>
                  <p className="text-xs text-muted-foreground font-mono">0.875rem / 14px</p>
                </div>
                <div>
                  <p className="text-xs">Caption Text (xs)</p>
                  <p className="text-xs text-muted-foreground font-mono">0.75rem / 12px</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Font Weights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="font-normal">Normal (400)</p>
              <p className="font-medium">Medium (500)</p>
              <p className="font-semibold">Semibold (600)</p>
              <p className="font-bold">Bold (700)</p>
              <p className="font-extrabold">Extrabold (800)</p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Spacing Tab */}
        <TabsContent value="spacing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Spacing Scale</CardTitle>
              <p className="text-sm text-muted-foreground">
                Consistent spacing for layouts and components
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(spacingTokens).map(([name, value]) => (
                <div key={name} className="flex items-center gap-4">
                  <div className="w-32">
                    <code className="text-sm">{name}</code>
                  </div>
                  <div className="w-24 text-sm text-muted-foreground">{value}</div>
                  <div className="flex-1">
                    <div
                      className="h-8 bg-blue-500 rounded"
                      style={{ width: value }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Border Radius</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(radiusTokens).map(([name, value]) => (
                <div key={name} className="space-y-2">
                  <div
                    className="h-20 bg-gray-200 border-2 border-gray-400"
                    style={{ borderRadius: value }}
                  />
                  <div>
                    <p className="text-sm">{name}</p>
                    <p className="text-xs text-muted-foreground font-mono">{value}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Components Tab */}
        <TabsContent value="components" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Status Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <KDSStatusBadge status="new" />
              <KDSStatusBadge status="in-progress" />
              <KDSStatusBadge status="ready" />
              <KDSStatusBadge status="completed" />
              <KDSStatusBadge status="new" size="sm" />
              <KDSStatusBadge status="ready" size="lg" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <KDSCategoryBadge category="grill" />
              <KDSCategoryBadge category="salad" />
              <KDSCategoryBadge category="drinks" />
              <KDSCategoryBadge category="dessert" />
              <KDSCategoryBadge category="appetizer" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timer Component</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-6">
              <KDSTimer startTime={new Date(Date.now() - 5 * 60000)} />
              <KDSTimer startTime={new Date(Date.now() - 15 * 60000)} />
              <KDSTimer startTime={new Date(Date.now() - 25 * 60000)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quantity Badges</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 items-center">
              <KDSQuantityBadge quantity={1} size="sm" />
              <KDSQuantityBadge quantity={2} />
              <KDSQuantityBadge quantity={3} size="lg" />
              <KDSQuantityBadge quantity={5} variant="outlined" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Card</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-w-md">
                <KDSOrderCard order={mockOrder} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl">
                <KDSMenuItem
                  id="1"
                  name="Grilled Chicken"
                  category="grill"
                  price={18.99}
                />
                <KDSMenuItem
                  id="2"
                  name="Caesar Salad"
                  category="salad"
                  price={12.99}
                />
                <KDSMenuItem
                  id="3"
                  name="Coca Cola"
                  category="drinks"
                  price={3.99}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Buttons Tab */}
        <TabsContent value="buttons" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <KDSButton variant="primary">Primary</KDSButton>
                <KDSButton variant="secondary">Secondary</KDSButton>
                <KDSButton variant="outline">Outline</KDSButton>
                <KDSButton variant="ghost">Ghost</KDSButton>
                <KDSButton variant="destructive">Destructive</KDSButton>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button Sizes</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4 items-center">
              <KDSButton size="sm">Small</KDSButton>
              <KDSButton size="md">Medium</KDSButton>
              <KDSButton size="lg">Large</KDSButton>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Button States</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <KDSButton leftIcon={<Send className="h-4 w-4" />}>With Icon</KDSButton>
              <KDSButton isLoading>Loading</KDSButton>
              <KDSButton disabled>Disabled</KDSButton>
              <KDSButton fullWidth>Full Width</KDSButton>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forms Tab */}
        <TabsContent value="forms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Input Fields</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 max-w-md">
              <KDSInput label="Table Number" placeholder="e.g., 12" />
              <KDSInput
                label="Email"
                type="email"
                error="Invalid email address"
                placeholder="john@example.com"
              />
              <KDSInput
                label="Phone"
                helperText="Include country code"
                placeholder="+1 234 567 8900"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Textarea</CardTitle>
            </CardHeader>
            <CardContent className="max-w-md">
              <KDSTextarea
                label="Order Notes"
                placeholder="Special instructions..."
                maxLength={200}
                showCount
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Patterns Tab */}
        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filter Tabs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-muted-foreground mb-3">Default Style</p>
                <KDSFilterTabs
                  options={[
                    { value: 'all', label: 'All', count: 10 },
                    { value: 'new', label: 'New', count: 3 },
                    { value: 'ready', label: 'Ready', count: 2 },
                  ]}
                  activeFilter="all"
                  onFilterChange={() => {}}
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Pills Style</p>
                <KDSFilterTabs
                  options={[
                    { value: 'all', label: 'All', count: 10 },
                    { value: 'new', label: 'New', count: 3 },
                    { value: 'ready', label: 'Ready', count: 2 },
                  ]}
                  activeFilter="new"
                  onFilterChange={() => {}}
                  variant="pills"
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-3">Underline Style</p>
                <KDSFilterTabs
                  options={[
                    { value: 'all', label: 'All Orders', count: 10 },
                    { value: 'new', label: 'New', count: 3 },
                    { value: 'ready', label: 'Ready', count: 2 },
                  ]}
                  activeFilter="ready"
                  onFilterChange={() => {}}
                  variant="underline"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Toast</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <KDSNotificationToast
                id="1"
                type="new-order"
                title="New Order"
                message="Order #123 - Table 5"
                onDismiss={() => {}}
              />
              <KDSNotificationToast
                id="2"
                type="order-ready"
                title="Order Ready"
                message="Order #120 - Table 3"
                onDismiss={() => {}}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Design Principles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2">1. High Contrast & Readability</h4>
                <p className="text-sm text-muted-foreground">
                  All text meets WCAG AA standards for contrast. Large, readable fonts suitable for busy kitchen environments and tablet displays.
                </p>
              </div>
              <div>
                <h4 className="mb-2">2. Color-Coded Status</h4>
                <p className="text-sm text-muted-foreground">
                  Consistent color system: Red (new/urgent), Yellow (in-progress), Green (ready), Gray (completed). Enables quick visual scanning.
                </p>
              </div>
              <div>
                <h4 className="mb-2">3. Touch-Friendly Targets</h4>
                <p className="text-sm text-muted-foreground">
                  Minimum 44x44px touch targets for tablet and touchscreen interfaces. Large buttons and cards for easy interaction.
                </p>
              </div>
              <div>
                <h4 className="mb-2">4. Real-Time Feedback</h4>
                <p className="text-sm text-muted-foreground">
                  Smooth animations, sound alerts, and visual notifications for order status changes. Keeps staff informed without constant monitoring.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
