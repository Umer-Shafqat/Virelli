import logo1 from './logo1.png'



import add_icon from './add_icon.png'
import order_icon from './order_icon.png'
import profile_image from './profile_image.png'
import upload_area from './upload_area.png'
import parcel_icon from './parcel_icon.png'
import search_icon from './search_icon.png';
import basket_icon from './basket_icon.png';
import add_icon_white from './add_icon_white.png'
import add_icon_green from './add_icon_green.png'
import remove_icon_red from './remove_icon_red.png'
import rating_starts from './rating_starts.png'
import facebook_icon from './facebook_icon.png'
import linkedin_icon from './linkedin_icon.png'
import twitter_icon from './twitter_icon.png'
import app_store from './app_store.png'
import play_store from './play_store.png'
import cross_icon from './cross_icon.png'
import logout_icon from './logout_icon.png'
import profile_icon from './profile_icon.png'
import header_img from './header_img.png'
import hero1 from './hero1.png'
import chapal1 from './chapal1.png'
import chapal2 from './chapal2.png'
import formal1 from './formal1.png'
import formal2 from './formal2.png'
import formal3  from './formal3.png'
import kid1 from './kid1.png'
import kid2 from './kid2.png'
import kid3 from './kid3.png'
import kid4 from './kid4.png'
import loafer1 from './loafer1.png'
import loafer2 from './loafer2.png'
import loafer3 from './loafer3.png'
import men1 from './men1.png'
import men2 from './men2.png'
import sneaker1 from './sneaker1.png'
import sneaker2 from './sneaker2.png'
import sneaker3 from './sneaker3.png'
import sneaker4 from './sneaker4.png'
import women1 from './women1.png'
import women2 from './women2.png'


export const assets ={
    women1,
    women2,
    sneaker1,
    sneaker2,
    sneaker3,
    sneaker4,
    men1,
    men2,
    loafer1,
    loafer2,
    loafer3,
    chapal1,
    chapal2,
    formal1,
    formal2,
    formal3,
    kid1,
    kid2,
    kid3,
    kid4,
    header_img,
    profile_icon,
    logout_icon,
    logo1,
    add_icon,
    order_icon,
    profile_image,
    upload_area,
    parcel_icon,
    search_icon,
    basket_icon,
    add_icon_white ,
    add_icon_green,
    remove_icon_red,
    rating_starts,
    facebook_icon,
    linkedin_icon,
    twitter_icon,
    app_store,
    play_store,
    cross_icon,
    hero1,
}

export const shoes = [
  {
    id: 1,
    type: "MEN",
    name: "Classic Chapal",
    category: "Chapal",
    image: chapal1,
    price: 2500,
    discount: 20,
    description: "Traditional and comfortable chapal for everyday use.",
    sizes: [39, 40, 41, 42, 43],
    rating: {
      totalRatings: 0,
      ratingSum: 0
    }
  },
  {
    id: 2,
    type: "MEN",
    name: "Premium Chapal",
    category: "Chapal",
    image: chapal2,
    price: 3000,
    discount: 10,
    description: "Premium leather chapal with a stylish traditional design.",
    sizes: [40, 41, 42, 43, 44],
    rating: {
      totalRatings: 0,
      ratingSum: 0
    }
  },
  {
    id: 3,
    type: "MEN",
    name: "Classic Formal Shoe",
    category: "Formal",
    image: formal1,
    price: 4500,
    discount: 40,
    description: "Elegant formal shoes perfect for office and business meetings.",
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 4,
    type: "MEN",
    name: "Black Formal Shoe",
    category: "Formal",
    image: formal2,
    price: 5000,
    discount: 40,
    description: "Classic black formal shoes with a premium finish.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 5,
    type: "MEN",
    name: "Premium Formal Shoe",
    category: "Formal",
    image: formal3,
    price: 5500,
    discount: 13,
    description: "Premium formal shoes designed for a sophisticated look.",
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 6,
    type: "KID",
    name: "Kids Casual Shoe",
    category: "Kids",
    image: kid1,
    price: 2000,
    discount: 15,
    description: "Comfortable and stylish shoes for kids.",
    sizes: [28, 29, 30, 31, 32]
  },
  {
    id: 7,
    type: "KID",
    name: "Kids Sport Shoe",
    category: "Kids",
    image: kid2,
    price: 2200,
    discount: 30,
    description: "Lightweight sports shoes for active kids.",
    sizes: [28, 29, 30, 31, 32]
  },
  {
    id: 8,
    type: "KID",
    name: "Kids Premium Shoe",
    category: "Kids",
    image: kid3,
    price: 2500,
    discount: 17,
    description: "Stylish premium shoes designed for kids.",
    sizes: [29, 30, 31, 32, 33]
  },
  {
    id: 9,
    type: "KID",
    name: "Kids Walking Shoe",
    category: "Kids",
    image: kid4,
    price: 2300,
    discount: 22,
    description: "Comfortable walking shoes for everyday activities.",
    sizes: [28, 29, 30, 31, 32]
  },
  {
    id: 10,
    type: "MEN",
    name: "Classic Loafer",
    category: "Loafer",
    image: loafer1,
    price: 4000,
    discount: 26,
    description: "Classic loafers with a comfortable and stylish design.",
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 11,
    type: "MEN",
    name: "Premium Loafer",
    category: "Loafer",
    image: loafer2,
    price: 4500,
    discount: 21,
    description: "Premium loafers perfect for casual and formal occasions.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 12,
    type: "MEN",
    name: "Leather Loafer",
    category: "Loafer",
    image: loafer3,
    price: 5000,
    discount: 12,
    description: "Premium leather loafers with a modern design.",
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 13,
    type: "MEN",
    name: "Men Casual Shoe",
    category: "Men",
    image: men1,
    price: 3500,
    discount: 5,
    description: "Comfortable casual shoes for everyday men's fashion.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 14,
    type: "MEN",
    name: "Men Classic Shoe",
    category: "Men",
    image: men2,
    price: 4000,
    discount: 14,
    description: "Classic men's shoes with a stylish premium look.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 15,
    type: "MEN",
    name: "White Sneaker",
    category: "Sneakers",
    image: sneaker1,
    price: 3500,
    discount: 11,
    description: "Clean and stylish white sneakers for everyday wear.",
    sizes: [39, 40, 41, 42, 43, 44]
  },
  {
    id: 16,
    type: "MEN",
    name: "Classic Sneaker",
    category: "Sneakers",
    image: sneaker2,
    price: 3800,
    discount: 8,
    description: "Comfortable sneakers with a modern casual design.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 17,
    type: "MEN",
    name: "Sport Sneaker",
    category: "Sneakers",
    image: sneaker3,
    price: 4200,
    discount: 9,
    description: "Lightweight sport sneakers designed for active lifestyles.",
    sizes: [39, 40, 41, 42, 43]
  },
  {
    id: 18,
    type: "MEN",
    name: "Premium Sneaker",
    category: "Sneakers",
    image: sneaker4,
    price: 5000,
    discount: 16,
    description: "Premium sneakers with a stylish modern appearance.",
    sizes: [40, 41, 42, 43, 44]
  },
  {
    id: 19,
    type: "WOMEN",
    name: "Women's Casual Shoe",
    category: "Women",
    image: women1,
    price: 3500,
    discount: 24,
    description: "Elegant and comfortable women's casual shoes.",
    sizes: [36, 37, 38, 39, 40]
  },
  {
    id: 20,
    type: "WOMEN",
    name: "Women's Fashion Shoe",
    category: "Women",
    image: women2,
    price: 4500,
    discount: 4,
    description: "Fashionable women's shoes with premium comfort.",
    sizes: [36, 37, 38, 39, 40]
  }
];

export const url = "http://localhost:3000";