import React from 'react';
import { Placeholder, PlaceholderLine, ShineOverlay, PlaceholderMedia } from 'rn-placeholder';
import { Card, CardItem } from 'native-base';
import { View } from 'react-native';
import { styles } from '../components/DrinkCard';

export const DrinkCardPlaceholder = () => (
	<View style={styles.container}>
        <Card style={styles.card}>
			<CardItem style={styles.cardItem}>
				<Placeholder
					Animation={ShineOverlay}
					Left={PlaceholderMedia}
				>
				</Placeholder>
				<PlaceholderLine width={30} />
			</CardItem>
			<View style={{ paddingLeft: 15 }}>
			<PlaceholderLine width={80} />
			<PlaceholderLine width={80}/>
			<PlaceholderLine width={45} />
			</View>
        </Card>
    </View>
);