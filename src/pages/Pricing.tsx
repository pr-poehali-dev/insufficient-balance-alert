import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/image 12.png" alt="RK Шиномонтаж" className="h-12" />
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="/" className="text-sm hover:text-primary transition-colors">Главная</a>
              <a href="/#services" className="text-sm hover:text-primary transition-colors">Услуги</a>
              <a href="/#locations" className="text-sm hover:text-primary transition-colors">Точки</a>
              <a href="/#about" className="text-sm hover:text-primary transition-colors">О нас</a>
              <Button onClick={() => window.location.href = '/#booking'} className="bg-primary hover:bg-primary/90">
                Записаться
              </Button>
            </nav>
            <Button onClick={() => window.location.href = '/'} className="md:hidden" variant="outline">
              <Icon name="Home" size={18} className="mr-2" />
              Главная
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Прайс-лист</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">от 01.12.2025 г.</Badge>
          </div>

          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <Icon name="Package" className="text-primary" size={28} />
                Комплекс 1 — «Перекидка» (4с/у, 4бл, 4ш/м)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-primary/30 pb-2">Легковой автомобиль</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 12 — 14</span><span className="font-semibold">1640 ₽</span></div>
                    <div className="flex justify-between"><span>R 15 — 16</span><span className="font-semibold">2180 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">2400 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">2790 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">3280 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-primary/30 pb-2">Кроссовер, Минивен</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 13 — 14</span><span className="font-semibold">2180 ₽</span></div>
                    <div className="flex justify-between"><span>R 15 — 16</span><span className="font-semibold">2280 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">2840 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">3160 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">3440 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-primary/30 pb-2">Внедорожник</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 13 — 16</span><span className="font-semibold">2620 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">3060 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">3480 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">3700 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-primary/30 pb-2">Коммерческий транспорт</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Соболь, УАЗ</span><span className="font-semibold">2540 ₽</span></div>
                    <div className="flex justify-between"><span>Газель</span><span className="font-semibold">3900 ₽</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-heading flex items-center gap-2">
                <Icon name="Settings" className="text-primary" size={28} />
                Комплекс «Перекидка в Сборе» (4с/у, 4бл)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-border pb-2">Легковой автомобиль</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 12 — 14</span><span className="font-semibold">1100 ₽</span></div>
                    <div className="flex justify-between"><span>R 15 — 16</span><span className="font-semibold">1480 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">1620 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">1860 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">2160 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-border pb-2">Кроссовер, Минивен</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 13 — 14</span><span className="font-semibold">1480 ₽</span></div>
                    <div className="flex justify-between"><span>R 15 — 16</span><span className="font-semibold">1520 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">1880 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">2100 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">2240 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-border pb-2">Внедорожник</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>R 13 — 16</span><span className="font-semibold">1720 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">2000 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">2280 ₽</span></div>
                    <div className="flex justify-between"><span>R 21 и более</span><span className="font-semibold">2420 ₽</span></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg border-b border-border pb-2">Коммерческий транспорт</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Соболь, УАЗ</span><span className="font-semibold">1680 ₽</span></div>
                    <div className="flex justify-between"><span>Газель</span><span className="font-semibold">2140 ₽</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Icon name="Archive" className="text-primary" size={24} />
                  Сезонное хранение шин (4 шт.)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="grid grid-cols-3 gap-2 font-semibold border-b border-border pb-2">
                    <span>Диаметр</span>
                    <span>Без диска</span>
                    <span>С диском</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2"><span>R 12 — 14</span><span>2500 ₽</span><span>2800 ₽</span></div>
                  <div className="grid grid-cols-3 gap-2"><span>R 15 — 16</span><span>3000 ₽</span><span>3400 ₽</span></div>
                  <div className="grid grid-cols-3 gap-2"><span>R 17 — 18</span><span>3500 ₽</span><span>4000 ₽</span></div>
                  <div className="grid grid-cols-3 gap-2"><span>R 19 — 20</span><span>4000 ₽</span><span>4600 ₽</span></div>
                  <div className="grid grid-cols-3 gap-2"><span>R 21 и более</span><span>4500 ₽</span><span>5300 ₽</span></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Icon name="Wrench" className="text-primary" size={24} />
                  Комплекс 2 — Ремонт (с/у, бл, ш/м)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="space-y-2">
                    <div className="font-semibold border-b border-border pb-2">Легковой автомобиль</div>
                    <div className="flex justify-between"><span>R 12 — 14</span><span className="font-semibold">960 ₽</span></div>
                    <div className="flex justify-between"><span>R 15 — 16</span><span className="font-semibold">1095 ₽</span></div>
                    <div className="flex justify-between"><span>R 17 — 18</span><span className="font-semibold">1455 ₽</span></div>
                    <div className="flex justify-between"><span>R 19 — 20</span><span className="font-semibold">1545 ₽</span></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-xl font-heading flex items-center gap-2">
                <Icon name="Gift" className="text-primary" size={24} />
                Бесплатные услуги по акции (с 06:00 до 24:00)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Подкачка или проверка давления колеса</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Проверка колеса на герметичность</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Проверка колеса на балансировку</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="CheckCircle2" size={16} className="text-green-500" />
                  <span className="text-sm">Проверка усиление затяжки колесных болтов</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-heading">Прочие услуги</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт прокола кордовой заплаткой R12-16</span><span className="font-semibold">550 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт прокола кордовой заплаткой R17-24</span><span className="font-semibold">850 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт универсальной латкой R12-16</span><span className="font-semibold">250 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт универсальной латкой R17-24</span><span className="font-semibold">390 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт бокового пореза R12-14</span><span className="font-semibold">1100 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт бокового пореза R15-17</span><span className="font-semibold">2200 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт жгутом</span><span className="font-semibold">220 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Ремонт жгутом без съёма колеса</span><span className="font-semibold">330 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Технологическая мойка колеса</span><span className="font-semibold">60-70 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Утилизация шины</span><span className="font-semibold">250 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Дошиповка зимней шины (за 1 шип)</span><span className="font-semibold">20 ₽</span></div>
                <div className="flex justify-between border-b border-border pb-2"><span>Камера R13-16</span><span className="font-semibold">900-1400 ₽</span></div>
              </div>
            </CardContent>
          </Card>

          <div className="text-center py-8">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => window.location.href = '/'}>
              <Icon name="CalendarCheck" size={20} className="mr-2" />
              Записаться на услугу
            </Button>
          </div>
        </div>
      </main>

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

export default Pricing;