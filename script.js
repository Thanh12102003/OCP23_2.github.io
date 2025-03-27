const submitBtn = document.getElementById('submit-btn');

submitBtn.addEventListener('click', function () {
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const phone = document.querySelector('input[name="phone"]').value.trim();
  const gender = document.querySelector('input[name="gender"]:checked').value;

  const resultBox = document.getElementById('result');

  resultBox.innerHTML = '';

  if (!name || !email || !phone) {
    resultBox.innerHTML = `
      <p style="color: #d9534f; background-color: #f2dede; padding: 10px; border-radius: 5px;">
        ❌ Vui lòng điền đầy đủ thông tin!
      </p>
    `;
    return;
  }

  const data = {
    name: name,
    email: email,
    phone: phone,
    gender: gender
  };

  fetch('https://script.google.com/macros/s/AKfycbypMfDIhb5pdzQdH6dhMyjpn5wbdIV8IhSypLGp5-MSvjjxmZ6SA-i3Q78L7Xuyt_sr/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    resultBox.innerHTML = `
      <p style="color: #3c763d; background-color: #dff0d8; padding: 10px; border-radius: 5px;">
        ✅ Đăng ký thành công! Vui lòng kiểm tra email để nhận thông tin chi tiết.
      </p>
    `;
    
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
