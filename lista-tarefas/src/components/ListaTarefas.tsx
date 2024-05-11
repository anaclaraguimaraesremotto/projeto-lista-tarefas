import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Box, FlatList, IconButton, Input, Text } from "native-base";
import { useEstadoGlobal } from "../hooks/EstadoGlobal";

interface TarefaItemProps {
    id: number;
    titulo: string;
}

const TarefaItem: React.FC<TarefaItemProps> = ({ id, titulo}) => {

    const { editarTarefa, excluirTarefa} = useEstadoGlobal();
    const [editando, setEditando] = React.useState(false);
    const [novoTitulo, setNovoTitulo] = React.useState(titulo);

    const handleEditar = () => {
        if (editando) {
            editarTarefa(id, novoTitulo);
        }
        setEditando(!editando);
    };

    return(
        <Box
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            bg="gray.200"
            p={4}
            my={2}
            mx={2}
        >
            {editando ? (
                    < Input
                    flex={3}
                    value={novoTitulo}
                    onChangeText={setNovoTitulo}
                    />
                ) : (
                    <Text flex={3}> {titulo} </Text>
                )}
                <IconButton
                    icon={<Ionicons name={editando ? "checkmark" : "pencil"} size={14} color="#402291"/>}
                    colorScheme="light"
                    onPress={handleEditar}
                    style={{borderRadius : 50, backgroundColor: 'gold', marginLeft: 4}}
                />                
        </Box>
    );
};

const ListaTarefas: React.FC = () => {
    const { tarefas } = useEstadoGlobal();

    return(
        <FlatList 
            data={tarefas}
            renderItem={({item}) => <TarefaItem id={item.id} titulo={item.titulo}/>}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ flexGrow: 1}}
        />
    );
};

export default ListaTarefas; 