import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AppShell, Group, Anchor, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import SearchPage from './pages/SearchPage';
import VacancyPage from './pages/VacancyPage';
import FavoritesPage from './pages/FavoritesPage';
import { colors } from './constants/colors.js';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        padding: isMobile ? '0 16px' : '0 32px',
        position: 'relative',
        maxWidth: '100%',
      }}
    >
      <Box style={{ flexShrink: 0, zIndex: 1 }}>
        <img
          src="/logo.png"
          alt="Jobored"
          onClick={() => navigate('/')}
          style={{
            height: isMobile ? '32px' : '36px',
            width: isMobile ? '130px' : '146px',
            cursor: 'pointer',
          }}
        />
      </Box>

      {!isMobile ? (
        <Box
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1,
          }}
        >
          <Group gap="xl">
            <Anchor
              component="button"
              type="button"
              onClick={() => navigate('/')}
              style={{
                textDecoration: 'none',
                color: location.pathname === '/' ? colors.blue : colors.defaultSelectText,
                fontWeight: location.pathname === '/' ? 500 : 400,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Поиск Вакансий
            </Anchor>
            <Anchor
              component="button"
              type="button"
              onClick={() => navigate('/favorites')}
              style={{
                textDecoration: 'none',
                color: location.pathname === '/favorites' ? colors.blue : colors.defaultSelectText,
                fontWeight: location.pathname === '/favorites' ? 500 : 400,
                fontSize: '14px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Избранное
            </Anchor>
          </Group>
        </Box>
      ) : (
        <Box
          style={{
            position: 'absolute',
            left: '50%',
            top: isMobile ? '70px' : '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            width: '100%',
          }}
        >
          <Group gap="xl" justify="center" style={{ width: '100%' }}>
            <Anchor
              component="button"
              type="button"
              onClick={() => navigate('/')}
              style={{
                textDecoration: 'none',
                color: location.pathname === '/' ? colors.blue : colors.defaultSelectText,
                fontWeight: location.pathname === '/' ? 500 : 400,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Поиск Вакансий
            </Anchor>
            <Anchor
              component="button"
              type="button"
              onClick={() => navigate('/favorites')}
              style={{
                textDecoration: 'none',
                color: location.pathname === '/favorites' ? colors.blue : colors.defaultSelectText,
                fontWeight: location.pathname === '/favorites' ? 500 : 400,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Избранное
            </Anchor>
          </Group>
        </Box>
      )}

      <Box
        style={{
          width: isMobile ? '0' : '146px',
          visibility: isMobile ? 'hidden' : 'visible',
          flexShrink: 0,
        }}
      />
    </Box>
  );
};

const App = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Router>
      <AppShell
        header={{ height: isMobile ? 100 : 84 }}
        style={{
          '--app-shell-padding': '0',
        }}
      >
        <AppShell.Header style={{ borderBottom: '1px solid white', position: 'relative' }}>
          <Navigation />
        </AppShell.Header>

        <AppShell.Main style={{ backgroundColor: colors.background, minHeight: `calc(100vh - ${isMobile ? 100 : 84}px)` }}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/vacancies/:id" element={<VacancyPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </AppShell.Main>
      </AppShell>
    </Router>
  );
};

export default App;