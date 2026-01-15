import React from 'react';
import { Paper, Text, Group, ActionIcon } from '@mantine/core';
import { IconMapPin, IconStar, IconStarFilled } from '@tabler/icons-react';
import { VacancyCardProps } from '../types/vacancy';
import { useNavigate } from 'react-router-dom';
import { colors } from '../constants/colors.js';


const VacancyCard: React.FC<VacancyCardProps> = ({
  vacancy,
  onFavoriteClick,
  isFavorite = false,
}) => {
  const navigate = useNavigate();

  const formatSalary = () => {
    if (vacancy.payment_from && vacancy.payment_to) {
      return `з/п ${vacancy.payment_from} - ${vacancy.payment_to} ${vacancy.currency}`;
    }
    if (vacancy.payment_from) {
      return `з/п от ${vacancy.payment_from} ${vacancy.currency}`;
    }
    if (vacancy.payment_to) {
      return `з/п до ${vacancy.payment_to} ${vacancy.currency}`;
    }
    return 'з/п не указана';
  };

  return (
    <Paper
      shadow="xs"
      p="md"
      radius="md"
      style={{
        cursor: 'pointer',
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: '12px'
      }}
      onClick={() => navigate(`/vacancies/${vacancy.id}`)}
    >
      <Group justify="space-between" align="flex-start" gap="xs">
        <div style={{ flex: 1 }}>
          <Text
            fw={600}
            size="20px"
            style={{
              color: colors.blue,
              marginBottom: '12px',
              lineHeight: '24px',
            }}
          >
            {vacancy.profession}
          </Text>
          <Group gap={4} style={{ marginBottom: '12px' }}>
            <Text size="16px" fw={600}>
              {formatSalary()}
            </Text>
            <Text size="lg" style={{ margin: '0 8px', color: colors.grey }}>
              •
            </Text>
            <Text size="16px" style={{ fontWeight: 400 }}>
              {vacancy.type_of_work}
            </Text>
          </Group>
          <Group gap={4}>
            <IconMapPin size={16} style={{ color: colors.grey }} />
            <Text size="16px" style={{ fontWeight: 400 }}>
              {vacancy.town}
            </Text>
          </Group>
        </div>
        {onFavoriteClick && (
          <ActionIcon
            variant="transparent"
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteClick(vacancy.id);
            }}
            style={{
              alignSelf: 'flex-start',
              marginTop: '4px',
            }}
          >
            {isFavorite ? (
              <IconStarFilled size={22} style={{ color: colors.blue }} />
            ) : (
              <IconStar size={22} style={{ color: colors.grey }} />
            )}
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
};

export default VacancyCard;
