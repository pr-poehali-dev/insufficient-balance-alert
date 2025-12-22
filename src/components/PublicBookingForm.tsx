import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

type ServiceType = {
  id: string;
  name: string;
  duration: number;
  price: number;
};

const services: ServiceType[] = [
  { id: '1', name: 'Замена колес (4 шт)', duration: 30, price: 2000 },
  { id: '2', name: 'Балансировка (4 шт)', duration: 20, price: 1200 },
  { id: '3', name: 'Ремонт прокола', duration: 15, price: 800 },
  { id: '4', name: 'Развал-схождение', duration: 60, price: 3500 },
];

const locations = [
  { id: '1', name: 'ул. Ленина, 45', available: true },
  { id: '2', name: 'пр. Мира, 123', available: true },
  { id: '3', name: 'ул. Гагарина, 78', available: true },
];

const timeSlots = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

const PublicBookingForm = () => {
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [carType, setCarType] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');

  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedLocationData = locations.find(l => l.id === selectedLocation);
  const totalPrice = selectedServiceData?.price || 0;
  const totalDuration = selectedServiceData?.duration || 0;

  const handleBooking = async () => {
    try {
      await api.bookings.create({
        clientName,
        clientPhone,
        clientEmail,
        location: selectedLocationData?.name || '',
        carType,
        service: selectedServiceData?.name || '',
        serviceDuration: totalDuration,
        servicePrice: totalPrice,
        bookingDate: selectedDate?.toISOString().split('T')[0] || '',
        bookingTime: selectedTime,
      });
      setStep(4);
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSelectedLocation('');
    setSelectedService('');
    setSelectedDate(undefined);
    setSelectedTime('');
    setCarType('');
    setClientName('');
    setClientPhone('');
    setClientEmail('');
  };

  return (
    <Card className="border-primary bg-card">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-heading">Онлайн-запись</CardTitle>
        <CardDescription>Заполните форму — мы перезвоним для подтверждения</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-all ${
                step >= s ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-lg mb-4 block">Выберите точку шиномонтажа</Label>
              <div className="grid gap-4 md:grid-cols-3">
                {locations.map((location) => (
                  <Card
                    key={location.id}
                    className={`cursor-pointer transition-all hover-scale ${
                      selectedLocation === location.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    } ${!location.available && 'opacity-50 cursor-not-allowed'}`}
                    onClick={() => location.available && setSelectedLocation(location.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon name="MapPin" size={20} className="text-primary" />
                          <div>
                            <p className="font-medium">{location.name}</p>
                            {location.available && (
                              <Badge variant="secondary" className="mt-1">Доступно</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-lg mb-4 block">Тип автомобиля</Label>
              <Select value={carType} onValueChange={setCarType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите тип автомобиля" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedan">Легковой</SelectItem>
                  <SelectItem value="suv">Внедорожник</SelectItem>
                  <SelectItem value="minivan">Минивен</SelectItem>
                  <SelectItem value="commercial">Коммерческий</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-lg mb-4 block">Выберите услугу</Label>
              <div className="grid gap-4 md:grid-cols-2">
                {services.map((service) => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all hover-scale ${
                      selectedService === service.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium mb-1">{service.name}</h3>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} />
                              {service.duration} мин
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Wallet" size={14} />
                              {service.price} ₽
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              onClick={() => setStep(2)}
              disabled={!selectedLocation || !selectedService || !carType}
            >
              Далее: Выбор времени
              <Icon name="ArrowRight" size={18} className="ml-2" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <Label className="text-lg mb-4 block">Выберите дату</Label>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border border-border bg-card"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>

            {selectedDate && (
              <div>
                <Label className="text-lg mb-4 block">Доступные слоты</Label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? 'default' : 'outline'}
                      className={`${selectedTime === time ? 'bg-primary' : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
              >
                Далее: Ваши данные
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-fade-in">
            <Card className="border-primary/50 bg-primary/5">
              <CardContent className="p-6">
                <h3 className="font-heading text-xl mb-4">Детали записи</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Точка:</span>
                    <span className="font-medium">{selectedLocationData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Услуга:</span>
                    <span className="font-medium">{selectedServiceData?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Дата:</span>
                    <span className="font-medium">{selectedDate?.toLocaleDateString('ru-RU')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Время:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Длительность:</span>
                    <span className="font-medium">{totalDuration} мин</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3 flex justify-between text-lg">
                    <span className="font-medium">Примерная стоимость:</span>
                    <span className="font-bold text-primary">{totalPrice} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Ваше имя *</Label>
                <Input
                  id="name"
                  placeholder="Иван Иванов"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email (для подтверждения)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <Icon name="Info" size={16} className="inline mr-2" />
                После отправки заявки мы перезвоним вам для подтверждения записи в течение 15 минут
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Назад
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={handleBooking}
                disabled={!clientName || !clientPhone}
              >
                Подтвердить запись
                <Icon name="Check" size={18} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-12 animate-scale-in">
            <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
              <Icon name="CheckCircle2" size={48} className="text-primary" />
            </div>
            <h3 className="text-2xl font-heading font-bold mb-3">Заявка отправлена!</h3>
            <p className="text-muted-foreground mb-2">
              {clientName}, спасибо за обращение!
            </p>
            <p className="text-muted-foreground mb-6">
              Мы перезвоним вам на номер <span className="font-medium">{clientPhone}</span> для подтверждения записи на {selectedDate?.toLocaleDateString('ru-RU')} в {selectedTime}
            </p>
            <div className="bg-primary/10 border border-primary/50 rounded-lg p-4 mb-6 max-w-md mx-auto">
              <div className="flex items-start gap-3 text-left">
                <Icon name="Phone" size={20} className="text-primary mt-0.5" />
                <div>
                  <p className="font-medium mb-1">Ожидайте звонка</p>
                  <p className="text-sm text-muted-foreground">Наш оператор свяжется с вами в течение 15 минут</p>
                </div>
              </div>
            </div>
            <Button onClick={resetForm} variant="outline" size="lg">
              <Icon name="Plus" size={18} className="mr-2" />
              Создать новую запись
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PublicBookingForm;