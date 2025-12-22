import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Order = {
  id: number;
  client_name: string;
  client_phone: string;
  service: string;
  booking_time: string;
  booking_date: string;
  status: string;
  service_price: number;
  location: string;
  assigned_master_id?: number;
};

type Master = {
  id: number;
  name: string;
  location: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'in-progress':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'cancelled':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return '';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending':
      return 'Ожидает';
    case 'in-progress':
      return 'В работе';
    case 'completed':
      return 'Выполнен';
    case 'cancelled':
      return 'Отменен';
    default:
      return status;
  }
};

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [masters, setMasters] = useState<Master[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/3e1c1c17-302d-4b69-ba4e-9aa5ce666bcd');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить заказы',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchMasters = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/6929340f-b7a0-4f38-a511-642cca1b12b5');
      if (response.ok) {
        const data = await response.json();
        setMasters(data);
      }
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchMasters();
    const interval = setInterval(fetchOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/3e1c1c17-302d-4b69-ba4e-9aa5ce666bcd', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Статус заказа обновлен',
        });
        fetchOrders();
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось обновить статус',
        variant: 'destructive',
      });
    }
  };

  const assignMaster = async (orderId: number, masterId: string) => {
    try {
      const response = await fetch('https://functions.poehali.dev/3e1c1c17-302d-4b69-ba4e-9aa5ce666bcd', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orderId,
          assignedMasterId: masterId ? parseInt(masterId) : null,
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Мастер назначен на заказ',
        });
        fetchOrders();
      }
    } catch (error) {
      console.error('Error assigning master:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось назначить мастера',
        variant: 'destructive',
      });
    }
  };

  const todayOrders = orders.filter(order => {
    const orderDate = new Date(order.booking_date);
    const today = new Date();
    return orderDate.toDateString() === today.toDateString();
  });

  const totalRevenue = todayOrders.reduce((sum, order) => sum + order.service_price, 0);
  const averageCheck = todayOrders.length > 0 ? Math.round(totalRevenue / todayOrders.length) : 0;

  const stats = [
    { label: 'Выручка за сегодня', value: `${totalRevenue.toLocaleString()} ₽`, icon: 'TrendingUp', color: 'text-primary' },
    { label: 'Заказов сегодня', value: todayOrders.length.toString(), icon: 'ShoppingCart', color: 'text-secondary' },
    { label: 'Средний чек', value: `${averageCheck.toLocaleString()} ₽`, icon: 'Wallet', color: 'text-primary' },
    { label: 'Всего заказов', value: orders.length.toString(), icon: 'Package', color: 'text-secondary' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-border bg-card hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-heading font-bold">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon as any} size={24} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-heading">Заказы</CardTitle>
              <CardDescription>Управление текущими и прошлыми заказами</CardDescription>
            </div>
            <Button className="bg-primary hover:bg-primary/90" onClick={fetchOrders}>
              <Icon name="RefreshCw" size={18} className="mr-2" />
              Обновить
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <Icon name="Loader2" size={32} className="animate-spin mx-auto text-primary" />
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="Inbox" size={48} className="mx-auto mb-3 opacity-50" />
              <p>Заказов пока нет</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Точка</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Мастер</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Сумма</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.client_name}</p>
                        <p className="text-sm text-muted-foreground">{order.client_phone}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{order.location}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Icon name="Calendar" size={14} className="text-muted-foreground" />
                        {new Date(order.booking_date).toLocaleDateString('ru-RU')} {order.booking_time}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Select 
                        value={order.assigned_master_id?.toString() || 'none'} 
                        onValueChange={(value) => assignMaster(order.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Назначить мастера" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">Не назначен</SelectItem>
                          {masters.map((master) => (
                            <SelectItem key={master.id} value={master.id.toString()}>
                              {master.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(order.status)}>
                        {getStatusLabel(order.status)}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{order.service_price.toLocaleString()} ₽</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;