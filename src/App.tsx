
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { SaaSShowcase } from './components/SaaSShowcase';
import { AIWorkflow } from './components/AIWorkflow';
import { Process } from './components/Process';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';

function App() {
  return (
    <div className="relative min-h-screen bg-paradigm-bg text-white selection:bg-paradigm-accent/30 font-sans">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <SaaSShowcase />
        <AIWorkflow />
        <Process />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;