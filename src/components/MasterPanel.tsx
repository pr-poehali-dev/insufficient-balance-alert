import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

type OrderStatus = 'waiting' | 'in-progress' | 'completed' | 'ready';

type Order = {
  id: string;
  client: string;
  car: string;
  service: string;
  time: string;
  status: OrderStatus;
  duration: number;
};

const mockOrders: Order[] = [
  { id: '001', client: 'Иван Петров', car: 'Toyota Camry, A123BC', service: 'Замена колес (4 шт)', time: '10:00', status: 'waiting', duration: 30 },
  { id: '002', client: 'Мария Сидорова', car: 'BMW X5, B456CD', service: 'Балансировка (4 шт)', time: '11:00', status: 'in-progress', duration: 20 },
  { id: '003', client: 'Алексей Козлов', car: 'Mercedes E-Class, C789EF', service: 'Ремонт прокола', time: '14:00', status: 'completed', duration: 15 },
];

const checklistItems = [
  'Осмотр шин на предмет повреждений',
  'Проверка глубины протектора',
  'Проверка давления в шинах',
  'Балансировка колес',
  'Затяжка гаек динамометрическим ключом',
];

const MasterPanel = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(checklistItems.length).fill(false));
  const [notes, setNotes] = useState('');

  const getStatusConfig = (status: OrderStatus) => {
    switch (status) {
      case 'waiting':
        return { label: 'Ожидает', color: 'bg-blue-500/20 text-blue-400 border-blue-500/50' };
      case 'in-progress':
        return { label: 'В работе', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' };
      case 'completed':
        return { label: 'Завершено', color: 'bg-green-500/20 text-green-400 border-green-500/50' };
      case 'ready':
        return { label: 'Готово к выдаче', color: 'bg-primary/20 text-primary border-primary/50' };
      default:
        return { label: 'Неизвестно', color: '' };
    }
  };

  const handleChecklistToggle = (index: number) => {
    const newChecklist = [...checklist];
    newChecklist[index] = !newChecklist[index];
    setChecklist(newChecklist);
  };

  const getOrdersByStatus = (status: OrderStatus) => mockOrders.filter(order => order.status === status);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid gap-6 lg:grid-cols-3 mb-6">
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Icon name="Clock" size={18} className="text-blue-400" />
              Ожидают
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getOrdersByStatus('waiting').map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all hover-scale border-2 border-transparent hover:border-primary"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.car}</p>
                    </div>
                    <Badge variant="outline" className={getStatusConfig(order.status).color}>
                      {order.time}
                    </Badge>
                  </div>
                  <p className="text-sm">{order.service}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Icon name="Timer" size={12} />
                    {order.duration} мин
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Icon name="Wrench" size={18} className="text-yellow-400" />
              В работе
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getOrdersByStatus('in-progress').map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all hover-scale border-2 border-transparent hover:border-primary"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.car}</p>
                    </div>
                    <Badge variant="outline" className={getStatusConfig(order.status).color}>
                      {order.time}
                    </Badge>
                  </div>
                  <p className="text-sm">{order.service}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Icon name="Timer" size={12} />
                    {order.duration} мин
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-heading flex items-center gap-2">
              <Icon name="CheckCircle2" size={18} className="text-green-400" />
              Завершено
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {getOrdersByStatus('completed').map((order) => (
                <div
                  key={order.id}
                  className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 cursor-pointer transition-all hover-scale border-2 border-transparent hover:border-primary"
                  onClick={() => setSelectedOrder(order)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{order.client}</p>
                      <p className="text-sm text-muted-foreground">{order.car}</p>
                    </div>
                    <Badge variant="outline" className={getStatusConfig(order.status).color}>
                      {order.time}
                    </Badge>
                  </div>
                  <p className="text-sm">{order.service}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                    <Icon name="Timer" size={12} />
                    {order.duration} мин
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {selectedOrder && (
        <Card className="border-primary bg-card animate-scale-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-heading">Карточка заказа #{selectedOrder.id}</CardTitle>
                <CardDescription>{selectedOrder.client} • {selectedOrder.car}</CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                <Icon name="X" size={20} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Calendar" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Время:</span>
                  <span className="font-medium">{selectedOrder.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Timer" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Длительность:</span>
                  <span className="font-medium">{selectedOrder.duration} мин</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="Wrench" size={16} className="text-muted-foreground" />
                  <span className="text-muted-foreground">Услуга:</span>
                  <span className="font-medium">{selectedOrder.service}</span>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Badge variant="outline" className={`${getStatusConfig(selectedOrder.status).color} text-base px-4 py-2`}>
                  {getStatusConfig(selectedOrder.status).label}
                </Badge>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <Label className="text-lg mb-4 block">Чек-лист осмотра</Label>
              <div className="space-y-3">
                {checklistItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={`check-${index}`}
                      checked={checklist[index]}
                      onCheckedChange={() => handleChecklistToggle(index)}
                    />
                    <Label htmlFor={`check-${index}`} className="cursor-pointer flex-1">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <Label htmlFor="notes" className="text-lg mb-2 block">Заметки мастера</Label>
              <Textarea
                id="notes"
                placeholder="Добавьте комментарии о состоянии шин, рекомендации клиенту..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                <Icon name="CheckCircle2" size={18} className="mr-2" />
                Завершить работу
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MasterPanel;
