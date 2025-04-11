// Определяем ключ для хранения в localStorage
const STORAGE_KEY = "feedback-form-state";

// Объявляем объект formData с начальными пустыми значениями полей
let formData = {
  email: "",
  message: ""
};

// Получаем ссылки на элементы формы
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Функция для сохранения данных формы в localStorage
function saveFormData() {
  // Убираем пробелы по краям перед сохранением
  formData.email = emailInput.value.trim();
  formData.message = messageTextarea.value.trim();
  
  // Сохраняем данные в localStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Функция для загрузки сохраненных данных из localStorage
function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  
  if (savedData) {
    // Если в localStorage есть данные, парсим их и заполняем форму
    formData = JSON.parse(savedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
}

// Функция для проверки заполнения полей формы
function validateForm() {
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return false;
  }
  return true;
}

// Функция для очистки формы и данных
function clearFormData() {
  // Очищаем localStorage
  localStorage.removeItem(STORAGE_KEY);
  
  // Очищаем объект formData
  formData = {
    email: "",
    message: ""
  };
  
  // Очищаем поля формы
  form.reset();
}

// Обработчик события input для отслеживания изменений в форме
form.addEventListener('input', (event) => {
  // Определяем, какое поле изменилось и обновляем соответствующее свойство в объекте formData
  if (event.target.name === 'email') {
    formData.email = event.target.value.trim();
  } else if (event.target.name === 'message') {
    formData.message = event.target.value.trim();
  }
  
  // Сохраняем обновленные данные в localStorage
  saveFormData();
});

// Обработчик события submit для отправки формы
form.addEventListener('submit', (event) => {
  // Предотвращаем стандартное поведение формы (перезагрузку страницы)
  event.preventDefault();
  
  // Проверяем, заполнены ли все поля формы
  if (validateForm()) {
    // Выводим объект formData в консоль
    console.log(formData);
    
    // Очищаем форму и данные
    clearFormData();
  }
});

// Загружаем сохраненные данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadFormData);