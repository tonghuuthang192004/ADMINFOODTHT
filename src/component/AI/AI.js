import React, { useState } from 'react';
import axios from 'axios';

function AIPage() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:3000/admin/AI/', {
        message: userInput
      });
      setResponse(res.data.reply);
    } catch (err) {
      setResponse('Lỗi khi gọi API AI.');
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Trợ lý AI - ChatGPT</h2>
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows="4"
        className="form-control mb-3"
        placeholder="Nhập câu hỏi của bạn..."
      />
      <button onClick={handleSend} className="btn btn-primary">Gửi</button>
      <div className="mt-4">
        <h5>Phản hồi:</h5>
        <div className="p-3 border bg-light">
          {response || 'Chưa có phản hồi.'}
        </div>
      </div>
    </div>
  );
}

export default AIPage;
