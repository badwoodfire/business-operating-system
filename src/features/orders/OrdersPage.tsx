import PageHeader from '../../components/ui/PageHeader';
import RecordManager, { type RecordField } from '../../components/workspace/RecordManager';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Order, OrderStatus, PaymentMethod } from '../../types';

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'productName', label: 'Product' },
  { key: 'date', label: 'Date' },
  { key: 'itemCount', label: 'Quantity' },
  { key: 'total', label: 'Total (PKR)' },
  { key: 'status', label: 'Status' },
  { key: 'paymentMethod', label: 'Payment' },
];

export default function OrdersPage() {
  const { orders, products, payments, updateOrders, updateProducts, updatePayments } = useBusinessStore();

  const fields: RecordField[] = [
    { name: 'customerName', label: 'Customer name' },
    {
      name: 'productId',
      label: 'Product',
      type: 'select',
      options: products.map((product) => ({
        value: product.id,
        label: `${product.name} — ${product.sku} — PKR ${product.price} — ${product.stock} in stock`,
      })),
    },
    { name: 'quantity', label: 'Quantity', type: 'number' },
    {
      name: 'totalPreview',
      label: 'Order total (PKR)',
      type: 'computed',
      required: false,
      compute: (values) => {
        const product = products.find((item) => item.id === values.productId);
        const quantity = Number(values.quantity);
        return product && Number.isInteger(quantity) && quantity > 0
          ? (product.price * quantity).toLocaleString('en-PK')
          : 'Select a product and enter a quantity';
      },
    },
    { name: 'status', label: 'Order status', type: 'select', options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((value) => ({ value, label: value })) },
    { name: 'paymentMethod', label: 'Payment method', type: 'select', options: ['cod', 'bank_transfer', 'easypaisa', 'jazzcash', 'card'].map((value) => ({ value, label: value.replace('_', ' ') })) },
    { name: 'date', label: 'Order date', type: 'date' },
  ];

  const save = (values: Record<string, string | number>, id?: string) => {
    const productId = String(values.productId ?? '');
    const quantity = Number(values.quantity);
    const status = values.status as OrderStatus;

    if (!Number.isInteger(quantity) || quantity < 1) {
      window.alert('Please enter a whole-number quantity of at least 1.');
      return;
    }

    const selectedProduct = products.find((product) => product.id === productId);
    if (!selectedProduct) {
      window.alert('Please select a product from Inventory.');
      return;
    }

    // Work on a copy so an unsuccessful save never changes inventory.
    const nextProducts = products.map((product) => ({ ...product }));
    const previousOrder = id ? orders.find((order) => order.id === id) : undefined;

    // Return the previous reservation before checking the edited order.
    if (previousOrder?.productId && previousOrder.status !== 'cancelled') {
      const previousProduct = nextProducts.find((product) => product.id === previousOrder.productId);
      if (previousProduct) previousProduct.stock += previousOrder.quantity ?? previousOrder.itemCount;
    }

    const nextSelectedProduct = nextProducts.find((product) => product.id === productId);
    if (!nextSelectedProduct) {
      window.alert('That product is no longer available in Inventory. Please choose another product.');
      return;
    }

    // Cancelled orders do not reserve stock. All other statuses do.
    if (status !== 'cancelled') {
      if (nextSelectedProduct.stock < quantity) {
        window.alert(`Only ${nextSelectedProduct.stock} unit(s) of ${nextSelectedProduct.name} are available.`);
        return;
      }
      nextSelectedProduct.stock -= quantity;
    }

    const item: Order = {
      id: id ?? makeId('ORD'),
      customerName: String(values.customerName).trim(),
      productId,
      productName: selectedProduct.name,
      quantity,
      itemCount: quantity,
      total: selectedProduct.price * quantity,
      status,
      paymentMethod: values.paymentMethod as PaymentMethod,
      date: String(values.date),
    };

    // Keep an order-linked pending payment in sync with the order total.
    // Received payments are preserved; only the outstanding balance is generated.
    const receivedTotal = payments
      .filter((payment) => payment.orderId === item.id && payment.status === 'received')
      .reduce((sum, payment) => sum + payment.amount, 0);
    const outstanding = Math.max(0, item.total - receivedTotal);
    const linkedPending = payments.find(
      (payment) => payment.orderId === item.id && payment.source === 'order' && payment.status !== 'received',
    );

    let nextPayments = payments.filter((payment) => payment.id !== linkedPending?.id);
    if (outstanding > 0) {
      nextPayments = [{
        id: linkedPending?.id ?? makeId('PAY'),
        orderId: item.id,
        customerName: item.customerName,
        method: item.paymentMethod,
        amount: outstanding,
        status: 'pending',
        date: item.date,
        source: 'order',
      }, ...nextPayments];
    }

    updateProducts(nextProducts);
    updateOrders(id ? orders.map((row) => row.id === id ? item : row) : [item, ...orders]);
    updatePayments(nextPayments);
  };

  const remove = (id: string) => {
    const order = orders.find((row) => row.id === id);
    if (order?.productId && order.status !== 'cancelled') {
      const nextProducts = products.map((product) => ({ ...product }));
      const product = nextProducts.find((item) => item.id === order.productId);
      if (product) {
        product.stock += order.quantity ?? order.itemCount;
        updateProducts(nextProducts);
      }
    }
    updateOrders(orders.filter((row) => row.id !== id));
  };

  return <>
    <PageHeader title="Orders" description="Create, update and track customer orders. Amounts are in PKR." />
    <RecordManager
      title="Order register"
      description={`${orders.length} orders saved in this browser workspace.`}
      createLabel="Add order"
      fields={fields}
      columns={columns}
      rows={orders}
      onSave={save}
      onDelete={remove}
    />
  </>;
}
