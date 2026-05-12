import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

type TaskItemProps = {
  titulo: string;
  categoria: string;
  concluida: boolean;
  onConcluir: () => void;
  onExcluir: () => void;
  onEditar: () => void;
};

export default function TaskItem({
  titulo,
  categoria,
  concluida,
  onConcluir,
  onExcluir,
  onEditar,
}: TaskItemProps) {
  return (
    <View style={styles.card}>

      <View style={styles.top}>
        <View style={styles.info}>
          <Text
            style={[
              styles.title,

              concluida &&
                styles.titleDone,
            ]}
          >
            {titulo}
          </Text>

          {!!categoria && (
            <View style={styles.category}>
              <Text
                style={styles.categoryText}
              >
                {categoria}
              </Text>
            </View>
          )}
        </View>
      </View>


      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={onEditar}
        >
          <Text style={styles.buttonText}>
            Editar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.doneButton}
          onPress={onConcluir}
        >
          <Text style={styles.buttonText}>
            {concluida
              ? 'Desfazer'
              : 'Concluir'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={onExcluir}
        >
          <Text style={styles.buttonText}>
            Excluir
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 18,
    marginBottom: 18,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,

    elevation: 2,
  },

  top: {
    justifyContent: 'center',
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
  },

  titleDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },

  category: {
    alignSelf: 'flex-start',
    backgroundColor: '#eef1f4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginTop: 10,
  },

  categoryText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7a7a7a',
    textTransform: 'uppercase',
  },

  actions: {
    flexDirection: 'row',
    marginTop: 18,
    gap: 10,
  },

  editButton: {
    flex: 1,
    backgroundColor: '#8eaed0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  doneButton: {
    flex: 1,
    backgroundColor: '#1565c0',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#ef5350',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});