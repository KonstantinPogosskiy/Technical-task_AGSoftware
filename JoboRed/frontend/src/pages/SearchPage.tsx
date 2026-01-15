import React, { useState, useEffect } from 'react';
import {
  Container,
  TextInput,
  Button,
  Stack,
  Group,
  Loader,
  Center,
  Text,
} from '@mantine/core';
import { Pagination, Box } from '@mui/material';
import { vacanciesApi, favoritesApi } from '../services/api';
import { Vacancy, Favorite } from '../types/vacancy';
import VacancyCard from '../components/VacancyCard';
import { colors } from '../constants/colors.js';

const SearchPage = () => {
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadFavorites();
    loadVacancies();
  }, []);

  const loadFavorites = async () => {
    try {
      const data = await favoritesApi.getAll();
      setFavorites(data);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const loadVacancies = async () => {
    setLoading(true);
    try {
      const filters: any = {};
      if (keyword) filters.keyword = keyword;

      const data = await vacanciesApi.getAll(filters);
      setVacancies(data);
      setTotalPages(Math.ceil(data.length / 4));
    } catch (error) {
      console.error('Error loading vacancies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    loadVacancies();
  };

  const handleFavoriteClick = async (vacancyId: number) => {
    const favorite = favorites.find((item) => item.vacancyId === vacancyId);
    try {
      if (favorite) {
        await favoritesApi.remove(favorite.id);
        setFavorites(favorites.filter((item) => item.id !== favorite.id));
      } else {
        const newFavorite = await favoritesApi.add(vacancyId);
        setFavorites([...favorites, newFavorite]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const isFavorite = (vacancyId: number) => {
    return favorites.some((item) => item.vacancyId === vacancyId);
  };

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVacancies = vacancies.slice(startIndex, endIndex);

  return (
    <Container size="md" py="xl" style={{
        maxWidth: '773px'
    }}>
      <Stack gap="md">
        <Group gap="md" align="center">
          <TextInput
            placeholder="Введите название вакансии"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            style={{ flex: 1 }}
            styles={{
              input: {
                border: 'none',
                height: '48px',
                maxWidth: '657px',
                borderRadius: '8px'
              },
            }}
          />
          <Button
            onClick={handleSearch}
            loading={loading}
            style={{
              backgroundColor: colors.blue,
              height: '32px',
              paddingLeft: '24px',
              paddingRight: '24px',
              borderRadius: '8px'
            }}
          >
            Поиск
          </Button>
        </Group>

        {loading ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : paginatedVacancies.length === 0 ? (
          <Center py="xl">
            <Stack gap="md" align="center">
              <Text style={{
                fontSize: '24px',
                fontWeight: 700,
                textAlign: 'center',
              }}>
                  Пока тут нет ни одной вакансии!
              </Text>
            </Stack>
          </Center>
        ) : (
          <>
            <Stack gap="md">
              {paginatedVacancies.map((vacancy) => (
                <VacancyCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  onFavoriteClick={handleFavoriteClick}
                  isFavorite={isFavorite(vacancy.id)}
                />
              ))}
            </Stack>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(event: React.ChangeEvent<unknown>, value: number) => setCurrentPage(value)}
                  color="primary"
                  shape="rounded"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '14px',
                      fontWeight: 400,
                      color: colors.defaultSelectText,
                      border: `1px solid ${colors.lightGrey}`,
                      '&.Mui-selected': {
                        border: `1px solid ${colors.lightGrey}`,
                        backgroundColor: colors.blue,
                        color: 'white',
                        fontWeight: 500,
                        '&:hover': {
                          backgroundColor: colors.blue,
                        },
                      },
                      '&:hover': {
                        backgroundColor: colors.background,
                      },
                    },
                  }}
                />
              </Box>
            )}
          </>
        )}
      </Stack>
    </Container>
  );
};

export default SearchPage;
