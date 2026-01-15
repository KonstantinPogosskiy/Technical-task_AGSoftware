import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Stack,
  Text,
  Loader,
  Center,
  Button,
} from '@mantine/core';
import { favoritesApi } from '../services/api';
import { Favorite } from '../types/vacancy';
import VacancyCard from '../components/VacancyCard';
import { colors } from '../constants/colors.js';

const FavoritesPage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const data = await favoritesApi.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteClick = async (vacancyId: number) => {
    const favorite = favorites.find((item) => item.vacancyId === vacancyId);
    if (favorite) {
      try {
        await favoritesApi.remove(favorite.id);
        setFavorites(favorites.filter((item) => item.id !== favorite.id));
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
    }
  };

  return (
    <Container size="md" py="xl" style={{ maxWidth: '773px' }}>
      <Stack gap="md" py="xl">
        {loading ? (
          <Center>
            <Loader />
          </Center>
        ) : favorites.length === 0 ? (
          <Center py="xl">
            <Stack gap="md" align="center" py="xl">
            <img 
                src="/searching.png" 
                alt="Search" 
                style={{ maxHeight: '240px', maxWidth: '230px' }} 
              />
              <Text style={{
                fontSize: '24px',
                fontWeight: 700,
                textAlign: 'center',
              }}>
                  Упс, здесь ещё ничего нет!
              </Text>
              <Button
                onClick={() => navigate('/')}
                style={{ 
                  backgroundColor: colors.lightBlue, 
                  color: colors.blue, 
                  borderRadius: '8px', 
                  width: '164px', 
                  height: '42px'
                }}>
                Поиск Вакансий
              </Button>
            </Stack>
          </Center>
        ) : (
          <Stack gap="md">
            {favorites.map((favorite) => (
              <VacancyCard
                key={favorite.id}
                vacancy={favorite.vacancy}
                onFavoriteClick={handleFavoriteClick}
                isFavorite={true}
              />
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
};

export default FavoritesPage;
