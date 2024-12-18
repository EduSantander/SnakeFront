import { useState, useEffect } from 'react';

export default function PlayersList() {
  const [players, setPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'username', direction: 'asc' });

  useEffect(() => {
    // Función para obtener jugadores desde la API
    async function fetchPlayers() {
      try {
        const response = await fetch('https://eduisant.pythonanywhere.com/snake/jugadores/'); // Reemplaza con la URL de tu API
        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.error('Error al obtener los jugadores:', response.statusText);
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    }

    fetchPlayers();
  }, []); // Se ejecuta solo una vez al montar el componente

  // Función para ordenar los jugadores
  const sortedPlayers = [...players].sort((a, b) => {
    const { key, direction } = sortConfig;
    if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  // Función para manejar el clic en la cabecera y cambiar la dirección de ordenación
  const handleSort = (key) => {
    setSortConfig((prevConfig) => {
      if (prevConfig.key === key) {
        return {
          key,
          direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
        };
      }
      return { key, direction: 'asc' };
    });
  };

  return (
    <div>
      <h1>Lista de Jugadores</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('username')}>Nombre</th>
            <th onClick={() => handleSort('score')}>Puntaje</th>
            <th onClick={() => handleSort('game_time')}>Tiempo de Juego</th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player) => (
            <tr key={player.id}>
              <td>{player.username}</td>
              <td>{player.score}</td>
              <td>{player.game_time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
