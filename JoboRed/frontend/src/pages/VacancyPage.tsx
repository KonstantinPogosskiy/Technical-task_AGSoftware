import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Stack,
  Text,
  Button,
  Group,
  Paper,
  Loader,
  Center,
} from '@mantine/core';
import { IconMapPin, IconBriefcase } from '@tabler/icons-react';
import { vacanciesApi, favoritesApi } from '../services/api';
import { Vacancy, Favorite } from '../types/vacancy';
import { colors } from '../constants/colors';

const VacancyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [vacancy, setVacancy] = useState<Vacancy | null>(null);
  const [favorite, setFavorite] = useState<Favorite | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadVacancy();
      checkFavorite();
    }
  }, [id]);

  const loadVacancy = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await vacanciesApi.getById(parseInt(id));
      setVacancy(data);
    } catch (error) {
      console.error('Error loading vacancy:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    if (!id) return;
    try {
      const favorites = await favoritesApi.getAll();
      const found = favorites.find((item) => item.vacancyId === parseInt(id));
      setFavorite(found || null);
    } catch (error) {
      console.error('Error checking favorite:', error);
    }
  };

  const handleFavoriteToggle = async () => {
    if (!id || !vacancy) return;

    try {
      if (favorite) {
        await favoritesApi.remove(favorite.id);
        setFavorite(null);
      } else {
        const newFavorite = await favoritesApi.add(vacancy.id);
        setFavorite(newFavorite);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const formatSalary = () => {
    if (!vacancy) return '';
    if (vacancy.payment_from && vacancy.payment_to) {
      return `${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`;
    }
    if (vacancy.payment_from) {
      return `от ${vacancy.payment_from} ${vacancy.currency}`;
    }
    if (vacancy.payment_to) {
      return `до ${vacancy.payment_to} ${vacancy.currency}`;
    }
    return 'Зарплата не указана';
  };

  if (loading) {
    return (
      <Container size="md" py="xl">
        <Center py="xl">
          <Loader />
        </Center>
      </Container>
    );
  }

  if (!vacancy) {
    return (
      <Container size="md" py="xl">
        <Center py="xl">
          <Text>Вакансия не найдена</Text>
        </Center>
      </Container>
    );
  }

  return (
    <Container size="md" py="xl" style={{ maxWidth: '773px' }}>
      <Stack py="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack gap="lg">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Text 
                  fw={700}
                  size="28px"
                >
                  {vacancy.profession}
                </Text>
                <Group gap="xs">
                  <Text fw={700} size="20px">з/п {formatSalary()}</Text>
                  <Text size="20px" style={{ color: colors.grey }}>
                    •
                  </Text>
                  <Text size="20px">{vacancy.type_of_work}</Text>
                </Group>
              </Stack>
              <Button
                variant={favorite ? 'filled' : 'outline'}
                onClick={handleFavoriteToggle}
              >
                {favorite ? 'В избранном' : 'В избранное'}
              </Button>
            </Group>

            <Group gap="xs">
              <IconMapPin size={16} color={colors.grey}/>
              <Text size="16px">
                {vacancy.town}
              </Text>
            </Group>

            <Group gap="xs">
              <IconBriefcase size={16} color={colors.grey}/>
              <Text size="16px">{vacancy.firm_name}</Text>
            </Group>

          </Stack>
        </Paper>
      </Stack>

      <Stack gap="xl">
        <Paper shadow="sm" p="xl" radius="md" withBorder>
          <Stack gap="lg">
            <div
              dangerouslySetInnerHTML={{ __html: vacancy.vacancyRichText }}
            />
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default VacancyPage;
