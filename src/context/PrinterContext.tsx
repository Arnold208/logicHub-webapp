import { createContext, useState } from 'react';

interface Printer {
  id: string;
  name: string;
  status: string;
  progress: number;
  currentJob: string | null;
  estimatedCompletion: string | null;
}

interface PrinterContextType {
  printers: Printer[];
  getAvailablePrinters: () => number;
  getBusyPrinters: () => number;
}

export const PrinterContext = createContext<PrinterContextType | null>(null);

const initialPrinters = [
  {
    id: 'printer-a',
    name: 'Printer A',
    status: 'Printing',
    progress: 87,
    currentJob: 'dragon_figurine.stl',
    estimatedCompletion: '2h 15m',
  },
  {
    id: 'printer-b',
    name: 'Printer B',
    status: 'Idle',
    progress: 0,
    currentJob: null,
    estimatedCompletion: null,
  },
  {
    id: 'printer-c',
    name: 'Printer C',
    status: 'Printing',
    progress: 45,
    currentJob: 'phone_stand.stl',
    estimatedCompletion: '5h 30m',
  },
  {
    id: 'printer-d',
    name: 'Printer D',
    status: 'Offline',
    progress: 0,
    currentJob: null,
    estimatedCompletion: null,
  },
  {
    id: 'printer-e',
    name: 'Printer E',
    status: 'Busy',
    progress: 12,
    currentJob: 'custom_bracket.obj',
    estimatedCompletion: '8h 45m',
  },
];

export const PrinterProvider = ({ children }: { children: React.ReactNode }) => {
  const [printers, setPrinters] = useState(initialPrinters);

  const getAvailablePrinters = () => {
    return printers.filter((p) => p.status === 'Idle').length;
  };

  const getBusyPrinters = () => {
    return printers.filter((p) => p.status === 'Printing' || p.status === 'Busy').length;
  };

  return (
    <PrinterContext.Provider value={{ printers, getAvailablePrinters, getBusyPrinters }}>
      {children}
    </PrinterContext.Provider>
  );
};
