import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import './styles.scss';

const Profile = () => {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  const deleteIncident = async incidentID => {
    try {
      await api.delete(`/incidents/${incidentID}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== incidentID));
    } catch (error) {
      console.log(
        `Erro ao tentar deletar o incident: ${error}. Tente novamente.`
      );
    }
  };
  const logout = () => {
    localStorage.removeItem('ongId');
    localStorage.removeItem('ongName');
    history.push('/');
  };

  useEffect(() => {
    const getIncidents = async () => {
      const response = await api.get('/profile', {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(response.data);
    };

    getIncidents();
  }, [ongId]);

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be the Hero" />
        <span>Olá {ongName && `, ${ongName}`}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo incidente
        </Link>

        <button onClick={logout}>
          <FiPower size={18} color="#e02042" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul className="incidents-list">
        {incidents.map(({ id, title, description, value }) => (
          <li key={id}>
            <strong>Caso:</strong>
            <p>{title}</p>

            <strong>Descrição</strong>
            <p>{description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(value)}
            </p>

            <button onClick={() => deleteIncident(id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
