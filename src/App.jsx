
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Input } from './components/ui/input';

function App() {
  const [inspections, setInspections] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newInspection, setNewInspection] = useState({
    processNumber: '',
    date: '',
    time: '',
    location: '',
    expert: '',
    status: 'Agendado',
    result: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInspection(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setInspections(prev => [...prev, { ...newInspection, id: Date.now() }]);
    setNewInspection({
      processNumber: '',
      date: '',
      time: '',
      location: '',
      expert: '',
      status: 'Agendado',
      result: ''
    });
    setShowScheduleForm(false);
  };

  const updateInspectionStatus = (id, status) => {
    setInspections(prev =>
      prev.map(inspection =>
        inspection.id === id ? { ...inspection, status } : inspection
      )
    );
  };

  const addResult = (id, result) => {
    setInspections(prev =>
      prev.map(inspection =>
        inspection.id === id ? { ...inspection, result, status: 'Concluído' } : inspection
      )
    );
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Sistema de Perícias Trabalhistas</h1>
        <Button 
          onClick={() => setShowScheduleForm(true)}
          className="bg-blue-500 hover:bg-blue-600"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {showScheduleForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Novo Agendamento de Perícia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número do Processo</label>
                  <Input
                    name="processNumber"
                    value={newInspection.processNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Perito Responsável</label>
                  <Input
                    name="expert"
                    value={newInspection.expert}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Data</label>
                  <Input
                    type="date"
                    name="date"
                    value={newInspection.date}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Hora</label>
                  <Input
                    type="time"
                    name="time"
                    value={newInspection.time}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Local</label>
                  <Input
                    name="location"
                    value={newInspection.location}
                    onChange={handleInputChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={() => setShowScheduleForm(false)}
                  variant="outline"
                  className="bg-gray-200 hover:bg-gray-300"
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-500 hover:bg-green-600">
                  Agendar
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {inspections.map(inspection => (
          <Card key={inspection.id}>
            <CardHeader>
              <CardTitle>
                Processo: {inspection.processNumber}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p><strong>Data:</strong> {inspection.date}</p>
                <p><strong>Hora:</strong> {inspection.time}</p>
                <p><strong>Local:</strong> {inspection.location}</p>
                <p><strong>Perito:</strong> {inspection.expert}</p>
                <p><strong>Status:</strong> {inspection.status}</p>
                {inspection.result && (
                  <p><strong>Resultado:</strong> {inspection.result}</p>
                )}
              </div>

              {inspection.status === 'Agendado' && (
                <div className="space-y-2">
                  <Button
                    onClick={() => updateInspectionStatus(inspection.id, 'Em Andamento')}
                    className="w-full bg-yellow-500 hover:bg-yellow-600"
                  >
                    Iniciar Perícia
                  </Button>
                </div>
              )}

              {inspection.status === 'Em Andamento' && (
                <div className="space-y-2">
                  <Input
                    placeholder="Digite o resultado da perícia"
                    className="w-full mb-2"
                    onChange={(e) => addResult(inspection.id, e.target.value)}
                  />
                  <Button
                    onClick={() => updateInspectionStatus(inspection.id, 'Concluído')}
                    className="w-full bg-green-500 hover:bg-green-600"
                  >
                    Finalizar Perícia
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;
