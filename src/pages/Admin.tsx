import AdminPanel from '@/components/AdminPanel';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Admin = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Icon name="Wrench" size={24} className="text-primary-foreground" />
              </div>
              <h1 className="text-2xl font-heading font-bold">ШиноПро — Админ-панель</h1>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => window.location.href = '/master'}>
                <Icon name="ClipboardCheck" size={18} className="mr-2" />
                Панель мастера
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/'}>
                <Icon name="Home" size={18} className="mr-2" />
                Главная
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <AdminPanel />
      </main>
    </div>
  );
};

export default Admin;
