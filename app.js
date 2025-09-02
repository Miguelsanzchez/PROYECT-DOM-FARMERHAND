const products = [
  // Verduras de temporada
  {
    name: 'Tomates',
    price: 19.15,
    stars: 5,
    reviews: 15,
    seller: 'Antonio Salgado y familia',
    category: 'Verduras',
    season: 'En Temporada,Disponible',
    image:
      'https://common.crowdfarming.com/uploaded-images/1716887651921-5959fbeb-8441-4eab-9b0c-d2b939b73cfa.jpg',
    origin: 'El Bosque del Batán · Periana,España'
  },
  {
    name: 'Berenjenas de Almagro',
    price: 3.2,
    stars: 4,
    reviews: 67,
    seller: 'Huerto Manchego',
    category: 'Verduras',
    season: 'En temporada,Disponible',
    origin: 'Almagro · Ciudad Real, España',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fberenjenadealmagroigp.com%2Fwp-content%2Fuploads%2F2020%2F10%2Fbg_7.jpg&f=1&nofb=1&ipt=9e6c65725015b6bfa7d35b092c53a89815c231ae13c0f2ea6e595047757c5844'
  },
  {
    name: 'Pimientos de Padrón',
    price: 6.8,
    stars: 5,
    reviews: 143,
    seller: 'Finca O Curro',
    category: 'Verduras',
    season: 'En temporada,Disponible',
    origin: 'Padrón · A Coruña, España',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimg.freepik.com%2Fpremium-photo%2Fsummer-harvest-collect-fruits-from-backyard-garden-harvest-pimiento-del-padron-small-pepper_851001-505.jpg&f=1&nofb=1&ipt=1f7be5e50a27765e9e8f5cbc297776f843e87d2e6c68eb31af6aa873fc09ece0'
  },
  {
    name: 'Calabacines de Huesca',
    price: 2.9,
    stars: 4,
    reviews: 92,
    seller: 'Huertos del Pirineo',
    category: 'Verduras',
    season: 'En temporada, Disponible',
    origin: 'Huesca, España',
    image:
      'https://common.crowdfarming.com/uploaded-images/1694418289067-04847445-33a3-4993-850d-1af49809d053.jpg'
  },
  {
    name: 'Pepinos Ecológicos',
    price: 3.75,
    stars: 4,
    reviews: 154,
    seller: 'Eco Campo Verde',
    category: 'Verduras',
    season: 'En temporada',
    origin: 'Valencia, España',
    image:
      'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop'
  },
  {
    name: 'Judías Verdes de León',
    price: 5.2,
    stars: 5,
    reviews: 78,
    seller: 'Huerta Leonesa',
    category: 'Verduras',
    season: 'En temporada,Disponible',
    origin: 'León, España',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.kf7yM4eZ-NmBdjSAFr96WwAAAA%3Fpid%3DApi&f=1&ipt=4d4da764100bd13bc3b7c79b8191f683b615865ab4a7a256945eed015048887f&ipo=images'
  },
  // Frutas de temporada
  {
    name: 'Uvas Tempranillo',
    price: 8.9,
    stars: 4,
    reviews: 201,
    seller: 'Viñedos Ribera',
    category: 'Frutas',
    season: 'En temporada,Disponible',
    origin: 'Valladolid, España',
    image:
      'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400&h=300&fit=crop'
  },
  {
    name: 'Melones de Tomelloso',
    price: 2.75,
    stars: 5,
    reviews: 156,
    seller: 'Cooperativa Santiago Apostol',
    category: 'Frutas',
    season: 'En temporada,Disponible',
    origin: 'Tomelloso · Ciudad Real, España',
    image:
      'https://www.verdurasdelhuerto.es/wp-content/uploads/2024/09/melon-dulce.jpg'
  },
  {
    name: 'Sandías de Almonte',
    price: 1.95,
    stars: 4,
    reviews: 89,
    seller: 'Cultivos del Rocío',
    category: 'Frutas',
    season: 'En temporada,Disponible',
    origin: 'Almonte · Huelva, España',
    image:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F017%2F725%2F979%2Fnon_2x%2Fwatermelon-slice-in-watermelon-field-fresh-watermelon-fruit-on-ground-agriculture-garden-watermelon-farm-with-leaf-tree-plant-harvesting-watermelons-in-the-field-free-photo.JPG&f=1&nofb=1&ipt=b11c5c903816b7958e495e8fb2340f5d6bc4235a409962ec7d1dd80cc27f1f3b'
  },
  {
    name: 'Melocotones de Aragón',
    price: 4.65,
    stars: 5,
    reviews: 198,
    seller: 'Frutales del Ebro',
    category: 'Frutas',
    season: 'En temporada,Disponible',
    origin: 'Aragón · Zaragoza, España',
    image:
      'https://imagenes.esdiario.com/files/image_media_main_desktop/uploads/2024/07/19/669a4ef4b22d2.jpeg'
  },
  {
    name: 'Peras de Lleida',
    price: 3.85,
    stars: 4,
    reviews: 132,
    seller: 'Pomar Català',
    category: 'Frutas',
    season: 'Disponible',
    origin: 'Lleida, España',
    image:
      'https://elautenticomelocotondecieza.com/wp-content/uploads/2024/09/IMG_6576-scaled.jpg'
  },
  {
    name: 'Higos de Extremadura',
    price: 7.2,
    stars: 5,
    reviews: 86,
    seller: 'Huerta Extremeña',
    category: 'Frutas',
    season: 'En temporada, disponible',
    origin: 'Cáceres · Extremadura, España',
    image:
      'https://cooperativa-agroecologica.es/wp-content/uploads/2024/07/higos-frescos-eco.png'
  },
  // Lácteos
  {
    name: 'Queso De Oveja Semicurado',
    price: 35.8,
    stars: 5,
    reviews: 78,
    seller: 'Marqués de Mendiola',
    category: 'Lacteos',
    season: 'Disponible',
    origin: 'Marqués de Mendiola · Madrid, España',
    image:
      'https://common.crowdfarming.com/uploaded-images/1690197389267-d399d627-fc7e-4d3d-adeb-ddfd6dfe9c32.jpg'
  },
  {
    name: 'Queso Manchego DOP',
    price: 72.76,
    stars: 4,
    reviews: 234,
    seller: 'La Castellana',
    category: 'Lacteos',
    season: 'Disponible',
    origin: 'Soto del Marqués · Los Yebenes, España',
    image:
      'https://common.crowdfarming.com/uploaded-images/1749795719055-35e8e51d-5fac-4b2e-8c3e-c30b9ca09c4d.jpg'
  },
  {
    name: 'Parmesano Reggiano 30 meses DOP',
    price: 74.35,
    stars: 5,
    reviews: 156,
    seller: 'Societá Agricola Rondini Roberto e Bennati Guido s.s.',
    category: 'Lacteos',
    season: 'Disponible',
    origin: 'Caseificio Sociale Castellazzo · Campagnola Emilia, Italia',
    image:
      'https://common.crowdfarming.com/uploaded-images/1747030431355-c99dc9a7-d70e-4891-9eb8-7d5414a5a2cd.jpg'
  },
  // Aceites
  {
    name: 'Aceite de Oliva Picual Nuevo',
    price: 24.75,
    stars: 5,
    reviews: 312,
    seller: 'Olivar San Miguel',
    category: 'Aceites',
    season: 'Disponible',
    origin: 'Jaén, España',
    image:
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop'
  }
]
// Barra de navegacion
function createNavigation() {
  const header = document.getElementById('header')

  const navContainer = document.createElement('div')
  navContainer.className = 'nav-container'

  const navMenu = document.createElement('nav')
  navMenu.className = 'nav-menu'

  // Lado izquierdo con logo y enlaces
  const navLeft = document.createElement('div')
  navLeft.className = 'nav-left'

  // Logo FarmerHand
  const logoLink = document.createElement('a')
  logoLink.href = '#home'
  logoLink.className = 'logo-link'
  const logoImg = document.createElement('img')
  logoImg.src = 'assents/logofarmerhand.png'
  logoImg.alt = 'Logo FarmerHand'
  logoImg.className = 'logo'
  logoLink.appendChild(logoImg)

  // Enlaces de navegación
  const navLinks = document.createElement('div')
  navLinks.className = 'nav-links'
  navLinks.id = 'navLinks'

  const links = [
    { href: '#products', text: 'TIENDA' },
    { href: '#farmers', text: 'EN TEMPORADA' },
    { href: '#adopt', text: 'ADOPTA UN ÁRBOL' },
    { href: '#about', text: 'QUIENES SOMOS' },
    { href: '#contact', text: 'CONTACTO' }
  ]

  links.forEach((link) => {
    const a = document.createElement('a')
    a.href = link.href
    a.textContent = link.text
    navLinks.appendChild(a)
  })

  navLeft.appendChild(logoLink)
  navLeft.appendChild(navLinks)

  // Iconos del menú
  const menuIcons = document.createElement('div')
  menuIcons.className = 'menu-icons'

  const icons = [
    { class: 'login-icon', text: 'person' },
    { class: 'search-icon', text: 'search' },
    { class: 'cart', text: 'shopping_cart' }
  ]
  // Utilizo el foreach para recorrer el array al igual que en los links//
  icons.forEach((icon) => {
    const span = document.createElement('span')
    span.className = `material-symbols-outlined ${icon.class}`
    span.textContent = icon.text
    menuIcons.appendChild(span)
  })

  // Creacion Menú hamburguesa para movil
  const burger = document.createElement('div')
  burger.className = 'burger'
  burger.id = 'burger'

  // Tres lineas del menu hamburguesa de span
  for (let i = 0; i < 3; i++) {
    const span = document.createElement('span')
    burger.appendChild(span)
  }

  //MenuIcons es el div que contiene los iconos y el menu hamburguesa
  menuIcons.appendChild(burger)

  navMenu.appendChild(navLeft)
  navMenu.appendChild(menuIcons)
  navContainer.appendChild(navMenu)
  header.appendChild(navContainer)
}

// 🌟 CREAR HERO SECTION CON DOM
function createHeroSection() {
  const app = document.getElementById('app')

  const container = document.createElement('div')
  container.className = 'container'

  const heroSection = document.createElement('section')
  heroSection.className = 'hero-section'

  const h1 = document.createElement('h1')
  h1.textContent = 'De la Huerta a tus Manos'

  const p = document.createElement('p')
  p.textContent = 'Productos frescos y locales de la huerta a tu hogar'

  heroSection.appendChild(h1)
  heroSection.appendChild(p)
  container.appendChild(heroSection)

  app.appendChild(container)

  return container // Devolvemos el container para agregar más secciones
}

// 📦 CREAR SECCIÓN DE PRODUCTOS COMPLETA
function createProductsSection(container) {
  const productsSection = document.createElement('section')
  productsSection.className = 'products-section'

  // Crear filtros
  const filtersSection = document.createElement('aside')
  filtersSection.className = 'filters-section'
  filtersSection.id = 'filtersSection'

  const filtersHeader = document.createElement('div')
  filtersHeader.className = 'filters-header'

  const filtersTitle = document.createElement('h2')
  filtersTitle.textContent = '🔍 Filtros'

  const closeFilters = document.createElement('button')
  closeFilters.className = 'close-filters'
  closeFilters.id = 'closeFilters'
  closeFilters.textContent = '✕'

  filtersHeader.appendChild(filtersTitle)
  filtersHeader.appendChild(closeFilters)
  filtersSection.appendChild(filtersHeader)

  // Botón para mostrar filtros en móvil
  const showFiltersBtn = document.createElement('button')
  showFiltersBtn.className = 'show-filters-btn'
  showFiltersBtn.id = 'showFiltersBtn'

  //Icono en material-Symbols de tune que son filtros

  const tuneIcon = document.createElement('span')
  tuneIcon.className = 'material-symbols-outlined'
  tuneIcon.textContent = 'tune'

  showFiltersBtn.appendChild(tuneIcon)
  showFiltersBtn.appendChild(document.createTextNode('Filtros'))

  // Wrapper de productos
  const productsWrapper = document.createElement('div')
  productsWrapper.className = 'products-wrapper'
  productsWrapper.id = 'productsWrapper'

  productsSection.appendChild(filtersSection)
  productsSection.appendChild(showFiltersBtn)
  productsSection.appendChild(productsWrapper)

  container.appendChild(productsSection)
}

// 🔧 CREAR FILTROS CON DOM
function createFilters() {
  const filtersSection = document.getElementById('filtersSection')

  // Filtros por categoría
  const categoryGroup = createFilterGroup('Categorías', [
    {
      id: 'verduras',
      value: 'Verduras',
      label: 'Verduras',
      type: 'checkbox',
      img: 'assents/verduras.png',
      class: 'filter-category'
    },
    {
      id: 'frutas',
      value: 'Frutas',
      label: 'Frutas',
      type: 'checkbox',
      img: 'assents/fruta.png',
      class: 'filter-category'
    },
    {
      id: 'lacteos',
      value: 'Lacteos',
      label: 'Lácteos',
      type: 'checkbox',
      img: 'assents/productos-lacteos.png',
      class: 'filter-category'
    },
    {
      id: 'aceites',
      value: 'Aceites',
      label: 'Aceites',
      type: 'checkbox',
      img: 'assents/aceite-de-oliva.png',
      class: 'filter-category'
    }
  ])
  filtersSection.appendChild(categoryGroup)

  // Filtros por disponibilidad
  const availabilityGroup = createFilterGroup('Disponibilidad', [
    {
      id: 'temporada',
      value: 'temporada',
      label: 'En Temporada',
      type: 'radio',
      name: 'availability',
      img: 'assents/calendario.png',
      class: 'filter-availability'
    },
    {
      id: 'disponible',
      value: 'disponible',
      label: 'Disponible',
      type: 'radio',
      name: 'availability',
      img: 'assents/disponible.png',
      class: 'filter-availability'
    },
    {
      id: 'todos',
      value: '',
      label: 'Todos',
      type: 'radio',
      name: 'availability',
      img: 'assents/caja.png',
      class: 'filter-availability',
      checked: true
    }
  ])
  filtersSection.appendChild(availabilityGroup)
}

// FUNCIÓN PARA CREAR GRUPOS DE FILTROS
function createFilterGroup(title, options) {
  const group = document.createElement('div')
  group.className = 'filter-group'

  const h3 = document.createElement('h3')
  h3.textContent = title
  group.appendChild(h3)

  options.forEach((option) => {
    const filterOption = document.createElement('div')
    filterOption.className = 'filter-option'

    const input = document.createElement('input')
    input.type = option.type
    input.id = option.id
    input.value = option.value
    input.className = option.class
    if (option.name) input.name = option.name
    if (option.checked) input.checked = true

    const label = document.createElement('label')
    label.htmlFor = option.id

    // Imagen del filtro
    const img = document.createElement('img')
    img.src = option.img
    img.alt = option.label
    img.className = 'filter-icon'
    label.appendChild(img)

    // Texto del filtro
    const text = document.createTextNode(option.label)
    label.appendChild(text)

    filterOption.appendChild(input)
    filterOption.appendChild(label)
    group.appendChild(filterOption)
  })

  return group
}
// FUNCIONALIDAD DE FILTROS
function setupFilters() {
  const categoryFilters = document.querySelectorAll('.filter-category')
  const availabilityFilters = document.querySelectorAll('.filter-availability')

  function applyFilters() {
    // Empezamos con todos los productos del array
    let filteredProducts = products

    // Filtrar por categorías
    const selectedCategories = []
    categoryFilters.forEach((input) => {
      if (input.checked) selectedCategories.push(input.value)
    })
    if (selectedCategories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategories.includes(product.category)
      )
    }

    // Se Filtra por disponibilidad
    let selectedAvailability = ''
    availabilityFilters.forEach((input) => {
      if (input.checked) selectedAvailability = input.value
    })
    if (selectedAvailability) {
      filteredProducts = filteredProducts.filter((product) =>
        product.season
          .toLowerCase()
          .includes(selectedAvailability.toLowerCase())
      )
    }

    // 3️Mostrar productos filtrados
    renderProducts(filteredProducts)
  }

  // Escuchar cambios en filtros
  categoryFilters.forEach((input) =>
    input.addEventListener('change', applyFilters)
  )
  availabilityFilters.forEach((input) =>
    input.addEventListener('change', applyFilters)
  )
}
// GRID DE PRODUCTOS
function createProductsWrapper() {
  const productsWrapper = document.getElementById('productsWrapper')

  const h2 = document.createElement('h2')
  h2.textContent = 'Productos de Temporada - Agosto 2025'

  const seasonalInfo = document.createElement('div')
  seasonalInfo.className = 'seasonal-info'
  const p = document.createElement('p')
  p.textContent = 'Lo mejor del campo directo a tus manos'
  seasonalInfo.appendChild(p)

  const productsGrid = document.createElement('div')
  productsGrid.className = 'products-grid'
  productsGrid.id = 'productsGrid'

  productsWrapper.appendChild(h2)
  productsWrapper.appendChild(seasonalInfo)
  productsWrapper.appendChild(productsGrid)
}

// RENDERIZAR PRODUCTOS
function renderProducts(productsToRender = products) {
  const productsGrid = document.getElementById('productsGrid')
  productsGrid.innerHTML = ''

  productsToRender.forEach((product) => {
    const productCard = createProductCard(product)
    productsGrid.appendChild(productCard)
  })
}

// CREAR TARJETA DE PRODUCTO
function createProductCard(product) {
  const productCard = document.createElement('article')
  productCard.className = 'product-card'

  // Imagen del producto
  const productImage = document.createElement('div')
  productImage.className = 'product-image'

  const img = document.createElement('img')
  img.src = product.image
  img.alt = product.name

  const badge = document.createElement('div')
  badge.className = 'product-badge'
  badge.textContent = product.category

  productImage.appendChild(img)
  productImage.appendChild(badge)

  // Contenido del producto
  const productContent = document.createElement('div')
  productContent.className = 'product-content'

  // Título
  const title = document.createElement('h3')
  title.className = 'product-title'
  title.textContent = product.name

  // Tag de temporada
  const seasonTag = document.createElement('div')
  seasonTag.className = 'product-season-tag'
  seasonTag.textContent = product.season

  // Origen
  const origin = document.createElement('p')
  origin.className = 'product-origin'
  origin.textContent = `📍 ${product.origin}`

  // Vendedor
  const seller = document.createElement('p')
  seller.className = 'product-seller'
  seller.textContent = `👨‍🌾 ${product.seller}`

  // Rating
  const rating = createProductRating(product)

  // Precio
  const priceContainer = document.createElement('div')
  priceContainer.className = 'product-price'

  const price = document.createElement('span')
  price.className = 'price'
  price.textContent = `€${product.price}`

  const unit = document.createElement('span')
  unit.className = 'unit'
  unit.textContent = ' / kg'

  priceContainer.appendChild(price)
  priceContainer.appendChild(unit)

  // Botón añadir al carrito
  const addToCartBtn = document.createElement('button')
  addToCartBtn.className = 'add-to-cart-btn'
  addToCartBtn.textContent = '🛒 Añadir al Carrito'
  addToCartBtn.onclick = () => addToCart(product.name)

  // añadimos contenido
  productContent.appendChild(title)
  productContent.appendChild(seasonTag)
  productContent.appendChild(origin)
  productContent.appendChild(seller)
  productContent.appendChild(rating)
  productContent.appendChild(priceContainer)
  productContent.appendChild(addToCartBtn)

  // añadimos tarjeta
  productCard.appendChild(productImage)
  productCard.appendChild(productContent)

  return productCard
}

// RATINGS TOTAL DE LOS PRODUCTOS
function createProductRating(product) {
  const rating = document.createElement('div')
  rating.className = 'product-rating'

  const stars = document.createElement('div')
  stars.className = 'stars'
  stars.innerHTML = generateStars(product.stars)

  const reviews = document.createElement('span')
  reviews.className = 'reviews'
  reviews.textContent = `(${product.reviews} valoraciones)`

  rating.appendChild(stars)
  rating.appendChild(reviews)

  return rating
}

// RELLENAR ESTRELLAS SEGUN EL RATING
function generateStars(rating) {
  let starsHTML = ''
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<span class="star filled">★</span>'
    } else {
      starsHTML += '<span class="star">☆</span>'
    }
  }

  return starsHTML
}
function generateStars(rating) {
  let starsHTML = ''
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<span class="star filled">★</span>'
    } else {
      starsHTML += '<span class="star">☆</span>'
    }
  }

  return starsHTML
}

// 🛒 AÑADIR AL CARRITO
function addToCart(productName) {
  alert(`¡${productName} añadido al carrito! 🛒`)
  console.log(`Producto añadido: ${productName}`)
}

// 🍓 CREAR SECCIÓN DE SUSCRIPCIONES
function createSubscriptionSection() {
  const app = document.getElementById('app')

  const subscriptionSection = document.createElement('div')
  subscriptionSection.className = 'subscription-section'

  const subscriptionCards = document.createElement('div')
  subscriptionCards.className = 'subscription-cards'

  // Primera tarjeta - Suscripción
  const card1 = document.createElement('div')
  card1.className = 'subscription-card'

  const text1 = document.createElement('div')
  text1.className = 'text'

  const h2 = document.createElement('h2')
  h2.textContent = 'Suscripción a fruta ecológica de temporada'

  const p1 = document.createElement('p')
  p1.textContent =
    'Recibe cada mes una caja con las 3 frutas que mejor estén de todas las fincas que visitan nuestro equipo de ingenieros agrónomos. De esta forma puedes probar fruta diferente cada mes'

  const btn1 = document.createElement('button')
  btn1.textContent = 'Ver la caja de este mes'
  btn1.className = 'btn'
  btn1.onclick = function () {
    alert('Mostrando la caja de este mes')
  }

  const img1 = document.createElement('img')
  img1.src = 'assents/frutaecologica.jpeg'
  img1.alt = 'Caja de frutas ecológicas'

  text1.appendChild(h2)
  text1.appendChild(p1)
  text1.appendChild(btn1)

  card1.appendChild(text1)
  card1.appendChild(img1)

  // Segunda tarjeta - Adopta un árbol
  const card2 = document.createElement('div')
  card2.className = 'subscription-card'

  const text2 = document.createElement('div')
  text2.className = 'text'

  const h3 = document.createElement('h3')
  h3.textContent = 'Adopta un árbol con tu nombre'

  const p2 = document.createElement('p')
  p2.textContent =
    'Empieza una relación que da frutos. Cuando adoptas no solo recibes fruta fresca a lo largo de toda la temporada, sino que permites que el agricultor se planifique mejor y reciba unos ingresos más justos.'

  const btn2 = document.createElement('button')
  btn2.textContent = 'Adopta un árbol'
  btn2.className = 'btn'
  btn2.onclick = function () {
    alert('¡Gracias por adoptar un árbol! 🌳')
  }

  const img2 = document.createElement('img')
  img2.src = 'assents/adopta-arbol.jpeg'
  img2.alt = 'Árbol adoptado con tu nombre'

  text2.appendChild(h3)
  text2.appendChild(p2)
  text2.appendChild(btn2)

  card2.appendChild(text2)
  card2.appendChild(img2)

  subscriptionCards.appendChild(card1)
  subscriptionCards.appendChild(card2)
  subscriptionSection.appendChild(subscriptionCards)

  app.appendChild(subscriptionSection)
}

// 👥 CREAR SECCIÓN DE COMUNIDAD
function createCommunitySection() {
  const app = document.getElementById('app')

  const communitySection = document.createElement('div')
  communitySection.className = 'community-section'

  const container = document.createElement('div')
  container.className = 'suscription-container'

  const h2 = document.createElement('h2')
  h2.textContent = 'Únete a la Comunidad'

  const p = document.createElement('p')
  p.textContent =
    'Recibe noticias de nuestros agricultores y de los productos que crecen en sus campos'

  const form = document.createElement('form')
  form.className = 'subs-form'

  // Nombre
  const divNombre = document.createElement('div')
  divNombre.className = 'input-group'

  const labelNombre = document.createElement('label')
  labelNombre.textContent = 'Nombre'
  labelNombre.htmlFor = 'nombre'

  const inputNombre = document.createElement('input')
  inputNombre.type = 'text'
  inputNombre.id = 'nombre'
  inputNombre.placeholder = 'Nombre'
  inputNombre.required = true

  divNombre.appendChild(labelNombre)
  divNombre.appendChild(inputNombre)

  // Apellido
  const divApellido = document.createElement('div')
  divApellido.className = 'input-group'

  const labelApellido = document.createElement('label')
  labelApellido.textContent = 'Apellido'
  labelApellido.htmlFor = 'apellido'

  const inputApellido = document.createElement('input')
  inputApellido.type = 'text'
  inputApellido.id = 'apellido'
  inputApellido.placeholder = 'Apellidos (Opcional)'

  divApellido.appendChild(labelApellido)
  divApellido.appendChild(inputApellido)

  // Email
  const divEmail = document.createElement('div')
  divEmail.className = 'input-group email'

  const labelEmail = document.createElement('label')
  labelEmail.textContent = 'Correo Electrónico'
  labelEmail.htmlFor = 'email'

  const inputEmail = document.createElement('input')
  inputEmail.type = 'email'
  inputEmail.id = 'email'
  inputEmail.placeholder = 'Correo Electrónico'
  inputEmail.required = true

  divEmail.appendChild(labelEmail)
  divEmail.appendChild(inputEmail)

  // Botón
  const divButton = document.createElement('div')
  divButton.className = 'button-group'

  const btnForm = document.createElement('button')
  btnForm.type = 'submit'
  btnForm.textContent = 'Inscríbete'
  btnForm.className = 'btn'

  divButton.appendChild(btnForm)

  // Checkbox
  const divCheckbox = document.createElement('div')
  divCheckbox.className = 'checkbox-group'

  const checkboxLabel = document.createElement('label')
  checkboxLabel.className = 'checkbox-label'

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.required = true

  const checkboxText = document.createTextNode('He leído y acepto las ')
  const linkCondiciones = document.createElement('a')
  linkCondiciones.href = '#'
  linkCondiciones.textContent = 'condiciones'
  linkCondiciones.className = 'link'

  const textY = document.createTextNode(' y las ')
  const linkPrivacidad = document.createElement('a')
  linkPrivacidad.href = '#'
  linkPrivacidad.textContent = 'políticas de privacidad'
  linkPrivacidad.className = 'link'

  const textFinal = document.createTextNode('.')

  checkboxLabel.appendChild(checkbox)
  checkboxLabel.appendChild(checkboxText)
  checkboxLabel.appendChild(linkCondiciones)
  checkboxLabel.appendChild(textY)
  checkboxLabel.appendChild(linkPrivacidad)
  checkboxLabel.appendChild(textFinal)

  divCheckbox.appendChild(checkboxLabel)

  // Event listener para el formulario
  form.addEventListener('submit', function (e) {
    e.preventDefault()
    alert('¡Te has inscrito a la Comunidad! 🎉')
    form.reset()
  })

  // Agregar elementos al formulario
  form.appendChild(divNombre)
  form.appendChild(divApellido)
  form.appendChild(divEmail)
  form.appendChild(divButton)

  container.appendChild(h2)
  container.appendChild(p)
  container.appendChild(form)
  container.appendChild(divCheckbox)

  communitySection.appendChild(container)
  app.appendChild(communitySection)
}

//CREACION  FOOTER
function createFooter() {
  const footer = document.getElementById('footer')

  const p1 = document.createElement('p')
  p1.innerHTML = '&copy; 2025 FarmerHand - De la huerta a tus manos 🌱'

  const p2 = document.createElement('p')
  p2.textContent = 'Conectando agricultores con consumidores'

  footer.appendChild(p1)
  footer.appendChild(p2)
}

// CONFIGURAR MENÚ HAMBURGUESA (PARA MÓVIL)
function configurarMenuMovil() {
  const hamburguesa = document.getElementById('burger')
  const enlacesNav = document.getElementById('navLinks')

  // Si existen ambos elementos
  if (hamburguesa && enlacesNav) {
    // Cuando haces clic en el menú hamburguesa
    hamburguesa.addEventListener('click', function () {
      // Cambia entre mostrar y ocultar el menú
      hamburguesa.classList.toggle('active')
      enlacesNav.classList.toggle('active')
    })
  }
}

// CONFIGURAR FILTROS PARA MÓVILES
function configurarFiltrosMoviles() {
  // ELEMENTOS A USAR
  const botonAbrirFiltros = document.getElementById('showFiltersBtn')
  const botonCerrarFiltros = document.getElementById('closeFilters')
  const seccionFiltros = document.getElementById('filtersSection')
  const overlayFiltros = document.getElementById('filtersOverlay')

  //  Función para mostrar los filtros
  function mostrarFiltros() {
    seccionFiltros.classList.add('active') // Agrega clase "active" para que se vea
    overlayFiltros.classList.add('active') // Hace visible el fondo semitransparente
  }

  //  Función para ocultar los filtros
  function ocultarFiltros() {
    seccionFiltros.classList.remove('active') // Quita clase "active" para ocultar
    overlayFiltros.classList.remove('active') // Oculta el fondo semitransparente
  }

  // -eventos a los botones y al overlay-

  // Abrir filtros al hacer clic en el botón
  if (botonAbrirFiltros) {
    botonAbrirFiltros.addEventListener('click', mostrarFiltros)
  }

  // Cerrar filtros al hacer clic en la "X"
  if (botonCerrarFiltros) {
    botonCerrarFiltros.addEventListener('click', ocultarFiltros)
  }

  // Cerrar filtros al hacer clic en el overlay
  if (overlayFiltros) {
    overlayFiltros.addEventListener('click', ocultarFiltros)
  }
}

// INICIALIZAR LA PÁGINA
document.addEventListener('DOMContentLoaded', function () {
  // Crear toda la estructura de la página (usa los nombres correctos en inglés)
  createNavigation()
  const container = createHeroSection()
  createProductsSection(container)

  // Crear filtros y productos
  createFilters()
  createProductsWrapper()

  // Crear secciones adicionales
  createSubscriptionSection()
  createCommunitySection()
  createFooter()

  // Configurar funcionalidades
  renderProducts()
  setupFilters()
  configurarMenuMovil()
  configurarFiltrosMoviles()

  console.log('FarmerHand iniciado correctamente')
})
