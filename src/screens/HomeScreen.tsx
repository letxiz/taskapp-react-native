import React, { useState, useCallback } from 'react';

import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useFocusEffect } from '@react-navigation/native';

import TaskItem from '../components/TaskItem';

const STORAGE_KEY = '@taskapp:tarefas';

export type Tarefa = {
  id: string;
  titulo: string;
  categoria: string;
  concluida: boolean;
};

export default function HomeScreen({
  navigation,
}: any) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(
    []
  );

  const [filtro, setFiltro] =
    useState('todas');

  const [novaTarefa, setNovaTarefa] =
    useState('');

  const carregarTarefas = async () => {
    try {
      const dadosSalvos =
        await AsyncStorage.getItem(STORAGE_KEY);

      if (dadosSalvos) {
        setTarefas(JSON.parse(dadosSalvos));
      } else {
        const listaInicial: Tarefa[] = [
          {
            id: '1',
            titulo: 'Comprar café',
            categoria: 'Casa',
            concluida: false,
          },

          {
            id: '2',
            titulo: 'Estudar Design System',
            categoria: 'Estudos',
            concluida: true,
          },

          {
            id: '3',
            titulo: 'Academia 18h',
            categoria: 'Saúde',
            concluida: false,
          },
        ];

        setTarefas(listaInicial);

        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(listaInicial)
        );
      }
    } catch (error) {
      console.log(
        'Erro ao carregar tarefas:',
        error
      );
    }
  };

  const salvarTarefas = async (
    novaLista: Tarefa[]
  ) => {
    try {
      setTarefas(novaLista);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(novaLista)
      );
    } catch (error) {
      console.log(
        'Erro ao salvar tarefas:',
        error
      );
    }
  };

  const concluirTarefa = async (id: string) => {
    const novaLista = tarefas.map((tarefa) =>
      tarefa.id === id
        ? {
            ...tarefa,
            concluida: !tarefa.concluida,
          }
        : tarefa
    );

    await salvarTarefas(novaLista);
  };

  const excluirTarefa = async (id: string) => {
    Alert.alert(
      'Excluir tarefa',
      'Tem certeza que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const novaLista = tarefas.filter(
              (tarefa) => tarefa.id !== id
            );

            await salvarTarefas(novaLista);
          },
        },
      ]
    );
  };

  const editarTarefa = (tarefa: Tarefa) => {
    navigation.navigate('NewTask', {
      tarefa,
    });
  };

  useFocusEffect(
    useCallback(() => {
      carregarTarefas();
    }, [])
  );

  const tarefasFiltradas = tarefas.filter(
    (tarefa) => {
      if (filtro === 'pendentes') {
        return !tarefa.concluida;
      }

      if (filtro === 'concluidas') {
        return tarefa.concluida;
      }

      return true;
    }
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Minhas Tarefas
        </Text>
      </View>

      <View style={styles.addContainer}>
        <TextInput
          placeholder="Adicionar nova tarefa..."
          placeholderTextColor="#999"
          style={styles.input}
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {

            navigation.navigate('NewTask', {
              tituloInicial:
                novaTarefa,
            });

            setNovaTarefa('');
          }}
        >
          <Text style={styles.addButtonText}>
            +
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <TouchableOpacity
          style={
            filtro === 'todas'
              ? styles.filterActive
              : styles.filter
          }
          onPress={() => setFiltro('todas')}
        >
          <Text
            style={
              filtro === 'todas'
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Todas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filtro === 'pendentes'
              ? styles.filterActive
              : styles.filter
          }
          onPress={() =>
            setFiltro('pendentes')
          }
        >
          <Text
            style={
              filtro === 'pendentes'
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Pendentes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={
            filtro === 'concluidas'
              ? styles.filterActive
              : styles.filter
          }
          onPress={() =>
            setFiltro('concluidas')
          }
        >
          <Text
            style={
              filtro === 'concluidas'
                ? styles.filterTextActive
                : styles.filterText
            }
          >
            Concluídas
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              Nenhuma tarefa encontrada
            </Text>

            <Text style={styles.emptyText}>
              Crie uma nova tarefa para começar
              a se organizar.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TaskItem
            titulo={item.titulo}
            categoria={item.categoria}
            concluida={item.concluida}
            onConcluir={() =>
              concluirTarefa(item.id)
            }
            onExcluir={() =>
              excluirTarefa(item.id)
            }
            onEditar={() =>
              editarTarefa(item)
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  header: {
    marginBottom: 25,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1565c0',
  },

  addContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },

  addButton: {
    width: 58,
    height: 58,
    backgroundColor: '#1565c0',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },

  addButtonText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },

  filters: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },

  filter: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },

  filterActive: {
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
  },

  filterText: {
    color: '#666',
    fontWeight: '600',
  },

  filterTextActive: {
    color: '#fff',
    fontWeight: '600',
  },

  list: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 10,
    textAlign: 'center',
  },

  emptyText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});