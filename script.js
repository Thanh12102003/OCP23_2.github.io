const submitBtn = document.getElementById('submit-btn');

function showPopup(message) {
  const resultBox = document.getElementById('result');
  resultBox.innerHTML = `<p>${message}</p>`;
  resultBox.style.display = "block";
  resultBox.style.opacity = "1";

  setTimeout(() => {
    resultBox.style.opacity = "0";
    setTimeout(() => {
      resultBox.style.display = "none";
    }, 500);
  }, 5000);
}

submitBtn.addEventListener('click', function () {
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const genderElement = document.querySelector('input[name="gender"]:checked');

  const resultBox = document.getElementById('result');
  resultBox.innerHTML = '';

  if (!genderElement) {
    resultBox.innerHTML = `
      <p style="color: #d9534f; background-color: #f2dede; padding: 10px; border-radius: 5px;">
        ❌ Vui lòng chọn giới tính!
      </p>
    `;
    return;
  }

  const gender = genderElement.value;

  if (!name || !email || !phone) {
    resultBox.innerHTML = `
      <p style="color: #d9534f; background-color: #f2dede; padding: 10px; border-radius: 5px;">
        ❌ Vui lòng điền đầy đủ thông tin!
      </p>
    `;
    return;
  }

  const data = { name, email, phone, gender };

  fetch('https://script.google.com/macros/s/AKfycbypMfDIhb5pdzQdH6dhMyjpn5wbdIV8IhSypLGp5-MSvjjxmZ6SA-i3Q78L7Xuyt_sr/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .then(() => {
    showPopup("✅ Cảm ơn Quý khách đã đăng ký để lại thông tin. Quý khách vui lòng để ý điện thoại để giám đốc dự án bên em liên hệ tư vấn.");

    document.querySelector('input[name="name"]').value = '';
    document.querySelector('input[name="email"]').value = '';
    document.querySelector('input[name="phone"]').value = '';
  })
  .catch((error) => {
    console.error('Error!', error.message);
    resultBox.innerHTML = `
      <p style="color: #d9534f; background-color: #f2dede; padding: 10px; border-radius: 5px;">
        ❌ Đăng ký thất bại. Vui lòng thử lại!
      </p>
    `;
  });
});
