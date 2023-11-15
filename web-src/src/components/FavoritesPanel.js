import {Grid, Heading, View, Text} from '@adobe/react-spectrum';
import React from 'react';
import {useRecoilValue} from 'recoil';

import {favoritesState} from '../state/FavoritesState.js';
import {FavoriteCard} from './FavoriteCard.js';

export function FavoritesPanel(props) {
  const favorites = useRecoilValue(favoritesState);

  return (
    <View
      overflow={'auto'}>
      <Heading level={4} alignSelf={'start'}>Favorites</Heading>
      <Grid
        width={'100%'}
        alignItems={'start'}
        rows={'repeat(auto-fill, minmax(200px, 1fr))'}
        columns={'repeat(auto-fill, minmax(350px, 1fr))'} gap={'size-200'}>
        { favorites.length === 0
          ? <Text>No favorites yet</Text>
          : favorites.map((variant) => <FavoriteCard variant={variant} />) }
      </Grid>
    </View>
  );
}
