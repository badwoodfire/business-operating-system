import { useState, type FormEvent } from 'react';
import PageHeader from '../../components/ui/PageHeader';
import { makeId, useBusinessStore } from '../../store/BusinessStore';
import type { Order, OrderItem, OrderStatus, PaymentMethod, Product } from '../../types';

type DraftItem = { productId: string; quantity: string };

const columns = [
  { key: 'id', label: 'Order ID' },
  { key: 'customerName', label: 'Customer' },
  { key: 'productSummary', label: 'Products' },
  { key: 'date', label: 'Date' },
  { key: 'itemCount', label: 'Units' },
  { key: 'total', label: 'Total (PKR)' },
  { key: 'status', label: 'Status' },
  { key: 'paymentMethod', label: 'Payment' },
];

const statuses: OrderStatus[] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
const methods: PaymentMethod[] = ['cod', 'bank_transfer', 'easypaisa', 'jazzcash', 'card'];

function getOrderItems(order: Order): OrderItem[] {
  if (order.items?.length) return order.items;
  if (order.productId) {
    const quantity = order.quantity ?? order.itemCount;
    return [{
      productId: order.productId,
      productName: order.productName ?? 'Product',
      quantity,
      unitPrice: quantity > 0 ? order.total / quantity : order.total,
      lineTotal: order.total,
    }];
  }
  return [];
}

function productLabel(product: Product): string {
  return `${product.name} — ${product.sku} — PKR ${product.price.toLocaleString('en-PK')} — ${product.stock} in stock`;
}

export default function OrdersPage() {
  const { orders, products, updateOrders, updateProducts } = useBusinessStore();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | undefined>();
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState<DraftItem[]>([]);
  const [status, setStatus] = useState<OrderStatus>('pending');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  const beginCreate = () => {
    setEditing(undefined);
    setCustomerName('');
    setItems([{ productId: '', quantity: '1' }]);
    setStatus('pending');
    setPaymentMethod('cod');
    setDate(new Date().toISOString().slice(0, 10));
    setOpen(true);
  };

  const beginEdit = (order: Order) => {
    setEditing(order.id);
    setCustomerName(order.customerName);
    setItems(getOrderItems(order).map((item) => ({ productId: item.productId, quantity: String(item.quantity) })));
    setStatus(order.status);
    setPaymentMethod(order.paymentMethod);
    setDate(order.date);
    setOpen(true);
  };

  const selectedTotal = items.reduce((sum, item) => {
    const product = products.find((row) => row.id === item.productId);
    const quantity = Number(item.quantity);
    return sum + (product && Number.isInteger(quantity) && quantity > 0 ? product.price * quantity : 0);
  }, 0);

  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!customerName.trim()) {
      window.alert('Please enter the customer name.');
      return;
    }
    if (items.length === 0) {
      window.alert('Add at least one product to this order.');
      return;
    }

    const requested = new Map<string, number>();
    const selectedProducts: Product[] = [];
    for (const item of items) {
      const product = products.find((row) => row.id === item.productId);
      const quantity = Number(item.quantity);
      if (!product) {
        window.alert('Please choose a valid product for every order item.');
        return;
      }
      if (!Number.isInteger(quantity) || quantity < 1) {
        window.alert('Each product quantity must be a whole number of at least 1.');
        return;
      }
      requested.set(product.id, (requested.get(product.id) ?? 0) + quantity);
      selectedProducts.push(product);
    }

    const nextProducts = products.map((product) => ({ ...product }));
    const previousOrder = editing ? orders.find((order) => order.id === editing) : undefined;
    if (previousOrder && previousOrder.status !== 'cancelled') {
      for (const oldItem of getOrderItems(previousOrder)) {
        const oldProduct = nextProducts.find((product) => product.id === oldItem.productId);
        if (oldProduct) oldProduct.stock += oldItem.quantity;
      }
    }

    if (status !== 'cancelled') {
      for (const [productId, quantity] of requested) {
        const product = nextProducts.find((row) => row.id === productId);
        if (!product || product.stock < quantity) {
          const name = products.find((row) => row.id === productId)?.name ?? 'Selected product';
          window.alert(`Not enough stock for ${name}. Available: ${product?.stock ?? 0}; requested: ${quantity}.`);
          return;
        }
      }
      for (const [productId, quantity] of requested) {
        const product = nextProducts.find((row) => row.id === productId);
        if (product) product.stock -= quantity;
      }
    }

    const orderItems: OrderItem[] = items.map((draft, index) => {
      const product = selectedProducts[index];
      const quantity = Number(draft.quantity);
      return {
        productId: product.id,
        productName: product.name,
        quantity,
        unitPrice: product.price,
        lineTotal: product.price * quantity,
      };
    });
    const total = orderItems.reduce((sum, item) => sum + item.lineTotal, 0);
    const order: Order = {
      id: editing ?? makeId('ORD'),
      customerName: customerName.trim(),
      items: orderItems,
      productName: orderItems.map((item) => item.productName).join(', '),
      itemCount: orderItems.reduce((sum, item) => sum + item.quantity, 0),
      total,
      status,
      paymentMethod,
      date,
    };

    updateProducts(nextProducts);
    updateOrders(editing ? orders.map((row) => row.id === editing ? order : row) : [order, ...orders]);
    setOpen(false);
  };

  const remove = (id: string) => {
    const order = orders.find((row) => row.id === id);
    if (order && order.status !== 'cancelled') {
      const nextProducts = products.map((product) => ({ ...product }));
      for (const item of getOrderItems(order)) {
        const product = nextProducts.find((row) => row.id === item.productId);
        if (product) product.stock += item.quantity;
      }
      updateProducts(nextProducts);
    }
    updateOrders(orders.filter((row) => row.id !== id));
  };

  return <>
    <PageHeader title="Orders" description="Create orders with one or more products. Stock and totals update automatically." />
    <section className="panel record-manager">
      <div className="panel__header">
        <div>
          <h2 className="panel__title">Order register</h2>
          <p className="panel__description">{orders.length} orders saved in this browser workspace.</p>
        </div>
        <button className="btn btn--primary" type="button" onClick={beginCreate}>Add order</button>
      </div>
      {open && <form className="record-form" onSubmit={save}>
        <h3>{editing ? 'Edit order' : 'Add order'}</h3>
        <div className="record-form__grid">
          <label className="record-field"><span>Customer name</span><input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} /></label>
          <label className="record-field"><span>Order date</span><input required type="date" value={date} onChange={(event) => setDate(event.target.value)} /></label>
          <label className="record-field"><span>Order status</span><select value={status} onChange={(event) => setStatus(event.target.value as OrderStatus)}>{statuses.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
          <label className="record-field"><span>Payment method</span><select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value as PaymentMethod)}>{methods.map((value) => <option key={value} value={value}>{value.replace('_', ' ')}</option>)}</select></label>
        </div>
        <div className="panel__header">
          <h3 className="panel__title">Products in this order</h3>
          <button className="btn btn--secondary" type="button" onClick={() => setItems((current) => [...current, { productId: '', quantity: '1' }])}>Add another product</button>
        </div>
        {items.map((item, index) => {
          const product = products.find((row) => row.id === item.productId);
          const quantity = Number(item.quantity);
          const lineTotal = product && Number.isInteger(quantity) && quantity > 0 ? product.price * quantity : 0;
          return <div className="record-form__grid" key={index}>
            <label className="record-field"><span>Product {index + 1}</span><select required value={item.productId} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, productId: event.target.value } : row))}><option value="">Choose product…</option>{products.map((row) => <option key={row.id} value={row.id}>{productLabel(row)}</option>)}</select></label>
            <label className="record-field"><span>Quantity</span><input required type="number" min="1" step="1" value={item.quantity} onChange={(event) => setItems((current) => current.map((row, rowIndex) => rowIndex === index ? { ...row, quantity: event.target.value } : row))} /></label>
            <label className="record-field"><span>Line total (PKR)</span><input readOnly value={lineTotal.toLocaleString('en-PK')} /></label>
            <div className="record-field"><span> </span><button className="btn btn--ghost" type="button" disabled={items.length === 1} onClick={() => setItems((current) => current.filter((_, rowIndex) => rowIndex !== index))}>Remove</button></div>
          </div>;
        })}
        <p className="panel__description">Order total: <strong>PKR {selectedTotal.toLocaleString('en-PK')}</strong></p>
        <div className="record-form__actions"><button className="btn btn--primary" type="submit"> {editing ? 'Save changes' : 'Save order'}</button><button className="btn btn--secondary" type="button" onClick={() => setOpen(false)}>Cancel</button></div>
      </form>}
      {orders.length === 0 ? <p className="empty-state">No orders yet. Add your first one above.</p> : <div className="table-scroll"><table className="data-table"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}<th>Actions</th></tr></thead><tbody>{orders.map((order) => {
        const record: Record<string, string | number> = {
          ...order,
          productSummary: getOrderItems(order).map((item) => `${item.productName} × ${item.quantity}`).join(', ') || order.productName || '—',
        };
        return <tr key={order.id}>{columns.map((column) => <td key={column.key} data-label={column.label}>{String(record[column.key] ?? '')}</td>)}<td className="data-table__actions"><div className="row-actions"><button className="btn btn--ghost btn--icon" type="button" aria-label={`Edit ${order.id}`} onClick={() => beginEdit(order)}>Edit</button><button className="btn btn--ghost btn--icon" type="button" aria-label={`Delete ${order.id}`} onClick={() => { if (window.confirm('Delete this order? This cannot be undone.')) remove(order.id); }}>Delete</button></div></td></tr>;
      })}</tbody></table></div>}
    </section>
  </>;
}
