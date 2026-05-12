import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@taskapp:tarefas';

export default function NewTask({
  route,
  navigation,
}: any) {
  const tarefa = route.params?.tarefa;
  const tituloInicial =
  route.params?.tituloInicial || '';


  const [titulo, setTitulo] = useState(tituloInicial);
  const [categoria, setCategoria] = useState('');
  const [novaCategoria, setNovaCategoria] =
    useState('');

  const [categorias, setCategorias] = useState([
    'Trabalho',
    'Pessoal',
    'Saúde',
    'Estudos',
  ]);

  useEffect(() => {
    if (tarefa) {
      setTitulo(tarefa.titulo);
      setCategoria(tarefa.categoria);
    }
  }, [tarefa]);

  const adicionarCategoria = () => {
    if (
      novaCategoria.trim() !== '' &&
      !categorias.includes(novaCategoria)
    ) {
      setCategorias([
        ...categorias,
        novaCategoria,
      ]);

      setCategoria(novaCategoria);

      setNovaCategoria('');
    }
  };

  const salvarTarefa = async () => {
    if (titulo.trim() === '') {
      Alert.alert(
        'Atenção',
        'Digite o título da tarefa.'
      );
      return;
    }

    if (categoria.trim() === '') {
      Alert.alert(
        'Atenção',
        'Escolha uma categoria.'
      );
      return;
    }

    try {
      const dadosSalvos = await AsyncStorage.getItem(
        STORAGE_KEY
      );

      const tarefas = dadosSalvos
        ? JSON.parse(dadosSalvos)
        : [];

      let tarefasAtualizadas = [];

      if (tarefa) {
        tarefasAtualizadas = tarefas.map((item: any) =>
          item.id === tarefa.id
            ? {
                ...item,
                titulo,
                categoria,
              }
            : item
        );
      }

      else {
        const novaTarefa = {
          id: Date.now().toString(),
          titulo,
          categoria,
          concluida: false,
        };

        tarefasAtualizadas = [
          ...tarefas,
          novaTarefa,
        ];
      }

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tarefasAtualizadas)
      );

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        TÍTULO DA TAREFA
      </Text>


      <TextInput
        style={styles.input}
        placeholder="O que precisa ser feito?"
        placeholderTextColor="#999"
        value={titulo}
        onChangeText={setTitulo}
      />

  
      <Text style={styles.label}>
        CATEGORIA
      </Text>


      <View style={styles.categoriasContainer}>
        {categorias.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.categoriaButton,

              categoria === item &&
                styles.categoriaSelecionada,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.categoriaTexto,

                categoria === item &&
                  styles.categoriaTextoSelecionado,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Criar nova categoria"
        placeholderTextColor="#999"
        value={novaCategoria}
        onChangeText={setNovaCategoria}
      />


      <TouchableOpacity
        style={styles.addButton}
        onPress={adicionarCategoria}
      >
        <Text style={styles.addButtonText}>
          + Nova Categoria
        </Text>
      </TouchableOpacity>


      <TouchableOpacity
        style={styles.saveButton}
        onPress={salvarTarefa}
      >
        <Text style={styles.saveButtonText}>
          SALVAR TAREFA
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelar}>
          DESCARTAR
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f7',
    padding: 24,
    paddingTop: 40,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    marginBottom: 8,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  categoriasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 8,
    marginBottom: 20,
  },

  categoriaButton: {
    backgroundColor: '#e4e7eb',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 30,
  },

  categoriaSelecionada: {
    backgroundColor: '#1565c0',
  },

  categoriaTexto: {
    color: '#555',
    fontWeight: '600',
  },

  categoriaTextoSelecionado: {
    color: '#fff',
  },

  addButton: {
    backgroundColor: '#e4e7eb',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },

  addButtonText: {
    fontWeight: 'bold',
    color: '#1565c0',
  },

  saveButton: {
    backgroundColor: '#1565c0',
    padding: 18,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
  },

  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  cancelar: {
    textAlign: 'center',
    color: '#777',
    fontWeight: '600',
  },
});