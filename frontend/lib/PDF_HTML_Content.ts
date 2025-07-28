export default function pdfContent(data: any) {
  return `
  <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 24px;
          background-color: #f9f9f9;
        }
        .container {
          max-width: 700px;
          margin: 0 auto;
          background: #fff;
          border-radius: 10px;
          padding: 24px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        h1 {
          color: #2e86de;
          text-align: center;
          border-bottom: 2px solid #2e86de;
          padding-bottom: 8px;
        }
        .profile-pic {
          text-align: center;
          margin-bottom: 20px;
        }
        .profile-pic img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid #2e86de;
        }
        .info-row {
          margin: 12px 0;
        }
        .label {
          font-weight: bold;
          color: #333;
        }
        .value {
          color: #555;
          margin-left: 8px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="profile-pic">
          <img src="${data.base64Image}" alt="Profile Image" />
        </div>
        <h1>Profile Information</h1>
        <div class="info-row"><span class="label">Name:</span><span class="value">${
          data.name
        }</span></div>
        <div class="info-row"><span class="label">Age:</span><span class="value">${
          data.age
        }</span></div>
        <div class="info-row"><span class="label">Email:</span><span class="value">${
          data.emailAddress
        }</span></div>
        <div class="info-row"><span class="label">Phone:</span><span class="value">${
          data.phoneNumber
        }</span></div>
        <div class="info-row"><span class="label">Country:</span><span class="value">${
          data.country
        }</span></div>
        <div class="info-row"><span class="label">Address:</span><span class="value">${
          data.address
        }</span></div>
        <div class="info-row"><span class="label">Japanese Level:</span><span class="value">${data.JapaneseLevel.join(
          ", "
        )}</span></div>
        <div class="info-row"><span class="label">Work Hours:</span><span class="value">${
          data.hoursWorkFrom
        } - ${data.hoursWorkTo}</span></div>
        <div class="info-row"><span class="label">Work Days:</span><span class="value">${data.dayWork.join(
          ", "
        )}</span></div>
        <div class="info-row"><span class="label">Starred:</span><span class="value">${data.starred.join(
          ", "
        )}</span></div>
      </div>
    </body>
  </html>
`;
}
