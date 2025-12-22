import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookingSection from '@/components/BookingSection';
import AdminPanel from '@/components/AdminPanel';
import MasterPanel from '@/components/MasterPanel';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeTab, setActiveTab] = useState('booking');

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Wrench" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-heading font-bold">ШиноПро</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-8 bg-card">
            <TabsTrigger value="booking" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="Calendar" size={18} className="mr-2" />
              Онлайн-запись
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="LayoutDashboard" size={18} className="mr-2" />
              Администратор
            </TabsTrigger>
            <TabsTrigger value="master" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Icon name="ClipboardCheck" size={18} className="mr-2" />
              Мастер
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking" className="animate-fade-in">
            <BookingSection />
          </TabsContent>

          <TabsContent value="admin" className="animate-fade-in">
            <AdminPanel />
          </TabsContent>

          <TabsContent value="master" className="animate-fade-in">
            <MasterPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
