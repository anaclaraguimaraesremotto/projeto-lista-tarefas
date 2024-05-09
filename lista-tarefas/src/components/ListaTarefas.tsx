import { Box, FlatList, Text } from "native-base";

interface ListaTarefasProps {
    tarefas: string[];
}

const ListaTarefas: React.FC<ListaTarefasProps> = ({ tarefas }) => {
    return(
        <FlatList
        data={tarefas}
        renderItem={({item}) => (
            <Box    
                bg="gray.200"
                p={4}
                alignItems="flex-start"
                my={2}
                mx={2}
            >
                <Text>{item}</Text>
            </Box>
        )}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{flexGrow: 1}}
        />
    );
};

export default ListaTarefas;