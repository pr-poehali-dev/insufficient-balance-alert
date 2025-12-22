import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Master = {
  id: number;
  name: string;
  location: string;
};

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
  car_type: string;
  notes?: string;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'in-progress':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'completed':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
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
    default:
      return status;
  }
};

const Master = () => {
  const [masters, setMasters] = useState<Master[]>([]);
  const [selectedMaster, setSelectedMaster] = useState<string>('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchMasters();
  }, []);

  useEffect(() => {
    if (selectedMaster) {
      fetchOrders();
    }
  }, [selectedMaster]);

  const fetchMasters = async () => {
    try {
      const response = await fetch('https://functions.poehali.dev/6929340f-b7a0-4f38-a511-642cca1b12b5');
      if (response.ok) {
        const data = await response.json();
        setMasters(data);
        if (data.length > 0) {
          setSelectedMaster(data[0].id.toString());
        }
      }
    } catch (error) {
      console.error('Error fetching masters:', error);
    }
  };

  const fetchOrders = async () => {
    if (!selectedMaster) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://functions.poehali.dev/6929340f-b7a0-4f38-a511-642cca1b12b5?masterId=${selectedMaster}`
      );
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

  const completeOrder = async (orderId: number) => {
    try {
      const response = await fetch('https://functions.poehali.dev/3e1c1c17-302d-4b69-ba4e-9aa5ce666bcd', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: orderId,
          status: 'completed',
        }),
      });

      if (response.ok) {
        toast({
          title: 'Успешно',
          description: 'Заказ отмечен как выполненный',
        });
        fetchOrders();
      }
    } catch (error) {
      console.error('Error completing order:', error);
      toast({
        title: 'Ошибка',
        description: 'Не удалось завершить заказ',
        variant: 'destructive',
      });
    }
  };

  const currentMaster = masters.find(m => m.id.toString() === selectedMaster);
  const inProgressOrders = orders.filter(o => o.status === 'in-progress');
  const completedOrders = orders.filter(o => o.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Wrench" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-heading font-bold">Рабочее место мастера</h1>
            </div>
            <Button variant="outline" onClick={() => window.location.href = '/admin'}>
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Админ-панель
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-6">
          <Card className="border-border bg-card">
            <CardHeader>
              <CardTitle className="text-xl font-heading">Выберите мастера</CardTitle>
              <CardDescription>Войдите как мастер для просмотра заказов</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedMaster} onValueChange={setSelectedMaster}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Выберите мастера" />
                </SelectTrigger>
                <SelectContent>
                  {masters.map((master) => (
                    <SelectItem key={master.id} value={master.id.toString()}>
                      {master.name} — {master.location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {selectedMaster && (
            <>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">В работе</p>
                        <p className="text-3xl font-heading font-bold">{inProgressOrders.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                        <Icon name="Clock" size={24} className="text-yellow-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Выполнено сегодня</p>
                        <p className="text-3xl font-heading font-bold">{completedOrders.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
                        <Icon name="CheckCircle2" size={24} className="text-green-400" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border bg-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Всего заказов</p>
                        <p className="text-3xl font-heading font-bold">{orders.length}</p>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Icon name="Package" size={24} className="text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-border bg-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl font-heading">Мои заказы</CardTitle>
                      <CardDescription>Назначенные на вас заказы</CardDescription>
                    </div>
                    <Button onClick={fetchOrders} variant="outline">
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
                      <p>Нет назначенных заказов</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <Card key={order.id} className="border-border bg-muted/30">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-lg font-heading font-semibold">Заказ #{order.id}</h3>
                                  <Badge variant="outline" className={getStatusColor(order.status)}>
                                    {getStatusLabel(order.status)}
                                  </Badge>
                                </div>
                                <div className="grid gap-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Icon name="User" size={16} className="text-muted-foreground" />
                                    <span>{order.client_name} • {order.client_phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="MapPin" size={16} className="text-muted-foreground" />
                                    <span>{order.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="Calendar" size={16} className="text-muted-foreground" />
                                    <span>{new Date(order.booking_date).toLocaleDateString('ru-RU')} в {order.booking_time}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="Wrench" size={16} className="text-muted-foreground" />
                                    <span>{order.service} • {order.car_type}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Icon name="Wallet" size={16} className="text-muted-foreground" />
                                    <span className="font-medium">{order.service_price.toLocaleString()} ₽</span>
                                  </div>
                                </div>
                              </div>
                              {order.status === 'in-progress' && (
                                <Button
                                  onClick={() => completeOrder(order.id)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Icon name="CheckCircle2" size={18} className="mr-2" />
                                  Завершить
                                </Button>
                              )}
                            </div>
                            {order.notes && (
                              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                <p className="text-sm text-muted-foreground">
                                  <Icon name="MessageSquare" size={14} className="inline mr-2" />
                                  {order.notes}
                                </p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Master;
