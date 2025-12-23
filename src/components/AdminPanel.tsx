import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const mockOrders = [
  { id: '001', client: 'Иван Петров', service: 'Замена колес', time: '10:00', status: 'Запланирован', price: 2000 },
  { id: '002', client: 'Мария Сидорова', service: 'Балансировка', time: '11:00', status: 'В работе', price: 1200 },
  { id: '003', client: 'Алексей Козлов', service: 'Ремонт прокола', time: '14:00', status: 'Выполнен', price: 800 },
  { id: '004', client: 'Ольга Смирнова', service: 'Развал-схождение', time: '15:00', status: 'Запланирован', price: 3500 },
];

const stats = [
  { label: 'Выручка за сегодня', value: '7 500 ₽', icon: 'TrendingUp', color: 'text-primary' },
  { label: 'Заказов сегодня', value: '4', icon: 'ShoppingCart', color: 'text-secondary' },
  { label: 'Средний чек', value: '1 875 ₽', icon: 'Wallet', color: 'text-primary' },
  { label: 'На складе комплектов', value: '23', icon: 'Package', color: 'text-secondary' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Запланирован':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    case 'В работе':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Выполнен':
      return 'bg-green-500/20 text-green-400 border-green-500/50';
    case 'Отменен':
      return 'bg-red-500/20 text-red-400 border-red-500/50';
    default:
      return '';
  }
};

const AdminPanel = () => {
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
            <Button className="bg-primary hover:bg-primary/90">
              <Icon name="Plus" size={18} className="mr-2" />
              Новый заказ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Клиент</TableHead>
                <TableHead>Услуга</TableHead>
                <TableHead>Время</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Сумма</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((order) => (
                <TableRow key={order.id} className="hover:bg-muted/50 transition-colors">
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      {order.client}
                    </div>
                  </TableCell>
                  <TableCell>{order.service}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      {order.time}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{order.price} ₽</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Eye" size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Icon name="Edit" size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Клиенты</CardTitle>
            <CardDescription>База постоянных клиентов</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Иван Петров', 'Мария Сидорова', 'Алексей Козлов'].map((client, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="User" size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{client}</p>
                      <p className="text-sm text-muted-foreground">Визитов: {3 - index}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="ChevronRight" size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl font-heading">Склад шин</CardTitle>
            <CardDescription>Комплекты на хранении</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { client: 'Иван Петров', location: 'A-12', season: 'Зима' },
                { client: 'Мария Сидорова', location: 'B-05', season: 'Лето' },
                { client: 'Алексей Козлов', location: 'C-18', season: 'Зима' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Icon name="Package" size={18} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{item.client}</p>
                      <p className="text-sm text-muted-foreground">Ячейка: {item.location} • {item.season}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Icon name="ChevronRight" size={18} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminPanel;
