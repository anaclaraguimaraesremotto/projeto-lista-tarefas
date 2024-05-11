import AsyncStorage from "@react-native-community/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";


interface Tarefa {
    id: number;
    titulo: string;
}

interface ContextoEstadoGlobal{
    tarefas: Tarefa[];
    adicionarTarefa: (titulo: string) => void;
    editarTarefa: (id: number, novoTitulo: string) => void;
    excluirTarefa: (id: number) => void;
}

const ContextoEstadoGlobal = createContext<ContextoEstadoGlobal>({
    tarefas:[],
    adicionarTarefa: () => {},
    editarTarefa: () => {},
    excluirTarefa: () => {},
});

export const useEstadoGlobal = () => useContext(ContextoEstadoGlobal);

export const ProvedorEstadoGlobal: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [tarefas, setTarefas] = useState<Tarefa[]>([]);

    const [isRecarregandoTela, setIsRecarregandoTela] = useState(true);

    const adicionarTarefa = (titulo: string) => {
        const novaTarefa: Tarefa = {
            id: Date.now(),
            titulo,
        };
        setTarefas([...tarefas, novaTarefa]);

        salvarTarefas(tarefas);
    };

    const editarTarefa = (id: number, novoTitulo: string) => {
        const novasTarefas = tarefas.map(tarefa => tarefa.id === id ? {...tarefa, titulo: novoTitulo} : tarefa);
        setTarefas(novasTarefas);
        salvarTarefas(tarefas);
    };

    const excluirTarefa = (id: number) => {
        const novasTarefas = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(novasTarefas);
        salvarTarefas(tarefas);
    };

    useEffect(() => {
        const carregarTarefas = async () => {
            try {
                const tarefasArmazenadas = await AsyncStorage.getItem('tarefas');
                if (tarefasArmazenadas) {
                    setTarefas(JSON.parse(tarefasArmazenadas))
                }
            } catch (error){
                console.error(error);
            }

            setIsRecarregandoTela(false);
        }
        carregarTarefas();
    }, []);

    useEffect(() => {
        salvarTarefas(tarefas);
    }, [tarefas]);

    const salvarTarefas = async (tarefas: Tarefa[]) => {
        if (!isRecarregandoTela) {
            try {
                await AsyncStorage.setItem('tarefas', JSON.stringify(tarefas));
            } catch (error) {
                console.error(error);
            }
        }
    }

    return(
        <ContextoEstadoGlobal.Provider value={{tarefas, adicionarTarefa, editarTarefa, excluirTarefa}}>
            {children}
        </ContextoEstadoGlobal.Provider>
    );
};