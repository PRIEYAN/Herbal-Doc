# Herbal Doc AI - Ingredient Search Feature

## Overview

The Herbal Doc AI app now includes a new feature that allows users to find nearby shops selling herbal ingredients. When the AI suggests remedies containing ingredients like "honey", "ginger", "turmeric", etc., these ingredients become clickable and open a map showing nearby shops.

## Features

### 1. Ingredient Highlighting
- AI responses automatically highlight common herbal ingredients and remedies
- Clickable ingredients are styled with a green background and underline
- Supports a comprehensive list of 200+ herbal ingredients and common food items

### 2. Map Integration
- Uses React Native Maps to display shop locations
- Shows user's current location with a green marker
- Displays shop locations with red markers
- Interactive map with zoom and pan capabilities

### 3. Shop Search
- Searches for multiple shop types: pharmacies, grocery stores, health food stores, etc.
- Uses OpenStreetMap's Overpass API for comprehensive shop data
- 5km radius search from user's location
- Sorts results by distance

### 4. Shop Details
- Displays shop name, address, and type
- Shows distance from user's location
- Clickable shop items that open Google Maps directions
- Map markers with detailed popups

## Technical Implementation

### Components

1. **IngredientHighlighter** (`components/IngredientHighlighter.tsx`)
   - Reusable component for highlighting ingredients in text
   - Uses regex to split text while preserving punctuation
   - Maintains a comprehensive list of ingredient keywords

2. **IngredientSearchScreen** (`components/IngredientSearchScreen.tsx`)
   - Main screen for displaying map and shop results
   - Handles location permissions and GPS access
   - Manages API calls to Overpass API
   - Renders interactive map with markers

3. **IngredientSearchPage** (`app/ingredientSearch.tsx`)
   - Expo Router page that wraps the IngredientSearchScreen
   - Receives ingredient parameter from navigation

### Dependencies

- `expo-location`: For getting user's current location
- `react-native-maps`: For displaying the interactive map
- `axios`: For making HTTP requests (already included)

### API Integration

The app uses OpenStreetMap's Overpass API to search for nearby shops:

```javascript
const query = `
  [out:json][timeout:25];
  (
    node["shop"="${shopType}"](around:${radius},${lat},${lng});
    way["shop"="${shopType}"](around:${radius},${lat},${lng});
    relation["shop"="${shopType}"](around:${radius},${lat},${lng});
  );
  out body;
  >;
  out skel qt;
`;
```

### Permissions

The app requires location permissions:

**Android:**
- `ACCESS_FINE_LOCATION`
- `ACCESS_COARSE_LOCATION`

**iOS:**
- `NSLocationWhenInUseUsageDescription`
- `NSLocationAlwaysAndWhenInUseUsageDescription`

## Usage

1. **Start a conversation** with the AI about health concerns
2. **Receive AI recommendations** with highlighted ingredients
3. **Tap on any highlighted ingredient** to open the search screen
4. **View nearby shops** on the map and in the list below
5. **Tap on a shop** to open directions in Google Maps

## Example AI Response

When a user asks "I have a fever", the AI might respond:

> "Here are some natural remedies for fever:
> 1. Drink **ginger** tea with **honey**
> 2. Take **turmeric** with warm **milk**
> 3. Consume **lemon** and **honey** mixture"

The words in bold would be clickable and open the ingredient search screen.

## Installation

1. Install required dependencies:
   ```bash
   npm install expo-location react-native-maps
   ```

2. The app.json file has been updated with necessary permissions and plugins.

3. Rebuild the app to include the new permissions.

## Future Enhancements

- Add shop ratings and reviews
- Filter shops by type (pharmacy, grocery, etc.)
- Add shop opening hours
- Implement offline caching for shop data
- Add favorite shops functionality
- Include shop contact information 