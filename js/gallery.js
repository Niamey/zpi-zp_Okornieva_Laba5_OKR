const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Beautiful Pink Orchid Flowers',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Shipping Container in Blue Ocean',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View with Rocks',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms in Beautiful Bokeh',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains in Clouds',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Scenery with Houses',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Mountain Peak with Snow',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Green Valley with Forest and Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse on Coastal Rocky Cliffs',
    },
  ];
  
  // Функция для создания разметки галереи
  function createGalleryMarkup(images) {
    return images.map(image => `
      <li class="gallery-item">
        <a href="${image.original}" class="gallery-link">
          <img
            class="gallery-image"
            src="${image.preview}"
            data-source="${image.original}"
            alt="${image.description}"
          />
          <div class="gallery-caption">${image.description}</div>
        </a>
      </li>
    `).join('');
  }
  
  // Получаем ссылку на контейнер галереи
  const galleryContainer = document.querySelector('.gallery');
  
  // Создаем и вставляем разметку галереи
  galleryContainer.innerHTML = createGalleryMarkup(images);
  
  // Функция для открытия модального окна
  function openModal(imageSrc, description) {
    const instance = basicLightbox.create(`
      <div class="modal-content">
        <img src="${imageSrc}" alt="${description}" class="modal-image">
        <p class="modal-caption">${description}</p>
      </div>
    `);
    
    instance.show();
    
    // Добавляем обработчик клавиши Escape для закрытия модального окна
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        instance.close();
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
  }
  
  // Слушатель событий с делегированием для элементов галереи
  galleryContainer.addEventListener('click', (event) => {
    event.preventDefault();
    
    // Проверяем, был ли клик на элементе галереи или его дочернем элементе
    const galleryItem = event.target.closest('.gallery-item');
    
    if (!galleryItem) {
      return; // Если клик был не по элементу галереи, ничего не делаем
    }
    
    // Находим изображение внутри элемента галереи
    const galleryImage = galleryItem.querySelector('.gallery-image');
    const largeImageUrl = galleryImage.dataset.source;
    const imageDescription = galleryImage.alt;
    
    // Открываем модальное окно с большим изображением
    openModal(largeImageUrl, imageDescription);
  });