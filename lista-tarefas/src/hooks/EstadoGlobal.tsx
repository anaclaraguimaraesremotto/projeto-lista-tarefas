import React, { createContext, useContext, useState, useEffect } from 'react';

interface Tarefa {
  id: number;
  tarefa: string;
}

interface ContextoEstadoGlobal {
  tarefas: Tarefa[];
  adicionarTarefa: (tarefa: string) => void;
  editarTarefa: (id: number, novoTitulo: string) => void;
  excluirTarefa: (id: number) => void;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
  tarefas: [],
  adicionarTarefa: () => {},
  editarTarefa: () => {},
  excluirTarefa: () => {},
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  const carregarTarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tarefas');
      if (!response.ok) {
        throw new Error('Não foi possível carregar as tarefas');
      }

      const data = await response.json();
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar as tarefas:', error);
    }
  };

  const adicionarTarefa = async (tarefa: string) => {
    try {
      const response = await fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tarefa: tarefa }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível adicionar a tarefa');
      }

      const data = await response.json();
      console.log('Nova tarefa adicionada:', data);

      setTarefas([...tarefas, data]);

    } catch (error) {
      console.error('Erro ao adicionar a tarefa:', error);
    }
  };

  const editarTarefa = async (id: number, novoTitulo: string) => {
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tarefa: novoTitulo }),
      });

      if (!response.ok) {
        throw new Error('Não foi possível editar a tarefa');
      }

      console.log('Tarefa editada com sucesso');

      const novasTarefas = tarefas.map(tarefa =>
        tarefa.id === id ? { ...tarefa, tarefa: novoTitulo } : tarefa
      );
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao editar a tarefa:', error);
    }
  };

  const excluirTarefa = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Não foi possível excluir a tarefa');
      }

      console.log('Tarefa excluída com sucesso');

      const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
      setTarefas(novasTarefas);

    } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
    }
  };

  useEffect(() => {
    carregarTarefas();
  }, []);

  return (
    <ContextoEstadoGlobal.Provider value={{ tarefas, adicionarTarefa, editarTarefa, excluirTarefa }}>
      {children}
    </ContextoEstadoGlobal.Provider>
  );
};