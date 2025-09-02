# Herbal Doc AI - E-commerce Product Search Feature

## Overview

The Herbal Doc AI app now includes a new feature that allows users to find products containing herbal ingredients on popular e-commerce platforms. When the AI suggests remedies containing ingredients like "honey", "ginger", "turmeric", etc., these ingredients become clickable and open a product search screen showing items from Amazon and Flipkart.

## Features

### 1. Ingredient Highlighting
- AI responses automatically highlight common herbal ingredients and remedies
- Clickable ingredients are styled with a green background and underline
- Supports a comprehensive list of 200+ herbal ingredients and common food items

### 2. E-commerce Integration
- Searches for products on Amazon India and Flipkart
- Displays product listings with prices, ratings, and availability
- Direct links to product pages on both platforms
- Platform-specific branding and colors

### 3. Product Search
- Shows mock product data for testing
- Filters by platform (Amazon, Flipkart, or Both)
- Quick search buttons to open platform search pages
- Product cards with images, prices, and ratings

### 4. Product Details
- Displays product name, price, and rating
- Shows availability status
- Platform tags (Amazon/Flipkart)
- Clickable product cards that open platform URLs

## Technical Implementation

### Components

1. **IngredientHighlighter** (`components/IngredientHighlighter.tsx`)
   - Reusable component for highlighting ingredients in text
   - Uses regex to split text while preserving punctuation
   - Maintains a comprehensive list of ingredient keywords

2. **IngredientSearchScreen** (`components/IngredientSearchScreen.tsx`)
   - Main screen for displaying product results
   - Handles platform filtering and product display
   - Manages navigation to e-commerce platforms
   - Renders product cards with mock data

3. **IngredientSearchPage** (`app/ingredient/index.tsx`)
   - Expo Router page that wraps the IngredientSearchScreen
   - Receives ingredient parameter from navigation

### Dependencies

- `expo-linking`: For opening external URLs to e-commerce platforms
- `expo-router`: For navigation between screens
- `axios`: For making HTTP requests (already included)

### E-commerce Integration

The app integrates with popular Indian e-commerce platforms:

```javascript
// Amazon search URL
const amazonUrl = `https://www.amazon.in/s?k=${encodeURIComponent(ingredient)}`;

// Flipkart search URL
const flipkartUrl = `https://www.flipkart.com/search?q=${encodeURIComponent(ingredient)}`;
```

## Usage

1. **Start a conversation** with the AI about health concerns
2. **Receive AI recommendations** with highlighted ingredients
3. **Tap on any highlighted ingredient** to open the product search screen
4. **View products** from Amazon and Flipkart
5. **Filter by platform** using the platform buttons
6. **Tap on products** to open them in the respective e-commerce apps/websites

## Example AI Response

When a user asks "I have a fever", the AI might respond:

> "Here are some natural remedies for fever:
> 1. Drink **ginger** tea with **honey**
> 2. Take **turmeric** with warm **milk**
> 3. Consume **lemon** and **honey** mixture"

The words in bold would be clickable and open the product search screen.

## Product Display

Each product card shows:
- **Product Image**: Placeholder with platform branding
- **Product Name**: Descriptive name with ingredient
- **Price**: In Indian Rupees (₹)
- **Rating**: Star rating with platform-specific styling
- **Availability**: Stock status
- **Platform Tag**: Amazon (orange) or Flipkart (blue)
- **View Button**: Opens product page

## Future Enhancements

- Real product data integration with e-commerce APIs
- Price comparison between platforms
- Product reviews and ratings
- Wishlist functionality
- Price tracking and alerts
- Product recommendations based on user preferences
- Integration with more e-commerce platforms
- Product availability notifications 