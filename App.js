import react, {useState, useEffect} from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import axios from "axios";

//Declaração de componente principal de aplicação 
export default function App(){
  //usuario como array de estado
  const [users, setUsers] = useState([]);
  //Defenir URL da api que sera consumida 
  const API = "http://10.110.12.47:3000/users";

  //Função assincrona para buscar a lista de usuario do API
  const fetchUsers = async() => {
    try{

      //Faz requisição GET paara URL da API
      const response = await axios.get(API);

      //Atualização da variavel de estado users
      setUsers(response.data);
      
    }catch(error){
      console.error("Error GET: ", error.message);
    }
  };

  //Função assincrona para excluir um usuario pelo ID
  const deleteUser = async (id) =>{
    try{
      //Faz uma requisição de delete para URL para API, incluindo o ID do usuario a ser excluido
      await axios.delete(`${API}/${id}`)
      //Filtra a lista de usuario, removendo o usuario do respectivo id informado.
      setUsers(users.filter((u)=> u.id !== id));
    }catch(error){
      console.error("Error DELETE: ", error.message);

    }
  }

  useEffect(() =>{
    fetchUsers();
  }, []);

  return(
    <View style={styles.container}>
      <Text style={styles.title}> DELETE - Remover Usuario</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem = {({item})=>(
        <View> 
        <Text>id:{item.id} {item.name} - {item.email}</Text>
        <Button title="del" onPress={() =>deleteUser(item.id)}/>        
        </View>
      )}
      />      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex:1, padding:20, marginTop:40},
  title :{fontSize:22, fontWeight:"bold", marginBottom:10}
})

