import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import PublicBookingForm from '@/components/PublicBookingForm';

const services = [
  { name: 'Замена колес', price: 'от 2000 ₽', icon: 'Settings', description: 'Быстрая переобувка с гарантией' },
  { name: 'Балансировка', price: 'от 1200 ₽', icon: 'Gauge', description: 'Точная балансировка колес' },
  { name: 'Ремонт прокола', price: 'от 800 ₽', icon: 'Wrench', description: 'Качественный ремонт за 15 минут' },
  { name: 'Развал-схождение', price: 'от 3500 ₽', icon: 'CircleDot', description: 'Компьютерная диагностика' },
  { name: 'Хранение шин', price: 'от 3000 ₽/сезон', icon: 'Package', description: 'Склад с контролем влажности' },
  { name: 'Шиномонтаж грузовой', price: 'от 5000 ₽', icon: 'Truck', description: 'Обслуживание коммерческого транспорта' },
];

const locations = [
  { name: 'ул. Молокова, 72/2', phone: '+7 (913) 520-32-82', time: '08:00 - 22:00', rating: 4.9, reviews: 234 },
  { name: 'ул. 9 Мая, 62', phone: '+7 (983) 200-99-03', time: '08:00 - 22:00', rating: 4.8, reviews: 189 },
];

const features = [
  { icon: 'Clock', title: 'Без очередей', text: 'Онлайн-запись на удобное время' },
  { icon: 'Shield', title: 'Гарантия качества', text: 'Профессиональные мастера' },
  { icon: 'Zap', title: 'Быстро', text: 'Средняя длительность 30 минут' },
  { icon: 'CreditCard', title: 'Любая оплата', text: 'Наличные, карта, безнал' },
];

const Home = () => {
  const [showBooking, setShowBooking] = useState(false);

  const scrollToBooking = () => {
    setShowBooking(true);
    setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/image 12.png" alt="RK Шиномонтаж" className="h-12" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#services" className="text-sm hover:text-primary transition-colors">Услуги</a>
              <a href="#locations" className="text-sm hover:text-primary transition-colors">Точки</a>
              <a href="/pricing" className="text-sm hover:text-primary transition-colors">Прайс</a>
              <a href="#about" className="text-sm hover:text-primary transition-colors">О нас</a>
              <Button onClick={scrollToBooking} className="bg-primary hover:bg-primary/90">
                Записаться
              </Button>
            </nav>
            <Button onClick={scrollToBooking} className="md:hidden bg-primary">
              Записаться
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        <div className="container mx-auto px-4 py-24 md:py-32 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/50">
              RK Шиномонтаж — профессионально и быстро
            </Badge>
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Шиномонтаж с гарантией качества
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Запишитесь онлайн за 2 минуты. Средняя длительность обслуживания — 30 минут. Гарантия на все работы.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={scrollToBooking} className="bg-primary hover:bg-primary/90 text-lg px-8">
                <Icon name="Calendar" size={20} className="mr-2" />
                Записаться онлайн
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                <Icon name="Phone" size={20} className="mr-2" />
                +7 (983) 290-82-41
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card key={index} className="border-border bg-card hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name={feature.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="services" className="container mx-auto px-4 py-16 bg-muted/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Наши услуги</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Полный спектр услуг по обслуживанию колес и шин для любого типа автомобиля
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className="border-border bg-card hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name={service.icon as any} size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading font-semibold mb-1">{service.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                    <p className="text-primary font-medium">{service.price}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="locations" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Наши точки</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Выберите удобное расположение и запишитесь на обслуживание
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {locations.map((location, index) => (
            <Card key={index} className="border-border bg-card hover-scale animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  {location.name}
                </CardTitle>
                <CardDescription className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {location.time}
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Phone" size={14} />
                    {location.phone}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{location.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{location.reviews} отзывов</span>
                </div>
                <Button onClick={scrollToBooking} className="w-full bg-primary hover:bg-primary/90">
                  Записаться
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="container mx-auto px-4 py-16 bg-muted/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-12 text-center">Почему выбирают нас?</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary">01</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Современное технологичное оборудование</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Даем гарантию на все виды работ</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Стаж работы сотрудников от 3х лет</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Соблюдение технологий при выполнении работ</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary">02</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Полная диагностика колеса на геометрию</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Проверка на герметичность и износ шин</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Проверка давления в шинах</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Проверка балансировки колес</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary">03</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Ремонт в присутствии клиента</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Контроль затяжки динамометрическим ключом</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Оплата телефоном/картой</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl font-bold text-primary">04</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Автомойка</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">Просторная парковка</p>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-primary mt-1 flex-shrink-0" />
                  <p className="text-sm">АЗС</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {showBooking && (
        <section id="booking" className="container mx-auto px-4 py-16 animate-fade-in">
          <div className="max-w-6xl mx-auto">
            <PublicBookingForm />
          </div>
        </section>
      )}

      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://cdn.poehali.dev/files/image 12.png" alt="RK Шиномонтаж" className="h-10" />
              </div>
              <p className="text-sm text-muted-foreground">
                Профессиональный шиномонтаж в Красноярске
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Наши точки</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <div className="font-medium">ул. Молокова, 72/2</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="Phone" size={12} />
                    +7 (913) 520-32-82
                  </div>
                </li>
                <li className="mt-3">
                  <div className="font-medium">ул. 9 Мая, 62</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Icon name="Phone" size={12} />
                    +7 (983) 200-99-03
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Phone" size={14} className="mt-0.5" />
                  <div>
                    <div>Администратор:</div>
                    <div className="font-medium">+7 (983) 290-82-41</div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold mb-3">График работы</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Пн-Вс: 08:00 - 22:00</li>
                <li>Без выходных</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>ИП Кольцов Роман Петрович</p>
            <p className="mt-1">&copy; 2025 RK Шиномонтаж. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;