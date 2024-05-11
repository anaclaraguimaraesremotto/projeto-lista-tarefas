import { Ionicons } from "@expo/vector-icons";
import { IconButton, Input, Text, View } from "native-base";
import { useState } from "react";
import { useEstadoGlobal } from "../hooks/EstadoGlobal";
 
const AdicionarTarefa: React.FC = () => {   
    const {adicionarTarefa} = useEstadoGlobal();
    const [ novaTarefa, setNovaTarefa ] = useState("");

    const handleAdicionarTarefa = () => {

        if (novaTarefa.trim() !== "") {
            adicionarTarefa(novaTarefa);
            setNovaTarefa("");
        }
    }

    return (
        <View style={{
            backgroundColor: '#402291',
            paddingVertical: 20,
            paddingHorizontal: 20,
            paddingTop: 50
        }}>
            <View style={{ flexDirection:'row', alignItems: 'center' }}>
                <View style={{ flex:1, marginRight: 10 }} >
                    <Input placeholder="Digite uma tarefa"
                        placeholderTextColor = "white"
                        value={novaTarefa}
                        onChangeText={setNovaTarefa}
                        fontSize={14}
                        color="white"
                    />
                </View>    
                    <IconButton
                        icon={<Ionicons name="add" size={24} color="#402291"/>}
                        colorScheme="light"
                        onPress={handleAdicionarTarefa}
                        style={{
                            borderRadius: 50,
                            backgroundColor: 'gold',
                        }}
                    />
            </View>
        </View>
    );
};

export default AdicionarTarefa;